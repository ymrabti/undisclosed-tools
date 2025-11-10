// Stars
function star(noids, r, dx, dy, initial = 90, ar = false) {
    const l = StarPoints(noids, r, dx, dy, initial);
    if (ar) {
        switch (noids) {
            case 8:
                return (
                    'M' +
                    [l[0], l[2], l[4], l[6], l[0]].join() +
                    'zM' +
                    [l[1], l[3], l[5], l[7], l[1]].join() +
                    'z'
                );
            default:
                return 'M' + l.join() + 'z';
        }
    }
    if (noids % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);
        let odd = l.filter((_, i) => i % 2 == 1);
        // return "M" + path(even).join() + "zM" + path(odd).join() + "z";
        return [path(even), path(odd)];
    }
    // return "M" + path(l).join() + "z";
    return [path(l)];
}

/**
 *
 * @param {number} n number of vertices
 * @param {number} angle initial angle
 * @param {number} rayon rayon exterior
 * @param {number} min_r rayon interior
 * @param {number} start vertice start
 * @param {Object} Attrs Attributes
 * @param {object} spin spin or not
 * @param {number} dx dx
 * @param {number} dy dy
 */
function nested_stars(n, angle, rayon, min_r, start, spin, Attrs = init_attrs, dx = 0, dy = 0) {
    const svg = addSVG(Attrs);
    let i = 0;
    let g = addNs({}, 'g', svg);
    while (rayon > min_r && n > 4) {
        let alpha = (180 * i) / n - angle;
        let list_gr = star(n, rayon, dx, dy, alpha);
        const pathInner =
            list_gr.length == 2 ? list_gr[0].join() + 'zM' + list_gr[1].join() : list_gr[0].join();
        let star_graphic = 'M' + pathInner + 'z';
        let rc = rand_color();
        addNs({ d: star_graphic, style: `fill: ${rc};fill-rule:evenodd;` }, 'path', g);
        let pt = IT_PTS(n, rayon, dx, dy, angle, start);
        rayon = getRayon(pt, dx, dy);
        i++;
    }
    if (spin) addNs(spinOpts(spin), 'animateTransform', g);
}

/**
 * @param {Array} options.pt points count
 * @param {number} options.r rayon
 * @param {number} options.dx dx
 * @param {number} options.dy dy
 * @param {number} options.initialAngle initial angle
 * @param {function} options.fun function
 * @param {number} options.ray ray
 * @param {string} options.fillrule fillrule
 * @param {string} options.fillcolor fillcolor
 */
function curve_star(options) {
    const svg = addSVG();
    let l = StarPoints(options.n, options.r, options.dx, options.dy, options.initialAngle);
    if (options.n % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);
        let odd = l.filter((_, i) => i % 2 == 1);
        draw_cstar(even, (_i) => 1, options.ray, options.fillrule, svg, options.fillcolor);
        draw_cstar(odd, (_i) => 1, options.ray, options.fillrule, svg, options.fillcolor);
    } else {
        draw_cstar(l, options.fun, options.ray, options.fillrule, svg, options.fillcolor);
    }
}

function starPolygon(noids, r, dx, dy, initial = 90, ar = false) {
    const l = StarPoints(noids, r, dx, dy, initial);
    if (ar) {
        switch (noids) {
            case 8:
                return (
                    'M' +
                    [l[0], l[2], l[4], l[6], l[0]].join() +
                    'zM' +
                    [l[1], l[3], l[5], l[7], l[1]].join() +
                    'z'
                );
            default:
                return 'M' + l.join() + 'z';
        }
    }
    if (noids % 4 == 2) {
        let even = l.filter((_, i) => i % 2 == 0);
        let odd = l.filter((_, i) => i % 2 == 1);
        return path(even).join() + ' ' + path(odd).join();
    }
    return path(l).join();
}

function draw_cstar(l, fun, ray, fillrule, svg, fillcolor = rand_color()) {
    // var step = cstep(l.length);
    var curveStar = path(l, ',');
    let curvePath = ['M', curveStar[0][0], curveStar[0][1]];
    curveStar.forEach((val, ind) => {
        if (ind !== 0) {
            const ry = fun(ind);
            curvePath = curvePath.concat(['A', ray, ray, 0, 0, ry, ...val]);
        }
    });
    addNs(
        {
            d: curvePath.join(' '),
            style: `fill:${fillcolor};fill-rule:${fillrule};stroke:transparent;`,
        },
        'path',
        svg
    );
}

