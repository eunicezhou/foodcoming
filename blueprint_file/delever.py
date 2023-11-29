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
    orderShops = databaseConnect("SELECT new_order.order_id, new_order.destination, new_order.lat, new_order.lng,\
                    merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng \
                    FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id WHERE new_order.status = 'pending'")
    reachable = []
    for ordershop in orderShops:
        destination_distance = distance(float(lat), float(lng), float(ordershop[2]), float(ordershop[3]))
        store_distance = distance(float(lat), float(lng), float(ordershop[6]), float(ordershop[7]))
        if store_distance < 5:
            # if destination_distance < 25: //這邊之後要打開，以便篩選目的地
            #     print(destination_distance)
            reachable.append(ordershop[0])
    orderList = []
    for order_id in reachable:
        # print(order_id)
        order_detail = databaseConnect("SELECT new_order.order_id, new_order.item, new_order.piece, merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng, \
                    new_order.destination, new_order.lat, new_order.lng FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id\
                    WHERE new_order.order_id = %s",(order_id,))
        orderList.append(order_detail)
    return results_convert({'data':orderList})

@delever_blueprint.route("/order", methods=['POST'])
def orderDetail():
    data = request.get_json()
    order_id = data['order_id']
    itemList = databaseConnect("SELECT new_order.item FROM new_order WHERE order_id = %s",(order_id,))
    pieceList = databaseConnect("SELECT new_order.piece FROM new_order WHERE order_id = %s",(order_id,))
    orderContent = {}
    for item in itemList[0]:
        orderContent[item] = pieceList.pop(0)[0]
    print(orderContent)
    return results_convert(orderContent)