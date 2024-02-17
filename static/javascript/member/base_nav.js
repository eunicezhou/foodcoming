// Controller: 購物車
document.querySelector('.purchase').addEventListener('click',async()=>{
    const cart = new Cart();
    const memberData = await confirmUserStatement();
    await cart.checkCart(memberData);
    document.querySelector('.close').addEventListener('click', cart.closeCart)
    document.querySelector('.totalMoney').addEventListener('click', cart.order)
})
