//建立merchant地圖
const googleApiKey = "AIzaSyA2sw2FO9nxUBiPPFC0ZDN8kqtdANk7sEQ";
let map;
let currentPosition;
let selectedRestaurant;
let marker;

function getCurrentLocation(){
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                currentPosition = {
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                };
                resolve(currentPosition);
            },        
        (error)=>{reject(error);})
    })
}
async function initMap(){
    try{
        currentPosition = await getCurrentLocation();
        if(document.getElementById('map')){
            map = new google.maps.Map(document.getElementById('map'),
            {center:{lat:23.553118,lng:121.0211024},
            zoom:11,});
            map.setCenter(currentPosition);
            map.setZoom(16); //當獲取到當前位置後，希望將地圖放大顯示
        }
        return currentPosition;
    }catch(error){
       return error.message;
    }   
}

function createAutocomplete() {
    let bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(currentPosition.lat - 0.001, currentPosition.lng - 0.001),
        new google.maps.LatLng(currentPosition.lat + 0.001, currentPosition.lng + 0.001)
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

function setMapCenterAndMarker(location) {
    map.setCenter(location);

    // 將搜尋結果顯示到地圖上
    if (!marker) {
        marker = new google.maps.Marker({
            // 設定 marker 要畫到哪個地圖上
            map: map,
        });
    }
    marker.setPosition(location);
}

async function searchLocation(selectedRestaurant) {
    return new Promise((resolve) => {
        const autocomplete = createAutocomplete();
        console.log(autocomplete);

        autocomplete.addListener('place_changed', async() => {
            const place = autocomplete.getPlace();

            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const selectedRestaurant = {
                    location: { lat: lat, lng: lng },
                    placeId: place.place_id,
                    name: place.name,
                    address: place.formatted_address,
                };
                if(document.querySelector('#map')){
                    setMapCenterAndMarker(selectedRestaurant.location);
                }
                resolve(selectedRestaurant);
            }else if(place.name){
                let siteLatAndLng = await geocodeAddress(place.name, googleApiKey);
                resolve(siteLatAndLng);
            }else{
                resolve(null); // 或者你可以根據實際需求拒絕 Promise
            }
        });
    });
}

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

// 當使用者輸入地址而未點選自動生成的地址時，將地址轉換為經緯度
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

