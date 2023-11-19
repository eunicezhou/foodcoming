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
    map = new google.maps.Map(document.getElementById('map'),
    {center:{lat:23.553118,lng:121.0211024},
    zoom:11,});
    currentPosition = await getCurrentLocation();
    map.setCenter(currentPosition);
    map.setZoom(16); //當獲取到當前位置後，希望將地圖放大顯示  
}

// function searchLocation(){
//     return new Promise((resolve) => {
//         const autocomplete = new google.maps.places.Autocomplete(
//             document.getElementById('address'),
//             {
//                 types: ['geocode'],
//                 bounds:{
//                     east:currentPosition.lng + 0.001,
//                     west:currentPosition.lng - 0.001,
//                     south:currentPosition.lat - 0.001,
//                     north:currentPosition.lat + 0.001,
//                 },
//                 strictBounds: false,
//                 disableKeyboardInput: true,
//             }
//         )

//         autocomplete.addListener('place_changed',()=>{ 
//             const place = autocomplete.getPlace();
//             let lat = place.geometry.location.lat();
//             let lng = place.geometry.location.lng();
//             selectedRestaurant = {
//             location: { lat: lat, lng: lng },
//             placeId:place.place_id,
//             name:place.name,
//             address:place.formatted_address,
//         }
//             map.setCenter(selectedRestaurant.location);
//             //將搜尋結果顯示到地圖上
//             if(!marker){
//                 marker = new google.maps.Marker({
//                     //設定marker要畫到哪個地圖上
//                     map: map, 
//                 });
//             }
//             marker.setPosition(selectedRestaurant.location);
//         })
//         resolve(selectedRestaurant);
//     })
// }

function createAutocomplete() {
    return new google.maps.places.Autocomplete(
        document.getElementById('address'),
        {
            types: ['geocode'],
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





