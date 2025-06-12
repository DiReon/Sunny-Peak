const data = require('../prices-2025.json');


for (const roomType in data) {
    const periods = data[roomType];
    for (const period of periods) {
        const price = period.price;
        for (const guestsQty in price) {
            price[guestsQty] = price[guestsQty] * 1.1;
        }
    }
}

console.log(JSON.stringify(data));