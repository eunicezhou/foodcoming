const sidebar = document.querySelector('.sidebar');
const signUp = sidebar.querySelector('.signup');
const signup_nav = document.querySelector('.signup');
const logIn = sidebar.querySelector('.login');
const login_nav = document.querySelector('.login');
const cart = new Cart();

// View: 首頁 顯示更多
document.getElementById('lines').addEventListener('click', () => {
    sidebar.style.display = 'flex';
    sidebar.querySelector('.shelder').addEventListener('click',()=>{
        sidebar.style.display = 'none';
    })
    document.querySelectorAll('.purchase').forEach(purchaseBtn=>{
        purchaseBtn.addEventListener('click',async()=>{
            sidebar.style.display = 'none';
            await checkCart();
            document.querySelector('.close').addEventListener('click',()=>{
                if(document.querySelector('.cart').style.display === "block"){
                    document.querySelector('.cart').style.display = "none"
                }
            })
            document.querySelector('.totalMoney').addEventListener('click',()=>{
                window.location.href = "/order";
            })
        })
    })
})

// View: 登入登出設定
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

// View: 購物車
document.querySelector('.purchase').addEventListener('click',async()=>{
    const memberData = await confirmUserStatement();
    if(Object.keys(memberData).length === 0){
        showUpForm(logInForm);
    }else{
        await cart.checkCart(memberData);
        document.querySelector('.close').addEventListener('click', cart.closeCart)
        document.querySelector('.totalMoney').addEventListener('click', cart.order)
    }
})

