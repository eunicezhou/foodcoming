from flask import *
from module.jsonify import *
from module.token import *
from module.database import *
from module.countDistance import *
from datetime import datetime, timedelta

deliver_blueprint = Blueprint('api_deliver',__name__,template_folder= '/api')

class Deliverer:
    def __init__(self, memberEmail, name, email, phone):
        self.memberEmail = memberEmail
        self.name = name
        self.email = email
        self.phone = phone
    def register_deliver(self, memberEmail, name, email, phone):
        emailExist = databaseConnect('SELECT * FROM deliver WHERE email = %s',(email,))
        if emailExist != []:
            return results_convert({'error':True,'message':'您已註冊為外送員'})
        else:
            databaseConnect('INSERT INTO deliver (name, email, phone) VALUES (%s, %s, %s)',\
                            (name, email, phone))
            delever_id = databaseConnect('SELECT deliver_id FROM deliver WHERE email = %s',(email,))
            databaseConnect('UPDATE member SET delever_id = %s WHERE email = %s',(delever_id[0][0], memberEmail))
            baseInfor = databaseConnect("SELECT id, account, email, phone, merchant_id, delever_id, record_id,cart_id FROM member WHERE email = %s",(memberEmail,))
            print(baseInfor)
            filedict = {
                    "id":baseInfor[0][0],
                    "name":baseInfor[0][1],
                    "email":baseInfor[0][2],
                    "phone":baseInfor[0][3],
                    "merchant_id":baseInfor[0][4],
                    "delever_id":baseInfor[0][5],
                    "exp":datetime.utcnow()+timedelta(days=7)
                }
            encoding_token = encoding(filedict, token_key ,'HS256')
            return encoding_token

@deliver_blueprint.route("/delivers",methods=['POST'])
def deleverSetup():
    try:
        memberEmail = request.form['memberEmail']
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        deliver_instance = Deliverer(memberEmail = "", name = "", email = "", phone = "")
        result = deliver_instance.register_deliver(
            memberEmail = memberEmail,
            name = name,
            email = email,
            phone = phone
        )
        return result
    except Exception as err:
        return results_convert({'error':True,'message':err}), 500