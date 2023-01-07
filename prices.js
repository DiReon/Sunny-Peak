const prices = {
    Двухместный: [
            {
                start: '2023-06-01',
                end: '2023-06-15',
                price: {
                    '2': 1500,
                    '3': 1700
                }
            },
            {
                start: '2023-06-16',
                end: '2023-06-30',
                price: {
                    '2': 1800,
                    '3': 2100
                }
            },
            {
                start: '2023-07-01',
                end: '2023-07-10',
                price: {
                    '2': 2000,
                    '3': 2300
                }
            },
        ],
}
let startDateInput;
let endDateInput;
let roomTypeSelect;
let guestsQtySelect;
let resultElement;

loadData();

document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    startDateInput = document.getElementById('start');
    endDateInput = document.getElementById('end');
    roomTypeSelect = document.getElementById('room-type');
    guestsQtySelect = document.getElementById('guests-qty');
    resultElement = document.getElementById('result');

    onSelectRoomType();

    const savedStartDate = localStorage.getItem('startDate');
    if (savedStartDate) {
        startDateInput.value = savedStartDate;
    }

    const savedEndDate = localStorage.getItem('endDate');
    if (savedEndDate) {
        endDateInput.value = savedEndDate;
    }
})

function calculate() {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    localStorage.setItem('startDate', startDate.toISOString().split('T')[0]);
    localStorage.setItem('endDate', endDate.toISOString().split('T')[0]);
    const periods = prices[roomTypeSelect.value];
    const dates = [];
    let date = startDate;
    while (date < endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    const guestsQty = guestsQtySelect.value;

    const totalPrice = dates
        .map(day => periods.find(item => day >= new Date(item.start) && day <= new Date(item.end))?.price[guestsQty])
        .reduce((prev, curr) => prev + curr, 0)
    resultElement.innerHTML = totalPrice + ' рублей'
}

function onSelectRoomType() {
    const roomType = roomTypeSelect.value;
    for (const item of guestsQtySelect.children) {
        if (prices[roomType] && prices[roomType][0]?.price && Object.keys(prices[roomType][0].price).includes(item.innerHTML)) {
            item.hidden = false;
        } else {
            item.hidden = true;
        }
    }
    guestsQtySelect.value = 'Выберите количество'
}

function loadData() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log(this.responseText);
    }
    xhttp.open("GET", "data.json");
    xhttp.send();
}

