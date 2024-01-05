// View: 查看購物車
document.querySelector('.purchase').addEventListener('click',async()=>{
    const cart = new Cart();
    const memberData = await confirmUserStatement();
    if(Object.keys(memberData).length === 0){
        showUpForm(logInForm);
        document.querySelector('.notMember').addEventListener('click',()=>{
            logInForm.style.display = "none";
            showUpForm(signInForm);
        })
    }else{
        let cartItem = await cart.checkCart(memberData);
        document.querySelector('.close').addEventListener('click', ()=>cart.closeCart)
        document.querySelector('.totalMoney').addEventListener('click', ()=>cart.order())
        document.querySelectorAll('.deleteItemInCart').forEach(deleteItem=>{
            deleteItem.addEventListener('click', ()=>cart.deleteItemFromCart(memberData, deleteItem));
        })
    }
})
