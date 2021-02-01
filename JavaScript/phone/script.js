var nombre=100;
var listComn=generate(nombre);
//var listAux=[];
function generate(n){
  var list=[];
  for(i=1;i<=n;i++){
    var objct={};objct.num=i;
    objct.killed=false;
    list.push(objct);
  }
  return list;
}
function IsAlive(item){}
function countAlives(list){
  var alives=0;
  for(i=0;i<list.length;i++){
    if(!list[i].killed){alives++}
  }
  return alives;
}
//console.log(listComn.join("\n"));

for(i=0;i<listComn.length;i+=2){
  var listi=listComn[i];
  var listi1=listComn[(i+1)%nombre];
  var listi2=listComn[(i+2)%nombre];
  listi1.killed=true;
  console.log(countAlives(listComn));
  //console.log(phrase);
}
console.log(countAlives(listComn));