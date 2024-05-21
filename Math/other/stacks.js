var types = {
    BRACKET_OPEN: '(',
    CURLY_BRACKET_OPEN: '{',
    SQUARE_BRACKET_OPEN: '[',

    BRACKET_CLOSE: ')',
    CURLY_BRACKET_CLOSE: '}',
    SQUARE_BRACKET_CLOSE: ']',
}
/**
 * 
 * @param {string} other other
 * @returns {boolean} return boolean
*/
String.prototype.close = function (other) {
    switch (this.valueOf()) {
        case types.BRACKET_OPEN:
            return other == types.BRACKET_CLOSE
        case types.CURLY_BRACKET_OPEN:
            return other == types.CURLY_BRACKET_CLOSE
        case types.SQUARE_BRACKET_OPEN:
            return other == types.SQUARE_BRACKET_CLOSE

        default:
            return false;
    }
}
// [{(())}[()]]
const promptxt = "[{(())}{()}[()]]"
console.log(promptxt.split('').reduce((prev, curr) => {
    if (prev.length !== 0) {
        const [l, ...next] = [...prev].reverse();
        if (l.close(curr)) {
            const nevo = next.reverse()
            return nevo;
        } else {
            const nevo = [...prev, curr]
            return nevo
        }
    } else {
        return [curr]
    }
}, []).length);