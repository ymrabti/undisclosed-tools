
/*1613257190000*//*1613260790000*/
var date = new Date();
var one_sec = 1000;// milli_socondes
var Hours = date.getHours();
var Minutes = date.getMinutes();
var Seconds = date.getSeconds();
var stom = (60 - Seconds) * one_sec;
var stoh = ((60 - Minutes) * 60 - Seconds) * one_sec;
var audio = document.querySelector("#tics");

var ns = 'http://www.w3.org/2000/svg';
var svg = document.querySelector('#out');
var analogc = document.querySelector('#analogc');
trans = angle => `transform: ${tran1(angle)}`
tran1 = angle => `rotate(${angle}deg)`
st = (node, angle) => node["style"]["transform"] = tran1(angle)
pad = num => num < 10 ? `0${num}` : num
var should_play = false;
window.addEventListener("DOMContentLoaded", event => {
    window.onclick = function (even) {
        should_play = true;
    }
});
var angle_secnds = Seconds * 6;
var angleMinu = Minutes * 6;
var angleHours = Hours * 30 + 0.5 * Minutes;
init_style = trans(angle_secnds);
init_style_mints = trans(angleMinu);
init_style_hrs = trans(angleHours);
analogc.innerText = get_time(angleHours, angleMinu, angle_secnds);
addNs({ x1: 0, x2: 0, y1: 5, y2: -40, id: "sec", style: init_style }, ["sec", "aiguille"]);
addNs({ x1: 0, x2: 0, y1: 0, y2: -35, id: "minutes", style: init_style_mints }, ["sec", "minutes"]);
addNs({ x1: 0, x2: 0, y1: 0, y2: -28, id: "heures", style: init_style_hrs }, ["sec", "heures"]);
var sec = document.querySelector('#sec');
var minutes = document.querySelector('#minutes');
var heures = document.querySelector('#heures');
setInterval(() => { angle_secnds += 6; st(sec, angle_secnds); analogc.innerText = get_time(angleHours, angleMinu, angle_secnds); if (should_play) { audio.play(); if (angleHours % 360 == 359.5 && angle_secnds % 360 > 324) { document.querySelector('#pre').play() } if (!((angleHours + 0.5) % 360) && !((angleMinu + 6) % 360) && !(angle_secnds % 360)) { document.querySelector('#midnight').play(); } else if (((angleHours + 0.5) % 360) && !((angleMinu + 6) % 360) && !(angle_secnds % 360)) { document.querySelector('#oclock').play(); } } }, one_sec);
// console.log(`${angleHours%360}:${angleMinu%360}:${angle_secnds%360}`);
setTimeout(function () {
    angleMinu += 6; st(minutes, angleMinu);
    angleHours += 0.5; st(heures, angleHours);
    setInterval(() => { angleMinu += 6; st(minutes, angleMinu); angleHours += 0.5; st(heures, angleHours); }, 60 * one_sec);
}, stom);
function get_time(h, m, s) {
    var mod = (h % 30);
    var secnd = ((s + 1) % 360 - 1) / 6;
    var minte = mod * 2;
    var heure = (h % 360 - mod) / 30;
    heure = !heure ? 12 : heure;
    if (!secnd) {
        minte += 1;
        if (!((m + 6) % 360)) { heure += 1; }
    }
    return `${pad(heure % 12)}:${pad(minte % 60)}:${pad(secnd)}`;
}
/*setTimeout(function () {
    angleHours += 30;st(heures,angleHours);
    setInterval(()=> {angleHours += 30;st(heures,angleHours);}, 3600*one_sec);
}, stoh);*/
for (let i = 0; i < 360; i += 6) {
    var styl = trans(i);
    addNs({ x1: 0, y1: -42, x2: 0, y2: -45, style: styl }, [getCls(i)]);
}
addNs({ cx: 0, cy: 0, r: 47 }, ["outline"], "circle");
addNs({ cx: 0, cy: 0, r: 2 }, ["aiguille"], "circle");

function getCls(angle) {
    if (!`${angle / 90}`.includes(".")) { return "Quarters"; }
    else if (!`${angle / 30}`.includes(".")) { return "Thirds"; }
    else if (!`${angle / 6}`.includes(".")) { return "Units"; }
    else { return "autres"; }
}
function addNs(Attrs = {}, Classes = [], name = "line") {
    var i_svg = document.createElementNS(ns, name);
    Object.keys(Attrs).forEach(function (item, index) {
        i_svg.setAttribute(item, Attrs[item]);
    });
    Classes.forEach(function (item, index) {
        i_svg.classList.add(item);
    });
    svg.appendChild(i_svg);
}