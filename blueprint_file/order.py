from flask import *
from module.database import *
from module.jsonify import *
import json
import uuid
import requests

order_blueprint = Blueprint('api_order',__name__,template_folder= 'api')

class Order:
    def __init__(self):
        pass
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

@order_blueprint.route("/order",methods=["PUT"])
def getCartList():
    data = request.get_json()
    order_instance = Order()
    result = order_instance.memberOrder(member_id = data['id'])
    return results_convert({'data':result}), 200

@order_blueprint.route("/order",methods=["POST"])
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
    
@order_blueprint.route("/orderDetail",methods=["POST"])
def getOrderDetail():
    try: 
        data = request.get_json()
        orderItem = databaseConnect("SELECT item, piece FROM new_order WHERE order_id = %s",(data['orderId'],))
        order = {}
        for item in orderItem:
            order[item[0]] = item[1]
        return results_convert({'data':order}), 200
    except Exception as err:
        return results_convert({'error':True, 'message':err}), 500