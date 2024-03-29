// 地圖API-Key
async function getGoogleApiKey(){
    const fetchInfo = new FetchInfo();
    let method = {
        method: "GET",
        headers: {
            "Content-Type": "application/json" 
        }
    }
    let response = await fetchInfo.api("/api/google/map-key", method);
    return response.key;
}
// Model: 獲取使用者當前位置
function getCurrentLocation(){
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                let currentPosition = {
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                };
                resolve(currentPosition);
            },        
        (error)=>{reject(error);})
    })
}

// Controller: 將輸入的地址轉為經緯度(目前只有商家的merchantfile有用到一次，之後改程式碼可以刪掉)
async function inputAddress(){
    const currentPosition = await getCurrentLocation();
    showMap(currentPosition);
    const autocomplete = createAutocomplete(currentPosition);
    let inputPosition = await searchLocation(autocomplete);
    return inputPosition;
}

// Model:獲取使用者輸入地址之位置
async function searchLocation(autocomplete) {
    return new Promise((resolve, reject) => {
        autocomplete.addListener('place_changed', async() => {
            const googleApiKey = await getGoogleApiKey();
            const place = autocomplete.getPlace();
            let lat;
            let lng;
            if (place.geometry) {
                lat = place.geometry.location.lat();
                lng = place.geometry.location.lng();
            }else if(place.name){
                let siteLatAndLng = await geocodeAddress(place.name, googleApiKey);
                lat = parseFloat(siteLatAndLng.latitude);
                lng = parseFloat(siteLatAndLng.longitude);
            }
            const selectedRestaurant = {
                location: { lat: lat, lng: lng },
                placeId: place.place_id,
                name: place.name,
                address: place.formatted_address,
            };
            if(document.querySelector('#map')){
                setMapCenterAndMarker(selectedRestaurant.location);
            }

            console.log(selectedRestaurant);
            resolve(selectedRestaurant);
        });
        },(error) => {reject(console.error({'message':error}));}
    );
}

// Model: 若使用者輸入地址，將地址轉為經緯度表示
async function geocodeAddress(address, apiKey){
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            return { latitude, longitude };
        } else {
            throw new Error('Geocoding failed');
        }
    });
}

// Model: 獲取當前位置資訊
function getInstancePosition(){
    if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                return userLocation;
            },
            function(error) {
                return {'error': error};
            }
        );

        // 如果需要停止監聽位置變化，可以使用以下代碼：
        // navigator.geolocation.clearWatch(watchId);
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// View: 獲取附近可選區域
function createAutocomplete(currentPosition){
    let lat = currentPosition.lat? currentPosition.lat:currentPosition.latitude;
    let lng = currentPosition.lng? currentPosition.lng:currentPosition.longitude;
    let bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(lat - 0.001, lng - 0.001),
        new google.maps.LatLng(lat + 0.001, lng + 0.001)
    );
    return new google.maps.places.Autocomplete(
        document.getElementById('address'),
        {
            types: ['geocode', 'establishment'],
            bounds: bounds,
            strictBounds: false,
            disableKeyboardInput: false,
        }
    );
}

// View:初始化地圖
async function showMap(currentPosition){
    try{
        if(document.getElementById('map')){
            map = new google.maps.Map(document.getElementById('map'),
            {center:{lat:23.553118,lng:121.0211024},
            zoom:13,});
            google.maps.event.addListenerOnce(map, 'idle', function() {
                console.log('地圖已載入到頁面');
                map.setCenter(currentPosition);
                map.setZoom(16); //當獲取到當前位置後，希望將地圖放大顯示
            });
        }
        return currentPosition;
    }catch(error){
       return error.message;
    }   
}

// View: 設定位置標籤
function setMapCenterAndMarker(location) {
    map = new google.maps.Map(document.getElementById('map'),
            {center:{lat:23.553118,lng:121.0211024},
            zoom:13,});
    map.setCenter(location);
    map.setZoom(16);
    let marker;
    // 將搜尋結果顯示到地圖上
    if (!marker) {
        marker = new google.maps.Marker({
            // 設定 marker 要畫到哪個地圖上
            map: map,
        });
    }
    marker.setPosition(location);
}

// View: 生成路線
function getRoad(currentPosition, locationData){
    return new Promise((resolve, reject) => {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: currentPosition.lat, lng: currentPosition.lng }  // 起始地點的經緯度
        });
        directionsRenderer.setMap(map);

        // 這邊設置路線中間目的地
        const waypoints = [
            { location: locationData[0], stopover: true },
        ];
        
        const request = {
            origin: {lat:currentPosition.lat, lng:currentPosition.lng},
            destination: locationData[3],
            travelMode: 'DRIVING',
            waypoints: waypoints,
        };

        directionsService.route(request, function(response, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(response);
                // 取得預計到達時間（以秒為單位）
                const durationInSeconds = response.routes[0].legs.reduce((total, leg) => total + leg.duration.value, 0);  
                // 轉換成分鐘
                const durationInMinutes = Math.round(durationInSeconds / 60);
                resolve(durationInMinutes);
            } else {
                reject(new Error('路線規劃失敗'));
            }
        })
    })
}


// Controller: 獲取inputAddress的經緯度
function transformToLatLng(inputAddress){
    let storeLat;
    let storeLng;
    if(inputAddress.location){
        storeLat = inputAddress.location.lat;
        storeLng = inputAddress.location.lng;
    }else{
        storeLat = inputAddress.latitude;
        storeLng = inputAddress.longitude;
    }
    return {'lat': storeLat,'lng': storeLng}
}