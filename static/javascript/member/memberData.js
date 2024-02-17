// Controller: 畫面載入時的身分驗證及頁面顯示
window.addEventListener('DOMContentLoaded', async()=>{
    const memberData = await confirmUserStatement();
    const form = new MemberForm();
    if(memberData.email){
        if(document.querySelector('.sidebar--top')){showUpSidebar(memberData);}
        if(document.querySelector('.member')){document.querySelector('.member').innerHTML=`<span class="signout title">登出系統</span>`}
        if(document.querySelector('.storeNearby')){
            document.querySelector('.storeNearby').innerHTML = `
            <h3 class=".memberName">${memberData.name} 您好，</h3>
            <h3>推薦您附近的熱門餐廳</h3>`;
        }
        if(document.querySelector('.startStore')){
            document.querySelector('.startStore').innerHTML = `
            <h3 class=".memberName">${memberData.name} 您好，</h3>
            <h3>開始建立您的餐廳</h3>`;
        }
        if(document.querySelector('.signout')){
            document.querySelector('.signout').addEventListener('click',form.signout);
        }
        if(document.querySelector('.sidebar')){
            document.querySelector('.sidebar').querySelector('.signout').addEventListener('click',form.signout)
        }
    }
})

signupBTN.addEventListener('click',async()=>{
    let fetchInfo = new FetchInfo();
    const signupAccount = signUpForm.querySelector('.SignupAccount').value;
    const signupEmail = signUpForm.querySelector('.SignupEmail').value;
    const signupPassword = signUpForm.querySelector('.SignupPassword').value;
    const signupPhone = signUpForm.querySelector('.SignupPhone').value;
    if(signupAccount === ""){
        signUpForm.querySelector('.alert').textContent = "請輸入帳號"
    }else if(signupEmail === ""){
        signUpForm.querySelector('.alert').textContent = "請輸入信箱"
    }else if(signupPassword === ""){
        signUpForm.querySelector('.alert').textContent = "請輸入密碼"
    }else if(signupPhone === ""){
        signUpForm.querySelector('.alert').textContent = "請輸入連絡電話"
    }else{
        let signupData = JSON.stringify({
            'account':signupAccount,
            'email':signupEmail,
            'password':signupPassword,
            'phone':signupPhone
        })
        let url = "/api/auth/signup";
        let method = {
            method: "POST",
            body: signupData,
            headers: {'Content-Type': 'application/json'
            }
        }
        let store = await fetchInfo.api(url,method);
        if(store['error']){
            signUpForm.querySelector('.alert').textContent = `${store['message']}`
        }else{
            signUpForm.querySelector('.alert').style.color = "green"
            signUpForm.querySelector('.alert').textContent = "註冊成功"
            setTimeout(()=>{
                signUpForm.style.display = "none";
                logInForm.style.display = "block";
            },500)
        }
    }
})

loginBTN.addEventListener('click',async()=>{
    let fetchInfo = new FetchInfo();
    const loginEmail = logInForm.querySelector('.LoginEmail').value;
    const loginPassword = logInForm.querySelector('.LoginPassword').value;
    if(loginEmail === ""){
        logInForm.querySelector('.alert').textContent = "請輸入信箱";
    }else if(loginPassword === ""){
        logInForm.querySelector('.alert').textContent = "請輸入密碼";
    }else{
        let loginData = JSON.stringify({
            'email':loginEmail,
            'password':loginPassword
        })
        let url = "/api/auth/login"
        let method = {
            method:"PUT",
                    body:loginData,
                    headers:{"Content-Type":"application/json"}
            }
        let store = await fetchInfo.api(url,method);
        if(store['error']){
            logInForm.querySelector('.alert').textContent = store['message'];
        }else{
            logInForm.querySelector('.alert').textContent = "登入成功";
            logInForm.querySelector('.alert').style.color = "green";
            let token = store.token;
            localStorage.setItem('token', token);
            setTimeout(()=>{
                window.location.reload();
            },1000)
        }
    }
})


