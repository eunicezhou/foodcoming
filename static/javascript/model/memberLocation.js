async function init(){
    let currentPosition = await initMap();
    let LatLng = await updateCoordinates(currentPosition);
    fetchAndDisplayStores(LatLng.lat, LatLng.lng)
}
window.addEventListener('DOMContentLoaded',init);

document.querySelector('#address').addEventListener('click', async () => {
    const autocomplete = createAutocomplete();
    if(autocomplete){
        let currentPosition = await searchLocation(autocomplete);
        let LatLng = await updateCoordinates(currentPosition.address ? currentPosition.location : currentPosition);
        console.log(LatLng);
        clearStores();
        await fetchAndDisplayStores(LatLng.lat, LatLng.lng);
    }else{
        location.reload();
    }
});

document.querySelectorAll('.category').forEach(choice => {
    choice.addEventListener('click', async () => {
        clearStores();
        storeCategory(choice);
    });
});

async function updateCoordinates(location) {
    const lat = location.lat || location.latitude;
    const lng = location.lng || location.longitude;
    return { lat, lng };
}

async function fetchAndDisplayStores(lat, lng) {
    const method = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'lat': lat,
            'lng': lng
        })
    };
    const nearByStoreResult = await authAPI('/api/searchstore', method);
    console.log(nearByStoreResult);
    if(nearByStoreResult){
        document.querySelectorAll('.fakeStore').forEach(store=>{
            store.style.display = "none";
        })
        for(let data of Object.values(nearByStoreResult)){
            nearbyStore(data);
        };
    }
}

function nearbyStore(nearByStoreResult) {
    const store = document.createElement('div');
    store.className = 'store';

    const storePhoto = document.createElement('a');
    storePhoto.className = 'storePhoto';
    storePhoto.href = `/store/${nearByStoreResult[0]}`;

    const storeImg = document.createElement('img');
    storeImg.className = 'shopImg';
    storeImg.src = nearByStoreResult[5];
    storePhoto.appendChild(storeImg);

    const shopDetail = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'name bold label';
    name.textContent = nearByStoreResult[4];

    const deleverTime = document.createElement('div');
    deleverTime.className = '準備時間';

    shopDetail.appendChild(name);
    shopDetail.appendChild(deleverTime);

    store.appendChild(storePhoto);
    store.appendChild(shopDetail);

    document.querySelector('.stores').appendChild(store);
}

function clearStores() {
    const storesContainer = document.querySelector('.stores');
    storesContainer.innerHTML = '';
}

async function storeCategory(choice,lat,lng){
    let catTitle = choice.querySelector('.catTitle').textContent;
    console.log(catTitle);
    let url = "/api/searchstore";
    let method = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'category':catTitle,
            'lat': lat,
            'lng': lng
        })
    }
    let nearByStoreResult = await authAPI(url, method);
    for(let data in nearByStoreResult){
        nearbyStore(nearByStoreResult[`${data}`]);
    }
}
