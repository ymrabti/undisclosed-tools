(function () {
    var table = document.querySelector('.EpisodeList');
    let Airdate = 'Airdate';
    let Type = 'Type';
    var substr = 5; ll = 5;

    let tab2json = tableToJson(table);

    let t2json = tab2json
    // .map(e => ({ ...e, Type: e.Type.replace('MIXED CANON/', '') }));

    let Types = getListeTypes(t2json); console.log(Types);

    /* var listeParts = getListeParts(t2json);
    let maxes = writeExtremes(listeParts, 1);console.log(maxes);
    let mines = writeExtremes(listeParts, -1);console.log(mines); */

    let most_dd_mm = mostDayMonth(t2json/* .filter(e => e[Type] == Types[0]) */);
    /* let most1 = most_satits2(most_dd_mm); console.log(most1);
    let most2 = most_satits1(most_dd_mm); console.log(most2); */
    let daysyear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function f(x) {
        return x < 10 ? '0' + x : x
    }
    /* daysyear.forEach((element, index) => {
        for (let i = 1; i < element + 1; i++) {
            let loop_date = f(index + 1) + '-' + f(i);
            if (!most_dd_mm[loop_date]) {
                console.log(loop_date);
            }
        }
    }); */

    let letters = t2json.reduce((a, c) => {
        c.Title.split(' ').forEach(letter => {
            let word = letter.toLowerCase().match(/[a-z]*/i);
            if (word) {
                let word0 = word[0]//.reduce((a, c) => a + c, '');
                // let wl1 = word0.length - 1;
                let sigle = /* word0[wl1] === 's' ? word0.substr(0, wl1) : */ word0;
                if (!a[sigle.trim()]) {
                    a[sigle.trim()] = 1;
                } else {
                    a[sigle.trim()]++;
                }
            }
        })
        return a;
    }, {});
    Object.prototype.toArray = object => Object.keys(object)
        .map(key => ({ word: key, count: object[key] }))
    let letters2 = Object.toArray(letters)
        .reduce((acc, cur, ind, arr) => {
            let plurs = arr.filter(elm => {
                if (elm.word === cur.word + 's' && elm.word.length > 3) {
                    let ext = acc.filter(e => e.word === cur.word);
                    ext.length === 0 && acc.push({ ...cur, count: cur.count + elm.count });
                    return true;
                }
                if (cur.word === elm.word + 's' && cur.word.length > 3) {
                    let ext = acc.filter(e => e.word === elm.word);
                    ext.length === 0 && acc.push({ ...elm, count: elm.count + cur.count });
                    return true;
                }
                return false;
            });
            plurs.length === 0 && acc.push(cur);
            return acc;
        }, [])
        .sort((a, b) => b.count - a.count);
    console.log(letters2);

    /**
     *
     * @param {HTMLTableElement} table
     * @returns any
     */
    function tableToJson(table) {
        let head = [...table.tHead.rows[0].cells].map(function (tableRowcells) {
            return tableRowcells.innerText;
        });
        return [...table.tBodies[0].rows].map(function (tableRow) {
            return [...tableRow.cells].reduce(function (cum, tableRowcells, index) {
                cum[head[index]] = tableRowcells.innerText;
                return cum;
            }, {});
        });
    }
    function most_satits1(json) {
        return Object
            .values(json)
            .sort((a, b) => b.length - a.length)
            .map(e => (
                {
                    date: e[0][Airdate].substring(substr, substr + ll),
                    length: e.length
                }))
    }
    function most_satits2(json) {
        return Object.keys(json).reduce((a, key) => {
            let len = json[key].length;
            if (a[len]) {
                a[len].push(key);
            } else {
                a[len] = [key];
            }
            return a;
        }, {})
    }
    /**
     * 
     * @param {any[]} list_parts 
     * @returns 
     */
    function writeExtremes(list_parts, desc = 1) {
        let lp_sorted = list_parts.sort((a, b) => desc * (b.length - a.length));
        let Extremes = lp_sorted.reduce((cum, cur) => {
            let curType = cur[0][Type];
            if (!cum[curType]) {
                cum[curType] = cur;
            }
            return cum;
        }, {});
        for (const key in Extremes) {
            let smililars = lp_sorted.filter(k => k.length === Extremes[key].length && k[0][Type] === Extremes[key][0][Type]);
            Extremes[key] = smililars.length === 1 ? smililars[0] : smililars;
        }
        return Extremes;
    }
    function getListeParts(liste) {
        let temperma = liste.reduce((cum, row) => {
            if (cum.temp.map(e => e[Type]).includes(row[Type])) {
                cum.temp.push(row);
            } else {
                cum.temp.length !== 0 && cum.permanent.push(cum.temp);
                cum.temp = [];
                cum.temp.push(row);
            }
            return cum;
        }, { temp: [], permanent: [] });
        let permanent = temperma.permanent, temp = temperma.temp;
        permanent.push(temp);
        return permanent;
    }
    /**
     * 
     * @param {any[]} json 
     * @returns 
     */
    function mostDayMonth(json) {
        let types = getListeTypes(json);// console.log(types);
        return json.reduce((a, c) => {
            let datemonth = c[Airdate].substring(substr, substr + ll);
            if (a[datemonth]) {
                a[datemonth].push(c)
            } else {
                a[datemonth] = [c]
            }
            return a;
        }, {});
    }
    function getListeTypes(json) {
        return json.reduce(function (cum, tbdodyrox) {
            if (!cum.includes(tbdodyrox[Type])) {
                cum.push(tbdodyrox[Type]);
            }
            return cum;
        }, []);
    }
})()