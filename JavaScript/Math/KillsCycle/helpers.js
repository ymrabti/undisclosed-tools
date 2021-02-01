function countAlives(list){
  var alives=0;
  for(let i=0;i<list.length;i++){
    if(!list[i].killed){alives++}
  }
  return alives;
}
function findNUM(list,num) {
  var indx;
  list.forEach(function(item,index){
    if (item.num==num) {indx= index;}
  });
  return indx;
}
function findNextAlive(list,index) {
  var len=list.length;var i = index%len;
  while(list[(i+1)%len].killed){i++;}i++;
  return i%len;
}
function findNextNAlives(list,N,index) {
  var listIndexes = [];
  var len=list.length;var i = index%len;
  while(listIndexes.length<N){
    while(list[(i+1)%len].killed){i++;}
    i++;listIndexes.push(i%len);
  }
  return listIndexes;
}
function powerTwo(nombe) {
  var power=1;var pw=2**power;
  while(nombe>=pw){pw*=2;power++;}
  return 2**(power-1) + " < " + nombe + " < " + 2**power;
}
function pow2(n){
  var pw=1;var p=0;
  while(n>=pw){pw*=2;p++;}
  return [p-1,p];
}
function powm(n,m=2){
  var pw=1;var p=0;var i = 0;
  while(n>=pw){pw*=m;p++;}
  var borne_inf = m**(p-1);
  while(borne_inf <= n){borne_inf += m**(p-1);i++;}
  return [p-1,i];
}
function rand(Min,Max) {
  return Math.round((Max-Min)*Math.random()+Min);
}
function generate(n,desc){
  desc = !!desc;var dsc = descendant(desc);
  return [...Array(n)].map((_, i) => (n+1)*desc+dsc*(i+1));
}
function generate1(n,desc){
  desc = !!desc;var dsc = descendant(desc);
  return [...Array(n)].map(function(_, i) {return {"num":(n+1)*desc+dsc*(i+1),"killed":false,"kills":0}});;
}

function descendant(b) {
  return 1-2*b;
}