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

@app.route("/store/<int:id>")
def Store(id):
	merchantData = databaseConnect("SELECT * FROM merchant WHERE merchant_id = %s",(int,))
	return render_template("merchantpage.html", data = merchantData)

@app.route("/merchantSetup")
def setup_Store():
	return render_template("merchantfile.html")



app.run(debug=True, host="0.0.0.0", port=4400)