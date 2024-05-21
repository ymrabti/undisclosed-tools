var listOutputs = [{ "price": 200, "libelle": "Lkar" }, { "price": 5, "libelle": "grand taxi" }, { "price": 6, "libelle": "tram" }, { "price": 12, "libelle": "tram" }, { "price": 95, "libelle": "librairie" }, { "price": 22, "libelle": "food" }, { "price": 6, "libelle": "tram" }, { "price": 6, "libelle": "tram" }, { "price": 15, "libelle": "grand taxi" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 23, "libelle": "grand taxi" }, { "price": 12, "libelle": "tram" }, { "price": 10.5, "libelle": "food" }, { "price": 23, "libelle": "grand taxi" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 13.5, "libelle": "librairie" }, { "price": 20, "libelle": "librairie" }, { "price": 20, "libelle": "arrondissement" }, { "price": 15, "libelle": "grand taxi" }, { "price": 9, "libelle": "librairie" }, { "price": 34, "libelle": "food" }, { "price": 10, "libelle": "librairie" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 3.5, "libelle": "food" }, { "price": 23, "libelle": "grand taxi" }, { "price": 12, "libelle": "tram" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 33, "libelle": "tran" }, { "price": 4, "libelle": "pisri" }, { "price": 15, "libelle": "grand taxi" }, { "price": 5, "libelle": "pisri" }, { "price": 20, "libelle": "tobis" }, { "price": 6, "libelle": "grand taxi" }, { "price": 45, "libelle": "grand taxi" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 4, "libelle": "librairie" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 120, "libelle": "tran" }, { "price": 3, "libelle": "librairie" }, { "price": 8, "libelle": "pisri" }, { "price": 60, "libelle": "covoiturage" }, { "price": 7, "libelle": "grand taxi" }, { "price": 7, "libelle": "tram" }, { "price": 2, "libelle": "pisri" }, { "price": 1, "libelle": "sada9a" }, { "price": 29, "libelle": "food" }, { "price": 23, "libelle": "covoiturage" }, { "price": 7.5, "libelle": "grand taxi" }, { "price": 7, "libelle": "petit taxi" }, { "price": 21, "libelle": "grand taxi" }, { "price": 7, "libelle": "grand taxi" }, { "price": 25, "libelle": "triporteur" }, { "price": 200, "libelle": "Lkar" }, { "price": 10, "libelle": "sndou9" }, { "price": 6, "libelle": "pisri" }, { "price": 15, "libelle": "triporteur" }, { "price": 1.5, "libelle": "sada9a" }, { "price": 2, "libelle": "hmas kamoun" }, { "price": 25, "libelle": "hmizat" }, { "price": 15, "libelle": "hmizat" }, { "price": 5, "libelle": "librairie" }, { "price": 1, "libelle": "toilette" }, { "price": 5, "libelle": "pisri" }, { "price": 60, "libelle": "Lkar" }, { "price": 1, "libelle": "sada9a" }, { "price": 20, "libelle": "KAKI" }, { "price": 2, "libelle": "pisri" }];
var listFactures = [{ "price": 59, "libelle": "win" }, { "price": 1, "libelle": "i9tita3" }, { "price": 10, "libelle": "pass win" }, { "price": 10, "libelle": "recharge" }, { "price": 10, "libelle": "recharge" }, { "price": 10, "libelle": "recharge" }, { "price": 68.99, "libelle": "jumia" }, { "price": 10, "libelle": "recharge" }, { "price": 10, "libelle": "recharge" }];
var listGifts = [{ "price": 20, "libelle": "fouzia" }, { "price": 26, "libelle": "cash plus" }, { "price": 1, "libelle": "veste" }, { "price": 200, "libelle": "mosala" }];
groupBy = lalist => {
    var map = new Map(lalist.map(({ libelle }) => [libelle, { libelle, price: 0, count: 0 }]));
    for (var { price, libelle, count } of lalist) { var mapgt = map.get(libelle); mapgt.price += price; mapgt.count += 1; }
    return Array.from(map.values());
}
const listLib = groupBy(listOutputs);
const lsl = listOutputs.length;
const reducerCount = (a, b) => a + b.count;
const reducerPrice = (a, b) => a + b.price;
const count = listLib.reduce(reducerCount, 0);
const globale = listLib.reduce(reducerPrice, 0);
const totale = listOutputs.reduce(reducerPrice, 0);
const gifts = listGifts.reduce(reducerPrice, 0);
const factures = listFactures.reduce(reducerPrice, 0);
const initial = 1800;
const retraite = 1400;
const resteCash = retraite - totale + gifts;
const resteCompte = initial - (factures + retraite);
const totaleReste = resteCompte + resteCash;
const resteMain = totaleReste - resteCompte % 100;
/**
 * max and where
 * @param {any[]} list liste
 * @returns
 */
const getMaximum = (list) => {
    const items = list.map(o => (o.count ? `${o.libelle} (${o.count})` : `${o.libelle}`).length);
    const max = Math.max(...items);
    return max;
}
const Intervalle = (n) => Math.floor(n / 4)
/**
 * max and where
 * @param {any[]} list liste
 * @returns {any[]}
 */
const harmonizerDevTools = (list) => {
    return list.map((itemO, indexO) => {
        const itemOO = itemO.sort((a, b) => b?.count - a?.count);
        const maxi = getMaximum(itemOO);
        const txtmxI = Intervalle(maxi);
        return [
            `-----------  New (${indexO + 1})----------`,
            ...itemOO.map((o) => {
                var text = o.count ? `${o.libelle} (${o.count})` : `${o.libelle}`;
                return `${`${text + "\t".repeat(txtmxI - Intervalle(text.length) + 1)}:`}\t${o.price}`.toUpperCase();
            }),
            "--------------------------"
        ];
    });
}


/**
 * max and where
 * @param {any[]} list liste
 * @returns {any[]}
 */
const harmonizerNodejs = (list) => {
    return list.map((itemO, indexO) => {
        const itemOO = itemO.sort((a, b) => b?.count - a?.count);
        const maxi = getMaximum(itemOO);
        return [
            `-----------  New (${indexO + 1})----------`,
            ...itemOO.map((o) => {
                var text = o.count ? `${o.libelle} (${o.count})` : `${o.libelle}`;
                return `${`${text + " ".repeat(maxi - text.length + 2)}:`}\t${o.price}`.toUpperCase();
            }),
            "--------------------------"
        ];
    });
}



var listShow = [
    { libelle: "Retraité" /*********/, price: retraite /*****/ },
    { libelle: "Reste Cash" /*******/, price: resteCash /****/ },
    { libelle: "Reste Compte" /*****/, price: resteCompte /**/ },
    { libelle: "Reste Totale" /*****/, price: totaleReste /**/ },
    { libelle: "Reste En Main" /****/, price: resteMain /****/ },
    { libelle: "Totale" /***********/, price: totale /*******/ },
    { libelle: "Totale Auditeur" /**/, price: globale /******/ },
    { libelle: "Count" /************/, price: count /********/ },
    { libelle: "Count Audite" /*****/, price: lsl /**********/ },
];
console.log(harmonizerNodejs([
    listShow,
    groupBy(listOutputs),
    groupBy(listFactures)
]).map(e => e.join('\n')).join('\n'));

// console.table(listShow);
// console.table(groupBy(listOutputs));
// console.table(groupBy(listFactures));

