from flask import *
from urllib.parse import urlparse, parse_qs, unquote
from datetime import datetime, timedelta
from module.jsonify import *
from module.database import *
from module.countDistance import *
from module.token import *
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
        if data.get('category', None) is not None:
            category_id = databaseConnect("SELECT category_id FROM shop_category WHERE category_name = %s",(data['category'],))
            nearby = databaseConnect("SELECT merchant.merchant_id, merchant.lat, merchant.lng \
                    FROM merchant WHERE category_id = %s AND category_name = %s", (country,category_id[0][0]))
        else:
            nearby = databaseConnect("SELECT merchant_id, lat, lng FROM merchant WHERE country = %s",(country,))
    else:
        lat = float(data['lat'])
        lng = float(data['lng'])
        if data.get('category', None) is not None:
            category_id = databaseConnect("SELECT category_id FROM shop_category WHERE category_name = %s",(data['category'],))
            nearby = databaseConnect("SELECT merchant_id, lat, lng \
                    FROM merchant WHERE category_id = %s", (int(category_id[0][0]),))
        else:
            print('no category')
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

@store_blueprint.route("/item",methods=['PUT'])
def showItem():
    query = request.get_json()['query']
    # 解析 URL 中的 query string
    parsed_url = urlparse(query)
    query_params = parse_qs(parsed_url.query)

    # 取得 "item" 參數的值，並進行 URL 解碼
    encoded_item = query_params.get("item", [""])[0]
    decoded_item = unquote(encoded_item)
    store = query_params.get("store", [""])[0]
    shopname = databaseConnect("SELECT shopname FROM merchant WHERE merchant_id = %s",(store,))
    itemData = databaseConnect("SELECT * FROM menu WHERE merchant_id = %s AND dishname = %s",(store, decoded_item))
    for item in itemData:
        item_data_str = [str(data) for data in item]
    return results_convert({'shop':shopname, 'data':item_data_str})

@store_blueprint.route("/cart",methods=['PUT','DELETE','POST'])
def purchase():
    if request.method == "POST":
        data = request.get_json()
        email = data['email']
        item = data['item']
        piece = data['piece']
        price = data['price']
        merchant_id = data['shopID']
        member_id = databaseConnect("SELECT id FROM member WHERE email = %s",(email,))
        databaseConnect("INSERT INTO cart VALUES (%s, %s, %s, %s, %s)",(member_id[0][0], int(merchant_id), item, piece, price))
        return results_convert({'data':'success'})
    elif request.method == "PUT":
        data = request.get_json()
        id = data['id']
        cartList = databaseConnect("SELECT * FROM cart WHERE member_id = %s",(id,))
        return results_convert({'data':cartList})