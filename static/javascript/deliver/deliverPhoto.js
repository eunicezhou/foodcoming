let file = {};
// const ctx = document.querySelector("#cvs").getContext("2d");

document.querySelector('#shot_Img').addEventListener('change',async()=>{
    let shotUpload = document.querySelector('#shot_Img');
    let previewShot = document.querySelector('#preview_shot_Img');
    let style = "display:block;width:200px;height:280px;object-fit:cover";
    let shot_file = await upLoadPhoto(shotUpload,previewShot,style);
    // console.log(shot_file);
    file['shot'] = shot_file;
    // 把檔案物件變成圖片物件給 BlazeFace 使用
    // const shot_img = new Image();
    // shot_img.src = URL.createObjectURL(shot_file); // 產生一個隨機網址，對應到檔案物件
    // shot_img.addEventListener("load", async()=>{
    //     ctx.canvas.width = shot_img.width;
    //     ctx.canvas.height = shot_img.height;
    //     ctx.drawImage(shot_img, 0, 0);
    //     await tensorflow(shot_img);
    // });
})

document.querySelector('#identity_FrontImg').addEventListener('change',async()=>{
    let identity_front_upload = document.querySelector('#identity_FrontImg');
    let preview_identity_front = document.querySelector('#preview_identity_FrontImg');
    let style = "display:block;width:400px;height:300px;object-fit:cover";
    let identity_Front_file = await upLoadPhoto(identity_front_upload,preview_identity_front,style);
    file['identity_front'] = identity_Front_file;
})

document.querySelector('#identity_BackImg').addEventListener('change',async()=>{
    let identity_back_upload = document.querySelector('#identity_BackImg');
    let preview_identity_back = document.querySelector('#preview_identity_BackImg');
    let style = "display:block;width:400px;height:300px;object-fit:cover";
    let identity_Back_file = await upLoadPhoto(identity_back_upload,preview_identity_back,style);
    file['identity_back'] = identity_Back_file;
})

document.querySelector('#licence_Img').addEventListener('change',async()=>{
    let licence_upload = document.querySelector('#licence_Img');
    let preview_licence = document.querySelector('#preview_licence_Img');
    let style = "display:block;width:400px;height:300px;object-fit:cover";
    let licence_file = await upLoadPhoto(licence_upload,preview_licence,style);
    file['licence'] = licence_file;
})

document.querySelector('#travel_licenceImg').addEventListener('change',async()=>{
    let travel_licence_upload = document.querySelector('#travel_licenceImg');
    let preview_travel_licence = document.querySelector('#preview_travel_licenceImg');
    let style = "display:block;width:400px;height:600px;object-fit:cover";
    let travel_licence_file = await upLoadPhoto(travel_licence_upload,preview_travel_licence,style);
    file['travel_licence'] = travel_licence_file;
})

async function upLoadPhoto(photoUpLoad, previewShot, style) {
    const file = photoUpLoad.files[0];
    let src = await loadFile(file);

    const fakePhotoUpLoad = document.querySelector('.fileUpload');
    fakePhotoUpLoad.parentNode.removeChild(fakePhotoUpLoad);
    photoUpLoad.parentNode.removeChild(photoUpLoad);
    previewShot.src = src;
    previewShot.style = style;
    return file;
}

async function tensorflow(img){
    // 載入 BlazeFace 模型
    const model = await blazeface.load();
    // 利用模型圖片作臉部辨識
    const returnTensors = false;
    const predictions = await model.estimateFaces(img, returnTensors);
    // 如果圖片中有臉部存在，則 predictions.length 就會大於0
    if(predictions.length > 0){
        console.log(predictions);
        // 利用迴圈把每個臉部的位置取出來
        for(let i = 0; i < predictions.length; i++){
            const start = predictions[i].topleft;
            const end = predictions[i].bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];
            // 把臉部的方形畫出來
            ctx.fillRect(start[0], start[1], size[0], size[1]);
        }
    }
}

