// Model: 根據位置獲取附近商家
async function getStoreInfo(lat, lng) {
    let fetchInfo = new FetchInfo();
    const method = {
        method: 'GET',
    };
    return await fetchInfo.api(`/api/stores?lat=${lat}&lng=${lng}`, method);
}

// Model: 點擊種類，獲取該種類的附近商家
async function storeCategory(choice, lat, lng){
    let fetchInfo = new FetchInfo();
    let catTitle = choice.querySelector('.catTitle').textContent;
    let encodedText = encodeURIComponent(catTitle);
    let url = `/api/stores?lat=${lat}&lng=${lng}&category=${encodedText}`;
    let method = {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }
    let response = await fetchInfo.api(url, method);
    return response;
}

// View: 將商家放到頁面上
function nearbyStore(nearByStoreInfo) {
    const store = document.createElement('div');
    store.className = 'store';

    const storePhoto = document.createElement('a');
    storePhoto.className = 'storePhoto';
    storePhoto.href = `/stores/${nearByStoreInfo[0]}`;

    const storeImg = document.createElement('img');
    storeImg.className = 'shopImg';
    storeImg.src = nearByStoreInfo[5];
    storePhoto.appendChild(storeImg);

    const shopDetail = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'name bold label';
    name.textContent = nearByStoreInfo[4];

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

