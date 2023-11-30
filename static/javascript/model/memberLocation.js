let nearByStoreResult;
async function init(){
    let currentPosition = await initMap();
    let url = "/api/searchstore";
    let method = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'lat': currentPosition.lat,
            'lng': currentPosition.lng
        })
    }
    nearByStoreResult = await authAPI(url, method);
    for(let data in nearByStoreResult){
        nearbyStore(nearByStoreResult[`${data}`]);
    }
    document.querySelectorAll('.category').forEach(choice=>{
        choice.addEventListener('click',async()=>{
            let catTitle = choice.querySelector('.catTitle').textContent;
            console.log(catTitle);
            let url = "/api/searchstore";
            let method = {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'category':catTitle,
                    'lat': currentPosition.lat,
                    'lng': currentPosition.lng
                })
            }
            for(store of document.querySelectorAll('.store')){
                document.querySelector('.stores').removeChild(store);
            }
            nearByStoreResult = await authAPI(url, method);
            console.log(nearByStoreResult);
            for(let data in nearByStoreResult){
                nearbyStore(nearByStoreResult[`${data}`]);
            }
        })
    })
}
window.addEventListener('DOMContentLoaded',init);
document.querySelector('#address').addEventListener('click',async()=>{
    let selectPosition = await searchLocation(currentPosition);
    let match = selectPosition.address.match(/\d+(.+)/);
    let country = match[1].slice(0,3);
    let url = "/api/searchstore";
    let method = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'country': country,
            'lat': selectPosition.location.lat,
            'lng': selectPosition.location.lng
        })
    }
    for(store of document.querySelectorAll('.store')){
        document.querySelector('.stores').removeChild(store);
    }
    nearByStoreResult = await authAPI(url, method);
    for(let data in nearByStoreResult){
        nearbyStore(nearByStoreResult[`${data}`]);
    }
})

function nearbyStore(nearByStoreResult){
    let store = document.createElement('div');
    store.className = "store";

    let storePhoto = document.createElement('a');
    storePhoto.className = "storePhoto";
    storePhoto.href = `/store/${nearByStoreResult[0]}`
    let storeImg = document.createElement('img');
    storeImg.className = "shopImg";
    storeImg.src = `${nearByStoreResult[5]}`
    storePhoto.appendChild(storeImg);

    let shopDetail = document.createElement('div');
    let name = document.createElement('div');
    name.className = "name bold label";
    name.textContent = `${nearByStoreResult[4]}`
    let deleverTime = document.createElement('div');
    deleverTime.className = "準備時間";
    shopDetail.appendChild(name);
    shopDetail.appendChild(deleverTime);

    store.appendChild(storePhoto);
    store.appendChild(shopDetail);

    document.querySelector('.stores').appendChild(store);
}

