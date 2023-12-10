let currentUrl = window.location.href;
let modified_url = currentUrl.replace(/\/store.*/, '');
let id = currentUrl.match(/\/store\/(\d+)/)[1];
window.addEventListener('load', async()=>{
    let url = `${modified_url}/api/store`;
    let method = {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'id': id}),
    }
    let storeData = await authAPI(url, method);
    if(storeData){
        document.querySelector('.loadingItem').style.display = "none";
        document.querySelectorAll('.fakeItem').forEach(item=>{
            item.style.display = "none";
        })
        document.querySelector('.shopPhoto').src=`${storeData['data']['shopPhoto']}`;
        document.querySelector('.shopPhoto').style.display = "block";
        document.querySelector('#shopName').textContent = `${storeData['data']['shopname']}`
        document.querySelector('.shopCat').src = `${storeData['data']['category_photo']}`;
        document.querySelector('.shopCat').style.display = "inline-block";
        document.querySelector('.categoryName').textContent = `${storeData['data']['category']}`;
        let menuData = JSON.parse(storeData['data']['menu']);
        let dishCats = [];
        for(let dish = 0;dish < menuData.length;dish++){
            let item;
            if(!dishCats.includes(menuData[dish][1])){
                dishCats.push(menuData[dish][1]);
            }   
        }
        for(let classname of dishCats){
            let anchorClass = document.createElement('a');
            anchorClass.className = "dishClass";
            anchorClass.textContent = `${classname}`;
            anchorClass.href = `#${classname}`;
            document.querySelector('.content--left').appendChild(anchorClass);

            let category_div = document.createElement('div');
            category_div.className = "classDiv"
            let classItem = document.createElement('div');
            classItem.className = "className";
            classItem.setAttribute('id',`${classname}`);
            category_div.innerHTML = `<div class="classDivName">${classname}</div>`;
            category_div.appendChild(classItem)
            document.querySelector('.content--right').appendChild(category_div);
        }
        dishCats.forEach(cat=>{
            let category_name = document.querySelector(`#${cat}`);
            for(let dish = 0;dish < menuData.length;dish++){
                if(menuData[dish][1] === cat){
                    let item = document.createElement('div');
                    item.className = "item";
                    let dishPhotoDiv = document.createElement('div');
                    dishPhotoDiv.className = "itemPhoto";
                    let photoImg = document.createElement('img');
                    photoImg.src = `${menuData[dish][4]}`;
                    dishPhotoDiv.appendChild(photoImg);

                    let itemDetail = document.createElement('div');

                    let dishName = document.createElement('div');
                    dishName.className = "itemName label";
                    dishName.textContent = `${menuData[dish][2]}`;
                    itemDetail.appendChild(dishName);

                    let dishDescribe = document.createElement('div');
                    dishDescribe.className = "itemDetail";
                    dishDescribe.textContent = `${menuData[dish][3]}`;
                    itemDetail.appendChild(dishDescribe);

                    let dishPrice = document.createElement('div');
                    dishPrice.className = "price";
                    dishPrice.textContent = `\$${menuData[dish][5]}元`;
                    itemDetail.appendChild(dishPrice);

                    item.appendChild(dishPhotoDiv);
                    item.appendChild(itemDetail);

                    category_name.appendChild(item);
                }
            }
        })
        document.querySelectorAll('.item').forEach(item=>console.log(item));
        document.querySelectorAll('.item').forEach(item=>item.addEventListener('click',()=>{
            let grocery = item.querySelector('.itemName').innerHTML;
            window.location.href = `/grocery?store=${id}&item=${grocery}`
            })
        )
    }
})

    
