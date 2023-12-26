// Model: 初始化，獲取使用者當前位置附近的商家
async function init(){
    let currentPosition = await getCurrentLocation();
    await fetchAndDisplayStores(currentPosition.lat, currentPosition.lng);
    return {'lat': currentPosition.lat, 'lng': currentPosition.lng};
}
window.addEventListener('DOMContentLoaded',init);

// Model: 獲取使用者輸入地址之後的商家
document.querySelector('#address').addEventListener('click', async () => {
    let currentPosition = await inputAddress();
    let LatLng = transformToLatLng(currentPosition);
    clearStores();
    await fetchAndDisplayStores(LatLng.lat, LatLng.lng);
});

// Model: 點擊種類，獲取該種類的附近商家
async function storeCategory(choice,lat,lng){
    let fetchInfo = new FetchInfo();
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
    let nearByStoreResult = await fetchInfo.authAPI(url, method);
    for(let data in nearByStoreResult){
        nearbyStore(nearByStoreResult[`${data}`]);
    }
}

//Model: 獲取附近店家資訊
async function fetchAndDisplayStores(lat, lng) {
    let fetchInfo = new FetchInfo();
    const method = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'lat': lat,
            'lng': lng
        })
    };
    const nearByStoreResult = await fetchInfo.authAPI('/api/searchstore', method);
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

// View: 將商家放到頁面上
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

// View: 清除頁面上的商家
function clearStores() {
    const storesContainer = document.querySelector('.stores');
    storesContainer.innerHTML = '';
}

// View: 獲取附近選取種類的商家
document.querySelectorAll('.category').forEach(choice => {
    choice.addEventListener('click', async () => {
        let inputAddress = document.querySelector('#address').value;
        let LatLng;
        if(inputAddress){
            result = await geocodeAddress(inputAddress, googleApiKey);
            LatLng = {'lat': result.latitude, 'lng': result.longitude}
        }else{
            LatLng = await init();
        }
        clearStores();
        storeCategory(choice, LatLng.lat, LatLng.lng);
    });
});