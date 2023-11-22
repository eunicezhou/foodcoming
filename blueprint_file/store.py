from flask import *
from datetime import datetime, timedelta
from module.jsonify import *
from module.database import *
from module.countDistance import *
import json

store_blueprint = Blueprint('api_store',__name__,template_folder= 'api')

@store_blueprint.route("/store",methods=['PUT'])
def getStoreInfo():
    data = request.get_json()
    merchantData = databaseConnect("SELECT * FROM merchant WHERE merchant_id = %s",(data['id'],))
    menuData = databaseConnect("SELECT * FROM menu WHERE merchant_id = %s",(data['id'],))
    new_menu_data = []
    for item in menuData:
        new_item = tuple(str(detail) for detail in item)
        new_menu_data.append(new_item)
    menuData = new_menu_data
    category = databaseConnect("SELECT category_name, category_photo FROM shop_category WHERE category_id = %s",(merchantData[0][12],))
    data = {
        'id':str(merchantData[0][0]),
        'bossemail':merchantData[0][2],
        'phone':merchantData[0][3],
        'shopname':merchantData[0][4],
        'shopPhoto':merchantData[0][5],
        'shopAddress':merchantData[0][6],
        'lat':merchantData[0][7],
        'lng':merchantData[0][8],
        'start':str(merchantData[0][9]),
        'end':str(merchantData[0][10]),
        'holiday':merchantData[0][11],
        'category_photo':category[0][1],
        'category':category[0][0],
        'menu': json.dumps(menuData)
    }
    return results_convert({'data':data})

@store_blueprint.route("/searchstore",methods=['PUT'])
def search():
    data = request.get_json()

    if data.get('country', None) is not None:
        country = data['country']
        lat = float(data['lat'])
        lng = float(data['lng'])
        nearby = databaseConnect("SELECT merchant_id, lat, lng FROM merchant WHERE country = %s",(country,))
        nearby_store = []
        for place in nearby:
            store_lat = float(place[1])
            store_lng = float(place[2])
            store_distance = distance(lat, lng, store_lat, store_lng)
            if store_distance < 15:
                store_data = databaseConnect("SELECT * FROM merchant WHERE merchant_id = %s",(place[0],))
                nearby_store.append(store_data)
    else:
        lat = float(data['lat'])
        lng = float(data['lng'])
        nearby = databaseConnect("SELECT merchant_id, lat, lng FROM merchant")
        nearby_store = []
        for place in nearby:
            store_lat = float(place[1])
            store_lng = float(place[2])
            store_distance = distance(lat, lng, store_lat, store_lng)
            if store_distance < 15:
                store_data = databaseConnect("SELECT * FROM merchant WHERE merchant_id = %s",(place[0],))
                nearby_store.append(store_data)
    data = {}
    id = 1
    for store in nearby_store:
        store_data_str = [str(info) for info in store[0]]
        data[f"data{id}"] = store_data_str
        id += 1
    return results_convert(data)