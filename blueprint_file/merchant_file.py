from flask import *
from module.jsonify import *
from module.token import *
from module.database import *
from module.saveToS3 import *
import uuid

merchant_file_blueprint = Blueprint('api_merchant',__name__,template_folder= 'api')

@merchant_file_blueprint.route("/merchant",methods=['POST'])
def setupStore():
    try:
        memberEmail = request.form['memberEmail']
        bossName = request.form['bossName']
        bossEmail = request.form['bossEmail']
        bossPhone = request.form['bossPhone']
        shopName = request.form['shopName']
        shopPhoto = request.files['shopPhoto']
        shopphotoID = str(uuid.uuid4())
        shoppicture_file = f"{shopphotoID}.jpeg"
        uploadToS3(shopPhoto,bucket_name,shoppicture_file)
        s3_shopPhotoUrl = f"https://dgz2b3tzb57hl.cloudfront.net/{shoppicture_file}"
        shopCategoryValue = request.form['shopCategoryValue']
        category_id = shopCategoryDecide(shopCategoryValue)
        address = request.form['address']
        lat = request.form['lat']
        lng = request.form['lng']
        startTime = request.form['startTime']
        endTime = request.form['endTime']
        holiday = request.form['holiday']
        databaseConnect('INSERT INTO merchant (hostname, hostemail, phone, shopname, photo, shopaddress, lat, lng, start, end, holiday, category_id) \
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',\
            (bossName, bossEmail, bossPhone, shopName, s3_shopPhotoUrl, address, lat, lng, startTime, endTime, holiday, category_id))
        merchant_id = databaseConnect("SELECT merchant_id FROM merchant \
                                WHERE hostemail = %s AND phone = %s AND shopname = %s AND shopaddress = %s",(bossEmail, bossPhone, shopName, address))
        databaseConnect('UPDATE member SET merchant_id = %s WHERE email = %s',(merchant_id[0][0], memberEmail))
        id = 0
        photo_list = []
        while f'photo{id}' in request.files:
            picture = request.files[f'photo{id}']
            photoID = str(uuid.uuid4())
            picture_file = f"{photoID}.jpeg"
            uploadToS3(picture,bucket_name,picture_file)
            s3_url = f"https://dgz2b3tzb57hl.cloudfront.net/{picture_file}"
            photo_list.append(s3_url)
            id += 1
        index = 0
        while f'dishDetail{index}' in request.form:
            dishDetail = json.loads(request.form[f'dishDetail{index}'])
            dishCat = list(dishDetail.keys())[0]
            dishes = list(dishDetail.values())[0]
            for item in dishes:
                dish_name = list(item.keys())[0]
                dish_list = list(item.values())[0]
                dish_dict = json.loads(dish_list)
                describe = dish_dict['describe']
                price = dish_dict['price']
                start = dish_dict['start']
                end = dish_dict['end']
                dish_photo = photo_list.pop(0)
                databaseConnect("INSERT INTO menu (merchant_id, dishcategory, dishname, dishdescribe, \
                                dishpicture, price, start, end) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",\
                                (merchant_id[0][0], dishCat, dish_name, describe, dish_photo, price, start, end))
            index += 1
        return results_convert({'data':'success','merchant_id':merchant_id})
    except Exception as err:
        return results_convert({'error':True,'message':str(err)})
    
def shopCategoryDecide(category_value):
    if category_value == "主食":
        category_id = 1
    elif category_value == "燒烤/小吃":
        category_id = 2
    elif category_value == "素食":
        category_id = 3
    elif category_value == "飲品":
        category_id = 4
    elif category_value == "冰品/甜點":
        category_id = 5
    elif category_value == "健康餐盒":
        category_id = 6
    elif category_value == "早餐":
        category_id = 7
    elif category_value == "麵包":
        category_id = 8
    elif category_value == "生鮮雜貨":
        category_id = 9
    elif category_value == "咖啡廳":
        category_id = 10
    return category_id