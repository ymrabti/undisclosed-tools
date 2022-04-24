function serialize(form) {
    var field, s = [];
    if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {
        var len = form.elements.length;
        for (i = 0; i < len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                if (field.type == 'select-multiple') {
                    for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                        if (field.options[j].selected)
                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                    }
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                }
            }
        }
    }
    return s.join('&').replace(/%20/g, '+');
}
const grafButton = document.querySelector('#grafButton');
grafButton.addEventListener("click", function (event) {
    console.log(event);
    event.preventDefault();
    gwidth = Math.min((contentWidth - 20), Math.min(700, Number(document.getElementById("gwidth").value)));
    document.getElementById("gwidth").value = gwidth;

    gheight = Math.min(600, Number(document.getElementById("gheight").value));
    document.getElementById("gheight").value = gheight;

    document.getElementById("asvg1Wrap").style.width = gwidth + "px";
    asvg1Wrap.style.height = gheight + "px";
    queryStr = serialize(document.getElementById("makeGraph"));
    url.innerHTML = " <a href=\"" + window.location.pathname + "?" + queryStr + "\">Permanent link to your graph</a>";
    drawGraphs();
});
function doSvgGraph() {
    // gwidth, gheight are NOT global (so don't refer to DOM inputs)
    var x_Min, x_Max, gwidth, gheight, doOnce = false, g_Width;

    var xMinInput = document.getElementById("xMin");
    var xMaxInput = document.getElementById("xMax");
    var yMinInput = document.getElementById("yMin");
    var yMaxInput = document.getElementById("yMax");
    var xGridBox = document.getElementById("xGrid");
    var yGridBox = document.getElementById("yGrid");
    errMessage = "";

    drawGraphs = function () {
        var xGrid, yGrid;
        content = document.getElementById("content");
        contentWidth = content.clientWidth;
        contentHeight = content.clientHeight;
        gwidth = Math.min(700, asvg1Wrap.clientWidth);

        if (!doOnce) { // reset on browser resize
            gheight = Math.min(600, asvg1Wrap.clientHeight);
            doOnce = true;
        } else {
            gheight = asvg1Wrap.clientHeight;
        }
        asvg1Wrap.style.height = gheight + "px";


        //document.getElementById("gwidth").setAttribute("value", gwidth);

        document.getElementById("gwidth").value = gwidth;
        document.getElementById("gheight").value = gheight;

        boardWidthToHeight = gheight / gwidth;
        //

        if (equalScaling.value == "equal") {
            equalScaling.checked = "checked";
        }

        if (equalScaling.checked) {
            yMaxInput.value = "";
            yMaxInput.disabled = "disabled";
            yMax = null;  // Must be null and not ''

        } else {
            yMaxInput.disabled = '';
            if (!Number(yMaxInput.value)) {
                yMax = Math.round(Number(yMinInput.value) + 12) + 0.3;
            } else {
                yMax = Number(yMaxInput.value);
            }
        }

        yMaxInput.value = yMax;
        boardID = "asvg1";

        if (xMinInput.value !== "") {
            xMin = Number(xMinInput.value);
        } else {
            errMessage = "Minimum <i>x</i>-value required!";
        }

        if (xMaxInput.value !== "") {
            xMax = Number(xMaxInput.value);
        } else {
            errMessage = "Maximum <i>x</i>-value required!";
        }

        if (xMin >= xMax) {
            errMessage = "Max-<i>x</i> must be greater than Min-<i>x</i>!";
        }

        if (yMinInput.value !== "") {
            yMin = Number(yMinInput.value);
        } else {
            errMessage = "Minimum <i>y</i>-value required!";
        }

        if (yMaxInput.value !== "") {
            yMax = Number(yMaxInput.value);
            if (yMin >= yMax) {
                errMessage = "Max-<i>y</i> must be greater than Min-<i>y</i>!";
            }
        }

        /*if(numPts.value > 30000) {
            errMessage = "Max number of points is 30,000!";
        }*/

        padding = 17;
        //
        removeEle("asvg1SVG");
        removeEle("spinnerWrapWrap");
        //
        initBoard(boardID, xMin, xMax, yMin, yMax);  // For equally scaled, only define xMin, xMax, yMin

        if (xGridBox.value) {
            xGrid = Number(xGridBox.value);
        } else {
            xGrid = 1;
            xGridBox.value = xGrid;
        }
        if (yGridBox.value) {
            yGrid = Number(yGridBox.value);
        } else {
            yGrid = 1;
            yGridBox.value = xGrid;
        }

        if (errMessage.length == 0) {
            axes(xGrid, yGrid, "labels", xGrid, yGrid);

            fill = "none";
            strokewidth = 1.5;
            stroke = "#165a71";
            fn1 = function1.value;
            if (fn1 !== '') {
                plot(fn1, xMin, xMax, 500); // fun,x_min,x_max,points,id		 
            }
            stroke = "#cc00cc";
            fn2 = function2.value;
            if (fn2 !== '') {
                plot(fn2, xMin, xMax, 500);
            }
        } else {
            url.innerHTML = '<span class="dred">' + errMessage + '</span>';
            errMessage = '';
        }
    }
    drawGraphs();

    equalScaling.addEventListener("change", function () {


        if (equalScaling.checked) {
            equalScaling.value = "equal";
        } else {
            equalScaling.value = "";
            yMaxInput.value = "";
        }

        queryStr = serialize(document.getElementById("makeGraph"));
        url.innerHTML = " <a href=\"" + window.location.pathname + "?" + queryStr + "\">Permanent link to your graph</a>";
        drawGraphs();
    });

    ///////////////////////////////////////
    //
    // Resize throttler
    //
    ///////////////////////////////////////		
    window.addEventListener("resize", resizeThrottler, false);
    var resizeTimeout;

    function resizeThrottler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function () {
                resizeTimeout = null;
                actualResizeHandler();
            }, 1000);
        }
    }
    function actualResizeHandler() {
        doOnce = false;
        drawGraphs();
    }

}