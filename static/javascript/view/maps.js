//建立merchant地圖
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
    return new google.maps.places.Autocomplete(
        document.getElementById('address'),
        {
            types: ['geocode','establishment'],
            bounds: {
                east: currentPosition.lng + 0.001,
                west: currentPosition.lng - 0.001,
                south: currentPosition.lat - 0.001,
                north: currentPosition.lat + 0.001,
            },
            strictBounds: false,
            disableKeyboardInput: true,
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

function searchLocation(selectedRestaurant) {
    return new Promise((resolve) => {
        const autocomplete = createAutocomplete();

        autocomplete.addListener('place_changed', () => {
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
            } else {
                resolve(null); // 或者你可以根據實際需求拒絕 Promise
            }
        });
    });
}

function getRoad(){
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }  // 起始地點的經緯度
    });
    directionsRenderer.setMap(map);

    var request = {
      origin: '台北市',  // 起始地點
      destination: '高雄市',  // 目的地
      travelMode: 'DRIVING'  // 交通方式，可選擇 DRIVING、WALKING、BICYCLING、TRANSIT 等
    };

    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(response);
      }
    });
}

