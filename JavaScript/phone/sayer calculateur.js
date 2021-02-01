function sayHello() {
    console.log('Hello ' + this + '!');
}


var text="200 dh tazmoutine.5  dh grand taxi.6 dh tram.12 dh tram.95 dh librairie.22 dh food.6 dh tram.6 dh tram.15 dh grand taxi.7,5 grand taxi.7,5 grand taxi.23 grand taxi.12 tram.10,5 food.23 grand taxi.7,5 grand taxi.13,5 librairie.20 dh librairie.20 dh arrondissement.15 dh grand taxi.9 dh librairie.34 dh food.10 dh librairie.7,5 dh grand taxi.3,5 dh food.23 dh grand taxi.12 dh tram.7,5 dh grand taxi.33 dh tran.4 dh pisri.15 dh grand taxi.5 dh pisri.20 dh tobis.6 dh grand taxi.45 dh grand taxi.7,5 dh grand taxi.4 dh librairie.7,5 dh grand taxi.120 dh tran";
var list1=text.split(".");
//console.log(list1);
var list2=[];var totale=0;
for(i=0;i<list1.length;i++){
  var numbstr=list1[i].split(" ")[0];
  var numbsr=numbstr.replace(",",".");
  var numb=parseFloat(numbsr);
  console.log(numb);
  totale+=numb;
}
//totale+=7.5;totale+=33;
console.log("totale = "+totale);
