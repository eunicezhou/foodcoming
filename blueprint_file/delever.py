from flask import *
from module.jsonify import *
from module.database import *
from module.countDistance import *

delever_blueprint = Blueprint('api_delever',__name__,template_folder= '/api/delever')

@delever_blueprint.route("/setup",methods=['POST'])
def deleverSetup():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    shot = request.files['shot']
    identify_front = request.files['identity_front']
    identify_back = request.files['identity_back']
    licence = request.files['licence']
    travel_licence = request.files['travel_licence']
    return results_convert({'data':'success'})

@delever_blueprint.route("/orderList",methods=["PUT"])
def accept():
    data = request.get_json()
    lat = data['lat']
    lng = data['lng']
    orderShops = databaseConnect("SELECT new_order.order_id, merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng \
                    FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id")
    reachable = []
    for ordershop in orderShops:
        store_distance = distance(float(lat), float(lng), float(ordershop[3]), float(ordershop[4]))
        if store_distance < 5:
            reachable.append(ordershop[0])
    orderList = []
    for order_id in reachable:
        # print(order_id)
        order_detail = databaseConnect("SELECT new_order.order_id, new_order.item, new_order.piece, merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng, \
                    new_order.destination, new_order.lat, new_order.lng FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id\
                    WHERE new_order.order_id = %s",(order_id,))
        orderList.append(order_detail)
    return results_convert({'data':orderList})