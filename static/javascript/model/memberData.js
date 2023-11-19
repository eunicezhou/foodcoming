const signupBTN = signUpForm.querySelector('#SignUp');
const loginBTN = logInForm.querySelector('#SignIn');

signupBTN.addEventListener('click',async()=>{
    const signupAccount = signUpForm.querySelector('.SignupAccount').value;
    const signupEmail = signUpForm.querySelector('.SignupEmail').value;
    const signupPassword = signUpForm.querySelector('.SignupPassword').value;
    let signupData = JSON.stringify({
        'account':signupAccount,
        'email':signupEmail,
        'password':signupPassword
    })
    let url = "/api/auth/signup";
    let method = {
        method: "POST",
        body: signupData,
        headers: {'Content-Type': 'application/json'
        }
    }
    let store = await authAPI(url,method);
    console.log(store);
})

loginBTN.addEventListener('click',async()=>{
    const loginEmail = logInForm.querySelector('.LoginEmail').value;
    const loginPassword = logInForm.querySelector('.LoginPassword').value;
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
    let store = await authAPI(url,method);
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
})


