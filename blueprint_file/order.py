from flask import *
from module.database import *
from module.jsonify import *
import json
import uuid
import requests



order_blueprint = Blueprint('api_order',__name__,template_folder= 'api')

@order_blueprint.route("/order",methods=["PUT"])
def getCartList():
    data = request.get_json()
    cartList = databaseConnect("SELECT * FROM cart WHERE member_id = %s",(data['id'],))
    new_cartList = []
    for item in cartList:
        item = list(item)
        dishPict = databaseConnect("SELECT dishpicture FROM menu WHERE merchant_id = %s AND dishname = %s",\
                        (item[1],item[2]))
        shopname = databaseConnect("SELECT shopname FROM merchant WHERE merchant_id = %s",(item[1],))
        item[1] = shopname[0][0]
        item.append(dishPict[0][0])
        new_cartList.append(item)
    return results_convert({'data':new_cartList})

@order_blueprint.route("/order",methods=["POST"])
def payOrder():
    try:
        data = request.get_json()
        orderID = str(uuid.uuid4())
        cartList = databaseConnect("SELECT * FROM cart WHERE member_id = %s",(data['id'],))
        consumerInfo = databaseConnect("SELECT account, email, phone FROM member WHERE id = %s",(data['id'],))
        storeInfo = databaseConnect("SELECT cart.merchant_id,\
                                    merchant.shopname, \
                                    merchant.shopaddress, \
                                    merchant.lat, \
                                    merchant.lng \
                                    FROM cart \
                                    INNER JOIN merchant \
                                    ON cart.merchant_id = merchant.merchant_id \
                                    WHERE cart.member_id = %s",(data['id'],)) 
        #向tappay傳送請求
        tappay_api_url = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime'
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': 'partner_9z8gPYEOG2FqIqzIYYguMCVFJBZazxlTppKYuP9oFWSEAM7DKUcewkNC'
        }
        payload = {
            'partner_key':"partner_9z8gPYEOG2FqIqzIYYguMCVFJBZazxlTppKYuP9oFWSEAM7DKUcewkNC",
            'prime': data['prime'],
            'order_number': orderID,
            'merchant_id':"eunicezhou_CTBC",
            "details": storeInfo[0][1],
            'amount': data['pay'],
            'cardholder':{
                'name':data['name'],
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
                                    (orderID, data['id'], listItem[1], listItem[2], listItem[3], listItem[4], data['address'], data['lat'], data['lng']))
                    databaseConnect("DELETE FROM cart WHERE member_id = %s",(data['id'],)) 
                payment = {
                    'order_id': orderID,
                    'member_id':data['id'],
                    'name':data['name'],
                    'phone':data['phone'],
                    'destination':data['address'],
                    'lat':data['lat'],
                    'lng':data['lng'],
                    'pay':data['pay']
                }
                # print(payment)
                return results_convert(payment)
            else:
                print('支付失敗，原因：', result.get('msg'))
        else:
            return results_convert({'error':True, 'msg':response.status_code})
    except Exception as err:
        return results_convert({'error':True, 'message':err})
    
@order_blueprint.route("/orderDetail",methods=["POST"])
def getOrderDetail():
    try: 
        data = request.get_json()
        orderItem = databaseConnect("SELECT item, piece FROM new_order WHERE order_id = %s",(data['orderId'],))
        order = {}
        for item in orderItem:
            order[item[0]] = item[1]
        return results_convert({'data':order})
    except Exception as err:
        return results_convert({'error':True, 'message':err})