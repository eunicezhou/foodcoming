from flask import *
from module.jsonify import *
from module.database import *

delever_blueprint = Blueprint('api_delever',__name__,template_folder= '/api/delever')

@delever_blueprint.route("/setup",methods=['POST'])
def deleverSetup():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    shot = request.files['shot']
    identify_front = request.files['identity_front']
    identify_back = request.files['identity_back']
    licence = request.files['licence']
    travel_licence = request.files['travel_licence']
    return results_convert({'data':'success'})