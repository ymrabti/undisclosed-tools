trans = angle => `transform: ${tran1(angle)};`
tran1 = angle => `rotate(${angle}deg)`
st = (node, angle) => node["style"]["transform"] = tran1(angle)
function reverseColor(color) {
    var red = color[0] + color[1];
    var green = color[2] + color[3];
    var blue = color[4] + color[5];
    var _red = 255 - parseInt(red, 16);
    var _green = 255 - parseInt(green, 16);
    var _blue = 255 - parseInt(blue, 16);
    var _red_ = _red.toString(16);
    var _green_ = _green.toString(16);
    var _blue_ = _blue.toString(16);
    var _red_ = _red_.length > 1 ? _red_ : `0${_red_}`;
    var _green_ = _green_.length > 1 ? _green_ : `0${_green_}`;
    var _blue_ = _blue_.length > 1 ? _blue_ : `0${_blue_}`;
    return _red_ + _green_ + _blue_;
}
pad = num => num < 10 ? `0${num}` : num
// document.querySelectorAll("[style*='stroke']");
class TimeCity {
    static ctr = 120;
    static sizeHarmonize = 150;
    static ns = 'http://www.w3.org/2000/svg';
    static newXlocks = document.querySelector("#NewClocks");
    static txtSize = 25 * TimeCity.ctr / TimeCity.sizeHarmonize;
    constructor(Time_Zone, cityID, Mode_12) {
        this.timeZone = Time_Zone;
        this.CityId = cityID;
        var divParent = TimeCity.addElmnt({ align: "center" }, [`col-sm-4`], "div", TimeCity.newXlocks);
        var fatherSon = TimeCity.addElmnt({ style: `background-color: #1A1A1A;border: 2px solid gray;padding: 5px;margin: 5px` }, [], "div", divParent);
        var svg_out = TimeCity.addNs({ viewBox: `0, 0, ${2 * TimeCity.ctr}, ${2 * TimeCity.ctr}`, id: this.CityId }, [], "svg", fatherSon);
        var svg_in = TimeCity.addNs({ viewBox: "-37,-33,300,300", align: "center" }, [], "svg", svg_out);
        var g_tag = TimeCity.addNs({}, [], "g", svg_in);
        var path_tag = TimeCity.addNs({ d: pathNumbers, style: "fill: #7A7CFF;" }, [], "path", g_tag);
        var paraStyle = `color: #7C7CFF;font-size: ${TimeCity.txtSize}px;font-family:Verdana sans-serif;line-height:115%;`;
        var Citypara = TimeCity.addElmnt({ style: paraStyle, align: "center" }, [], "p", fatherSon);
        var Numeric = TimeCity.addElmnt({ style: paraStyle, align: "center" }, [], "p", fatherSon);
        this.svgOut = svg_out;
        this.Citypara = Citypara;
        this.Numeric = Numeric;
        this.Mode12 = Mode_12;
        this.init_svg();
    }
    init_svg() {
        const one_sec = 1000; var ce = this;
        const da_te = new Date();
        const hrsutc = this.timeZone / 60;
        const ph = Math.abs(hrsutc);
        const phfloor = Math.floor(ph);
        const minutes = (ph - phfloor) * 60; 
        const PlusHours = hrsutc !== 0 ? ` ${hrsutc > 0 ? `+` : '-'}${phfloor.toFixed(2)}H` : ``;
        this.Citypara.innerText = `${this.CityId} (GMT${PlusHours}${minutes !== 0 ? ` ${minutes.toFixed()}m` : ''})`;
        const date = new Date(da_te.getTime() + (da_te.getTimezoneOffset() + this.timeZone) * 60000);
        const int_sto = one_sec - (date.getMilliseconds() / 1000) * one_sec;
        this.AngleSecnds = date.getSeconds() * 6;
        this.AngleMinuts = date.getMinutes() * 6;
        this.AngleHourss = date.getHours() * 30 + .5 * date.getMinutes();
        this.GraphSecndsProp = TimeCity.addNs({ x1: TimeCity.ctr, x2: TimeCity.ctr, y1: TimeCity.ctr * 1.24, y2: TimeCity.ctr * .2, name: "Scnds", style: `${TimeCity.stckw(0.4)} stroke: #FF00FF;fill: #0E0AFF;` }, ["sec"], "line", this.svgOut);
        this.GraphMinutsProp = TimeCity.addNs({ x1: TimeCity.ctr, x2: TimeCity.ctr, y1: TimeCity.ctr * 1.14, y2: TimeCity.ctr * .3, name: "Mnuts", style: `${TimeCity.stckw(0.8)} stroke: #CC00FF;` }, ["sec"], "line", this.svgOut);
        this.GraphHourssProp = TimeCity.addNs({ x1: TimeCity.ctr, x2: TimeCity.ctr, y1: TimeCity.ctr * 1.1, y2: TimeCity.ctr * .44, name: "Hours", style: `${TimeCity.stckw(1.1)} stroke: #AE00FF;` }, ["sec"], "line", this.svgOut);
        this.CircleOut = TimeCity.addNs({ cx: TimeCity.ctr, cy: TimeCity.ctr, r: .94 * TimeCity.ctr, style: `${TimeCity.stckw(1.4)} stroke: #0E0AFF;fill: #7A7CFF50` }, [], "circle", this.svgOut);
        this.CircleIn = TimeCity.addNs({ cx: TimeCity.ctr, cy: TimeCity.ctr, r: .05 * TimeCity.ctr, style: "stroke: #FF00FF;fill: #0E0AFF;" }, [], "circle", this.svgOut);
        for (let i = 0; i < 360; i += 6) {
            var __ = TimeCity.getCls(i); var cls = __[0]; var st_wsth = __[1];
            var styl = `${trans(i)}${cls}${TimeCity.stckw(st_wsth)}`;
            TimeCity.addNs({ x1: TimeCity.ctr, x2: TimeCity.ctr, y1: .1 * TimeCity.ctr, y2: .16 * TimeCity.ctr, style: styl }, ["sec"], "line", this.svgOut);
        }
        ce.readAngles(this.Mode12);
        ce.MoveSecnds(0); ce.MoveMinuts(0); ce.MoveHourss(0);
        setTimeout(function () {
            ce.Update();
            setInterval(() => { ce.Update(); }, one_sec)
        }, int_sto);
    }
    Update() {// this.readAngles(this.Mode12);
        this.MoveSecnds();
        if (!this.readAngles(this.Mode12)) {//1613613510678
            this.MoveMinuts(); this.MoveHourss();
        }
        this.readAngles(this.Mode12);
    }
    readAngles(M12) {
        this.Mode12 = M12;
        var mod = this.AngleHourss % 30;
        var secnd = (this.AngleSecnds % 360) / 6;
        var minte = mod * 2; var mnte1 = (this.AngleMinuts % 360) / 6;
        var heure = ((this.AngleHourss % 720 - mod) / 30) % 24;
        this.Numeric.innerText = `${pad(M12 && heure != 12 ? heure % 12 : heure)}:${pad(minte)}:${pad(secnd)} (${M12 ? `${(heure > 11 ? `PM` : `AM`)}` : `24H`})`;
        return secnd;
    }
    MoveSecnds = (val = 6) => { this.AngleSecnds += val; st(this.GraphSecndsProp, this.AngleSecnds); }
    MoveMinuts = (val = 6) => { this.AngleMinuts += val; st(this.GraphMinutsProp, this.AngleMinuts); }
    MoveHourss = (val = .5) => { this.AngleHourss += val; st(this.GraphHourssProp, this.AngleHourss); }
    static stckw = (l) => `stroke-width: ${l * TimeCity.ctr / 40};`
    static addNs(Attrs = {}, Classes = [], name = "line", pere) {
        var i_svg = document.createElementNS(TimeCity.ns, name);
        Object.keys(Attrs).forEach(function (item, index) {
            i_svg.setAttribute(item, Attrs[item]);
        });
        Classes.forEach(function (item, index) {
            i_svg.classList.add(item);
        });
        pere.appendChild(i_svg); return i_svg;
    }
    static addElmnt(Attrs = {}, Classes = [], name = "line", pere) {
        var i_elmnt = document.createElement(name);
        Object.keys(Attrs).forEach(function (item, index) {
            i_elmnt.setAttribute(item, Attrs[item]);
        });
        Classes.forEach(function (item, index) {
            i_elmnt.classList.add(item);
        });
        pere.appendChild(i_elmnt); return i_elmnt;
    }
    static getCls(angle) {
        if (!`${angle / 90}`.includes(".")) { return ["stroke: #0E0EFF;", 1.5]; }
        else if (!`${angle / 30}`.includes(".")) { return ["stroke: #4040FF;", 1]; }
        else if (!`${angle / 6}`.includes(".")) { return ["stroke: #7C7CFF;", 0.5]; }
        else { return ["stroke: #AEAEFF;", 0.3]; }
    }
}

var dateCurrentCity = new Date();
let CurrentCity = new TimeCity(-dateCurrentCity.getTimezoneOffset(), "Current City", false);
let Casablanca = new TimeCity(60, "Casablanca", true);
let NewYork = new TimeCity(-300, "New York", true);
let AbuDhabi = new TimeCity(240, "Abu Dhabi", true);
let Cairo = new TimeCity(120, "Cairo", false);
let MyCity = new TimeCity(-430, "My City", true);

