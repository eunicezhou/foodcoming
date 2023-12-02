const fileBTN = document.querySelector('.submitBTN');
const shopCategory = document.querySelector('#shopcategory');

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
let storeLat;
let storeLng;
fileBTN.addEventListener('click',async()=>{
    let dishmenu = new Map();
    let formData = new FormData();
    let dishCat;
    formData.append('memberEmail', memberEmail);
    formData.append('bossName', document.querySelector('#bossname').value);
    formData.append('bossEmail', document.querySelector('#bossemail').value);
    formData.append('bossPhone', document.querySelector('#bossphone').value);
    formData.append('shopName', document.querySelector('#shopname').value);
    formData.append('shopPhoto', Object.values(shopImg_file)[0]);
    formData.append('shopCategoryValue', shopCategory.innerHTML);
    formData.append('address', document.querySelector('#address').value);
    formData.append('lat', storeLat);
    formData.append('lng', storeLng);
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
        console.log(photo);
        formData.append(`photo${id}`,photo);
        id += 1;
    }
    let sendReply = await merchantSetUp(formData);
    if(sendReply.token){
        localStorage.setItem('token',sendReply.token);
        let method = {method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }}
        memberData = await authAPI("/api/auth/login",method);
        id = parseInt(memberData['merchant_id']);
        let url = `/store/${id}`;
        window.location.href = url;
    }
})
//建立地圖資訊
initMap();
document.getElementById('address').addEventListener('click',async()=>{
    let locateStore = await searchLocation();
    storeLat = locateStore.location.lat;
    storeLng = locateStore.location.lng;
})

// 將資料送到後端
async function merchantSetUp(formData){
    let store = await fetch("/api/merchant",
        {method: "POST",
        body: formData,
        }
    )
    let result = await store.json();
    return result;
}