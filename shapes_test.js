let cos = Math.cos;
let sin = Math.sin;
let PI = Math.PI;
let svg = document.querySelector("#empty"); let svg1 = document.querySelector("#fulfilled")
let rayon = 250, n = 12, dfx = 100, dfy = 100, af = 0, at = 360;
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
        // return "M" + path(even).join() + "zM" + path(odd).join() + "z";
        return [path(even) , path(odd)];
    }
    // return "M" + path(l).join() + "z";
    return [path(l)];
}
function starPolygon(noids, r, dx, dy, initial = 90, ar = false) {
    const l = StarPoints(noids, r, dx, dy, initial);
    if (ar) {
        switch (noids) {
            case 8:
                return "M" + [l[0], l[2], l[4], l[6], l[0]].join() + "zM" + [l[1], l[3], l[5], l[7], l[1]].join() + "z";
            default:
                return "M" + l.join() + "z"
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
function path(l, sep = " ") {
    var step = cstep(l.length);
    var l1 = [];
    let i = 0; let j = 0;
    while (j < l.length) {
        let listfloat = [parseFloat(l[i % l.length][0]), parseFloat(l[i % l.length][1])];
        let listText = l[i % l.length].join(sep);
        l1.push(listfloat);
        i += step; 
        j++;
    }
    let firstFloat = [parseFloat(l[0][0]),parseFloat(l[0][1])];
    let firstTxt = l[0].join(sep);
    l1.push(firstFloat);
    return l1;
}
function hilalc(xc, yc, angle, r1, dr,anglMove=90) {
    let x1 = (r1 * cos((anglMove+ angle) * PI / 180) + xc).toFixed(2);
    let y1 = (r1 * sin((anglMove+ angle) * PI / 180) + yc).toFixed(2);
    let x2 = (r1 * cos((anglMove -angle) * PI / 180) + xc).toFixed(2);
    let y2 = (r1 * sin((anglMove -angle) * PI / 180) + yc).toFixed(2);
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
// SDL1234@2021
function nest(n, angle, rayon, min_r, start,svg,dx = 0, dy = 0) {
    let i = 0, rcc = rand_color();
    let g = addNs({}, "g", svg);
    while (rayon > min_r && n > 4) {
        let alpha = 180 * i / n - angle;
        let list_gr = star(n, rayon, dx, dy, alpha);
        let star_graphic = "M" + (list_gr.length == 2 ? list_gr[0].join() +"zM"+ list_gr[1].join():list_gr[0].join())+"z";
        if (i === 0) {
            list_gr.forEach(function(item,index){
                item.forEach(function(item1,index1,arr1){
                    // console.log(index1,arr1.length);
                    if (index1 < arr1.length - 1) {
                        let indTxt = index * (arr1.length - 1) + index1;
                        addNs({ x: item1[0], y: item1[1], fill: 'red', style: `font-size:35;font-family:"Arial";` }, "text", svg, indTxt + 1);
                    }
                });
            });
        }
        let rc = rand_color();
        addNs({ d: star_graphic, style: `fill: ${rc};fill-rule:evenodd;` }, "path", g);
        let pt = IT_PTS(n, rayon, dx, dy, angle, start);
        rayon = getRayon(pt, dx, dy); i++;
    }
    addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `${af} ${0} ${0};${at} ${0} ${0}`, keyTimes: "0;1", dur: "5s", begin: "0s", repeatCount: "indefinite", style: `fill:${rand_color()};fill-rule:evenodd;` }, "animateTransform", g);
}
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
function deg2rad(deg) {
    return deg * PI / 180;
}
function draw_cstar(l, fun,ray,fillrule) {
    var step = cstep(l.length);
    var curveStar = path(l, ",");
    let curvePath = ["M", curveStar[0][0], curveStar[0][1]];
    curveStar.forEach((val, ind) => {
        if (ind !== 0) {
            curvePath = curvePath.concat(["A", ray, ray, 0, 0, fun(ind), ...val]);
        }
        var index = (ind + step) % l.length;
        var il = curveStar[ind];
        var isl = curveStar[index];
        // addNs({ x1: isl[0], y1: isl[1], x2: il[0], y2: il[1], style: `fill:none;fill-rule:evenodd;stroke:black;stroke-width:2;` }, "line", svg);
        // addNs({ d: `M${isl[0] + " " + isl[1]}` +["A", rayon, rayon, 0, 0, fun(ind), ...val.split(",")].join(" "), style: `fill:${rand_color()};fill-rule:evenodd;stroke:black;stroke-width:2;` }, "path", svg);
        addNs({ x: il[0], y: il[1], fill: 'red', style: `font-size:30;font-family:"Arial";` }, "text",svg, index + 1);
    });
    addNs({ d: curvePath.join(" "), style: `fill:${rand_color()};fill-rule:${fillrule};stroke:black;` }, "path", svg);
}
function curve_star(n, r, dx, dy, initialAngle, fun = i => 1, ray=200, fillrule="") {
    let l = StarPoints(n, r, dx, dy, initialAngle);
    if (n % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);
        let odd = l.filter((_, i) => i % 2 == 1);
        draw_cstar(even, i => 1, ray, fillrule);
        draw_cstar(odd, i => 1, ray, fillrule);
    }
    else { draw_cstar(l, fun, ray, fillrule); }
}
function rectgPts(pts) {
    var x_min = pts[0], x_max = pts[2]
        , y_min = pts[1], y_max = pts[3];
    let half_x = (x_min + x_max) / 2;
    let half_y = (y_min + y_max) / 2;
    return [
        (x_min-half_x).toFixed(3) + " " + (y_min-half_y).toFixed(3),
        (x_min-half_x).toFixed(3) + " " + (y_max-half_y).toFixed(3),
        (x_max-half_x).toFixed(3) + " " + (y_max-half_y).toFixed(3),
        (x_max-half_x).toFixed(3) + " " + (y_min-half_y).toFixed(3)
    ].join();
}
function mapp_shp(src,svg, fun = (w, h) => Math.min(w, h), tx = 0, ty = 0) {
    fetch(src)
        .then(response => response.json())
        .then(json => {
            var bboxG = json.bbox;
            var x_min = bboxG[0], x_max = bboxG[2]
                , y_min = bboxG[1], y_max = bboxG[3];
            let half_x = (x_min + x_max) / 2; let half_y = (y_min + y_max) / 2;
            let dx = 280; let dy = 280;
            let width_ = dx / (x_max - half_x); let heigth = dy / (y_max - half_y);
            var a = fun(width_, heigth);
            let points = rectgPts(bboxG.map((ii, index) => index * a + dx));
            addNs({ points, style: "fill: none;stroke:red;" }, "polygon", svg);
            json.features.forEach(function (item) {
                var listCoor = item.geometry.coordinates[0][0];
                var list = listCoor
                    .map(itm => {
                        return itm.map((ii, index) => {
                            return index === 0 ? (ii - half_x) * a + tx : -(ii - half_y) * a + ty
                        })
                    });
                addNs({ points: list.join(" "), style: `fill:${rand_color()};stroke:black;` }, "polygon", svg);
            });
        })
}
function addNs(Attrs = {}, name, pere, innerText = false) {
    var i_svg = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(Attrs).forEach(function (item, index) {
        i_svg.setAttribute(item, Attrs[item]);
    });
    if (innerText) {
        i_svg.innerHTML = innerText;
    }
    pere.appendChild(i_svg);
    return i_svg;
}
function simpleyingyang() {
    let g = addNs({}, "g", svg1);
    addNs({ d: "M-200 0A 20 20 0 1 1 0 0A 20 20 0 1 0 200 0A 20 20 0 1 1 -200 0", style: "fill:black;stroke:black;" }, "path", g);
    addNs({ d: "M-200 0A 20 20 0 1 1 200 0A 20 20 0 1 1 0 0A 20 20 0 1 0 -200 0", style: "fill:white;stroke:black;" }, "path", g);
    addNs({ cx: 100, cy: 0, r: 40, style: "fill: black;stroke:black;" }, "circle", g);
    addNs({ cx: -100, cy: 0, r: 40, style: "fill: white;stroke:white;" }, "circle", g);
    addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `${af} ${0} ${0};${at} ${0} ${0}`, keyTimes: "0;1", dur: "5s", begin: "0s", repeatCount: "indefinite", style: `fill:${rand_color()};fill-rule:evenodd;` }, "animateTransform", g);
}
function yinyang(n,R,dur="4s") {
    let g = addNs({}, "g", svg1);
    let l = StarPoints(n,R,0,0,0);
    addNs({ cx: 0, cy: 0, r: R, style: "fill: orange;stroke:black;" }, "circle", g);
    let listColors = ["black"].concat([...Array(n-2)].map((_,i)=>`rgb(${(i+1)*255/n},${(i+1)*255/n},${(i+1)*255/n})`)).concat(["white"]);
    l.forEach((element,index,arr) => {
        let ng = listColors[index],rem = (index-2+n) % n;
        let rj = n*R/4;
        let d = `M${element.join(" ")}A${rj} ${rj} 0 0 1 0 0`;
        d += `A${rj} ${rj} 0 0 0 ${arr[(index + 1) % n].join(" ")}`;
        d += `A${-1*R} ${-1*R} 0 0 0 ${element.join(" ")}`;
        addNs({ d, style: `fill:${ng};stroke:${ng};` }, "path", g);
        // addNs({ cx: element[0], cy: element[1], r: 4, style: "fill: black;stroke:black;" }, "circle", g);
        // addNs({ x1:0,y1:0,x2: element[0], y2: element[1], style: "stroke-width: 5;stroke:black;" }, "line", g);
        setTimeout(()=>{
            let inn = element.map(val => val * 0.5);
            addNs({ cx: inn[0], cy: inn[1], r: 0.4 * R / n, style: `fill: ${listColors[rem]};stroke:${listColors[rem]};` }, "circle", g);
        },(index+2)*50)
        addNs({ x: element[0], y: element[1], fill: 'red', style: `font-size:30;font-family:"Arial";` }, "text", svg1,index+1);
    });
    // addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `${af} ${0} ${0};${at} ${0} ${0}`, keyTimes: "0;1", dur, begin: "0s", repeatCount: "indefinite", style: `fill:${rand_color()};fill-rule:evenodd;` }, "animateTransform", g);
}
yinyang(2, 250, "5s");
function Google(ro = 250) {
    var dr = ro / 2.5; var ri = ro - dr;
    var str = "black;stroke-width:8;";
    // var str = "none";
    var ang1 = Math.asin(dr / (2 * ri));
    let x1 = Math.sqrt(ri ** 2 - (dr / 2) ** 2);
    let x2 = Math.sqrt(ro ** 2 - (dr / 2) ** 2);
    let pt1 = pt_cir(ro, -48).p, pt2 = pt_cir(ro, -155), pt3 = pt_cir(ro, -205), pt4 = pt_cir(ro, 48).p, pt5 = { p: x2 + " " + (-dr / 2) }, pt8 = { p: ri * cos(ang1) + " " + dr / 2 }, pt9 = pt_cir(ri, 52.5).p, pt10 = pt_cir(ri, -200), pt11 = pt_cir(ri, -160), pt12 = pt_cir(ri, -48).p;
    addNs({ d: `M${pt1}L${pt12}A${ri} ${ri} 0 0 0 ${pt11.p}L${pt2.p}A${ro} ${ro} 0 0 1${pt1}L${pt12}`, style: `fill:red;stroke:${str};` }, "path", svg);
    addNs({ d: `M${pt11.p}A${ri} ${ri} 0 0 0 ${pt10.p}L${pt3.p}A${ro} ${ro} 0 0 1 ${pt2.p}`, style: `fill:yellow;stroke:${str};` }, "path", svg);
    addNs({ d: `M${pt10.p}A${ri} ${ri} 0 0 0 ${pt9}L${pt4}A${ro} ${ro} 0 0 1 ${pt3.p}`, style: `fill:green;stroke:${str};` }, "path", svg);
    addNs({ d: `M0 ${-dr / 2}L${pt5.p}A${ro} ${ro} 0 0 1 ${pt4}L${pt9}A${ri} ${ri} 0 0 0 ${pt8.p}L0 ${dr / 2}L0 ${-dr / 2}L${pt5.p}`, style: `fill:#007FFF;stroke:${str};` }, "path", svg);
    addNs({ x1: pt11.x, y1: pt11.y, x2: pt2.x, y2: pt2.y, style: `fill:none;stroke:${str};` }, "line", svg);
    addNs({ x1: pt10.x, y1: pt10.y, x2: pt3.x, y2: pt3.y, style: `fill:none;stroke:${str};` }, "line", svg);
    // addNs({ cx: ri * cos(ang1), cy: dr/2, r: 10, style: `fill:none;stroke:red;stroke-width:5;` }, "circle", svg);
    // let line = addNs({ x1:0,x2:0,x2, y2: -dr/2, style: `fill:none;stroke:black;stroke-width:5;` }, "line", svg);
    // addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `-10 0 ${0};350 0 ${0}`, keyTimes: "0;1", dur:"5s", begin: "0s", repeatCount: "indefinite" }, "animateTransform", line);
}
function f(x, e) {
    return e.a * x + e.b;
}
function googleLines(a1, a2, x1, x2,ro,ri) {
    let pt1 = pta(ro, a1);
    let pt2 = pta(ri, a2);
    let eql1 = EQ_LINE(pt1, pt2);
    y1 = f(x1, eql1);
    y2 = f(x2, eql1);
    addNs({ x1, y1, x2, y2, style: `fill:green;stroke:black;stroke-width:5;` }, "line", svg);
}

