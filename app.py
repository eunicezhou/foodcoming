from flask import *
from module.database import *
from module.jsonify import *
from blueprint_file.merchant_file import merchant_file_blueprint
from blueprint_file.member import auth_blueprint
from blueprint_file.store import store_blueprint

app=Flask(__name__)
app.secret_key = 'your_secret_key'

#api
app.register_blueprint(merchant_file_blueprint,url_prefix= '/api')
app.register_blueprint(auth_blueprint,url_prefix= '/api/auth')
app.register_blueprint(store_blueprint,url_prefix= '/api')

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
		
@app.route("/merchantSetup")
def setup_Store():
	return render_template("merchantfile.html")

@app.route("/deleverSetup")
def setup_Delever():
	return render_template("deleverfile.html")

app.run(debug=True, host="0.0.0.0", port=4400)