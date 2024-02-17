const sidebar = document.querySelector('.sidebar');
const signUp = sidebar.querySelector('.signup');
const signup_nav = document.querySelector('.signup');
const logIn = sidebar.querySelector('.login');
const login_nav = document.querySelector('.login');

// Controller: 初始化，獲取使用者當前位置附近的商家
async function init(){
    let currentPosition = await getCurrentLocation();
    let nearByStoreResult = await getStoreInfo(currentPosition.lat, currentPosition.lng);
    if(nearByStoreResult){
        document.querySelectorAll('.fakeStore').forEach(store=>{
            store.style.display = "none";
        })
        for(let data of Object.values(nearByStoreResult)){
            nearbyStore(data);
        };
    }
    return {'lat': currentPosition.lat, 'lng': currentPosition.lng};
}
window.addEventListener('DOMContentLoaded',init);

// Model: 獲取搜尋紀錄
async function getHistory(){
    const cookie = new Cookie();
    let cookies = cookie.showCookie().split(";");
    let targetcookie = cookies.filter((item)=>item.includes("foodcoming-search-history"));
    if(targetcookie.length !== 0){
        let history = targetcookie[0].split("=")[1];
        return history;
    }
}
// Model: 建立Google搜尋並存入Cookie
async function getLocationInput(currentPosition){
    const cookie = new Cookie();
    const autocomplete = createAutocomplete(currentPosition);
    if(autocomplete){
        selectPosition = await searchLocation(autocomplete);
    }
    cookie.setCookie(selectPosition.address ? selectPosition.address:selectPosition.name, 7);
    let LatLng = transformToLatLng(selectPosition);
    return LatLng;
}

// View: 建立歷史搜尋選項
function historySearch(history){
    const historyFrame = document.querySelector(".historyFrame");
    historyFrame.querySelector(".location").textContent = `${history}`;
    historyFrame.style.display = "block";
}

// View: 清除歷史搜尋選項
function clearHistorySearch(){
    const historyFrame = document.querySelector(".historyFrame");
    historyFrame.style.display = "none";
}

// View: 更新index頁面的店家
async function displayStores(locationInput){
    clearStores();
    let stores = await getStoreInfo(locationInput.lat, locationInput.lng);
    for(let data in stores){
        nearbyStore(stores[`${data}`]);
    }
}

// Controller: 搜尋地址欄位
document.querySelector('#address').addEventListener('click', async()=>{
    const googleApiKey = await getGoogleApiKey();
    let history = await getHistory();
    let currentPosition;
    if(document.querySelector("#address").value){
        currentPosition = await geocodeAddress(document.querySelector("#address").value, googleApiKey);
        document.querySelector("#address").focus();
    }else{
        if(history !== undefined){
            historySearch(history);
            document.querySelector(".search-location").addEventListener("click", async()=>{
                clearHistorySearch();
                document.querySelector("#address").value = history;
                let historySearch = document.querySelector("#address").value;
                currentPosition = await geocodeAddress(historySearch, googleApiKey);
                document.querySelector("#address").focus();
            })
        }
        else{
            currentPosition = await getCurrentLocation();
            document.querySelector("#address").focus();
        }
    }
})

document.querySelector("#address").addEventListener("focus", ()=>{
    clearHistorySearch();
    document.querySelector("#address").dispatchEvent(new Event('change'));
})

document.querySelector("#address").addEventListener("input", async()=>{
    clearHistorySearch();
    if(document.querySelector("#address").value === ""){
        let history = await getHistory();
        if(history !== undefined){
            historySearch(history);
            document.querySelector(".search-location").addEventListener("click", async()=>{
                clearHistorySearch();
                document.querySelector("#address").value = history;
                let historySearch = document.querySelector("#address").value;
                currentPosition = await geocodeAddress(historySearch, googleApiKey);
            })
        }
    }
});

document.querySelector("#address").addEventListener("change", async()=>{
    let currentPosition = document.querySelector("#address").value;
    let locationInput = await getLocationInput(currentPosition);
    await displayStores(locationInput);
})

// Controller: 獲取附近選取種類的商家
document.querySelectorAll('.category').forEach(choice => {
    choice.addEventListener('click', async () => {
        const googleApiKey = await getGoogleApiKey()
        let inputAddress = document.querySelector('#address').value;
        let LatLng;
        if(inputAddress){
            result = await geocodeAddress(inputAddress, googleApiKey);
            LatLng = {'lat': result.latitude, 'lng': result.longitude}
        }else{
            LatLng = await init();
        }
        clearStores();
        let stores = await storeCategory(choice, LatLng.lat, LatLng.lng);
        for(let data in stores){
            nearbyStore(stores[`${data}`]);
        }
    });
});

// Controller: 購物車
document.querySelector('.purchase').addEventListener('click',async()=>{
    const cart = new Cart();
    const memberData = await confirmUserStatement();
    await cart.checkCart(memberData);
    document.querySelector('.close').addEventListener('click', cart.closeCart)
    document.querySelector('.totalMoney').addEventListener('click', cart.order)
})

// Controller: 註冊與登入設定
signup_nav.addEventListener('click', (event) => {
    const form = new MemberForm();
    event.stopPropagation();
    form.showUpForm(signUpForm);
    sidebar.style.display = 'none';
});

signUp.addEventListener('click', (event) => {
    const form = new MemberForm();
    event.stopPropagation();
    form.showUpForm(signUpForm);
    sidebar.style.display = 'none';
});

login_nav.addEventListener('click',(event)=>{
    const form = new MemberForm();
    event.stopPropagation();
    form.showUpForm(logInForm);
    sidebar.style.display = 'none';
    document.querySelector('.notMember').addEventListener('click',()=>{
        logInForm.style.display = "none";
        form.showUpForm(signUpForm);
    })
})

logIn.addEventListener('click',(event)=>{
    const form = new MemberForm();
    event.stopPropagation();
    form.showUpForm(logInForm);
    sidebar.style.display = 'none';
    document.querySelector('.notMember').addEventListener('click',()=>{
        logInForm.style.display = "none";
        form.showUpForm(signUpForm);
    })
})

// View: 首頁 顯示更多
document.getElementById('lines').addEventListener('click', () => {
    const cart = new Cart();
    sidebar.style.display = 'flex';
    sidebar.querySelector('.shelder').addEventListener('click',()=>{
        sidebar.style.display = 'none';
    })
    document.querySelectorAll('.purchase').forEach(purchaseBtn=>{
        purchaseBtn.addEventListener('click',async()=>{
            const memberData = await confirmUserStatement();
            sidebar.style.display = 'none';
            await cart.checkCart(memberData);
            document.querySelector('.close').addEventListener('click',()=>{
                if(document.querySelector('.cart').style.display === "block"){
                    document.querySelector('.cart').style.display = "none"
                }
            })
            document.querySelector('.totalMoney').addEventListener('click',()=>{
                window.location.href = "/order";
            })
        })
    })
})






