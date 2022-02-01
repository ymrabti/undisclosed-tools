dragDiv.onmousedown = function (e) {

    var shiftX = e.clientX - dragDiv.getBoundingClientRect().left;
    var shiftY = e.clientY - dragDiv.getBoundingClientRect().top;

    document.body.append(dragDiv);

    moveDiv(e.pageX, e.pageY);

    function moveDiv(pageX, pageY) {
        dragDiv.style.left = (pageX - shiftX) + 'px';
        dragDiv.style.top = (pageY - shiftY) + 'px';
    }

    function onMouseMoveDiv(e) {
        moveDiv(e.pageX, e.pageY);
    }
    document.addEventListener('mousemove', onMouseMoveDiv);

    dragDiv.onmouseup = function (e) {
        e.preventDefault();
        document.removeEventListener('mousemove', onMouseMoveDiv);
        dragDiv.onmouseup = null;
        return false;
    };

};

dragDiv.ondragstart = function (e) {
    e.preventDefault();
    return false;
};
var date_stamp = -62167168650000;
var f = n => n < 10 ? '0' + n : n.toString()
var isReversed = str = str => {
    const fst = str.substr(0, 4).split('').reverse().join('');
    const scd = str.substr(4, 8);
    return fst === scd;
}
var date = new Date(date_stamp);
while (date.getFullYear() < 3033) {
    date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    const DD = f(date.getDate());
    const MM = f(date.getMonth() + 1);
    const YYYY = f(date.getUTCFullYear() + 1);
    const DDMMYYYY = DD + MM + YYYY;
    const MMDDYYYY = MM + DD + YYYY;
    const YYYYMMDD = YYYY + MM + DD;
    if ((isReversed(DDMMYYYY) && isReversed(MMDDYYYY) && isReversed(YYYYMMDD))) {
        console.log(DD + '-' + MM + '-' + YYYY);
        isReversed(DDMMYYYY) && console.log('%cDD-MM-YYYY = ' + DDMMYYYY, 'color:green;font-size: larger;');
        isReversed(MMDDYYYY) && console.log('%cMM-DD-YYYY = ' + MMDDYYYY, 'color:red;font-size: larger;');
        isReversed(YYYYMMDD) && console.log('%cYYYY-MM-DD = ' + YYYYMMDD, 'color:yellow;font-size: larger;');
        console.log('\n');
    }
    // .toLocaleDateString().match(/(\d{2})\/(\d{2})\/(\d{4})/gi)
}