
/*1613257190000*//*1613260790000*/
const date = new Date(), one_sec = 1000, Hours = date.getHours(), Minutes = date.getMinutes(), Seconds = date.getSeconds(), mSeconds = date.getMilliseconds(), stom = (60 - Seconds) * one_sec, stoh = ((60 - Minutes) * 60 - Seconds) * one_sec, ns = 'http://www.w3.org/2000/svg', svgNode = document.querySelector('#out'), sec = document.querySelector('#sec'), minutes = document.querySelector('#minutes'), heures = document.querySelector('#heures'), trans = angle => `transform: ${tran1(angle)}`, tran1 = angle => `rotate(${angle}deg)`, st = (node, angle) => node["style"]["transform"] = tran1(angle), pad = num => num < 10 ? `0${num}` : num, spinOpts = (spin) => ({ attributeName: "transform", keyTimes: "0;1", begin: "0s", repeatCount: "indefinite", dur: spin, type: "rotate", calcMode: "linear", values: `0 0 0;360 0 0` });
const angle_secnds = (Seconds + mSeconds / one_sec) * 6;
const angleMinu = Minutes * 6;
const angleHours = Hours * 30 + 0.5 * Minutes;
init_style = trans(angle_secnds);
init_style_mints = trans(angleMinu);
init_style_hrs = trans(angleHours);
const secds = addNs({ x1: 0, x2: 0, y1: 5, y2: -40, id: "sec", style: init_style }, ["sec", "aiguille"], 'line', svgNode, true), mints = addNs({ x1: 0, x2: 0, y1: 0, y2: -35, id: "minutes", style: init_style_mints }, ["sec", "minutes"], 'line', svgNode, true), horss = addNs({ x1: 0, x2: 0, y1: 0, y2: -28, id: "heures", style: init_style_hrs }, ["sec", "heures"], 'line', svgNode, true);
addNs(spinOpts((60).toString() + 's'), [], "animateTransform", secds);
addNs(spinOpts((60 * 60).toString() + 's'), [], "animateTransform", mints);
addNs(spinOpts((60 * 60 * 24).toString() + 's'), [], "animateTransform", horss);
addNs({ cx: 0, cy: 0, r: 47 }, ["outline"], "circle");
addNs({ cx: 0, cy: 0, r: 2 }, ["aiguille"], "circle");
for (let i = 0; i < 360; i += 6) {
    var styl = trans(i);
    addNs({ x1: 0, y1: -42, x2: 0, y2: -45, style: styl }, [getCls(i)]);
}

// console.log(`${angleHours%360}:${angleMinu%360}:${angle_secnds%360}`);
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

function getCls(angle) {
    if (!`${angle / 90}`.includes(".")) { return "Quarters"; }
    else if (!`${angle / 30}`.includes(".")) { return "Thirds"; }
    else if (!`${angle / 6}`.includes(".")) { return "Units"; }
    else { return "autres"; }
}
function addNs(Attrs = {}, Classes = [], name = "line", svg = svgNode, separateGrp = false) {
    var i_svg = document.createElementNS(ns, name);
    Object.keys(Attrs).forEach(function (item, index) {
        i_svg.setAttribute(item, Attrs[item]);
    });
    Classes.forEach(function (item, index) {
        i_svg.classList.add(item);
    });
    if (separateGrp) {
        const group = addNs({}, [], 'g', svg);
        group.appendChild(i_svg);
        return group;
    } else {
        svg.appendChild(i_svg);
    }
    return i_svg;
}
/* setTimeout(function () {
    angleMinu += 6; st(minutes, angleMinu);
    angleHours += 0.5; st(heures, angleHours);
    setInterval(() => { angleMinu += 6; st(minutes, angleMinu); angleHours += 0.5; st(heures, angleHours); }, 60 * one_sec);
}, stom);
setInterval(() => {
    angle_secnds += 6;
    st(sec, angle_secnds);
    if (should_play) {
        audio.play();
        if (angleHours % 360 == 359.5 && angle_secnds % 360 > 324) {
            document.querySelector('#pre').play();
        }
        if (!((angleHours + 0.5) % 360) && !((angleMinu + 6) % 360) && !(angle_secnds % 360)) {
            document.querySelector('#midnight').play();
        } else if (((angleHours + 0.5) % 360) && !((angleMinu + 6) % 360) && !(angle_secnds % 360)) {
            document.querySelector('#oclock').play();
        }
    }
}, one_sec); */
/*setTimeout(function () {
    angleHours += 30;st(heures,angleHours);
    setInterval(()=> {angleHours += 30;st(heures,angleHours);}, 3600*one_sec);
}, stoh);*/