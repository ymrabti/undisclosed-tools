var letters=["A", "B", "C"
, "D", "E", "F", "G", "H",
"I", "J", "K", "L", "M"
, "N", "O", "P", "Q",
"R", "S", "T", "U", "V"
, "W", "X", "Y", "Z"];
var nom = "YOUNES";
var nom ='ATTITUDE'
var nomlist = nom.split("").reverse();
f = letter => letters.indexOf(letter)+1;
var sum = nomlist.reduce((a,c)=>f(c)+a,0);
//var sumc = nomlist.join(`(${f})`);
var sumc = nomlist.reduce(
  (a,c,i)=>{
    var rtn = `${c}(${f(c)})`;
    rtn += i=! nomlist.length-1 ? ` + `:``;
    return rtn+a}
,"");
console.log(`${sumc} = ${sum}`);