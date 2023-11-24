from flask import *
from module.database import *
from module.jsonify import *
import uuid

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