//建立點擊連結後緩慢移動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//建立菜單頁面
let num = 1;
const menuBook = document.querySelector('.book');
function constructPage(num){
    const page = document.createElement('div');
    page.setAttribute('class','menuPage');
    page.setAttribute('id',`page${num}`);
    page.style.zIndex = "0";
    menuBook.appendChild(page);
    return num += 1;
}
num = constructPage(num);

//製作菜單輸入欄位
function constructMenu(target,page){
    const categoryProduce = document.createElement('div');
    if(target && target.includes("CategoryInput")){
        categoryProduce.className = "newCat";
        categoryProduce.innerHTML=`
        <div class="inputItem">
            <input type="text" class="realInput" placeholder="新增種類">
        </div>`
        page.appendChild(categoryProduce);
    }else if(target && target.includes("DishInput")){
        categoryProduce.className = "newDish";
        categoryProduce.innerHTML=`
        <div class="inputItem">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;+</div>
            <input type="text" class="realInput dishItem" placeholder="新增項目">
        </div>
        <div class="inputItem">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
            <input type="text" class="realInput dishDescribe" placeholder="新增說明文字">
        </div>
        <div class="inputItem">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
            <input type="text" class="realInput dishPrice" placeholder="輸入餐點價格">
        </div>
        <div class="inputItem">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+</div>
            <div class="realInput"style="width:280px;height:120px;padding-top:10px;align-items: start;">
                <div>餐點供應時間</div>
                <div class="serveTime">
                    <input type="time" class="dishStartTime" name="startTime">
                    <span>到</span>
                    <input type="time" class="dishEndTime" name="endTime">
                </div>
            </div>
        </div>
        <div class="inputPhoto">
            <div class="fileUpload" onclick="document.getElementById('fileImg').click();">+</div>
            <input type="file" id="fileImg" accept="image/*" style="display:none;">
            <img id="previewImg" alt="Image Preview" style="display:none;">    
            <span>&nbsp;新增圖片</span>  
        </div>
        `
        page.appendChild(categoryProduce);
    }
}

//建立在菜單上面的項目
function appendMenuItem(event){
    let pageNum = document.querySelector(`#page${num - 1}`);

    // 獲取元素的高度
    let pageHeight = pageNum.clientHeight;

    // 獲取元素内部所有子元素的高度總和
    let childrenHeight = 0;

    for (let child of pageNum.children) {
        childrenHeight += child.clientHeight;
    }

    let target = event.target.className;
    if(target.includes("CategoryInput")){
        if(pageHeight - childrenHeight > 120){
            constructMenu(target,pageNum);
        }else{
            num = constructPage(num);
            flipPage(num);
            setTimeout(()=>{
                pageNum = document.querySelector(`#page${num - 1}`);
                constructMenu(target,pageNum);
            },500)
        }
    }else{
        if(pageHeight - childrenHeight > 300){
            constructMenu(target,pageNum);
        }else{
            num = constructPage(num);
            flipPage(num);
            setTimeout(()=>{
                pageNum = document.querySelector(`#page${num - 1}`);
                constructMenu(target,pageNum);
            },1000)
        }
    }
}

//製作菜單的翻書效果
function flipPage(num){
    let pageId = num -2;
    const flippingPage = document.querySelector(`#page${pageId}`);
    console.log(flippingPage);
    flippingPage.style = `
    z-index:${num};
    transform: rotateY(-180deg);
    `;
}

//匯入及預覽圖片
let shopphoto = document.querySelector('#shopImg');
let previewShopPhoto = document.querySelector('#previewShopImg');
shopphoto.addEventListener('change',()=>{
    upLoadPhoto(shopphoto,previewShopPhoto);
})

document.querySelectorAll('.fakefile').forEach(file=>{
    file.addEventListener('click',(event)=>{
        appendMenuItem(event);
        if(event.target.className.includes('DishInput')){
            let photoUpLoad = document.querySelector('#fileImg');
            let photoPreview = document.querySelector('#previewImg');
            if(photoUpLoad === null){
                setTimeout(()=>{
                    photoUpLoad = document.querySelector('#fileImg');
                    photoPreview = document.querySelector('#previewImg');
                    photoUpLoad.addEventListener('change',()=>{  
                        upLoadPhoto(photoUpLoad,photoPreview);
                    });
                },2000)
            }else{
                photoUpLoad.addEventListener('change',()=>{
                    upLoadPhoto(photoUpLoad,photoPreview);
                })
            }
        }
    })
})

//獲取照片資訊
let timesNum = 0;
function clickTimes(){
    timesNum = timesNum += 1
    return timesNum;
}

let photoFiles = {};
let shopImg_file = {};
async function upLoadPhoto(photoUpLoad,photoPreview) {
    const file = photoUpLoad.files[0];
    let src = await loadFile(file);

    const fakePhotoUpLoad = document.querySelector('.fileUpload');
    if(fakePhotoUpLoad.parentNode.id){
        fakePhotoUpLoad.parentNode.removeChild(fakePhotoUpLoad);
        photoUpLoad.parentNode.removeChild(photoUpLoad);
        photoPreview.setAttribute('class',`storeImg`);
        shopImg_file['shopImg'] = file;
        const store_photo = document.querySelector(`.storeImg`);
        store_photo.src = src;
        store_photo.style= "display:block;width:500px;height:300px;object-fit:cover";
    }else{
        fakePhotoUpLoad.parentNode.removeChild(fakePhotoUpLoad);
        photoUpLoad.parentNode.removeChild(photoUpLoad);
        timesNum = clickTimes(timesNum);
        photoFiles[timesNum] = file;
        photoPreview.setAttribute('class',`previewImg`);
        photoPreview.setAttribute('id',`previewImg_${timesNum}`);
        const photo = document.querySelector(`#previewImg_${timesNum}`);
        photo.src = src;
        photo.style= "display:block;width:120px;height:80px;object-fit:cover";
    }
}
function loadFile(file){
    return new Promise((resolve,reject)=>{
        let reader = new FileReader();
        reader.onload = ()=>resolve(reader.result);
        reader.error = reject;
        reader.readAsDataURL(file);
    })
}


