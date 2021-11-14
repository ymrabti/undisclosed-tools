var listStock: Consommation[] = [{
    date: '02-11-2021',
    libelle: 'food',
    price: 48//dirhams
}, {
    date: '02-11-2021',
    libelle: 'logement',
    price: 1500
}];
var retrait: Retarit[] = [{
    date: '02-11-2021',
    GAB: 2000
}];
var listLib = [];
listStock.forEach(function (item, index) {
    var lib = item.libelle; var pr = item.price;
    if (listLib.length == 0) {
        var objet: myInterface = {}; objet.libelle = lib; objet.price = pr;
        listLib.push(objet); objet.count = 1;
    } else {
        var found = false;
        for (let item1 of listLib) {
            if (item1.libelle == lib) {
                item1.price += pr; item1.count += 1;
                found = true;
                break;
            }
        }
        if (!found) {
            var objet: myInterface = {}; objet.libelle = lib; objet.price = pr; objet.count = 1;
            listLib.push(objet);
        }
    }
});
//////////////////////////////////// # 1 //////////////////////////////////////////////
var map = new Map(listStock.map(({ libelle }) => [libelle, { libelle, price: 0 }]));
for (let { price, libelle } of listStock) map.get(libelle).price += price;
var result = Array.from(map.values());
console.log(result);

//////////////////////////////////// # 2 //////////////////////////////////////////////
var finalData = listStock.reduce((acc, curr) => {
    var label = curr.libelle;
    acc[label] = acc[label] ? acc[label] + curr.price : curr.price || 0;
    return acc;
}, {})
console.log(finalData);

//////////////////////////////////// # 3 //////////////////////////////////////////////
var arr = ['Car', 'Car', 'Truck', 'Boat', 'Truck'];
var hist = {};
arr.map(a => (a in hist) ? hist[a]++ : hist[a] = 1);
console.log(hist);

//////////////////////////////////// # 4 //////////////////////////////////////////////
var map2 = new Map(arr.map(this_ => [this_, { this_, count: 0 }]));
arr.forEach(function (item, index) {
    map2.get(item).count += 1;
});
var result = Array.from(map.values());
console.log(result);

//////////////////////////////////// # 4 //////////////////////////////////////////////
var groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});

//////////////////////////////////// # 4 //////////////////////////////////////////////
var groupBy1 = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
//////////////////////////////////// # 4 //////////////////////////////////////////////
function groupBy2(xs) {
    return xs.reduce(function (prev, item) {
        (item in prev) ? prev[item]++ : prev[item] = 1;
        return prev;
    }, {});
};
interface myInterface {
    libelle?: string;
    price?: number;
    count?: number
}
interface Consommation {
    date: string;
    libelle: string,
    price: number
}

interface Retarit {
    date: string;
    GAB: number
}
