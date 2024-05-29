/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    if (prices.length == 0 || prices.length > 10 ** 5) return 0
    if (prices.some(e => e > 10 ** 4 || e < 0)) return 0
    const prixes = removeSequentialDuplicates(prices)
    const mapp = prixes
        .map((price, index) => ({ price, index }))
        .sort((a, b) => a.price - b.price)

    return getAllTwoCombinations(mapp).reduce((p, c) => {
        const sort = c.sort((a, b) => a.price - b.price)
        const profit = sort[1].price - sort[0].price;
        const future = sort[1].index - sort[0].index > 0;
        if (future && profit > p) return profit
        return p
    }, 0)
};
function removeSequentialDuplicates(arr) {
    if (arr.length === 0) return [];

    let result = [arr[0]]; // Initialize the result array with the first element

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            result.push(arr[i]);
        }
    }

    return result;
}
function getAllTwoCombinations(arr) {
    let combinations = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            combinations.push([arr[i], arr[j]]);
        }
    }

    return combinations;
}
var maxProfit = function (prices) {

    let maxProfit = 0;
    let left = 0;
    let right = 1;

    while (right < prices.length) {
        if (prices[left] < prices[right]) {
            let currentProfit = prices[right] - prices[left]
            maxProfit = Math.max(currentProfit, maxProfit)
        } else {
            left = right;
        }
        right++;
    }

    return maxProfit;

};
console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
console.log(maxProfit([2, 4, 1]));
// console.log(JSON.stringify(minPastPrice, null, 4));

