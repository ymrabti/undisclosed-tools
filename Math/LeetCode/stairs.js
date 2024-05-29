const n = 100
const steps = [...Array(3)].map((_, e) => e + 1)
const sorted = [...Array(25)].map((_, e) => e + 1)

let tracker = 0
for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] % 2 == 0) {
        sorted[tracker] = sorted[tracker] + sorted[i]
        sorted[i] = sorted[tracker] - sorted[i]
        sorted[tracker] = sorted[tracker] - sorted[i]
        tracker++
    }
}

console.log(sorted);
function number_ways(n, steps, memory = {}) {
    if (n in memory) return memory[n]
    if (n == 0) return 1
    if (n < 0) return 0
    let total = 0
    for (const step of steps) {
        total += number_ways(n - step, steps, memory)
    }
    memory[n] = total
    return total
}

console.log(number_ways(n, steps));