const signUpForm = document.querySelector('.signUpForm');
const logInForm = document.querySelector('.signInForm');
const signupBTN = signUpForm.querySelector('#SignUp');
const loginBTN = logInForm.querySelector('#SignIn');

// Model: 取得使用者資訊
async function confirmUserStatement(){
    let token = localStorage.getItem('token');
    const fetchInfo = new FetchInfo();
    const form = new MemberForm();
    let memberData = {};
    try{
        if(token){
            let url = "/api/auth/login";
            let method = {method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    }}
            let response = await fetchInfo.api(url,method);
            if(response.error){
                form.showUpForm(logInForm);
            }
            else{
                memberData['email'] = response.data.email;
                memberData['id'] = response.data.id;
                memberData['name'] = response.data.name;
                memberData['phone'] = response.data.phone;
                memberData['merchant_id'] = response.data.merchant_id;
                memberData['delever_id'] = response.data.delever_id;
                return memberData;
            }
        }else{
            form.showUpForm(logInForm);
        }       
    }catch(error){
        form.showUpForm(logInForm);
    }  
}

class MemberForm{
    // View: 登出系統
    signout(){
        localStorage.removeItem("token");
        window.location.reload();
    }

    // View: 顯示表單
    showUpForm(form){
        form.style.display = 'flex';
        form.querySelector('.shelder').addEventListener('click',()=>{
            form.style.display = 'none';
        })
    }

    // View: 關閉表單
    closeForm(form){
        form.style.display = 'none';
    }

    // View: 警告未登入，跳出登入表單
    async confirmLogIn(memberData){
        if(memberData === undefined){
            this.showUpForm(document.querySelector('.signInForm'));
            document.querySelector('.notMember').addEventListener('click',()=>{
                this.closeForm(document.querySelector('.signInForm'))
                this.showUpForm(document.querySelector('.signUpForm'));
            })
        }else{
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
                document.querySelector("#bossname").value = `${memberData.name}`;
                document.querySelector("#bossemail").value = `${memberData.email}`;
                document.querySelector("#bossphone").value = `${memberData.phone}`;
            }
            if(document.querySelector('.signout')){
                document.querySelector('.signout').addEventListener('click',this.signout);
            }
            if(document.querySelector('.sidebar')){
                document.querySelector('.sidebar').querySelector('.signout').addEventListener('click',this.signout)
            }
        }
    }
}

// View: 跳出sidebar
function showUpSidebar(memberData){
    if(memberData['email']){
        document.querySelector('.sidebar--top').innerHTML=`<div class="fakeBTN signout">登出系統</div>`
    }
    if(memberData['merchant_id'] !== null){
        document.querySelector('.shopsfellow').textContent = "您的店家頁面";
        document.querySelector('.shopsfellow').href = `/stores/${parseInt(memberData['merchant_id'])}`;
    }else{
        document.querySelector('.shopsfellow').href="/merchantSetup"
    }
    if(memberData['delever_id'] !== null){
        document.querySelector('.deliverfellow').textContent = "外送員專區 : 您的鄰近訂單";
        document.querySelector('.deliverfellow').href = `/delivers`;
    }else{
        document.querySelector('.deliverfellow').href="/deliverSetup"
    }
}
