const queryString = window.location.search;
let orderId = queryString.split('&')[0].split('=')[1];  
const socket = io("http://localhost:4400");
// const socket = io("formal.foodcoming.store",{
//     path:"/mysocket"
//     });

window.addEventListener('load', async()=>{
    document.querySelector('#bar1').style.animation = "progressBarAnimation 1s ease-out infinite";
    let orderNum = document.querySelector('.orderNum');
    orderNum.textContent = `${orderId}`
    const memberData = await confirmUserStatement();
    let method = {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'orderId':orderId})
    }
    const fetchInfo = new FetchInfo();
    let orderDetail = await fetchInfo.authAPI("/api/orderDetail", method);
    let orderContent = document.querySelector('.orderDetail')

    for(let [key, value] of Object.entries(orderDetail.data)){
        let item = document.createElement('h3');
        item.textContent = `${key} ${value}份`;
        orderContent.appendChild(item);
    }
    setTimeout(()=>{
        document.querySelector('#bar1').style.animation = "none";
        document.querySelector('#bar1').style.width = "100%";
        document.querySelector('#bar2').style.animation = "progressBarAnimation 1s ease-out infinite";
        document.querySelector('.content_header img').src = "../static/image/searchDelever.png";
        document.querySelector('.creating_order').style.display = "none";
        document.querySelector('.matchingDelever').style.display = "block";
    },2000)
    socket.emit('joinRoom', {'room':orderId, 'name':memberData['name']})
    socket.on('message',(data)=>{
        console.log(data);
    })
})
socket.on('delever-match',(data)=>{
    let orderNum = data['room'];
    let delever = data['delever'];
    let requireTime = data['requireTime'];
    //獲取當下時間
    let currentTime = new Date();
    let requireTimeInMilliseconds = requireTime * 60 * 1000;
    let newTime = new Date(currentTime.getTime() + requireTimeInMilliseconds);
    let timeString = newTime.toLocaleString();
    document.querySelector('#bar2').style.animation = "none";
    document.querySelector('#bar2').style.width = "100%";
    document.querySelector('#bar3').style.animation = "progressBarAnimation 1s ease-out infinite";
    document.querySelector('.content_header img').src = "../static/image/delever.png";
    document.querySelector('.delever').textContent = `本訂單由${delever}為您服務`;
    document.querySelector('.arriveTime').textContent = `預計會在${timeString.split(' ')[1]}送達外送指定位置`;
    document.querySelector('.matchingDelever').style.display = 'none';
    document.querySelector('.foundDelever').style.display = 'block';
})

socket.on('getDeliverRoad',(data)=>{
    let deliverPosition = data['deliverPosition'];
    let restaursntPosition = data['restaurant'];
    let destination = data['destination'];
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true, // 設定為 true，不顯示標記
    });
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: deliverPosition.lat, lng: deliverPosition.lng }  // 起始地點的經緯度
        });
        directionsRenderer.setMap(map);

        // 這邊設置路線中間目的地
        const waypoints = [
            { location: restaursntPosition['address'], stopover: true },
        ];
        
        let request = {
            origin: {lat:deliverPosition.lat, lng:deliverPosition.lng},
            destination: destination['address'],
            travelMode: 'DRIVING',
            waypoints: waypoints,
        };
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                const customIcon = {
                    url: '../static/image/box.png', // 設定自訂的標記路徑
                    scaledSize: new google.maps.Size(40, 40), // 圖示的大小
                };
                
                // 創建一個新的標記，並設定圖示
                const marker = new google.maps.Marker({
                    position: deliverPosition, // 設定標記的位置
                    map: map, // 設定標記要畫到哪個地圖上
                    icon: customIcon // 設定標記的圖示
                });
                directionsRenderer.setDirections(response); // 將路線顯示在地圖上
                setInterval(()=>{
                    socket.emit('requestDeliverPosition');
                    socket.on('replyDeliverPositionToConsumer',data=>{
                        console.log(data);
                        request = {
                            origin: {lat:data.lat, lng:data.lng},
                            destination: destination['address'],
                            travelMode: 'DRIVING',
                            waypoints: waypoints,
                        };
                        directionsService.route(request, function (response, status) {
                            if (status == 'OK') {
                                directionsRenderer.setDirections(response); // 將路線顯示在地圖上
                            }
                        },5000)
                    })
                })
            }else {
                console.error('路線規劃失敗，錯誤狀態：', status);
            }
        });

})

socket.on('order-arrived',(data)=>{
    document.querySelector('#bar3').style.animation = "none";
    document.querySelector('#bar3').style.width = "100%";
    document.querySelector('#bar4').style.animation = "progressBarAnimation 1s ease-out infinite";
    document.querySelector('.content_header img').src = "../static/image/complete.png";
    document.querySelector('.foundDelever').style.display = 'none';
    document.querySelector('.deleveryArrived').style.display = 'block';
})

socket.on('order-cancel',()=>{
    let waiting = document.querySelector('.waiting');
    waiting.style.display = "block";
    waiting.querySelector('.yes').addEventListener('click',()=>{
        waiting.style.display = "none";
        document.querySelector('#bar3').style.animation = "none";
        document.querySelector('#bar3').style.width = "0%";
        document.querySelector('#bar2').style.animation = "progressBarAnimation 1s ease-out infinite";
        document.querySelector('.content_header img').src = "../static/image/searchDelever.png";
        document.querySelector('.matchingDelever').style.display = 'block';
        document.querySelector('.foundDelever').style.display = 'none';
    })
    waiting.querySelector('.no').addEventListener('click',async()=>{
        const memberData = await confirmUserStatement();
        socket.emit('consumer-cancel', {'room':orderId,'member':memberData['name']})
        socket.emit('leaveRoom',{'room':orderId, 'name':memberData['name']})
        setTimeout(()=>{
            window.location.href = "/";
        },500)
    })
})

document.querySelector('.complete').addEventListener('click',async()=>{
    const memberData = await confirmUserStatement();
    socket.emit('leaveRoom',{'room':orderId, 'name':memberData['name']})
        setTimeout(()=>{
            window.location.href = "/";
        },500)
})