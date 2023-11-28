// const socket = io({autoConnect:false});
const socket = io("http://localhost:4400")
window.addEventListener('DOMContentLoaded',async()=>{
    // socket.connect();
    // socket.on('order_created', function(order_data){
    //     console.log('New order created:'+ order_data); 
    // })
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
        address.className = "address subtitle";
        address.textContent = list[0][4];
        store.appendChild(shopname);
        store.appendChild(address);

        let order = document.createElement('div');
        order.className = "order label"
        for(let item of list){
            let itemDiv = document.createElement('div');
            itemDiv.textContent = `${item[1]}`+''+`${item[2]}份`;
            order.appendChild(itemDiv);
        }

        let destination = document.createElement('div');
        destination.className = "destination label"
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
        acceptBTN.addEventListener('click',()=>{
            acceptBTN.querySelector('img').src = "../static/image/icons8-checked-checkbox-50.png";
            let itemNum = acceptBTN.className.split(' ')[2];
            document.querySelectorAll(`.${itemNum}`).forEach(itemDetail=>{
                if(itemDetail.classList.contains('bookingNumber')){
                    console.log(itemDetail.textContent);
                    socket.emit('acquire_order', itemDetail.textContent);
                }
            })
        })
    })
})

