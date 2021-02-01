var texte1="200 dh tazmoutine."

+"5 dh grand taxi."

+"6 dh tram."

+"12 dh tram."

+"95 dh librairie."

+"22 dh food."

+"6 dh tram."

+"6 dh tram."

+"15 dh grand taxi."

+"7,5 dh grand taxi."

+"7,5 dh grand taxi."

+"23 dh grand taxi."

+"12 dh tram."

+"10,5 dh food."

+"23 dh grand taxi."

+"7,5 dh grand taxi."

+"13,5 dh librairie."

+"20 dh librairie."

+"20 dh arrondissement."

+"15 dh grand taxi."

+"9 dh librairie."

+"34 dh food."

+"10 dh librairie."

+"7,5 dh grand taxi."

+"3,5 dh food."

+"23 dh grand taxi."

+"12 dh tram."

+"7,5 dh grand taxi."

+"33 dh tran."

+"4 dh pisri."

+"15 dh grand taxi."

+"5 dh pisri."

+"20 dh tobis."

+"6 dh grand taxi."
+"45 dh grand taxi."

+"7,5 dh grand taxi."

+"4 dh librairie."

+"7,5 dh grand taxi."

+"120 dh tran."
+"3 dh librairie."
+"8 dh pisri."
+"60 dh covoiturage."
+"7 dh grand taxi."
+"7 dh tram."
+"2 dh pisri";


var texte2="59 dh win."
+"1 dh i9tita3."
+"10 dh pass win."
+"10 dh recharge."
+"10 dh recharge."
+"10 dh recharge."
+"100 dh dwa hmizat";



var totale=0;
var factures=0;

var retraite=1100;

var list1=texte1.split(".");
var list2=texte2.split(".");
//console.log(list1);
var listStock=[];
var listLib=[];




for(i=0;i<list1.length;i++){
  var obj={};
  var libelle=list1[i].split(" ").slice(2).join(" ");
  var numb=parseFloat(list1[i].split(" ")[0].replace(",","."));
  //console.log(numb);
  totale+=numb;
  obj.price=numb;
  obj.libelle=libelle;
  listStock.push(obj);
  //libelles(libelle,numb);
}
//console.log(listStock);
//console.log(list1[12].split(" ").slice(1));
for(i=0;i<list2.length;i++){
  var numb=parseFloat(list2[i].split(" ")[0].replace(",","."));
  //console.log(numb);

  factures+=numb;

}

//totale+=7.5;totale+=33;
var initial=1900;
var resteCash= retraite- totale;
var resteCompte=initial-(factures+retraite);
console.log("Retraité : \t\t "+retraite);

console.log("Totale : \t\t "+totale);

console.log("Reste Cash : \t\t "+resteCash);

console.log("Reste Compte : \t\t "+resteCompte);

function libelles(lib,pr){
  
  if(listLib.length==0){

      var obj={};

      obj.libelle=lib;

      obj.price=pr;
    listLib.push(obj);
    
     }
  else{
    

  for(j=0;j<listLib.length;j++){

    if(listLib[j].libelle==lib){
      listLib[j].price=listLib[j].price+pr;
       }
    else{
      //console.log("liste ll");
      var obj={};
      obj.libelle=lib;
      obj.price=pr;
      listLib.push(obj);
        }
    }
  }


}

  /*for(i=0;i<listStock.length;i++){
    var lib=listStock[i].libelle;
    var prx=listStock[i].price;
libelles(lib,prx);
  }*/
console.log(listLib);
//console.log(listStock);
class myClass{
  constructor(stri){
    this.str=stri;
    const date=new Date();
    //console.log(stri);
    //console.log(date);
  }
  sayHello() {
    console.log('Hello ' + this.str + '!');
}
}
let mc=new myClass("new instant");
mc.sayHello();