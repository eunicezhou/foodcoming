from flask import *
from module.database import *

from blueprint_file.merchant_file import merchant_file_blueprint
from blueprint_file.member import auth_blueprint

app=Flask(__name__)
app.secret_key = 'your_secret_key'



#api
app.register_blueprint(merchant_file_blueprint,url_prefix= '/api')
app.register_blueprint(auth_blueprint,url_prefix= '/api/auth')


#頁面路徑
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/editStore")
def Edit_Store():
	return render_template("merchantPage.html")
@app.route("/merchantSetup")
def setup_Store():
	return render_template("merchantfile.html")
@app.route("/store/<id>")
def store(id):
	return render_template("store.html")


app.run(debug=True, host="0.0.0.0", port=3000)