window.addEventListener('load', async()=>{
    let currentUrl = window.location.href;
    let modified_url = currentUrl.replace(/\/store.*/, '');
    let id = currentUrl.match(/\/store\/(\d+)/)[1];
    let url = `${modified_url}/api/store`;
    let method = {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'id': id}),
    }
    let storeData = await authAPI(url, method);
    console.log(storeData);
    document.querySelector('.shopPhoto').src=`${storeData['data']['shopPhoto']}`;
    document.querySelector('#shopName').textContent = `${storeData['data']['shopname']}`
    document.querySelector('.shopCat').src = `${storeData['data']['category_photo']}`;
    document.querySelector('.categoryName').textContent = `${storeData['data']['category']}`;
    let menuData = JSON.parse(storeData['data']['menu']);
    let dishCats = [];
    for(let dish = 0;dish < menuData.length;dish++){
        console.log(menuData[dish]);
        let start = menuData[dish][6];
        let end = menuData[dish][7];
        let item;
        if(!dishCats.includes(menuData[dish][1])){
            dishCats.push(menuData[dish][1]);
        }
        if(!document.querySelector(`#${menuData[dish][1]}`)){
            let category = document.createElement('div');
            category.className = "className";
            category.setAttribute('id',`${menuData[dish][1]}`);
            category.textContent = `${menuData[dish][1]}`;
            document.querySelector('.content--right').appendChild(category);

            item = document.createElement('div');
            let dishPhotoDiv = document.createElement('div');
            dishPhotoDiv.className = "itemPhoto";
            let photoImg = document.createElement('img');
            photoImg.src = `${menuData[dish][4]}`;
            dishPhotoDiv.appendChild(photoImg);

            let itemDetail = document.createElement('div');
            let dishName = document.createElement('div');
            dishName.className = "itemName";
            category.textContent = `${menuData[dish][2]}`;
            itemDetail.appendChild(dishName);

            // let dishDescribe = document.createElement('div');
            // dishDescribe.className = "itemDetail";
            // category.textContent = `${menuData[dish][3]}`;
            // itemDetail.appendChild(dishDescribe);

            // let dishPrice = document.createElement('div');
            // dishPrice.className = "price";
            // dishPrice.textContent = `${menuData[dish][5]}`;
            // itemDetail.appendChild(dishPrice);

            item.appendChild(dishPhotoDiv);
            item.appendChild(itemDetail);
        }else{
            // let dishPhotoDiv = document.createElement('div');
            // dishPhotoDiv.className = "itemPhoto";
            // let photoImg = document.createElement('img');
            // photoImg.src = `${menuData[dish][4]}`;

            // let itemDetail = document.createElement('div');
            // let dishName = document.createElement('div');
            // dishName.className = "itemName";
            // category.textContent = `${menuData[dish][2]}`;
            // itemDetail.appendChild(dishName);

            // let dishDescribe = document.createElement('div');
            // dishDescribe.className = "itemDetail";
            // category.textContent = `${menuData[dish][3]}`;
            // itemDetail.appendChild(dishDescribe);

            // let dishPrice = document.createElement('div');
            // dishPrice.className = "price";
            // dishPrice.textContent = `${menuData[dish][5]}`;
            // itemDetail.appendChild(dishPrice);

            // item = document.createElement('div');
            // item.appendChild(dishPhotoDiv);
            // item.appendChild(itemDetail);
        }
        document.querySelector('.content--right').appendChild(item);
    }
    for(let classname of dishCats){
        let anchorClass = document.createElement('a');
        anchorClass.className = "dishClass";
        anchorClass.textContent = `${classname}`;
        anchorClass.href = `#${classname}`;
        document.querySelector('.content--left').appendChild(anchorClass);
    }
    console.log(dishCats);
})