let itemData;
window.addEventListener('load',async()=>{
    let query = window.location.search;
    console.log(query);
    let url = "/api/item";
    let method = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            'query':query
        })
    }
    itemData = await authAPI(url, method);
    console.log(itemData);
    document.querySelector('.content_header--shop').textContent = `${itemData['shop'][0]}`;
    document.querySelector('.groceryName').textContent = `${itemData['data'][2]}`;
    document.querySelector('.groceryPrice').textContent = `\$${itemData['data'][5]}`;
    document.querySelector('.price').textContent = `${itemData['data'][5]}`;
    document.querySelector('.groceryPict').src = `${itemData['data'][4]}`;
    document.querySelector('.count').textContent = document.querySelector('.purchaseNum').value;
})
document.querySelector('.purchaseNum').addEventListener('click',()=>{
    document.querySelector('.count').textContent = document.querySelector('.purchaseNum').value;
})

document.querySelector('.purchaseBTN').addEventListener('click',async()=>{
    let groceryName = document.querySelector('.groceryName').textContent;
    let groceryCount = document.querySelector('.count').textContent;
    let groceryMoney = document.querySelector('.price').textContent;
    let itemPrice = parseInt(groceryMoney) * parseInt(groceryCount);

    document.querySelector('.cart--contain').innerHTML = "";
    let url = `/api/cart`;
    let method = {
        method: "POST",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            'email':memberEmail,
            'shopID':itemData['data'][0],
            'item': groceryName,
            'piece': groceryCount,
            'price': itemPrice
        })
    }
    let cartItem = await authAPI(url, method);
    if(cartItem['data'] === "success"){
        console.log(memberData);
        url = "/api/cart"
        method = {
            method: "PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                'id':memberData['data']['id']
            })
        }
        cartItem = await authAPI(url, method);
        for(let item of cartItem['data']){
            let itemInCart = document.createElement('div');
            itemInCart.innerHTML = `
                <span class="itemInCart label">${item[2]}</span>
                <span class="itenNumInCart label">${item[3]}份</span>
                <span class="itemPrice label" style="float:right;">\$ ${item[4]}元</span>
            `
            document.querySelector('.cart--contain').appendChild(itemInCart);
        }
        let total = 0;
        for(let money of document.querySelectorAll('.itemPrice')){
            total += parseInt(money.innerHTML.match(/\d+/)[0]);
        }
        let cartTotalMoney = document.createElement('div');
        cartTotalMoney.textContent = `總共\$${total}元，點擊結帳`;
        cartTotalMoney.className = "totalMoney";
        document.querySelector('.cart--contain').appendChild(cartTotalMoney);
        document.querySelector('.cart').style.display = "block";
        document.querySelector('.close').addEventListener('click',()=>{
            if(document.querySelector('.cart').style.display === "block"){
                document.querySelector('.cart').style.display = "none"
            }
        })
    }
    document.querySelector('.totalMoney').addEventListener('click',()=>{
        window.location.href = "/order";
    })
})


