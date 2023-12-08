import mysql.connector
from mysql.connector import pooling

config = {
    'user':'root',
    'password':'password',
    'host':'localhost',
    'database':'foodcoming',
	'port':3306,
}
connection_pool = pooling.MySQLConnectionPool(pool_name='postgram',pool_size=25,**config)

def databaseConnect(execute_str,execute_argument=None):
	connection = connection_pool.get_connection()
	cursor = connection.cursor()
	try:
		cursor.execute("USE foodcoming")
		cursor.execute(execute_str,execute_argument)
		result = cursor.fetchall()
		connection.commit()
	except Exception as err:
		print(err)
		result = None
	finally:
		cursor.close()
		connection.close()
	return result

# category_name = ["主食","燒烤/小吃","素食","飲品","冰品/甜點","健康餐盒","早餐","麵包","生鮮雜貨","咖啡廳"]
	# category_photo = ["../static/image/shop_category/spaghetti.png", "../static/image/shop_category/BBQ.png",
	# 				"../static/image/shop_category/vegan.png", "../static/image/shop_category/bubble_tea.png",
	# 				"../static/image/shop_category/desert.png", "../static/image/shop_category/healthy_food.png",
	# 				"../static/image/shop_category/breakfast.png", "../static/image/shop_category/bread.png",
	# 				"../static/image/shop_category/grocery.png", "../static/image/shop_category/coffee.png"]
	# for category in category_name:
	# 	icon = category_photo.pop(0)
	# 	print(icon)
	# 	databaseConnect("INSERT INTO shop_category (category_name, category_photo) VALUE (%s,%s)",(category,icon))