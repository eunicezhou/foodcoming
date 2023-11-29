let memberEmail;
let memberData = {};
async function confirmMember(){
    let token = localStorage.getItem('token');
    if(token){
        let url = "/api/auth/login";
        let method = {method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }}
        let memberData = await authAPI(url,method);
        memberData['email'] = memberData.data.email;
        memberData['id'] = memberData.data.id;
        memberData['name'] = memberData.data.name;
        memberEmail = memberData.data.email;
    }
    return memberData
}

window.addEventListener('DOMContentLoaded', async()=>{
    let token = localStorage.getItem('token');
    if(token){
        let url = "/api/auth/login";
        let method = {method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }}
        memberData = await authAPI(url,method);
        memberData['email'] = memberData.data.email;
        memberData['id'] = memberData.data.id;
        memberData['name'] = memberData.data.name;
        memberEmail = memberData.data.email;
        if(document.querySelector('.sidebar--top')){
            document.querySelector('.sidebar--top').innerHTML=`
            <div class="fakeBTN signout">登出系統</div>
            `
        }
        if(document.querySelector('.member')){
            document.querySelector('.member').innerHTML=`
            <span class="signout title">登出系統</span>
            `
        }
        if(document.querySelector('.storeNearby')){
            document.querySelector('.storeNearby').innerHTML = `
            <h3 class=".memberName">${memberData.data.name} 您好，</h3>
            <h3>推薦您附近的熱門餐廳</h3>`;
        }
        if(document.querySelector('.startStore')){
            document.querySelector('.startStore').innerHTML = `
            <h3 class=".memberName">${memberData.data.name} 您好，</h3>
            <h3>開始建立您的餐廳</h3>`;
        }
        if(document.querySelector('.signout')){
            document.querySelector('.signout').addEventListener('click',signout);
        }
        if(document.querySelector('.sidebar')){
            sidebar.querySelector('.signout').addEventListener('click',signout)
        }
    }
})

function signout(){
    localStorage.removeItem("token");
    window.location.reload();
}
