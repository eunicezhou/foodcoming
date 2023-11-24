window.addEventListener('load',async()=>{
    let method = {
        method: "PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'id':memberData.data.id
        })
    }
    let cartInfo = await authAPI("/api/order", method);
    console.log(cartInfo);
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

        let shopname = document.createElement('div');
        shopname.className = "shopname subtitle";
        shopname.textContent = `${info[1]}`

        document.querySelector('.order--content').appendChild(itemPict);
        document.querySelector('.order--content').appendChild(itemname);
        document.querySelector('.order--content').appendChild(count);
        document.querySelector('.order--content').appendChild(price);
        document.querySelector('.order--content').appendChild(shopname);
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
document.querySelector('#fakeButton').addEventListener('click', () => {
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
        console.log(whetherPay)
        // let payment = whetherPay.data.payment.status;
        // let orderID = whetherPay.data.number;
        // if(payment===0){
        //     window.location.href=`/thankyou?number=${orderID}`
        // }else{
        //     window.alert("付款未成功，請重新輸入資訊")
        // }
    })
})

async function pay(prime){
    try{
        console.log(memberData);
        let method = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "prime":prime,
                "order": {
                    "price": document.querySelector('#total'),
                    "contact": {
                    "id":memberData['data']['id'],
                    "name": memberData['data']['name'], 
                    "email": memberData['data']['email'], 
                    }
                }
            })
        }
        let order = await authAPI('/api/orders', method)
        return order;
    }catch {
        console.log("error");
    }
}
