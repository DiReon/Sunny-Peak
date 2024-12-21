let prices;
let startDateInput;
let endDateInput;
let roomTypeSelect;
let guestsQtySelect;
let resultElement;
let averagePriceElement;
let daysQtyElement;
let discountElement;
let earlyCheckInElement;
let lateCheckOutElement;

loadData();

document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    startDateInput = document.getElementById('start');
    endDateInput = document.getElementById('end');
    roomTypeSelect = document.getElementById('room-type');
    guestsQtySelect = document.getElementById('guests-qty');
    resultElement = document.getElementById('result');
    averagePriceElement = document.getElementById('average');
    daysQtyElement = document.getElementById('days-quantity');
    discountElement = document.getElementById('discount');
    earlyCheckInElement = document.getElementById('early-check-in');
    lateCheckOutElement = document.getElementById('late-check-out');

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
    console.log(guestsQty);
    let nextDatePrice = 0;
    if (guestsQty !== 'Выберите количество') {
        const dailyPrices = dates
            .map(day => {
                const price = periods.find(item => day >= new Date(item.start) && day <= new Date(item.end))?.price[guestsQty];
                const nextDate = new Date(day);
                nextDate.setDate(nextDate.getDate() + 1);
                nextDatePrice = periods.find(item => nextDate >= new Date(item.start) && nextDate <= new Date(item.end))?.price[guestsQty];
                return price;
                });
        const earlyCheckIn = earlyCheckInElement.checked ? dailyPrices[0] / 2 : 0;
        const lateCheckOut = lateCheckOutElement.checked ? nextDatePrice / 2 : 0;
        console.log(lateCheckOut);
        const discount = +discountElement.value.split('%')[0];
        const totalPrice = (dailyPrices.reduce((prev, curr) => prev + curr, 0) + earlyCheckIn + lateCheckOut) * (1 - discount / 100);
        console.log(discount);
        resultElement.innerHTML = totalPrice + ' рублей';
        daysQtyElement.innerHTML = dates.length + ' суток';
        averagePriceElement.innerHTML = Math.round(totalPrice / dates.length) + ' рублей';
    } else {
        resultElement.innerHTML = 'Выберите количество гостей';
    }
}

function onSelectRoomType() {
    onInputChanged();
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
    xhttp.onload = function () {
        console.log(this.responseText);
        prices = JSON.parse(this.responseText);
        onSelectRoomType();
    }
    xhttp.open("GET", "https://direon.github.io/Sunny-Peak/prices-2025.json");
    xhttp.send();
}

function onInputChanged() {
    resultElement.innerHTML = '';
    daysQtyElement.innerHTML = '';
    averagePriceElement.innerHTML = '';
}

