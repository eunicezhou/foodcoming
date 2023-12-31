from flask import *
from module.jsonify import *
from module.database import *
from module.token import *
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

auth_blueprint = Blueprint('api_auth',__name__,template_folder= '/api/auth')

class Member:
    def __init__(self, account, email, password, phone):
        self.account = account
        self.email = email
        self.password = password
        self.phone = phone
    def signup(self, account, email, password, phone):
        memberExist = databaseConnect("SELECT * FROM member WHERE email = %s",(email,))
        if memberExist == []:
            hashed_password = generate_password_hash(password, method='scrypt')
            databaseConnect("INSERT INTO member (account, email, password, phone) VALUE (%s, %s, %s, %s)",\
                            (account, email, hashed_password, phone))
            return results_convert({'data':'success'})
        else:
            return results_convert({'error':True, 'message':'member already exist!'}), 403
    def login(self, email, password):
        memberInfo = databaseConnect("SELECT email,password From member WHERE email = %s",(email,))
        if memberInfo == []:
            return results_convert({'error':True,'message':"您尚未註冊會員"}), 401
        else:
            check = check_password_hash(memberInfo[0][1],password)
            if check:
                baseInfor = databaseConnect("SELECT id,account,email,phone,merchant_id,delever_id,record_id,cart_id FROM member WHERE email = %s",(email,))
                filedict = {
                    "id":baseInfor[0][0],
                    "name":baseInfor[0][1],
                    "email":baseInfor[0][2],
                    "phone":baseInfor[0][3],
                    "merchant_id":baseInfor[0][4],
                    "delever_id":baseInfor[0][5],
                    "exp":datetime.utcnow()+timedelta(days=7)
                }
                token_algorithm = 'HS256'
                encode_token = encoding(filedict, token_key, algorithm= token_algorithm)
                return encode_token
            else:
                return results_convert({'error':True,'message':"密碼錯誤"}), 400

@auth_blueprint.route("/signup",methods=['POST'])
def signUp():
    try:
        data = request.get_json()
        member_instance = Member(account="", email="", password="", phone="")
        result = member_instance.signup(
            account = data['account'],
            email = data['email'],
            password = data['password'],
            phone = data['phone']
        )
        return result
    except Exception as err:
        return results_convert({'error':True,'message':str(err)}), 500
    
@auth_blueprint.route("/login",methods=['PUT'])
def login():
    try:
        data = request.get_json()
        member_instance = Member(account="", email="", password="", phone="")
        result = member_instance.login(
            email = data['email'],  
            password = data['password']
        )
        return result
    except Exception as err:
        return results_convert({'error':True,'message':str(err)}), 500
    
@auth_blueprint.route("/login",methods=['GET'])
def idenify():
    try:
        token = request.headers.get('Authorization')
        if token:
            decode_token = token.split('Bearer ')
            information = decoding(decode_token[1], token_key, decode_algorithms)
            return information, 200
        else:
            return redirect("/")
    except Exception as err:
        return results_convert({"error": True,"message": str(err)}),500