function pt_cir(rayon, angle, dx = 0, dy = 0) {
    let x = rayon * cos(deg2rad(angle)) + dx;
    let y = rayon * sin(deg2rad(angle)) + dy;
    return { "p": x + " " + y, x, y };
}
function pta(r, a) {
    let x = parseFloat(parseFloat(pt_cir(r, a).x).toFixed(2));
    let y = parseFloat(parseFloat(pt_cir(r, a).y).toFixed(2));
    return { x, y };
}
function tangenteCircle(rayon, angle) {
    let pt = pt_cir(rayon, angle, 0, 0);
    let p = Math.tan(PI/2+deg2rad(angle));
    let b = pt.y - p * pt.x;
    let x1 = pt.x + 100; let y1 = p * x1 + b;
    let x2 = pt.x - 100; let y2 = p * x2 + b;
    addNs({ cx: 0, cy: 0, r: rayon, style: `fill:none;stroke:black;` }, "circle", svg);
    addNs({ cx: 0, cy: 0, r: 5, style: `fill:#DDDD33;stroke:yellow;` }, "circle", svg);
    var group = addNs({}, "g", svg);
    addNs({ cx: pt.x, cy: pt.y, r: 10, style: `fill:red;stroke:red;` }, "circle", group);
    addNs({ x1, y1, x2, y2, style: `stroke:red;stroke-width:3;` }, "line", group);
    // addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: "0 0 0;360 0 0", keyTimes: "0;1", dur:"4s", begin: "2s", repeatCount: "indefinite" }, "animateTransform", group);
}
function logoUchiha() {
    let dx = -60; var group = addNs({}, "g", svg);
    let ry = 200, ag = 30, da = 5, h = pt_cir(ry, 90 - da * 0.75, 0, dx).x;
    let d = `M${pt_cir(ry, ag, 0, dx).p}A${ry} ${ry} 0 1 0 ${pt_cir(ry, 180 - ag, 0, dx).p}A${ry} ${ry} 0 0 1 ${pt_cir(ry, ag, 0, dx).p}`;
    let d1 = `M${pt_cir(ry, ag + da, 0, dx).p}A${ry - 10} ${ry - 10} 0 0 0 ${pt_cir(ry, 180 - (ag + da), 0, dx).p}A${ry} ${ry} 0 0 0 ${pt_cir(ry, 90 + da * 0.75, 0, dx).p}v${0.75 * ry}H${h}L${pt_cir(ry, 90 - da * 0.75, 0, dx).p}A${ry} ${ry} 0 0 0 ${pt_cir(ry, ag + da, 0, dx).p}`;
    // 
    addNs({ width: 600, height: 600, x: -300, y: -300, stroke: "red", fill: "black" }, "rect", group);
    addNs({ d, stroke: "red", fill: "red" }, "path", group);
    addNs({ d: d1, stroke: "black", fill: "white" }, "path", group);
    // addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `0 0 ${dx};360 0 ${dx}`, keyTimes: "0;1", dur:"4s", begin: "0s", repeatCount: "indefinite" }, "animateTransform", group);
}
logoUchiha()
var rangle = Math.random() * 360;
// tangenteCircle(100, rangle);


