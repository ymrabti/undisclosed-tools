/**
 * 
 * @param {number} nombre 
 * @returns {number[]}
 */
function getNumberDijits(nombre) {
    let a = nombre
    const listDigits = []
    while (a > 0) {
        const r = a % 10
        listDigits.push(r)
        a = Math.round((a - r) / 10)
    }
    return listDigits.reverse()
}

module.exports = {
    getNumberDijits
}
