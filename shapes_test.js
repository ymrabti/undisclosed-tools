let cos = Math.cos;
let sin = Math.sin;
let PI = Math.PI;
// let boundaries = require("./json/json1.json");
// console.log(boundaries);
fetch('./json/json1.json').then(response => response.json()).then(json => console.log(json))
function StarPoints(noids, r, dx, dy, initialAngle) {
    return [...Array(noids)].map((_, i) => {
        let angle = (360 / noids) * i - initialAngle;
        let angra = angle * PI / 180;
        let coss = cos(angra) * r + dx;
        let sinn = sin(angra) * r + dy;
        return [coss.toFixed(2), sinn.toFixed(2)];
    })
}
function star(noids, r, dx, dy, initial = 90, ar = false) {
    const l = StarPoints(noids, r, dx, dy, initial);
    if (ar) {
        switch (noids) {
            case 8:
                return "M" + [l[0], l[2], l[4], l[6], l[0]].join() + "zM" + [l[1], l[3], l[5], l[7], l[1]].join() + "z";
                break;
            default:
                return "M" + l.join() + "z"
                break;
        }
    }
    if (noids % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);
        let odd = l.filter((_, i) => i % 2 == 1);
        return "M" + path(even).join() + "zM" + path(odd).join() + "z";
    }
    return "M" + path(l).join() + "z";
}
function starPolygon(noids, r, dx, dy, initial = 90, ar = false) {
    const l = StarPoints(noids, r, dx, dy, initial);
    if (ar) {
        switch (noids) {
            case 8:
                return "M" + [l[0], l[2], l[4], l[6], l[0]].join() + "zM" + [l[1], l[3], l[5], l[7], l[1]].join() + "z";
                break;
            default:
                return "M" + l.join() + "z"
                break;
        }
    }
    if (noids % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);
        let odd = l.filter((_, i) => i % 2 == 1);
        return path(even).join() + " " + path(odd).join();
    }
    return path(l).join();
}
function cstep(noids) {
    if (noids % 2 == 1) {
        return (noids - noids % 2) / 2;
    } else {
        return ((noids - 1) - (noids - 1) % 2) / 2;
    }
}
function path(l,sep=" ") {
    var step = cstep(l.length);
    var l1 = [];
    let i = 0; let j = 0;
    while (j < l.length) {
        l1.push(l[i % l.length].join(sep));
        i += step; j++;
    }
    l1.push(l[0].join(sep));
    return l1;
}
function addNs(Attrs = {}, Classes = [], name = "line", pere) {
    var i_svg = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(Attrs).forEach(function (item, index) {
        i_svg.setAttribute(item, Attrs[item]);
    });
    Classes.forEach(function (item, index) {
        i_svg.classList.add(item);
    });
    document.querySelector(pere).appendChild(i_svg);
}
function hilalc(xc, yc, angle, r1, dr) {
    let x1 = (r1 * cos(angle * PI / 180) + xc).toFixed(2);
    let y1 = (r1 * sin(angle * PI / 180) + yc).toFixed(2);
    let x2 = (r1 * cos(-angle * PI / 180) + xc).toFixed(2);
    let y2 = (r1 * sin(-angle * PI / 180) + yc).toFixed(2);
    return `M${x1} ${y1}A${r1} ${r1} 0 1 1 ${x2} ${y2} ${r1 - dr} ${r1 - dr} 0 1 0 ${x1} ${y1}`;
}
function hilal(x1, y1, x2, y2, r1, r2) {
    return `M${x1} ${y1}A${r1} ${r1} 0 1 0 ${x2} ${y2} ${r2} ${r2} 0 1 1 ${x1} ${y1}`;
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
function nest(n = 6, angle = 0, rayon = 250, min_r = 1, start = 1) {
    let dx = 300, dy = 300, i = 0;
    while (rayon > min_r && n > 4) {
        let alpha = 180 * i / n - angle;
        let star_graphic = star(n, rayon, dx, dy, alpha);
        let rc = rand_color();
        addNs({ d: star_graphic, style: `fill: ${rc};fill-rule:evenodd;` }, [], "path", "#empty");
        let pt = IT_PTS(n, rayon, dx, dy, angle, start);
        rayon = getRayon(pt, dx, dy); i++;
    }
    // addNs({ d: star(n, rayon, dx, dy,(n%4===1 || n % 4 === 2) ? 180/n:angle), style: `fill: none;stroke:${rand_color()};` }, [], "path", "#empty");
}
// nest(10, -90, 250, 5, 2);
function arc(r, angle, da, dr, xc, yc) {
    let angle1 = angle * PI / 180;
    let angle2 = (180 - da - angle) * PI / 180;

    let x1 = (r * cos(angle1) + xc).toFixed(2);
    let y1 = (r * sin(angle1) + yc).toFixed(2);
    let x2 = (r * cos(angle2) + xc).toFixed(2);
    let y2 = (r * sin(angle2) + yc).toFixed(2);

    let x3 = ((r + dr) * cos(angle1) + xc).toFixed(2);
    let y3 = ((r + dr) * sin(angle1) + yc).toFixed(2);
    let x4 = ((r + dr) * cos(angle2) + xc).toFixed(2);
    let y4 = ((r + dr) * sin(angle2) + yc).toFixed(2);

    let arc1 = `M${x1} ${y1}A${r} ${r} 0 1 1 ${x2} ${y2}`;
    let arc2 = `M${x3} ${y3}A${r + dr} ${r + dr} 0 1 0 ${x4} ${y4}`;
    let path = `${arc1}${arc1}m${x1} ${y1}z`;
    addNs({ cx: x1, cy: y1, r: 4, style: "fill: blue;" }, [], "circle", "#empty");
    addNs({ cx: x2, cy: y2, r: 4, style: "fill: blue;" }, [], "circle", "#empty");
    addNs({ cx: x3, cy: y3, r: 4, style: "fill: red;" }, [], "circle", "#empty");
    addNs({ cx: x4, cy: y4, r: 4, style: "fill: red;" }, [], "circle", "#empty");
    return path;
}
function curve_star(n,r,dx,dy,initialAngle,fun=i=>1) {
    let l = StarPoints(n, r, dx, dy, initialAngle);
    var curveStar;
    if (n % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);console.log(even);
        let odd = l.filter((_, i) => i % 2 == 1);console.log(odd);
        curveStar = path(even,",").concat(path(odd,","));
    }
    curveStar = path(l, ",");console.log(curveStar);
    let curvePath = ["M", curveStar[0].split(",")[0], curveStar[0].split(",")[1]];
    curveStar.forEach((val,ind)=>{
        if (ind!==0) {
            curvePath = curvePath.concat(["A", rayon, rayon, 0, 1, fun(ind), ...val.split(",")]);
        }
    })
    addNs({ d: curvePath.join(" "), style: `fill:${rand_color()};fill-rule:evenodd;` }, [], "path", "#empty");
}

let rayon = 100,n=6;
let newStars = starPolygon(n, 200, 300, 300, 90);
addNs({ points: newStars, style: `fill:${rand_color()};fill-rule:evenodd;` }, [], "polygon", "#empty");

curve_star(n,200,300,300,90,(i)=>i%2);

var d = [
    "M", 300, 100,
    "A", rayon, rayon, 0, 1, 1, 417.56, 461.80,
    "A", rayon, rayon, 0, 1, 0, 109.79, 238.20,
    "A", rayon, rayon, 0, 1, 1, 490.21, 238.20,
    "A", rayon, rayon, 0, 1, 0, 182.44, 461.80,
    "A", rayon, rayon, 0, 1, 1, 300.00, 100.00,"z"
].join(" ");
// addNs({ d, style: `fill:${rand_color()};fill-rule:evenodd;` }, [], "path", "#empty");

// addNs({ d: "M 600 300A 200 200 0 1 1 600 300", style: "fill:rgba(0,0,0,0.1);stroke:black;" }, [], "path", "#empty");
// addNs({ cx: dx, cy: dy, r: rayon, style: "fill: none;stroke:blue;" }, [], "circle", "#empty");