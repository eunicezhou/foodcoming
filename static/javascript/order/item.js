// View: 生成產品頁面store/
window.addEventListener('load',async()=>{
    const cart = new Cart();
    let itemData = await cart.getItemData();
    document.querySelector('.content_header--shop').textContent = `${itemData['shop'][0]}`;
    document.querySelector('.groceryName').textContent = `${itemData['data'][2]}`;
    document.querySelector('.groceryPrice').textContent = `\$${itemData['data'][5]}`;
    document.querySelector('.price').textContent = `${itemData['data'][5]}`;
    document.querySelector('.groceryPict').src = `${itemData['data'][4]}`;
    document.querySelector('.count').textContent = document.querySelector('.purchaseNum').value;
})

// View: 選取產品數量
document.querySelector('.purchaseNum').addEventListener('click',()=>{
    if(document.querySelector('.purchaseNum').value < 1){
        document.querySelector('.alert').textContent = "請勿選取1以下的數量";
    }else{
        document.querySelector('.count').textContent = document.querySelector('.purchaseNum').value;
    }
})

// Controller: 點擊購買
document.querySelector('.purchaseBTN').addEventListener('click',async()=>{
    const memberData = await confirmUserStatement();
    const cart = new Cart();
    if(document.querySelector('.purchaseNum').value < 1){
        return;
    }

    let itemData = await cart.getItemData();

    let cartItem = await cart.addCartItem(memberData, itemData);
    if(cartItem['data'] === "success"){
        let itemInCart = await cart.getCartItem(memberData);
        cart.createCartList(itemInCart);
        document.querySelector('.close').addEventListener('click', cart.closeCart);
        document.querySelector('.totalMoney').addEventListener('click', cart.order);
        document.querySelectorAll('.deleteItemInCart').forEach(deleteItem=>{
            deleteItem.addEventListener('click', ()=>cart.deleteItemFromCart(memberData, deleteItem));
        })
    }
})
document.querySelector('.purchase').addEventListener('click',async()=>{
    const cart = new Cart();
    const memberData = await confirmUserStatement();
    await cart.checkCart(memberData);
    document.querySelector('.close').addEventListener('click', cart.closeCart)
    document.querySelector('.totalMoney').addEventListener('click', cart.order)
})

