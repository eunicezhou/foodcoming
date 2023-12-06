const lines = document.getElementById('lines');
const sidebar = document.querySelector('.sidebar');
const signUp = sidebar.querySelector('.signup');
const signup_nav = document.querySelector('.signup');
const logIn = sidebar.querySelector('.login');
const login_nav = document.querySelector('.login');

//首頁 顯示更多
lines.addEventListener('click', () => {
    sidebar.style.display = 'flex';
    sidebar.querySelector('.shelder').addEventListener('click',()=>{
        sidebar.style.display = 'none';
    })
})

//登入登出設定
signup_nav.addEventListener('click', (event) => {
    event.stopPropagation();
    showUpForm(signUpForm);
    sidebar.style.display = 'none';
});

signUp.addEventListener('click', (event) => {
    event.stopPropagation();
    showUpForm(signUpForm);
    sidebar.style.display = 'none';
});

login_nav.addEventListener('click',(event)=>{
    event.stopPropagation();
    showUpForm(logInForm);
    sidebar.style.display = 'none';
    document.querySelector('.notMember').addEventListener('click',()=>{
        logInForm.style.display = "none";
        showUpForm(signUpForm);
    })
})

logIn.addEventListener('click',(event)=>{
    event.stopPropagation();
    showUpForm(logInForm);
    sidebar.style.display = 'none';
    document.querySelector('.notMember').addEventListener('click',()=>{
        logInForm.style.display = "none";
        showUpForm(signUpForm);
    })
})

function showUpForm(form){
    form.style.display = 'flex';
    form.querySelector('.shelder').addEventListener('click',()=>{
        form.style.display = 'none';
    })
}

//購物車
document.querySelector('.purchase').addEventListener('click',async()=>{
    // 不能直接使用 === 來比較一個物件和一個空物件 {} 是否相等，
    // 因為這將比較它們的引用而不是它們的內容。即使兩個物件具有相同的內容，
    // 它們也被認為是不相等的，因為它們是不同的實例。
    // 如果你想檢查 memberData 是否為空物件，你可以使用 Object.keys() 
    // 來檢查物件是否有任何屬性
    if(Object.keys(memberData).length === 0){
        showUpForm(logInForm);
    }else{
        let url = `/api/cart`;
        let method = {
            method: "PUT",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'id':memberData['data']['id']
            })
        }
        let cartItem = await authAPI(url, method);
        console.log(cartItem);
        if(Object.values(cartItem.data).length === 0){
            document.querySelector('.cart').style.display = "block";
        }else{
            document.querySelector('.cart--contain').innerHTML = "";
            for(let item of cartItem['data']){
                let itemInCart = document.createElement('div');
                itemInCart.className = "itemsInCart"
                itemInCart.innerHTML = `
                <div class="itemInCart" style="margin:0;">
                    <span class="itemName label">${item[2]}</span>
                    <span class="itemNumInCart label">${item[3]}份</span>
                </div>
                <div class="itemPrice label" style="margin:0;">\$ ${item[4]}元
                    <img src="../static/image/trash.png" style="width:30px" class="deleteItemInCart">
                </div>
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
            document.querySelectorAll('.deleteItemInCart').forEach(deleteItem=>{
                deleteItem.addEventListener('click',async()=>{
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
                            'member_id':memberData['data']['id'],
                            'item':itemName,
                            'piece':piece.replace(/\D/g, '')
                        })
                    }
                    let deleteResult = await authAPI("/api/cart", method);
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
                })
            })
        }
        document.querySelector('.close').addEventListener('click',()=>{
            if(document.querySelector('.cart').style.display === "block"){
                document.querySelector('.cart').style.display = "none"
            }
        })
    }
})