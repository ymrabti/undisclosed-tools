/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/* var twoSum = function (nums, target) {
    if (2 > nums.length || nums.length > 10 ** 4) return [];
    if (Math.abs(target) > 10 ** 9) return [];
    for (const iterator of nums) {
        if (Math.abs(iterator) > 10 ** 9) return [];
    }
    const ls = [...Array(nums.length)].map((_, i) => {
        const reduced = nums.slice(i).reduce((prev, curr, index) => {
            var add = curr + prev.sum;
            if (prev.done) return prev;
            if (add === target) return { ...prev, indexMax: index + i, sum: add, done: true };
            else return { ...prev, indexMax: index + i, sum: add };
        }, { indexMin: i, indexMax: i, sum: 0, done: false });
        return reduced;
    }).filter(e => e.done).map(e => [e.indexMin, e.indexMax]);
    return ls.length === 0 ? [] : ls[0]
}; */
function twoSum(nums, target) {
    const result = nums.reduce((acc, num, index) => {
        if (acc.done) return acc;
        const complement = target - num;
        if (acc.numToIndex.hasOwnProperty(complement)) {
            return { ...acc, indices: [acc.numToIndex[complement], index], done: true };
        }
        acc.numToIndex[num] = index;
        return acc;
    }, { numToIndex: {}, indices: [], done: false });

    return result.indices;
}
console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
console.log(twoSum([3, 2, 3], 6));