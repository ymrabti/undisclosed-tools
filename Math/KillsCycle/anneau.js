function lastBy1Splice(nombre=100,start=1,desc=false) {
  var Datestart = new Date();
  var listComn=generate(nombre,desc);
  var lastAlive=start;
  while(listComn.length>2){
    var len=listComn.length;
    i = listComn.indexOf(lastAlive);
    lastAlive=listComn[(i+2)%len];
    listComn.splice((i+1)%len, 1);
  }
  var DateEnd = new Date();var diff = (DateEnd - Datestart)/1000;
  return [lastAlive,diff];
}
function lastBy1JSON(nombre=100,start=1,desc=false) {
  var Datestart = new Date();
  var listComn=generate1(nombre,desc);
  var lastAlive=start;
  while(countAlives(listComn)>1){
    i = findNUM(listComn,lastAlive);
    var next1 = findNextAlive(listComn,i);
    listComn[i].kills += 1;
    listComn[next1].killed = true;
    listComn[next1].killedBy = lastAlive;
    next2 = findNextAlive(listComn,next1);
    lastAlive=listComn[next2].num;
  }
  var DateEnd = new Date();var diff = (DateEnd - Datestart)/1000;
  return [lastAlive,diff,listComn];
}
function lastBy1Math(n=100,start=1,desc=false){
  var m=pow2(n)[0];// desc = 0; 
  desc = !!desc;var desc1 = descendant(desc);
  var last=( desc*n + (n-2**m)*2*desc1 + start-1)%n + 1;
  return [last,m];
}

function lastBy1MathDesc(n=100,start=1){
  var m=pow2(n)[0];// desc = 1; 
  var last=( (2**(m+1)-n) + start-1)%n + 1;
  return [last,m];
}
function lastByNSplice(nombre=100,N=1,start=1,desc=false) {
  var Datestart = new Date();
  var listComn=generate(nombre,desc);
  var lastAlive=start;
  while(listComn.length > N + 1){
    var len=listComn.length;
    i = listComn.indexOf(lastAlive);
    lastAlive=listComn[(i+1+N)%len];
    listKills = [];
    for(let j = 0; j < N; j++){
      listKills.push(listComn[(i+j+1)%len]);
    }
    listKills.forEach(function(item,index){
      var index = listComn.indexOf(item);
      if (index > -1) {listComn.splice(index, 1);}
    });
  }
  var DateEnd = new Date();var diff = (DateEnd - Datestart)/1000;
  return [lastAlive,diff,listComn];
}
function lastByNJSON(nombre=100,N=1,start=1,desc=false) {
  var Datestart = new Date();
  var listComn=generate1(nombre,desc);
  var lastAlive=start;
  while(countAlives(listComn)>N){
    i = findNUM(listComn,lastAlive);
    var nextAlives = findNextNAlives(listComn,N,i);
    nextAlives.forEach(function(item,index){
      listComn[i].kills += 1;
      listComn[item].killed = true;
      listComn[item].killedBy = lastAlive;
    });
    next2 = findNextNAlives(listComn,1,i)[0];
    lastAlive=listComn[next2].num;
  }
  var DateEnd = new Date();var diff = (DateEnd - Datestart)/1000;
  return [lastAlive,diff,listComn];
}
function lastByNMath(n=100,N=1,start=1,desc=false){
  var m = N + 1;var pwm = powm(n,m);var p = pwm[0];var i = pwm[1];
  var mp = m**p;//var mi = m*i;var mpi = mp*i;console.log(i);
  desc = !!desc;var desc1 = descendant(desc);
  var last=( desc*n + (n-mp)*m*desc1 + i*(start)-1)%n + 1;
  return [last,p];
}
function lastByNSplicerandom(nombre=100,M=1) {
  var Datestart = new Date();var N = rand(M,0);
  var start = rand(1,nombre);var desc = rand(1,0);
  console.clear();
  console.log("start = "+start);
  console.log("desc = "+desc);
  console.log("Next N = "+N);
  var listComn=generate(nombre,desc);
  var lastAlive=start;
  while(listComn.length > N + 1){
    console.log("Killer = "+lastAlive);
    var len=listComn.length;
    i = listComn.indexOf(lastAlive);
    lastAlive=listComn[(i+1+N)%len];
    listKills = [];
    for(let j = 0; j < N; j++){
      listKills.push(listComn[(i+j+1)%len]);
    }
    listKills.forEach(function(item,index){
      var index = listComn.indexOf(item);
      console.log("\tKilled = "+item);
      if (index > -1) {listComn.splice(index, 1);}
    });
    N = rand(M,0);
    console.log("Next N = "+N);console.log("\n\n");
  }
  var DateEnd = new Date();var diff = (DateEnd - Datestart)/1000;
  return [lastAlive,diff,listComn];
}
function lastByNJSONrandom(nombre=100,M=1) {
  var Datestart = new Date();var N = rand(M,0);
  var start = rand(1,nombre);var desc = rand(1,0);
  var listComn=generate1(nombre,desc);
  var lastAlive=start;
  while(countAlives(listComn)>N){
    // console.log("Killer = "+lastAlive);
    i = findNUM(listComn,lastAlive);
    var nextAlives = findNextNAlives(listComn,N,i);
    nextAlives.forEach(function(item,index){
      listComn[i].kills += 1;
      listComn[item].killed = true;
      listComn[item].killedBy = lastAlive;
      // console.log("\tKilled = "+listComn[item].num);
    });
    next2 = findNextNAlives(listComn,1,i)[0];
    lastAlive=listComn[next2].num;
    N = rand(M,0);
    // console.log("\n\n");
  }
  var DateEnd = new Date();var diff = (DateEnd - Datestart)/1000;
  var kills=listComn.find(us => us.num == lastAlive).kills;
  return [lastAlive,diff,kills];
}

// zigzag
// MAthimatical formula

function checkLAST(nombre,start=1,desc=false) {
  var temps1 = last(nombre,start,desc)[1];var temps2 = lastByJSON(nombre,start,desc)[1];
  console.log("temps exec lastByJSON = " + temps1+" secs");
  console.log("temps exec last2 = " + temps2+" secs");
  console.log("Taux = " + Math.round(temps1/temps2*100)+" %");
}
function rmvElmnt(listComn,listi1) {
  const index = listComn.indexOf(listi1);
  if (index > -1) {
    listComn.splice(index, 1);
  }
  return listComn;
}
function returnAlives(list) {
  var listAlives=[];
  list.forEach(function(item,index){
    if (!item.killed) {listAlives.push(item)}
  });
  return listAlives;
}
