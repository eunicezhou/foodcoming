from flask import *

google_blueprint = Blueprint("google", __name__, template_folder = "/google")

@google_blueprint.route("/map-key", methods = ["GET"])
def getGoogleApiKey():
    return jsonify({"key": "AIzaSyA2sw2FO9nxUBiPPFC0ZDN8kqtdANk7sEQ"})