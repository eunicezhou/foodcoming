const signUpForm = document.querySelector('.signUpForm');
const logInForm = document.querySelector('.signInForm');
const signupBTN = signUpForm.querySelector('#SignUp');
const loginBTN = logInForm.querySelector('#SignIn');

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
        let store = await fetchInfo.authAPI(url,method);
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
        let store = await fetchInfo.authAPI(url,method);
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


