const data = require('../data.json');


for (const roomType in data) {
    const periods = data[roomType];
    for (const period of periods) {
        const price = period.price;
        for (const guestsQty in price) {
            price[guestsQty] = price[guestsQty] * 1.3;
        }
    }
}

console.log(JSON.stringify(data));