document.querySelector('.submitBTN').addEventListener('click',()=>{
    let formData = new FormData();
    formData.append('name', document.querySelector('#email').value);
    formData.append('email', document.querySelector('#name').value);
    formData.append('phone', document.querySelector('#phone').value);
    formData.append('photo', file);
    let 
})