document.querySelector('#name').addEventListener('click',confirmLogIn)
document.querySelector('.member').addEventListener('click', confirmLogIn)

document.querySelector('.submitBTN').addEventListener('click',async()=>{
    const fetchInfo = new FetchInfo();
    const formData = new FormData();
    if(document.querySelector('#email').value === ""){
        document.querySelector('.alert').textContent = `請輸入信箱`;
    }else if(document.querySelector('#name').value === ""){
        document.querySelector('.alert').textContent = `請輸入姓名`;
    }else if(document.querySelector('#phone').value === ""){
        document.querySelector('.alert').textContent = `請輸入手機`;
    }else if(file['shot'] === undefined){
        document.querySelector('.alert').textContent = `請上傳大頭照`;
    }else if(file['identity_front'] === undefined || file['identity_back'] === undefined){
        document.querySelector('.alert').textContent = `請上傳身分證`;
    }else if(file['licence'] === undefined){
        document.querySelector('.alert').textContent = `請上傳駕照`;
    }else if(file['travel_licence'] === undefined){
        document.querySelector('.alert').textContent = `請上傳行照`;
    }else{
        let memberData = await confirmUserStatement();
        formData.append('memberEmail', memberData['email']);
        formData.append('name', document.querySelector('#email').value);
        formData.append('email', document.querySelector('#name').value);
        formData.append('phone', document.querySelector('#phone').value);
    
        let url = "/api/delivers";
        let method = {
            method: "POST",
            body: formData
        }
        let result = await fetchInfo.api(url, method);
        if(result['error']){
            document.querySelector('.alert').textContent = `${result['message']}`;
        }else{
            localStorage.setItem('token',result.token)
            document.querySelector('.alert').style.color = "green";
            document.querySelector('.alert').textContent = "您已成功成為外送夥伴";
            setTimeout(()=>{
                window.location.href = "/";
            },500)
        }
    }
})