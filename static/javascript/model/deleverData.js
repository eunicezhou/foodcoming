document.querySelector('.submitBTN').addEventListener('click',async()=>{
    let formData = new FormData();
    formData.append('name', document.querySelector('#email').value);
    formData.append('email', document.querySelector('#name').value);
    formData.append('phone', document.querySelector('#phone').value);
    formData.append('shot', file['shot']);
    formData.append('identity_front', file['identity_front']);
    formData.append('identity_back', file['identity_back']);
    formData.append('licence', file['licence']);
    formData.append('travel_licence', file['travel_licence']);
    console.log(file);
    let url = "/api/delever/setup";
    let method = {
        method: "POST",
        body: formData
    }
    let result = await authAPI(url, method);
    console.log(result);
})