class FetchInfo{
    async authAPI(url,method){
        let authData = await fetch(url, method)
        let response = await authData.json();
        return response;
    }

    async merchantSetUp(url, method){
        let store = await fetch(url, method)
        let result = await store.json();
        return result;
    }
}

class Cart{
    closeCart(){
        if(document.querySelector('.cart').style.display === "block"){
            document.querySelector('.cart').style.display = "none"
        }
    }
    order(){
        window.location.href = "/order";
    }
    // Model: 獲取使用者購物車資訊
    async getCartItem(memberData){
        url = "/api/cart"
        method = {
            method: "PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                'id':memberData['id']
            })
        }
        const fetchInfo = new FetchInfo();
        let cartItem = await fetchInfo.authAPI(url, method);
        return cartItem;
    } 
    // View: 生成購物車名單
    async createCartList(itemInCart){
        for(let item of itemInCart['data']){
            let itemsInCart = document.createElement('div');
            itemsInCart.className = "itemsInCart"
            itemsInCart.innerHTML = `
                <div class="itemInCart" style="margin:0;">
                    <span class="itemName label">${item[2]}</span>
                    <span class="itemNumInCart label">${item[3]}份</span>
                </div>
                <div class="itemPrice label" style="margin:0;">\$ ${item[4]}元
                    <img src="../static/image/trash.png" style="width:30px" class="deleteItemInCart">
                </div>
            `
            document.querySelector('.cart--contain').appendChild(itemsInCart);
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
    }
    // View: 刪除購物車物件
    async deleteItemFromCart(memberData, deleteItem){
        deleteItem.parentElement.parentElement.style.display="none";
        let itemName = deleteItem.parentElement.parentElement.querySelector('.itemName').innerHTML;
        let piece = deleteItem.parentElement.parentElement.querySelector('.itemNumInCart').innerHTML;
        let itemPrice = deleteItem.parentElement.parentElement.querySelector('.itemPrice').innerHTML;
        let price = itemPrice.match(/\d+/)[0];
        console.log(price);
        let method = {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'member_id':memberData['id'],
                'item':itemName,
                'piece':piece.replace(/\D/g, '')
            })
        }
        const fetchInfo = new FetchInfo();
        let deleteResult = await fetchInfo.authAPI("/api/cart", method);
        let totalMoney = document.querySelector('.totalMoney').innerHTML;
        let total = totalMoney.match(/\d+/)[0];
        console.log(total);
        new_total = parseInt(total) - parseInt(price);
        if(new_total === 0){
            let cartImg = document.createElement('img');
            cartImg.src = "../static/image/shopping cart.png";
            let label = document.createElement("div");
            label.className = "label";
            label.textContent = "目前購物車是空的";
            document.querySelector('.cart--contain').innerHTML = "";
            document.querySelector('.cart--contain').appendChild(cartImg);
            document.querySelector('.cart--contain').appendChild(label);
        }else{
            document.querySelector('.totalMoney').textContent = `總共\$${new_total}元，點擊結帳`;
        }
    }
    // Model: 獲取訂購物品資訊
    async getItemData(){
        let query = window.location.search;
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
        const fetchInfo = new FetchInfo();
        let itemData = await fetchInfo.authAPI(url, method);
        return itemData;
    }

    // Model: 加入購物車
    async addCartItem(memberData, itemData){
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
                'email':memberData['email'],
                'shopID':itemData['data'][0],
                'item': groceryName,
                'piece': groceryCount,
                'price': itemPrice
            })
        }
        const fetchInfo = new FetchInfo();
        let cartItem = await fetchInfo.authAPI(url, method);
        return cartItem;
    }
    // View: 查看購物車
    async checkCart(memberData){
        const cart = new Cart();
        let cartItem = await cart.getCartItem(memberData);
        if(Object.values(cartItem.data).length === 0){
            document.querySelector('.cart').style.display = "block";
        }else{
            document.querySelector('.cart--contain').innerHTML = "";
            await cart.createCartList(cartItem);
            document.querySelectorAll('.deleteItemInCart').forEach(deleteItem=>{
                deleteItem.addEventListener('click', deleteCart)  
            })
        }
    }
}