// let x2 = 300;
// let y2 = x2 * Math.tan(PI / 2 + deg2rad(rangle));
// addNs({ x2, y2, fill: 'green', stroke: "green", style: "stroke-width:6;" }, 'line', svg);
// Google(80);
// googleLines(-155,-160,-280,180,200, 150);
// googleLines(-205,-200,-280,180,200, 150);
// var arc2 = addNs({ d: "M100 -173A200 200 0 1 0 200 0L0 0", style: `fill:none;stroke:green;stroke-width:55;` }, "path", svg);

// mapp_shp('./json/json2.json',svg,(w,h)=>150);
// mapp_shp('./json/json1.json',svg,(w,h)=>Math.min(w,h));

// nest(n, -90, 250, 5, 5,svg);

// curve_star(n, rayon, 0, 0, 90, (i) => 1-i%2,100* rayon, "evenodd");

// orochimaru curse
// var arc2 = addNs({ cx:200,cy:-200,r:50, style: `fill:none;stroke:black;` }, "circle", svg);
// var arc2 = addNs({ d:"M250 -200A250 250 0 0 1 250 0", style: `fill:none;stroke:black;` }, "path", svg);


// addNs({ d:"M0 200,200 0A150 150 0 0 0 0 -150A150 150 0 0 0 -200 0M0 200,-200 0z",fill:'red',stroke:"brown",strokeWidth:5 }, "path", svg);

