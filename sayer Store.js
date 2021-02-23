var listStock=[{"price":200,"libelle":"tazmoutine"},{"price":5,"libelle":"grand taxi"},{"price":6,"libelle":"tram"},{"price":12,"libelle":"tram"},{"price":95,"libelle":"librairie"},{"price":22,"libelle":"food"},{"price":6,"libelle":"tram"},{"price":6,"libelle":"tram"},{"price":15,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":23,"libelle":"grand taxi"},{"price":12,"libelle":"tram"},{"price":10.5,"libelle":"food"},{"price":23,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":13.5,"libelle":"librairie"},{"price":20,"libelle":"librairie"},{"price":20,"libelle":"arrondissement"},{"price":15,"libelle":"grand taxi"},{"price":9,"libelle":"librairie"},{"price":34,"libelle":"food"},{"price":10,"libelle":"librairie"},{"price":7.5,"libelle":"grand taxi"},{"price":3.5,"libelle":"food"},{"price":23,"libelle":"grand taxi"},{"price":12,"libelle":"tram"},{"price":7.5,"libelle":"grand taxi"},{"price":33,"libelle":"tran"},{"price":4,"libelle":"pisri"},{"price":15,"libelle":"grand taxi"},{"price":5,"libelle":"pisri"},{"price":20,"libelle":"tobis"},{"price":6,"libelle":"grand taxi"},{"price":45,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":4,"libelle":"librairie"},{"price":7.5,"libelle":"grand taxi"},{"price":120,"libelle":"tran"},{"price":3,"libelle":"librairie"},{"price":8,"libelle":"pisri"},{"price":60,"libelle":"covoiturage"},{"price":7,"libelle":"grand taxi"},{"price":7,"libelle":"tram"},{"price":2,"libelle":"pisri"},{"price":1,"libelle":"sada9a"},{"price":29,"libelle":"food"},{"price":23,"libelle":"covoiturage"}];
listStock.forEach(function(item, index) {
  var lib=item.libelle;var pr=item.price;
  if(listLib.length==0){
    var objet={};objet.libelle=lib;objet.price=pr;
    listLib.push(objet);objet.count=1;
  }else{
    var found = false;
    for (let item1 of listLib) {
      if(item1.libelle==lib){
        item1.price+=pr;item1.count+=1;
        found = true;
        break;
      }
    }
    if (!found) {
        var objet={};objet.libelle=lib;objet.price=pr;objet.count=1;
        listLib.push(objet);
    }
  }
});
//////////////////////////////////// # 1 //////////////////////////////////////////////
let map = new Map(listStock.map(({libelle}) => [libelle, {libelle, price: 0}]));
for (let {price, libelle} of listStock) map.get(libelle).price += price;
let result = Array.from(map.values());
console.log(result);

//////////////////////////////////// # 2 //////////////////////////////////////////////
const finalData=listStock.reduce((acc,curr)=>{
  const label=curr.libelle;
  acc[label]=acc[label]? acc[label]+ curr.price : curr.price || 0;
  return acc;
},{})
console.log(finalData);

//////////////////////////////////// # 3 //////////////////////////////////////////////
var arr = [ 'Car', 'Car', 'Truck', 'Boat', 'Truck'];
var hist = {};
arr.map(a=> (a in hist)? hist[a] ++:hist[a] = 1);
console.log(hist);

//////////////////////////////////// # 4 //////////////////////////////////////////////
let map = new Map(arr.map(this_ => [this_, {this_, count: 0}]));
arr.forEach(function(item,index){
  map.get(item).count += 1;
});
let result = Array.from(map.values());
console.log(result);

//////////////////////////////////// # 4 //////////////////////////////////////////////
const groupBy = (x,f)=>x.reduce((a,b)=>((a[f(b)]||=[]).push(b),a),{});

//////////////////////////////////// # 4 //////////////////////////////////////////////
var groupBy1 = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
//////////////////////////////////// # 4 //////////////////////////////////////////////
var groupBy = function(xs) {
  return xs.reduce( function (prev, item) { 
  ( item in prev )? prev[item] ++:prev[item] = 1; 
  return prev; 
}, {} );
};


