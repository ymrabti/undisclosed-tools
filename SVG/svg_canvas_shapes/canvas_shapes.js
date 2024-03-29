var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "magenta";
ctx.fill();
function yinyang(n, R) {
    let scl = i => (i + 1) * 255 / (n - 1);
    let dx = 300, dy = 300;
    const listFrwd = [...Array(Math.ceil((n+1) / 2))].map((_, i) => `rgb(${scl(i)},${scl(i)},${scl(i)})`)
    const listBckr = listFrwd.reverse()
    var listColors = ["black"].concat(listFrwd, listBckr);
    circle(300, 300, 4, 0, 2 * Math.PI);
    circle(300, 300, R, 0, 2 * Math.PI);

    ctx.beginPath();
    ctx.arc(300, 300, R, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    for (let index = 0; index < n; index++) {
        let tangle = deg2rad(index * 360 / n);
        let nangle = deg2rad((index - 1) * 360 / n);
        // circle(R*cos(tangle)+dx, R*sin(tangle)+dy, 5, 0, 2 * Math.PI,false,"green");

        let c1x = 0.5 * R * cos(tangle) + dx;
        let c1y = 0.5 * R * sin(tangle) + dy;
        let c2x = 0.5 * R * cos(nangle) + dx;
        let c2y = 0.5 * R * sin(nangle) + dy;
        ctx.beginPath();
        ctx.arc(c1x, c1y, R / 2, tangle, tangle + PI);
        ctx.arc(c2x, c2y, R / 2, nangle - PI, nangle, true);
        ctx.arc(300, 300, R, nangle, tangle);
        ctx.strokeStyle = listColors[index];
        ctx.stroke();
        ctx.fillStyle = listColors[index];
        ctx.fill();

        /* setTimeout(() => {
            const degIndex = (index + 0.0) * 360 / n;
            let c1x = 0.5 * R * cos(deg2rad(degIndex)) + dx;
            let c1y = 0.5 * R * sin(deg2rad(degIndex)) + dy;
            circle(c1x, c1y, 0.5 * R / n, 0, 2 * Math.PI, false, listColors[(n + index - 1) % n]);
        }, 100 * index); */
    }

}
yinyang(160, 200);

function circle(cx, cy, r, as, ae, clock, fill) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, as, ae, clock);
    ctx.fillStyle = fill;
    ctx.stroke();
    ctx.fill();
}

/* let pt0 = l[0];
let pt1 = l[1];
let pt2 = l[2];
let pt3 = l[3];
ctx.beginPath();
ctx.arc(pt0[0]/2+150, pt0[1]/2+150, R / 2,0,PI);
ctx.arc(pt3[0]/2+150, pt3[1]/2+150, R / 2,deg2rad(360/n), deg2rad(360 / n)+PI,true);
ctx.arc(300, 300, R,-deg2rad(360/n), 0);
ctx.fillStyle = "#FF0000";
ctx.stroke();
ctx.fill();


ctx.beginPath();
ctx.arc(pt3[0]/2+150, pt3[1]/2+150, R / 2, deg2rad(360 / n), deg2rad(360 / n)+PI,true);
ctx.arc(pt2[0]/2+150, pt2[1]/2+150, R / 2,2*deg2rad(360/n), 2*deg2rad(360 / n)+PI);
ctx.arc(300, 300, R, -2*deg2rad(360 / n),-deg2rad(360/n));
ctx.fillStyle = "#00FF00";
ctx.stroke();
ctx.fill(); */

// addNs({ attributeName: "transform", type: "rotate", calcMode: "linear", values: `${af} ${0} ${0};${at} ${0} ${0}`, keyTimes: "0;1", dur: "4s", begin: "0s", repeatCount: "indefinite" }, "animateTransform", g);
