const shopCategory = document.querySelector('#shopcategory');

// View: 地圖將顯示位置換到輸入地點
document.getElementById('address').addEventListener('click',inputAddress())

// View: 點擊種類，跳出種類選項
shopCategory.addEventListener('click',()=>{
    const categories = document.querySelector('.categoryChoose');
    categories.style = `
    display:flex;flex-direction:column;position:sticky;
    background-color:var(--third-color);width:260px;
    align-items:center;margin:20px 8px 10px;border-radius:5px;
    box-sizing:border-box;padding:5px;box-shadow:3px 3px 10px rgba(0,0,0,0.3);`
    categories.addEventListener('click',(event)=>{
        shopCategory.innerHTML = event.target.innerHTML;
        shopCategory.style = `color:var(--primary-color);`
        categories.style = `display:none;`
    })
})

// Model: 提交表單的資料
async function storeSettingUpInfo(memberData){
    console.log(memberData);
    const formData = new FormData();
    formData.append('memberEmail', memberData['email']);
    formData.append('bossName', document.querySelector('#bossname').value);
    formData.append('bossEmail', document.querySelector('#bossemail').value);
    formData.append('bossPhone', document.querySelector('#bossphone').value);
    formData.append('shopName', document.querySelector('#shopname').value);
    formData.append('shopPhoto', Object.values(shopImg_file)[0]);
    formData.append('shopCategoryValue', shopCategory.innerHTML);
    formData.append('address', document.querySelector('#address').value);

    const googleApiKey = await getGoogleApiKey();
    let LatLng = await geocodeAddress(document.querySelector('#address').value, googleApiKey);
    formData.append('lat', LatLng['latitude']);
    formData.append('lng', LatLng['longitude']);

    formData.append('startTime', document.querySelector('#startTime').value);
    formData.append('endTime', document.querySelector('#endTime').value);

    let holiday = document.getElementsByName('holiday');
    let selectedDays = [];
    for (let i = 0; i < holiday.length; i++) {
        if (holiday[i].checked) {
            selectedDays.push(holiday[i].value);
        }
    }
    formData.append('holiday', selectedDays);

    const allElements = document.querySelectorAll('.newCat, .newDish');
    let dishmenu = new Map();
    let dishCat;
    for(element of allElements){
        if(element.className === 'newCat'){
            dishCat = element.querySelector('.realInput').value;
        }else{
            let dish = {};
            dish[`${element.querySelector('.dishItem').value}`] = JSON.stringify({
                describe : element.querySelector('.dishDescribe').value,
                price : element.querySelector('.dishPrice').value,
                start : element.querySelector('.dishStartTime').value,
                end : element.querySelector('.dishEndTime').value,
            });
            if(dishmenu.has(dishCat)){
                dishmenu.get(dishCat).push(dish);
            }else{
                dishmenu.set(dishCat , [dish]);
            }
        }
    }
    let index = 0;
    for (let [key, value] of dishmenu) {
        formData.append(`dishDetail${index}`,JSON.stringify({ [key]: value }));
        index += 1;
    }
    let id = 0;
    for(let photo of Object.values(photoFiles)){ 
        formData.append(`photo${id}`, photo);
        id += 1;
    }

    // 將formData中的資料一一印出
    // for (let pair of formData.entries()) {console.log(pair[0]+ ', ' + pair[1]);} 

    return formData;
}

// Controller: 提交表單
document.querySelector('.submitBTN').addEventListener('click',async()=>{
    document.querySelector(".waiting").style.display = "block";
    window.scrollTo({
        top: 0,
        behavior: "smooth" // 可以讓滾動行為平滑
    });
    let count = 4;
    let per = 16;
    let loading = setInterval(()=>{
        if(count == 100 && per == 400){
            document.querySelector(".percent").style.display = "none";
            document.querySelector(".text-blink").style.display = "block";
            clearInterval(loading);
        }else{
            per = per + 4;
            count = count + 1;
            document.querySelector(".progress").style.width = per + "px";
            document.querySelector(".percent").textContent = count + "%";
        }
    }, 100)
    
    let memberData = await confirmUserStatement();
    let formData = await storeSettingUpInfo(memberData);
    const fetchInfo = new FetchInfo();
    let method = {
        method: "POST",
        body: formData
    }
    let sendReply = await fetchInfo.api('/api/merchants', method);
    console.log(sendReply);
    if(sendReply.token){
        localStorage.setItem('token',sendReply.token);
        let token = localStorage.getItem('token');
        method = {method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }}
        memberData = await fetchInfo.api("/api/auth/login",method);
        id = parseInt(memberData['merchant_id']);
        window.location.href = `/stores/${id}`;
    }
})
