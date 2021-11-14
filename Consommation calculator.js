var listOutputs  = [{"price":200,"libelle":"Lkar"},{"price":5,"libelle":"grand taxi"},{"price":6,"libelle":"tram"},{"price":12,"libelle":"tram"},{"price":95,"libelle":"librairie"},{"price":22,"libelle":"food"},{"price":6,"libelle":"tram"},{"price":6,"libelle":"tram"},{"price":15,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":23,"libelle":"grand taxi"},{"price":12,"libelle":"tram"},{"price":10.5,"libelle":"food"},{"price":23,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":13.5,"libelle":"librairie"},{"price":20,"libelle":"librairie"},{"price":20,"libelle":"arrondissement"},{"price":15,"libelle":"grand taxi"},{"price":9,"libelle":"librairie"},{"price":34,"libelle":"food"},{"price":10,"libelle":"librairie"},{"price":7.5,"libelle":"grand taxi"},{"price":3.5,"libelle":"food"},{"price":23,"libelle":"grand taxi"},{"price":12,"libelle":"tram"},{"price":7.5,"libelle":"grand taxi"},{"price":33,"libelle":"tran"},{"price":4,"libelle":"pisri"},{"price":15,"libelle":"grand taxi"},{"price":5,"libelle":"pisri"},{"price":20,"libelle":"tobis"},{"price":6,"libelle":"grand taxi"},{"price":45,"libelle":"grand taxi"},{"price":7.5,"libelle":"grand taxi"},{"price":4,"libelle":"librairie"},{"price":7.5,"libelle":"grand taxi"},{"price":120,"libelle":"tran"},{"price":3,"libelle":"librairie"},{"price":8,"libelle":"pisri"},{"price":60,"libelle":"covoiturage"},{"price":7,"libelle":"grand taxi"},{"price":7,"libelle":"tram"},{"price":2,"libelle":"pisri"},{"price":1,"libelle":"sada9a"},{"price":29,"libelle":"food"},{"price":23,"libelle":"covoiturage"},{"price":7.5,"libelle":"grand taxi"},{"price":7,"libelle":"petit taxi"},{"price":21,"libelle":"grand taxi"},{"price":7,"libelle":"grand taxi"},{"price":25,"libelle":"triporteur"},{"price":200,"libelle":"Lkar"},{"price":10,"libelle":"sndou9"},{"price":6,"libelle":"pisri"},{"price":15,"libelle":"triporteur"},{"price":1.5,"libelle":"sada9a"},{"price":2,"libelle":"hmas kamoun"},{"price":25,"libelle":"hmizat"},{"price":15,"libelle":"hmizat"},{"price":5,"libelle":"librairie"},{"price":1,"libelle":"toilette"},{"price":5,"libelle":"pisri"},{"price":60,"libelle":"Lkar"},{"price":1,"libelle":"sada9a"},{"price":20,"libelle":"KAKI"},{"price":2,"libelle":"pisri"}];
var listFactures = [{"price":59,"libelle":"win"},{"price":1,"libelle":"i9tita3"},{"price":10,"libelle":"pass win"},{"price":10,"libelle":"recharge"},{"price":10,"libelle":"recharge"},{"price":10,"libelle":"recharge"},{"price":68.99,"libelle":"jumia"},{"price":10,"libelle":"recharge"},{"price":10,"libelle":"recharge"}];
var listGifts    = [{"price":20,"libelle":"fouzia"},{"price":26,"libelle":"cash plus"},{"price":1,"libelle":"veste"},{"price":200,"libelle":"mosala"}];
groupBy = lalist => {
var map = new Map(lalist.map(({libelle}) => [libelle, {libelle, price: 0,count: 0}]));
for (var {price, libelle,count} of lalist) 
  {var mapgt=map.get(libelle);mapgt.price += price;mapgt.count+=1;}
  return Array.from(map.values());
}
var listLib     = groupBy(listOutputs);
var lsl=listOutputs.length;
const reducerCount = (a,b) => a+b.count;
const reducerPrice = (a,b) => a+b.price;
var count       = listLib     .reduce(reducerCount,0);
var globale     = listLib     .reduce(reducerPrice,0);
var totale      = listOutputs .reduce(reducerPrice,0);
var gifts       = listGifts   .reduce(reducerPrice,0);
var factures    = listFactures.reduce(reducerPrice,0);
var initial     = 1800;
var retraite    = 1400;
var resteCash   = retraite- totale+gifts;
var resteCompte = initial-(factures+retraite);
var totaleReste = resteCompte+resteCash;
var resteMain   = totaleReste - resteCompte%100 ;
getTabs = n => "\t.".repeat(n)
getMx   = list => Math.max.apply(Math,list.map(o=>o.count ? `${o.libelle} (${o.count})`.length:o.libelle.length))
Intervalle = n => Math.floor(n/4)
harmonizer = list => {
  list.forEach(function(itemO,indexO){
    itemO.sort((a,b) => -1*(a.count-b.count));
    const txtmxI=Intervalle(getMx(itemO));
    console.log("----------- New "+(indexO+1)+"----------");
    itemO.forEach((item,index)=>{
      var text = item.count ? `${item.libelle} (${item.count})`:item.libelle;
      var txtI=Intervalle(text.length);
      var txtsr=text+getTabs(txtmxI-txtI+1)+":";
      console.log(txtsr+"\t"+item.price);
    });
    console.log("--------------------------");
  });
}
var listShow  = [];
var obj1 = {};obj1.libelle = "Retraité"       ;obj1.price = retraite   ;listShow.push(obj1);
var obj2 = {};obj2.libelle = "Reste Cash"     ;obj2.price = resteCash  ;listShow.push(obj2);
var obj3 = {};obj3.libelle = "Reste Compte"   ;obj3.price = resteCompte;listShow.push(obj3);
var o3_2 = {};o3_2.libelle = "Reste Totale"   ;o3_2.price = totaleReste;listShow.push(o3_2);
var o3_3 = {};o3_3.libelle = "Reste En Main"  ;o3_3.price = resteMain  ;listShow.push(o3_3);
var obj4 = {};obj4.libelle = "Totale"         ;obj4.price = totale     ;listShow.push(obj4);
var obj5 = {};obj5.libelle = "Totale Auditeur";obj5.price = globale    ;listShow.push(obj5);
var obj6 = {};obj6.libelle = "Count"          ;obj6.price = count      ;listShow.push(obj6);
var obj7 = {};obj7.libelle = "Count Audite"   ;obj7.price = lsl        ;listShow.push(obj7);
harmonizer([listShow,groupBy(listOutputs),groupBy(listFactures)]);