function loadFile(file){
    return new Promise((resolve,reject)=>{
        let reader = new FileReader();
        reader.onload = ()=>resolve(reader.result);
        reader.error = reject;
        reader.readAsDataURL(file);
    })
}