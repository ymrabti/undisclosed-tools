let cos = Math.cos;
let sin = Math.sin;
let PI = Math.PI;
function deg2rad(deg) {
    return deg * Math.PI / 180;
}
function rad2deg(rad) {
    return rad * 180 / PI;
}
/**
 * 
 * @param {number} rayon Rayon
 * @param {number} angle Angle
 * @param {number} dx dx
 * @param {number} dy dy
 * @returns Object
 */
function pt_cir(rayon, angle, dx = 0, dy = 0) {
    let x = rayon * cos(deg2rad(angle)) + dx;
    let y = rayon * sin(deg2rad(angle)) + dy;
    return { "p": x.toFixed(2) + " " + y.toFixed(2), x: x, y: y };
}
function StarPoints(noids, r, dx, dy, initialAngle) {
    return [...Array(noids)].map((_, i) => {
        let angle = (360 / noids) * i - initialAngle;
        let angra = angle * PI / 180;
        let coss = cos(angra) * r + dx;
        let sinn = sin(angra) * r + dy;
        return [coss.toFixed(2), sinn.toFixed(2)];
    })
}
function cstep(noids) {
    if (noids % 2 == 1) {
        return (noids - noids % 2) / 2;
    } else {
        return ((noids - 1) - (noids - 1) % 2) / 2;
    }
}
function EQ_LINE(P1, P2) {
    return {
        a: (P1.y - P2.y) / (P1.x - P2.x),
        b: (P1.x * P2.y - P2.x * P1.y) / (P1.x - P2.x)
    }
}
function IT_LINES(L1, L2) {
    let q = (L2.b - L1.b) / (L1.a - L2.a);
    return {
        x: q.toFixed(2),
        y: (L1.a * q + L1.b).toFixed(2)
    }
}
function IT_PTS(noids, r, dx, dy, initial, start = 0) {
    let l = StarPoints(noids, r, dx, dy, initial);
    let step = cstep(noids);
    let line1_start_point = start % noids;
    let line1__end__point = (start + step) % noids;
    let x1 = l[line1_start_point][0]; let y1 = l[line1_start_point][1];
    let x2 = l[line1__end__point][0]; let y2 = l[line1__end__point][1];
    // addNs({d:`M${x1} ${y1},${x2} ${y2}`,style:"stroke: red;" }, [], "path", "#empty");
    let L1 = EQ_LINE({ x: parseFloat(x1), y: parseFloat(y1) }, { x: parseFloat(x2), y: parseFloat(y2) });
    let line2_start_point = (start + 1) % noids;
    let line2__end__point = (start + 1 + noids - step) % noids;
    let x3 = l[line2_start_point][0]; let y3 = l[line2_start_point][1];
    let x4 = l[line2__end__point][0]; let y4 = l[line2__end__point][1];
    // addNs({d:`M${x3} ${y3},${x4} ${y4}`,style:"stroke: blue;"},[], "path", "#empty");
    let L2 = EQ_LINE({ x: parseFloat(x3), y: parseFloat(y3) }, { x: parseFloat(x4), y: parseFloat(y4) });
    return IT_LINES(L1, L2);
}
function rand_color() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`
}
function getRayon(pt, dx, dy) {
    return Math.sqrt((pt.x - dx) ** 2 + (pt.y - dy) ** 2);
}
function f(x, e) {
    return e.a * x + e.b;
}
function pta(r, a) {
    let x = parseFloat(parseFloat(pt_cir(r, a).x).toFixed(2));
    let y = parseFloat(parseFloat(pt_cir(r, a).y).toFixed(2));
    return { x, y };
}