// Arcs
function hilalc(xc, yc, angle, r1, dr, anglMove = 90) {
    let x1 = (r1 * cos(((anglMove + angle) * PI) / 180) + xc).toFixed(2);
    let y1 = (r1 * sin(((anglMove + angle) * PI) / 180) + yc).toFixed(2);
    let x2 = (r1 * cos(((anglMove - angle) * PI) / 180) + xc).toFixed(2);
    let y2 = (r1 * sin(((anglMove - angle) * PI) / 180) + yc).toFixed(2);
    return `M${x1} ${y1}A${r1} ${r1} 0 1 1 ${x2} ${y2} ${r1 - dr} ${r1 - dr} 0 1 0 ${x1} ${y1}`;
}

function hilal(x1, y1, x2, y2, r1, r2) {
    return `M${x1} ${y1}A${r1} ${r1} 0 1 0 ${x2} ${y2} ${r2} ${r2} 0 1 1 ${x1} ${y1}`;
}

function radar(r, angle, ouverture, dr) {
    let angle1 = (angle * PI) / 180;
    let angle2 = ((180 - ouverture - angle) * PI) / 180;
    let pt1 = pt_cir(r, angle - ouverture / 2, 0, 0);
    let pt2 = pt_cir(r, angle + ouverture / 2, 0, 0);
    let ori1 = pt_cir(dr, angle - 90, 0, 0);
    let ori2 = pt_cir(dr, angle + 90, 0, 0);
    let o = pt_cir(0, 0, 0, 0);

    // let arc2 = `M${x3} ${y3}A${r + dr} ${r + dr} 0 1 0 ${x4} ${y4}`;
    let int = ouverture > 180 ? 1 : 0;
    let line1 = `M${o.p} l${pt1.p} `;
    let arc1 = `${line1} A${r} ${r} 0 ${int} 1 ${pt2.p}`;
    //
    let line2 = `M${o.p} L${ori1.p} L${pt1.p} A${r} ${r} 0 ${int} 1 ${pt2.p} L${ori2.p} `;
    let arc2 = `${line2}`;
    let path2 = `${arc2}z`;
    var elementString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="-50 -50 100 100">
        <rect x="-50" y="-50" width="100" height="100" fill="black" />
        <path d="${path2}" fill="blue" />
        <circle r="${dr}" cx="${o.x}" cy="${o.y}" fill="blue" stroke="white" stroke-width="1" />
        <!-- <circle r="${2}" cx="${pt1.x}" cy="${pt1.y}" fill="red" />
        <circle r="${2}" cx="${pt2.x}" cy="${pt2.y}" fill="red" />
        <circle r="${2}" cx="${ori1.x}" cy="${ori1.y}" fill="orange" />
        <circle r="${2}" cx="${ori2.x}" cy="${ori2.y}" fill="orange" /> -->
    </svg>
    `;
    var div = document.createElement('div');
    div.style.width = 'fit-content';
    div.innerHTML = elementString.trim();
    document.body.appendChild(div);
}

// Circles
/**
 * draws a spirale
 * @param {number} rayon exterior rayon
 * @param {number} angle_initial initial angle
 * @param {number} dist_step step points
 * @param {number} rayon_step step between rayons in 360 round
 * @param {number} spin spin duration tour
 */
function spiral(rayon, angle_initial, dist_step = 20, rayon_step = 35, spin = '5s') {
    const svg = addSVG({ ...init_attrs, width: 400 }),
        g = addNs({}, 'g', svg);
    let points_list = [],
        angles_points = [],
        i = 0,
        this_ray = dist_step,
        angle = angle_initial;
    while (this_ray <= rayon) {
        const this_angle_step = rad2deg(dist_step / this_ray);
        angle += this_angle_step;
        let point = pt_cir(this_ray, angle, 0, 0);
        angles_points.push({ angle, this_ray, ...point });
        points_list.push([point.x, point.y]);
        addNs({ cx: point.x, cy: point.y, r: 3 }, 'circle', g);
        this_ray += (rayon_step / 360) * this_angle_step;
        i++;
    }
    const pts = points_list.join(' ');
    addNs(
        { points: pts, fill: 'none', stroke: rand_color(), style: 'stroke-width:2;' },
        'polyline',
        g
    );
    !!spin && addNs(spinOpts(spin), 'animateTransform', g);
}

function yinyang(n, R, spin) {
    const svg1 = addSVG();
    (g = addNs({}, 'g', svg1)), //
        (l = StarPoints(n, R, 0, 0, 0)),
        (lr = StarPoints(n, 0, 0, 0, 45));
    addNs({ cx: 0, cy: 0, r: R, style: 'fill: orange;stroke:black;' }, 'circle', g);
    const yingColor = rand_color();
    const listColors = gradientColors(n, yingColor, reverse_color(yingColor));
    l.forEach((element, index, arr) => {
        let ng = listColors[index]; /* , rem = (index - 2 + n) % n; */
        let rj = R / 2;
        const fMove = `M${element.join(' ')}A${rj} ${rj} 0 0 1 `;
        let d = `${fMove}${lr[index].join(' ')} M${lr[(index + 1) % n].join(' ')}`;
        d += `A${rj} ${rj} 0 0 0 ${arr[(index + 1) % n].join(' ')}`;
        d += `A${-1 * R} ${-1 * R} 0 0 0 ${element.join(' ')}`;
        addNs({ d, style: `fill:${ng};stroke:${ng};` }, 'path', g);
    });
    for (let i = 0; i < n; i++) {
        addNs(
            {
                cx: l[i][0] / 2,
                cy: l[i][1] / 2,
                r: R * 0.25,
                style: `fill:${listColors[i]};stroke:black;`,
            },
            'circle',
            g
        );
    }
    if (spin) {
        addNs(spinOpts(spin), 'animateTransform', g);
    }
}

function getLineCircleIntersections(x1, y1, x2, y2, centerX, centerY, radius) {
    const m = (y2 - y1) / (x2 - x1);
    const c = y1 - m * x1;
    const A = 1 + m * m;
    const B = 2 * (m * c - m * centerY - centerX);
    const C = centerX * centerX + centerY * centerY + c * c - 2 * c * centerY - radius * radius;
    const discriminant = B * B - 4 * A * C;
    if (discriminant < 0) {
        return [];
    } else if (discriminant === 0) {
        const x = -B / (2 * A);
        const y = m * x + c;
        return [{ x, y }];
    } else {
        const x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const y1 = m * x1 + c;

        const x2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        const y2 = m * x2 + c;

        return [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
        ];
    }
}

function tangenteCircle(rayon, angle) {
    const svg = addSVG();
    let pt = pt_cir(rayon, angle, 0, 0);
    let p = Math.tan(PI / 2 + deg2rad(angle));
    let b = pt.y - p * pt.x;
    let x1 = pt.x + 100;
    let y1 = p * x1 + b;
    let x2 = pt.x - 100;
    let y2 = p * x2 + b;
    addNs({ cx: 0, cy: 0, r: rayon, style: `fill:none;stroke:black;` }, 'circle', svg);
    addNs({ cx: 0, cy: 0, r: 5, style: `fill:#DDDD33;stroke:yellow;` }, 'circle', svg);
    var group = addNs({}, 'g', svg);
    addNs({ cx: pt.x, cy: pt.y, r: 10, style: `fill:red;stroke:red;` }, 'circle', group);
    addNs({ x1, y1, x2, y2, style: `stroke:red;stroke-width:3;` }, 'line', group);
    addNs(
        {
            attributeName: 'transform',
            type: 'rotate',
            calcMode: 'linear',
            values: '0 0 0;360 0 0',
            keyTimes: '0;1',
            dur: '4s',
            begin: '2s',
            repeatCount: 'indefinite',
        },
        'animateTransform',
        group
    );
}

