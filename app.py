from flask import *
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
from module.database import *
from module.jsonify import *
from blueprint_file.merchant_file import merchant_file_blueprint
from blueprint_file.member import auth_blueprint
from blueprint_file.store import store_blueprint
from blueprint_file.delever import delever_blueprint
from blueprint_file.order import order_blueprint
import urllib.parse

app=Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})
wsgi_app = app.wsgi_app
socketio = SocketIO(app,cors_allowed_origins="*")
# socketio = SocketIO(app,path='/mysocket',cors_allowed_origins="*")
app.secret_key = 'your_secret_key'

#api
app.register_blueprint(merchant_file_blueprint,url_prefix= '/api')
app.register_blueprint(auth_blueprint,url_prefix= '/api/auth')
app.register_blueprint(store_blueprint,url_prefix= '/api')
app.register_blueprint(delever_blueprint,url_prefix= '/api/delever')
app.register_blueprint(order_blueprint,url_prefix= '/api')

#頁面路徑
@app.route("/")
def index():
	return render_template("index.html")

@app.route("/store/<id>")
def Store(id):
	try:
		int_value = int(id)
		merchantData = databaseConnect("SELECT * FROM merchant WHERE merchant_id = %s",(int_value,))
		return render_template("merchantpage.html", data = merchantData)
	except ValueError:
		return redirect("/")
	
@app.route("/grocery")
def getGrocery():
	try:
		store = request.args.get('store')
		item = request.args.get('item')
		itemData = databaseConnect("SELECT * FROM menu WHERE merchant_id = %s AND dishname = %s",(store, item))
		if itemData == []:
			return redirect("/")
		else:
			return render_template("itemPage.html", data = itemData)
	except Exception as err:
		return redirect("/")
		
@app.route("/merchantSetup")
def setup_Store():
	return render_template("merchantfile.html")

@app.route("/deleverSetup")
def setup_Delever():
	return render_template("deliverfile.html")

@app.route("/delever")
def Delever():
	return render_template("deliverpage.html")

@app.route("/order")
def order():
	return render_template("payment.html")

@app.route("/paySuccess")
def paySuccess():
	order_id = request.args.get('order_id')
	orderDetail = databaseConnect("SELECT new_order.merchant_id, merchant.shopname, merchant.shopaddress, merchant.lat, merchant.lng, new_order.item, new_order.piece FROM new_order \
                INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id WHERE order_id = %s AND status = 'pending'",(order_id,))
	orderItem = {}
	for order in orderDetail:
		orderItem[f"{order[5]}"]=f"{order[6]}"
	order_info = {
        'order_id': order_id,
		'id':request.args.get('member_id'),
        'name': request.args.get('name'),
		'phone': request.args.get('phone'),
		'shopname':orderDetail[0][1],
		'shopaddress':orderDetail[0][2],
		'shop_lat':orderDetail[0][3],
		'shop_lng':orderDetail[0][4],
		'destination': request.args.get('destination'),
		'lat': request.args.get('lat'),
		'lng':request.args.get('lng'),
		'item':orderItem,
		'pay':request.args.get('pay'),
    }
	return render_template("thankyou.html", data = order_info)

@socketio.on('connect')
def connect():
	print("connected!")

@socketio.on('disconnect')
def disconnect():
	print("disconnected!")

@socketio.on('acquire_order')
def accept_order(order_id):
	databaseConnect("UPDATE new_order SET status = 'accepted' WHERE order_id = %s",(order_id,))
	locationData = databaseConnect("SELECT merchant.shopaddress, merchant.lat, merchant.lng, new_order.destination, new_order.lat, new_order.lng \
			FROM new_order INNER JOIN merchant ON new_order.merchant_id = merchant.merchant_id WHERE new_order.order_id = %s",(order_id,))
	socketio.emit('create-road', locationData)

@socketio.on('joinRoom')
def joinRoom(data):
	room = data['room']
	member = data['name']
	join_room(room)
	message = f'{member} have joined the room: {room}'
	socketio.emit('message',message ,room=room)
	
@socketio.on('complete-order')
def completeOrder(data):
	room = data['room']
	message = data['message']
	databaseConnect("UPDATE new_order SET status = 'delivered' WHERE order_id = %s",(room,))
	socketio.emit('message', message, room=room)

@socketio.on('deliver-cancel')
def deliverCancel(data):
	room = data['room']
	message = data['message']
	databaseConnect("UPDATE new_order SET status = 'pending' WHERE order_id = %s",(room,))
	socketio.emit('message', message, room=room)

@socketio.on('consumer-cancel')
def consumerCancel(data):
	room = data['room']
	member = data['member']
	databaseConnect("UPDATE new_order SET status = 'canceled' WHERE order_id = %s",(room,))
	socketio.emit('message', f'{member} had canceled the order', room=room)

@socketio.on('leaveRoom')
def leave_room_handler(data):
	room = data['room']
	member = data['name']
	leave_room(room)
	if data.get('reason'):
		socketio.emit('order-cancel', f'{member} had left the {room}', room=room)
	else:
		socketio.emit('order-arrived', f'{member} had left the {room}', room=room)

@socketio.on('update-order')
def updateOrder(data):
	room = data['room']
	delever = data['delever']
	requireTime = data['requireTime']
	databaseConnect("UPDATE new_order SET delever = %s, requireTime = %s WHERE order_id = %s"\
				 ,(delever, requireTime, room))
	socketio.emit('delever-match', {
		'room':room,
        'delever':delever,
        'requireTime': requireTime
		})
@socketio.on('deliver-road')
def getDeliverRoadData(data):
	print(data)
	deliverPosition = data['currentPosition']
	restaurant = {
		'address': data['locationInfo'][0],
		'latitude': data['locationInfo'][1],
		'longitude':data['locationInfo'][2]
	}
	destination = {
		'address':data['locationInfo'][3],
		'latitude':data['locationInfo'][4],
		'longitude':data['locationInfo'][5]
	}
	socketio.emit('getDeliverRoad', {
		'deliverPosition':deliverPosition,
		'restaurant':restaurant,
		'destination':destination
	})

@socketio.on('requestDeliverPosition')
def requestDeliverPosition():
	socketio.emit('getDeliverPosition')

@socketio.on('deliverPositionReply')
def deliverPositionReply(data):
	print(data)
	socketio.emit('replyDeliverPositionToConsumer', data)

socketio.run(app, debug=True, host="0.0.0.0", port=4400)