// let newStars = starPolygon(n, rayon, dfx, dfy, 180);let poly = addNs({ points: newStars, style: `fill:${rand_color()};fill-rule:evenodd;stroke:black;` }, "polygon", svg);
// addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values:`${af} ${dfx} ${dfy};${at} ${dfx} ${dfy}` ,keyTimes:"0;1" ,dur:"4s" ,begin:"0s" ,repeatCount:"indefinite", style: `fill:${rand_color()};fill-rule:evenodd;` }, "animateTransform", poly);
// addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values:`${af} ${0} ${0};${at} ${0} ${0}` ,keyTimes:"0;1" ,dur:"4s" ,begin:"0s" ,repeatCount:"indefinite", style: `fill:${rand_color()};fill-rule:evenodd;` }, "animateTransform", poly);

let rr = 20, dur = "1s";
// var arc1 = addNs({ d: hilalc(0, rr, 60, 80, 5, 90), style: `fill:${rand_color()}` }, "path", svg1);
// addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `0 0 ${rr};360 0 ${rr}`, keyTimes: "0;1", dur, begin: "0s", repeatCount: "indefinite" }, "animateTransform", arc1);

// var arc2 = addNs({ d: hilalc(0, -rr, 60, 80, 5, 270), style: `fill:${rand_color()}` }, "path", svg1);
// addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `0 0 ${-rr};360 0 ${-rr}`, keyTimes: "0;1", dur, begin: "0s", repeatCount: "indefinite" }, "animateTransform", arc2);