// GIS
async function mapp_shp(src, fun = (w, h) => Math.min(w, h), tx = 0, ty = 0) {
    const svg = addSVG();
    var response = await fetch(src);
    const json = await response.json();
    var bboxG = json.bbox;
    if (!bboxG) {
        bboxG = [...json.features].reduce(
            function (prev, curr) {
                var coors = curr.geometry.coordinates[0][0];
                coors.forEach(function (item) {
                    if (item[0] < prev[0]) prev[0] = item[0];
                    if (item[0] > prev[2]) prev[2] = item[0];
                    if (item[1] < prev[1]) prev[1] = item[1];
                    if (item[1] > prev[3]) prev[3] = item[1];
                });
                return prev;
            },
            [Infinity, Infinity, -Infinity, -Infinity]
        );
    }
    var x_min = bboxG[0],
        x_max = bboxG[2],
        y_min = bboxG[1],
        y_max = bboxG[3];
    let half_x = (x_min + x_max) / 2;
    let half_y = (y_min + y_max) / 2;
    let dx = 280;
    let dy = 280;
    let width_ = dx / (x_max - half_x);
    let heigth = dy / (y_max - half_y);
    var a = fun(width_, heigth);
    let points = rectgPts(bboxG.map((ii, index) => index * a + dx));
    addNs({ points, style: 'fill: none;stroke:red;' }, 'polygon', svg);
    json.features.forEach(function (item) {
        var listCoor = item.geometry.coordinates[0][0];
        var list = listCoor.map((itm) => {
            return itm.map((ii, index) => {
                return index === 0 ? (ii - half_x) * a + tx : -(ii - half_y) * a + ty;
            });
        });
        addNs(
            { points: list.join(' '), style: `fill:${rand_color()};stroke:black;` },
            'polygon',
            svg
        );
    });
}

