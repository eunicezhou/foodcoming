function refreshinfo(name, refreshName){
    document.querySelector(name).style.display = 'none';
    document.querySelector(refreshName).style.display = 'flex';
}
document.querySelector('.name').addEventListener('click',()=>refreshinfo('.name', '.refreshName'));
document.querySelector('.phone').addEventListener('click',()=>refreshinfo('.phone', '.refreshPhone'));

let selectPosition;
window.addEventListener('load',async()=>{
    const memberData = await confirmUserStatement();
    let currentPosition = await getCurrentLocation();
    document.querySelector('.name').innerHTML = `${memberData['name']}`;
    document.querySelector('.phone').innerHTML = `${memberData['phone']}`;
    document.querySelector('#address').addEventListener('click',async()=>{
        const autocomplete = createAutocomplete(currentPosition);
        if(autocomplete){
            selectPosition = await searchLocation(autocomplete);
            console.log(selectPosition);
        }else{
            location.reload();
        }
    })
    let method = {
        method: "PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'id':memberData.id
        })
    }
    const fetchInfo = new FetchInfo();
    let cartInfo = await fetchInfo.authAPI("/api/order", method);
    if(cartInfo){
        document.querySelectorAll('.fakeItem').forEach(item=>{
            item.style.display = "none";
        })
        let total = 0;
    for(let info of cartInfo['data']){
        let itemPict = document.createElement('div');
        itemPict.className = "itemPict label";
        let actualPict = document.createElement('img');
        actualPict.src = `${info[5]}`;
        itemPict.appendChild(actualPict);

        let itemname = document.createElement('div');
        itemname.className = "itemname subtitle";
        itemname.textContent = `${info[2]}`;

        let count = document.createElement('div');
        count.className = "count subtitle";
        count.textContent = `${info[3]}份`;

        let price = document.createElement('div');
        price.className = "price subtitle";
        price.textContent = `\$${info[4]}元`;

        total += parseInt(info[4]);

        let shopname = document.createElement('div');
        shopname.className = "shopname subtitle";
        shopname.textContent = `${info[1]}`

        document.querySelector('.order--content').appendChild(itemPict);
        document.querySelector('.order--content').appendChild(itemname);
        document.querySelector('.order--content').appendChild(count);
        document.querySelector('.order--content').appendChild(price);
        document.querySelector('.order--content').appendChild(shopname);
    }
    document.querySelector('#total').textContent = `${total}`;
    }
})

//設定銀行輸入資訊欄位
const iframeFields= {
    number: {
        element: '#card-number',    
        placeholder: '**** **** **** ****'
    },
    expirationDate: {
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM/YY'
    },
    ccv: {
        element: '#card-ccv',
        placeholder: 'CCV'
    }
}

TPDirect.card.setup({
    fields: iframeFields,
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
        beginIndex: 3,
        endIndex: 15
    }
})

//獲取prime
document.querySelector('#fakeButton').addEventListener('click', ()=>{
    document.querySelector('.waiting').style.display = "flex";
    console.log(selectPosition);

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    console.log(tappayStatus);
    // 確認是否可以獲得prime
    if (tappayStatus.canGetPrime === false) {
        console.log('無法獲得prime')
        return
    }

    // Get prime
    TPDirect.card.getPrime(async(result)=> { 
        const prime = result.card.prime;
        let whetherPay = await pay(prime);
        let query = "";
        for(let key in whetherPay){
            query += `${key}=${whetherPay[key]}&`;
            
        }
        console.log(query.slice(0,-1));

        window.location.href = `/paySuccess?${query.slice(0,-1)}`
    })
})

async function pay(prime){
    try{
        const memberData = await confirmUserStatement();
        const fetchInfo = new FetchInfo();
        let name;
        if(document.querySelector('.name').style.display !== "none"){
            name = document.querySelector('.name').textContent;
        }else{
            name = document.querySelector('.refreshName').value;
        }
        let phone;
        if(document.querySelector('.phone').style.display !== "none"){
            phone = document.querySelector('.phone').textContent;
        }else{
            phone = document.querySelector('.refreshPhone').value;
        }
        let method
        if(selectPosition.location){
            method = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "prime":prime,
                    "id":memberData['id'],
                    "name":name,
                    "email":memberData['email'],
                    "phone":phone,
                    "address":selectPosition.address,
                    "lat":selectPosition.location.lat,
                    "lng":selectPosition.location.lng,
                    'pay':document.querySelector('#total').textContent
                })
            }
        }else{
            method = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "prime":prime,
                    "id":memberData['id'],
                    "name":name,
                    "email":memberData['email'],
                    "phone":phone,
                    "address":document.querySelector('#address').value,
                    "lat":selectPosition.latitude,
                    "lng":selectPosition.longitude,
                    'pay':document.querySelector('#total').textContent
                })
            } 
        }
        let order = await fetchInfo.authAPI("/api/order", method);
        return order;
    }catch(error){
        console.log(error);
    }
}
