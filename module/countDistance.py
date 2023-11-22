import math

def distance(lat1, lon1, lat2, lon2):
    # 地球半徑，單位是公里
    earth_radius = 6371

    # 將緯度和經度轉換為弧度
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)

    # 計算 Haversine 公式中的 a
    a = (
        math.sin(d_lat / 2) * math.sin(d_lat / 2) +
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
        math.sin(d_lon / 2) * math.sin(d_lon / 2)
    )

    # 計算 Haversine 公式中的 c
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # 計算距離（地球半徑乘以弧度）
    distance = earth_radius * c

    return distance
