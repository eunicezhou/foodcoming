const queryString = window.location.search;
let orderId = queryString.split('&')[0].split('=')[1];
const socket = io("http://localhost:4400");
// const socket = io("formal.foodcoming.store",{
//     path:"/mysocket"
//     });
window.addEventListener('load', async()=>{
    console.log(document.querySelector('#bar1'));
    document.querySelector('#bar1').style.animation = "progressBarAnimation 1s ease-out infinite";
    let orderNum = document.querySelector('.orderNum');
    orderNum.textContent = `${orderId}`
    let memberData = await confirmMember();
    let method = {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'orderId':orderId})
    }
    let orderDetail = await authAPI("/api/orderDetail", method);
    let orderContent = document.querySelector('.orderDetail')

    // 使用Object.entries()将对象转换为可迭代的键值对数组
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
    socket.emit('joinRoom', {'room':orderId,'name':memberData['name']})
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
});
socket.on('order-arrived',(data)=>{
    console.log(data);
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
    waiting.querySelector('.no').addEventListener('click',()=>{
        socket.emit('consumer-cancel', {'room':orderId,'member':memberData['name']})
        socket.emit('leaveRoom',{'room':orderId, 'name':memberData['name']})
        setTimeout(()=>{
            window.location.href = "/";
        },500)
    })
})
document.querySelector('.complete').addEventListener('click',()=>{
    socket.emit('leaveRoom',{'room':orderId, 'name':memberData['name']})
        setTimeout(()=>{
            window.location.href = "/";
        },500)
})