from flask import *
from module.database import *
from module.jsonify import *
from module.countDistance import *
import json
import uuid
import requests

order_blueprint = Blueprint('api_order',__name__,template_folder= 'api')

class Order:
    def __init__(self):
        pass

    def acceptOrder(self, order_id):
        itemList = databaseConnect("SELECT new_order.item FROM new_order WHERE order_id = %s",(order_id,))
        pieceList = databaseConnect("SELECT new_order.piece FROM new_order WHERE order_id = %s",(order_id,))
        orderContent = {}
        for item in itemList[0]:
            orderContent[item] = pieceList.pop(0)[0]
        return orderContent
    
    def listOrder(self, lat, lng):
        orderShops = databaseConnect("SELECT new_order.order_id, new_order.destination, new_order.lat, new_order.lng,\
                    merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng \
                    FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id WHERE new_order.status = 'pending'")
        reachable = []
        for ordershop in orderShops:
            destination_distance = distance(float(lat), float(lng), float(ordershop[2]), float(ordershop[3]))
            store_distance = distance(float(lat), float(lng), float(ordershop[6]), float(ordershop[7]))
            if store_distance < 25:
                # if destination_distance < 25: //這邊之後要打開，以便篩選目的地
                #     print(destination_distance)
                reachable.append(ordershop[0])
        orderList = []
        for order_id in reachable:
            order_detail = databaseConnect("SELECT new_order.order_id, new_order.item, new_order.piece, merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng, \
                        new_order.destination, new_order.lat, new_order.lng FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id\
                        WHERE new_order.order_id = %s",(order_id,))
            orderList.append(order_detail)
        return orderList
    
    def memberOrder(self, member_id):
        cartList = databaseConnect("SELECT * FROM cart WHERE member_id = %s",(member_id,))
        new_cartList = []
        for item in cartList:
            item = list(item)
            dishPict = databaseConnect("SELECT dishpicture FROM menu WHERE merchant_id = %s AND dishname = %s",\
                            (item[1],item[2]))
            shopname = databaseConnect("SELECT shopname FROM merchant WHERE merchant_id = %s",(item[1],))
            item[1] = shopname[0][0]
            item.append(dishPict[0][0])
            new_cartList.append(item)
            return new_cartList
        
    def memberPay(self, member_id, prime, order_number, amount, cardholder_name, 
                  cardholder_phone, cardholder_address, cardholder_lat, cardholder_lng):
        cartList = databaseConnect("SELECT * FROM cart WHERE member_id = %s",(member_id,))
        consumerInfo = databaseConnect("SELECT account, email, phone FROM member WHERE id = %s",(member_id,))
        storeInfo = databaseConnect("SELECT cart.merchant_id,\
                                    merchant.shopname, \
                                    merchant.shopaddress, \
                                    merchant.lat, \
                                    merchant.lng \
                                    FROM cart \
                                    INNER JOIN merchant \
                                    ON cart.merchant_id = merchant.merchant_id \
                                    WHERE cart.member_id = %s",(member_id,)) 
        #向tappay傳送請求
        tappay_api_url = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime'
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': 'partner_9z8gPYEOG2FqIqzIYYguMCVFJBZazxlTppKYuP9oFWSEAM7DKUcewkNC'
        }
        payload = {
            'partner_key':"partner_9z8gPYEOG2FqIqzIYYguMCVFJBZazxlTppKYuP9oFWSEAM7DKUcewkNC",
            'prime': prime,
            'order_number': order_number,
            'merchant_id':"eunicezhou_CTBC",
            "details": storeInfo[0][1],
            'amount': amount,
            'cardholder':{
                'name':cardholder_name,
                'email': consumerInfo[0][1],
                'phone_number': consumerInfo[0][2],
            }
        }
        response = requests.post(tappay_api_url, json=payload, headers=headers)
        if response.status_code == 200:
            result = response.json()
            if result.get('status') == 0:
                for listItem in cartList:
                    databaseConnect("INSERT INTO new_order(order_id, member_id, merchant_id, item, piece, price, destination, lat, lng)\
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",\
                                    (order_number, member_id, listItem[1], listItem[2], listItem[3], listItem[4], cardholder_address, cardholder_lat, cardholder_lng))
                    databaseConnect("DELETE FROM cart WHERE member_id = %s",(member_id,)) 
                payment = {
                    'order_id': order_number,
                    'member_id':member_id,
                    'name':cardholder_name,
                    'phone':cardholder_phone,
                    'destination':cardholder_address,
                    'lat':cardholder_lat,
                    'lng':cardholder_lng,
                    'pay':amount
                }
                return results_convert(payment), 200
            else:
                return results_convert({'支付失敗，原因：': result.get('msg')}), 403
        else:
            return results_convert({'error':True, 'message':response.status_code}), 500

@order_blueprint.route("/orders",methods=["POST"])
def getCartList():
    data = request.get_json()
    order_instance = Order()
    result = order_instance.memberOrder(member_id = data['id'])
    return results_convert({'data':result}), 200

@order_blueprint.route("/orders",methods=["PUT"])
def payOrder():
    try:
        data = request.get_json()
        orderID = str(uuid.uuid4())
        order_instance = Order()
        result = order_instance.memberPay(
            member_id = data['id'],
            prime = data['prime'], 
            order_number = orderID,
            amount = data['pay'],
            cardholder_name = data['name'],
            cardholder_phone = data['phone'],
            cardholder_address = data['address'], 
            cardholder_lat = data['lat'], 
            cardholder_lng = data['lng'])
        print(result)
        return result
    except Exception as err:
        return results_convert({'error':True, 'message':err}), 500
    
@order_blueprint.route("/orders",methods=["GET"])
def getOrderDetail():
    try:
        if  request.args.get('order'):
            order_id = request.args.get('order')
            orderItem = databaseConnect("SELECT item, piece FROM new_order WHERE order_id = %s",(order_id,))
            order = {}
            for item in orderItem:
                order[item[0]] = item[1]
            return results_convert({'data':order}), 200
        elif request.args.get('lat') and request.args.get('lng'):
            lat = request.args.get('lat')
            lng = request.args.get('lng')
            order_instance = Order()
            result = order_instance.listOrder(
                lat = lat,
                lng = lng
            )
            return results_convert({'data':result})
    except Exception as err:
        return results_convert({'error':True, 'message':err}), 500