function comments() {
    const svg1 = addSVG({ ...init_attrs, width: 400, height: 400 });

    const rr = 80;
    const dur = '8s';

    var arc1 = addNs(
        { d: hilalc(0, rr, 60, 80, 5, 90), style: `fill:${rand_color()}` },
        'path',
        svg1
    );
    addNs(
        {
            attributeName: 'transform',
            type: 'rotate',
            calcMode: 'linear',
            values: `0 0 ${rr};360 0 ${rr}`,
            keyTimes: '0;1',
            dur,
            begin: '0s',
            repeatCount: 'indefinite',
        },
        'animateTransform',
        arc1
    );
    var arc2 = addNs(
        { d: hilalc(0, -rr, 60, 80, 5, 270), style: `fill:${rand_color()}` },
        'path',
        svg1
    );
    addNs(
        {
            attributeName: 'transform',
            type: 'rotate',
            calcMode: 'linear',
            values: `0 0 ${-rr};360 0 ${-rr}`,
            keyTimes: '0;1',
            dur,
            begin: '0s',
            repeatCount: 'indefinite',
        },
        'animateTransform',
        arc2
    );
}

function simpleyingyang(spin) {
    const svg1 = addSVG();
    let g = addNs({}, 'g', svg1);
    addNs(
        {
            d: 'M-200 0A 20 20 0 1 1 0 0A 20 20 0 1 0 200 0A 20 20 0 1 1 -200 0',
            style: 'fill:black;stroke:black;',
        },
        'path',
        g
    );
    addNs(
        {
            d: 'M-200 0A 20 20 0 1 1 200 0A 20 20 0 1 1 0 0A 20 20 0 1 0 -200 0',
            style: 'fill:white;stroke:black;',
        },
        'path',
        g
    );
    addNs({ cx: 100, cy: 0, r: 40, style: 'fill: black;stroke:black;' }, 'circle', g);
    addNs({ cx: -100, cy: 0, r: 40, style: 'fill: white;stroke:white;' }, 'circle', g);
    spin && addNs(spinOpts(spin), 'animateTransform', g);
}

function Google(ro = 250) {
    const svg = addSVG();
    var dr = ro / 2.5;
    var ri = ro - dr;
    var str = 'black;stroke-width:8;';
    // var str = "none";
    var ang1 = Math.asin(dr / (2 * ri));
    let x1 = Math.sqrt(ri ** 2 - (dr / 2) ** 2);
    let x2 = Math.sqrt(ro ** 2 - (dr / 2) ** 2);
    let pt1 = pt_cir(ro, -48).p,
        pt2 = pt_cir(ro, -155),
        pt3 = pt_cir(ro, -205),
        pt4 = pt_cir(ro, 48).p,
        pt5 = { p: x2 + ' ' + -dr / 2 },
        pt8 = { p: ri * cos(ang1) + ' ' + dr / 2 },
        pt9 = pt_cir(ri, 52.5).p,
        pt10 = pt_cir(ri, -200),
        pt11 = pt_cir(ri, -160),
        pt12 = pt_cir(ri, -48).p;
    addNs(
        {
            d: `M${pt1}L${pt12}A${ri} ${ri} 0 0 0 ${pt11.p}L${pt2.p}A${ro} ${ro} 0 0 1${pt1}L${pt12}`,
            style: `fill:red;stroke:${str};`,
        },
        'path',
        svg
    );
    addNs(
        {
            d: `M${pt11.p}A${ri} ${ri} 0 0 0 ${pt10.p}L${pt3.p}A${ro} ${ro} 0 0 1 ${pt2.p}`,
            style: `fill:yellow;stroke:${str};`,
        },
        'path',
        svg
    );
    addNs(
        {
            d: `M${pt10.p}A${ri} ${ri} 0 0 0 ${pt9}L${pt4}A${ro} ${ro} 0 0 1 ${pt3.p}`,
            style: `fill:green;stroke:${str};`,
        },
        'path',
        svg
    );
    addNs(
        {
            d: `M0 ${-dr / 2}L${pt5.p}A${ro} ${ro} 0 0 1 ${pt4}L${pt9}A${ri} ${ri} 0 0 0 ${
                pt8.p
            }L0 ${dr / 2}L0 ${-dr / 2}L${pt5.p}`,
            style: `fill:#007FFF;stroke:${str};`,
        },
        'path',
        svg
    );
    addNs(
        { x1: pt11.x, y1: pt11.y, x2: pt2.x, y2: pt2.y, style: `fill:none;stroke:${str};` },
        'line',
        svg
    );
    addNs(
        { x1: pt10.x, y1: pt10.y, x2: pt3.x, y2: pt3.y, style: `fill:none;stroke:${str};` },
        'line',
        svg
    );
    addNs(
        { cx: ri * cos(ang1), cy: dr / 2, r: 10, style: `fill:none;stroke:red;stroke-width:5;` },
        'circle',
        svg
    );
    let line = addNs(
        { x1: 0, x2: 0, x2, y2: -dr / 2, style: `fill:none;stroke:black;stroke-width:5;` },
        'line',
        svg
    );
    addNs(
        {
            attributeName: 'transform',
            type: 'rotate',
            calcMode: 'linear',
            values: `-10 0 ${0};350 0 ${0}`,
            keyTimes: '0;1',
            dur: '5s',
            begin: '0s',
            repeatCount: 'indefinite',
        },
        'animateTransform',
        line
    );
}

