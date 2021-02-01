var nombre=100;

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

function countAlives(list){
  var alives=0;
  for(i=0;i<list.length;i++){
    if(!list[i].killed){alives++}
  }
  return alives;
}
//console.log(listComn.join("\n"));
function IAlive(nombre){

var listComn=generate(nombre);
while(listComn.length>1){
  var listi=listComn[i];
  var listi1=listComn[(i+1)%nombre];
  var listi2=listComn[(i+2)%nombre];
  //listi1.killed=true;
  listComn.slice(i+1);i+=2;
  console.log(countAlives(listComn));
  //console.log(phrase);
}
console.log(countAlives(listComn));
  }
console.log([1,2,5,7,2,4,5,9].remove(3));