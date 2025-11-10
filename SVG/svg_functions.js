let cos = Math.cos;
let sin = Math.sin;
let PI = Math.PI;
/**
 *
 * @param {Object} Attrs Attributes
 * @param {string} name nom
 * @param {Element} pere document
 * @param {boolean} innerText text
 * @returns {SVGElement}
 */
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

function spinOpts(spin) {
    return {
        attributeName: 'transform',
        type: 'rotate',
        calcMode: 'linear',
        values: `${af} ${0} ${0};${at} ${0} ${0}`,
        keyTimes: '0;1',
        dur: spin,
        begin: '0s',
        repeatCount: 'indefinite',
    };
}

function addSVG(Attrs = init_attrs) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', Attrs.viewBox);
    svg.setAttribute('width', Attrs.width);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    addNs(
        {
            width: 600,
            height: 600,
            x: -300,
            y: -300,
            stroke: 'black',
            fill: 'none',
            style: 'stroke-width:3;',
        },
        'rect',
        svg
    );
    document.body.appendChild(svg);
    return svg;
}

function path(l, sep = ' ') {
    var step = cstep(l.length);
    var l1 = [];
    let i = 0;
    let j = 0;
    while (j < l.length) {
        let listfloat = [parseFloat(l[i % l.length][0]), parseFloat(l[i % l.length][1])];
        let listText = l[i % l.length].join(sep);
        l1.push(listfloat);
        i += step;
        j++;
    }
    let firstFloat = [parseFloat(l[0][0]), parseFloat(l[0][1])];
    let firstTxt = l[0].join(sep);
    l1.push(firstFloat);
    return l1;
}

function rectgPts(pts) {
    var x_min = pts[0],
        x_max = pts[2],
        y_min = pts[1],
        y_max = pts[3];
    let half_x = (x_min + x_max) / 2;
    let half_y = (y_min + y_max) / 2;
    return [
        (x_min - half_x).toFixed(3) + ' ' + (y_min - half_y).toFixed(3),
        (x_min - half_x).toFixed(3) + ' ' + (y_max - half_y).toFixed(3),
        (x_max - half_x).toFixed(3) + ' ' + (y_max - half_y).toFixed(3),
        (x_max - half_x).toFixed(3) + ' ' + (y_min - half_y).toFixed(3),
    ].join();
}


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

/**
 * 
 * @param {number} noids Number of Noids
 * @param {number} r radius
 * @param {double} dx dx
 * @param {number} dy dy
 * @param {number} initialAngle number
 * @returns string
 */
function StarPoints(noids, r, dx, dy, initialAngle) {
    return [...Array(noids)].map((_, i) => {
        let angle = (360 / noids) * i - initialAngle;
        let angra = angle * PI / 180;
        let coss = (Math.cos(angra) * r) + dx;
        let sinn = (Math.sin(angra) * r) + dy;
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

// 24ef75 6123eb
// 0a0375 f5fc8a
function rand_color() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function reverse_color(hex) {
    // Remove the '#' if it's there
    hex = hex.replace('#', '');
    // Invert the color
    let r = (255 - parseInt(hex.substring(0, 2), 16)).toString(16).padStart(2, '0');
    let g = (255 - parseInt(hex.substring(2, 4), 16)).toString(16).padStart(2, '0');
    let b = (255 - parseInt(hex.substring(4, 6), 16)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

function gradientBlackToWhite(n) {
    if (n < 2) return ['black'];
    const colors = [];
    for (let i = 0; i < n; i++) {
        const v = Math.round((i / (n - 1)) * 255);
        colors.push(`rgb(${v}, ${v}, ${v})`);
    }
    return colors;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3)
        hex = hex
            .split('')
            .map((c) => c + c)
            .join('');
    const int = parseInt(hex, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function rgbToHex([r, g, b]) {
    return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
}

function gradientColors(n, color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const colors = [];

    for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t);
        const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t);
        const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t);
        colors.push(rgbToHex([r, g, b]));
    }

    return colors;
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

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

function lcm(a, b) {
    if (a === 0 || b === 0) {
        return 0;
    }
    return Math.abs((a * b) / gcd(a, b));
}

