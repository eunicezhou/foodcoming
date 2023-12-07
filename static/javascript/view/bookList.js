// import Peer from 'peerjs';
const socket = io("http://localhost:4400");
// const socket = io("formal.foodcoming.store",{
//     path:"/mysocket"
//     });
// const peer = new Peer();
window.addEventListener('DOMContentLoaded',async()=>{
    let memberData = await confirmMember();
    document.querySelector('.delever').textContent = `${memberData['data']['name']}，您好!`;
    let currentPosition = await initMap(); 
    setMapCenterAndMarker(currentPosition);
    
    let method = {
        method: "PUT",
        headers: {
            'Content-Type':'application/JSON'
        },
        body:JSON.stringify({
            'lat':currentPosition.lat,
            'lng':currentPosition.lng
        })
    }
    let orderList = await authAPI("/api/delever/orderList", method);
    let num = 1;
    for(let list of orderList['data']){
        let bookingNumber = document.createElement('div');
        bookingNumber.className = `bookingNumber label item${num}`;
        bookingNumber.textContent = list[0][0];

        let store = document.createElement('div');
        store.className = "store";
        let shopname = document.createElement('div');
        shopname.className = "shopname label"
        shopname.textContent = list[0][3];
        let address = document.createElement('div');
        address.className = `address subtitle`;
        address.textContent = list[0][4];
        store.appendChild(shopname);
        store.appendChild(address);

        let order = document.createElement('div');
        order.className = `order label item${num} `
        for(let item of list){
            let itemDiv = document.createElement('div');
            itemDiv.textContent = `${item[1]}`+''+`${item[2]}份`;
            order.appendChild(itemDiv);
        }

        let destination = document.createElement('div');
        destination.className = `destination label item${num} `
        destination.textContent = list[0][7].replace(/^\d+/, '');

        let accept = document.createElement('div');
        accept.className = `accept label item${num}`;
        let square = document.createElement('img');
        square.src = "../static/image/icons8-square-50.png";
        accept.appendChild(square);

        document.querySelector('.bookingList').appendChild(bookingNumber);
        document.querySelector('.bookingList').appendChild(store);
        document.querySelector('.bookingList').appendChild(order);
        document.querySelector('.bookingList').appendChild(destination);
        document.querySelector('.bookingList').appendChild(accept);
        num += 1;
    }
    document.querySelectorAll('.accept').forEach(acceptBTN=>{
        acceptBTN.addEventListener('click',async()=>{
            acceptBTN.querySelector('img').src = "../static/image/icons8-checked-checkbox-50.png";
            let itemNum = acceptBTN.className.split(' ')[2];
            document.querySelector('.orderDetail').style.display = "flex";
            let acceptOrder = document.querySelector('.acceptOrder');
            let status = document.createElement('h1');
            status.textContent = "接單中...";
            acceptOrder.appendChild(status);
            let order = document.createElement('div');
            order.className = "orderContent";
            document.querySelectorAll(`.${itemNum}`).forEach(itemDetail=>{
                if(itemDetail.classList.contains('bookingNumber')){
                    let order_id = itemDetail.textContent;
                    localStorage.setItem('orderId', order_id);
                    socket.emit('acquire_order', order_id);
                    socket.emit('joinRoom', {'room':order_id, 'name': memberData['name']});
                    socket.on('message',(reply)=>{
                        console.log(reply)
                    })
                    
                    let acceptOrderNum = document.createElement('div');
                    acceptOrderNum.className = 'acceptOrderNum';
                    acceptOrderNum.textContent = `訂單編號:${order_id}`;
                    acceptOrder.appendChild(acceptOrderNum);
                }else if(itemDetail.classList.contains('order')){
                    for(let item of itemDetail.childNodes){
                        let orderContent = document.createElement('div');
                        orderContent.textContent = item.textContent;
                        order.appendChild(orderContent);
                    }
                    acceptOrder.appendChild(order);
                }
            })

            document.querySelector('.nearbyBooking').style.display = "none";
            document.querySelector('.delever').style.display = "none";
            document.querySelector('.contain').style.display = "flex";
            map.setOptions({
                disableDefaultUI: true,  // 禁用預設的地圖界面
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            });
            document.querySelector('#map').style.height = "70vh";
            let currentPosition = await initMap(); 
            let durationInMinutes = await countTime(currentPosition);
            console.log(durationInMinutes);
            let arriveTime = document.createElement('div');
            arriveTime.className = "arriveTime";
            arriveTime.textContent = `預計完成訂單時間需:${durationInMinutes}分`
            acceptOrder.appendChild(arriveTime);
            const roomId = document.querySelector('.acceptOrderNum').textContent.split(':')[1]
            socket.emit('update-order', {
                'room':roomId,
                'delever':memberData['name'],
                'requireTime': durationInMinutes
            })
               
        })
    })
})

// 獲得外送預計時間
function countTime(currentPosition) {
    return new Promise((resolve, reject) => {
        socket.on('create-road', async function (locationData) {
            try {
                console.log(locationData[0]);
                const durationInMinutes = await getRoad(currentPosition, locationData[0]);
                resolve(durationInMinutes);
            } catch (error) {
                reject(error);
            }
        });
    });
}

document.querySelector('.finishBTN').addEventListener('click',()=>{
    let finishform = document.querySelector('.finish');
    finishform.style.display = "block";
    finishform.querySelector('.shelder').addEventListener('click',()=>{
        finishform.style.display = "none";
    })
    finishform.querySelector('.yes').addEventListener('click',()=>{
        let room = localStorage.getItem('orderId');
        let message = '外送員已將餐點送至指定地點';
        socket.emit('complete-order', {'room':room, 'message':message});
        socket.emit('leaveRoom',{'room':room, 'name':memberData['name']})
        localStorage.removeItem('orderId');
        setTimeout(()=>{
            location.reload();
        },500)
    })
    finishform.querySelector('.no').addEventListener('click',()=>{
        finishform.style.display = "none";
    })
})

document.querySelector('.cancelBTN').addEventListener('click',()=>{
    let cancelform = document.querySelector('.cancel');
    cancelform.style.display = "block";
    cancelform.querySelector('.shelder').addEventListener('click',()=>{
        cancelform.style.display = "none";
    })
    cancelform.querySelector('.yes').addEventListener('click',()=>{
        let room = localStorage.getItem('orderId');
        let message = document.querySelector('.reason').value;
        if(message === ""){
            cancelform.querySelector('.alert').textContent = "原因欄位必填"
        }else{
            socket.emit('deliver-cancel', {'room':room, 'message':message});
            socket.emit('leaveRoom',{'room':room, 'name':memberData['name'], 'reason':message})
            localStorage.removeItem('orderId');
            setTimeout(()=>{
                location.reload();
            },500)
        }
    })
    cancelform.querySelector('.no').addEventListener('click',()=>{
        cancelform.style.display = "none";
    })
})