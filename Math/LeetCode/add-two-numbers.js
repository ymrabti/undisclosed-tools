/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} l1
 * @param {number[]} l2
 * @return {number[]}
 */
var addTwoNumbersArray = function (l1, l2) {
    if (l1.length == 0 || l1.length > 100) return 0
    if (l2.length == 0 || l2.length > 100) return 0
    if (l1.val.some(e => e < 0 || e > 9)) return 0
    if (l2.val.some(e => e < 0 || e > 9)) return 0
    const sum = l1.reduce((p, c, i) => p + c * (10 ** i), 0) + l2.reduce((p, c, i) => p + c * (10 ** i), 0);
    const l = []
    var r = sum, z = 0
    while (r > 0) {
        z = r % 10
        l.push(z)
        r = (r - z) / 10
    }
    return l
};
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let dummyHead = new ListNode(0);
    let p = l1, q = l2, current = dummyHead;
    let carry = 0;

    while (p || q) {
        let x = p?.val ?? 0;
        let y = q?.val ?? 0;
        let sum = carry + x + y;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        if (p) p = p.next;
        if (q) q = q.next;
    }

    if (carry > 0) {
        current.next = new ListNode(carry);
    }

    return printList(dummyHead.next);
};

// Helper function to print linked list
function printList(node) {
    let arr = [];
    while (node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
}

class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}



// Example usage
// Helper function to create linked list from array
function arrayToList(arr) {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummyHead.next;
}
// Create linked lists from arrays
let l1 = arrayToList([2, 4, 3]);
let l2 = arrayToList([5, 6, 4]);
// Add the two numbers
let result = addTwoNumbers(l1, l2);
// Print the result
console.log(result); // Output: [7, 0, 8]
console.table(addTwoNumbers([2, 4, 3], [5, 6, 4]));
console.table(addTwoNumbers([0], [0]));
console.table(addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]));
