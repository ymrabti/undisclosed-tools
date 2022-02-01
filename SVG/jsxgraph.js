var brd = JXG.JSXGraph.initBoard('box1',// id of the div
    {
        axis: true// draw axes x and y
        , boundingbox: [
            -20, // min x 
            24,  // max y
            20,  // max x
            -24  // min y
        ]
    });

var s = brd.create('slider', [[10, 15], [15, 15], [10, 20, 100]], { name: 'n', snapWidth: 1 });
var a = brd.create('slider', [[10, 12.5], [15, 12.5], [-10, -10, 0]], { name: 'start' });
var b = brd.create('slider', [[10, 10], [15, 10], [0, 15, 20]], { name: 'end' });

var f = x => Math.E * Math.LN10 * Math.PI * Math.SQRT2 * Math.SQRT1_2 * Math.sin(x);
var plot = brd.create(
    'functiongraph',
    [
        f,
        function () { return a.Value(); },
        function () { return b.Value(); }
    ]
);

var os = brd.create(
    'riemannsum', [
    f,
    function () { return s.Value(); },
    function () { return "left"; },
    function () { return a.Value(); },
    function () { return b.Value(); }
],
    {
        fillColor: '#ff0f00',
        fillOpacity: 0.4
    }
);

/*var p1 = brd.create('point', [0, 10], { face: 'o', size: 5, strokeColor: 'red', fillOpacity: 0.3, strokeOpacity: 0.3 });
var p2 = brd.create('point', [5, 10], { face: 'o', size: 5, strokeColor: 'red', fillOpacity: 0.3, strokeOpacity: 0.3 });
const arrow = brd.create('arrow', [p1, p2], { strokeWidth: 3, strokeOpacity: 0.7, strokeColor: 'blue' });
var i = 0;
setInterval(() => {
    p1.moveTo(
        [
            20 * Math.sin(i * Math.SQRT2 * 3 / 12),
            20 * Math.cos(i * Math.SQRT2 * 3 / 12)
        ],
        1000
    );
    plot.moveTo(
        [
            20 * Math.cos(i * Math.E),
            20 * Math.sin(i * Math.E)
        ],
        2000
    );
    i++;
}, 500);*/


var button1 = brd.create('button', [-16, 8, 'Add point', addPoint], {});
var p = [];
p[0] = brd.create('point', [-1, 2], { size: 4 });
p[1] = brd.create('point', [3, -1], { size: 4 });
var f = JXG.Math.Numerics.lagrangePolynomial(p);
var graph = brd.create('functiongraph', [f, -10, 10], { strokeWidth: 3 });
// var d1 = brd.create('functiongraph', [JXG.Math.Numerics.D(f), -10, 10], { dash: 1 });
// var d2 = brd.create('functiongraph', [JXG.Math.Numerics.D(JXG.Math.Numerics.D(f)), -10, 10], { dash: 2 });

function addPoint() {
    p.push(brd.create('point', [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10], { size: 4 }));
    brd.update();
}