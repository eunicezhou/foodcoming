from flask import *
import jwt
import json

token_key = 'foodcoming_eunice'
decode_algorithms = ['HS256']
def encoding(filedict, token_key ,algorithm):
    encode_token = jwt.encode(filedict, token_key ,algorithm)
    return jsonify({"token":encode_token})

def decoding(decode_token, token_key, algorithms):
    information = jwt.decode(decode_token, token_key, algorithms)
    return jsonify({"data":information})