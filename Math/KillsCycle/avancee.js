function InfosNum(list,num) {
  var listOfkills = [];
  list.forEach(function(item,index){
    if (item.killedBy == num) {listOfkills.push(item);}
  });
  var i = findNUM(list,num);
  return {
    "from_function":listOfkills.length,
    "from_list":list[i].kills,
    "kills":listOfkills,"killedBy":list[i].killedBy};
}
function chances(nombre,num) {
  var list = [];
  for(var i = 1; i <= nombre; i++){
    if (lastBy1Splice(nombre,i)[0]==num) {     var objet={"start":i,"desc":false};list.push(objet)}
    if (lastBy1Splice(nombre,i,true)[0]==num) {var objet={"start":i,"desc":true};list.push(objet)}
  }
  return list;
}
function Nchances(nombre=100,num=73,starter=false) {
  var list = [];
  if (starter) {NchnceUnitaire(nombre,num,num,list)}
  else{
    for(var i = 1; i <= nombre; i++){
      NchnceUnitaire(nombre,i,num,list);
    }
  }
  return list;
}
function NchnceUnitaire(nombre,i,num,list) {
  for(let N = 1; N < i+1; N++){
    if (lastByNSplice(nombre,N,i)[0]==num) {     var objet={"start":i,"N":N,"desc":false};list.push(objet)}
    if (lastByNSplice(nombre,N,i,true)[0]==num) {var objet={"start":i,"N":N,"desc":true };list.push(objet)}
  }
}
function Cumutations(nombre,desc=false) {
  for(let i = 1; i <= nombre; i++){
    var last0 = lastBySplice(nombre,i,desc != false)[0];
    console.log(i-last0);
    // console.log(last0);
    // console.log("\n\n");
  }
}
function listLasts(nombre,N=1,desc=false) {
  var list = [];
  for(var i = 1; i <= nombre; i++){
    list.push(lastByNSplice(nombre,N,i,desc)[0]);
  }
  return list;
}