function logoUchiha() {
    const svg = addSVG();
    let dx = -60;
    var group = addNs({}, 'g', svg);
    let ry = 200,
        ag = 30,
        da = 5,
        h = pt_cir(ry, 90 - da * 0.75, 0, dx).x;
    let d = `M${pt_cir(ry, ag, 0, dx).p}A${ry} ${ry} 0 1 0 ${
        pt_cir(ry, 180 - ag, 0, dx).p
    }A${ry} ${ry} 0 0 1 ${pt_cir(ry, ag, 0, dx).p}`;
    let d1 = `M${pt_cir(ry, ag + da, 0, dx).p}A${ry - 10} ${ry - 10} 0 0 0 ${
        pt_cir(ry, 180 - (ag + da), 0, dx).p
    }A${ry} ${ry} 0 0 0 ${pt_cir(ry, 90 + da * 0.75, 0, dx).p}v${0.75 * ry}H${h}L${
        pt_cir(ry, 90 - da * 0.75, 0, dx).p
    }A${ry} ${ry} 0 0 0 ${pt_cir(ry, ag + da, 0, dx).p}`;
    //
    /* addNs(
        { width: 600, height: 600, x: -300, y: -300, stroke: 'red', fill: 'black' },
        'rect',
        group
    ); */
    addNs({ d, stroke: 'red', fill: 'red' }, 'path', group);
    addNs({ d: d1, stroke: 'black', fill: rand_color() }, 'path', group);
    /* addNs(
        {
            attributeName: 'transform',
            type: 'rotate',
            calcMode: 'linear',
            values: `0 0 ${dx};360 0 ${dx}`,
            keyTimes: '0;1',
            dur: '4s',
            begin: '0s',
            repeatCount: 'indefinite',
        },
        'animateTransform',
        group
    ); */
}

Number.prototype.ron = function (gaps = 2) {
    return Math.round(this * 10 ** gaps) / 10 ** gaps;
};

const svg = document.querySelector('#empty');
const svg1 = document.querySelector('#fulfilled');

const rayon = 250,
    n = 12,
    dfx = 100,
    dfy = 100,
    af = 0,
    at = 360,
    svgw = 400;
const init_attrs = { viewBox: '-300, -300, 600, 600', width: svgw };
let rr = 20,
    dur = '1s';
// tangenteCircle(200, 80);
// radar(42, -90, 60, 8);
// Google();
// logoUchiha();
// simpleyingyang('8s');
// mapp_shp('/assets/geojson/morocco.geojson', (w, h) => Math.min(w, h));
comments();
mapp_shp('/assets/geojson/ts.json', (w, h) => Math.min(w, h));
yinyang(2, 250, '8s');
spiral(250, 0, 20, 50, false);
nested_stars(5, -90, 250, 75, 2, false, { ...init_attrs, width: 400 });
curve_star({
    n: 7,
    r: rayon,
    dx: 0,
    dy: 0,
    initialAngle: 90,
    fun: (i) => 1 - (i % 2),
    ray: 5.7 * rayon,
    fillrule: 'evenodd',
    fillcolor: 'green',
});
