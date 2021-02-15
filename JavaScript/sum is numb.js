function getchiffres(nombre) {
    var list=[];var nombrestr=nombre+"";
    for (var k = 0; k < nombrestr.length; k++) {
        list.push(parseInt(nombrestr[k]));
    }
    //var sum=list.reduce((a, b) => a + b, 0);
    return list;
}


function Palindrome(nombre) {
    var chiffres=getchiffres(nombre);
    var demi=Math.floor(chiffres.length/2);
    var i=0;
    var mirroires=0;
    while(chiffres[i]==chiffres[chiffres.length-1-i] && i<demi){
        //console.log(chiffres[i]);
        i++;mirroires++;
    }
    //console.log("demi       = "+demi);
    //console.log("mirroires  = "+mirroires);
    return mirroires==demi;
}

function palimite(limit) {
    var palindromes=[];
    for (var k = 0; k < limit; k++) {
        if (Palindrome(k)) {
            palindromes.push(k);
        }
    }
    return [palindromes];
}


function Jard(char,str) {
    var avant=str.length;
    str=str.replaceAll(char,"");//console.log(str);
    var apres=str.length;
    return [char,(avant-apres),str];
}

var str="329948579898272349086371269528946823";
function getSum(num) {
    //var list=[];
    var sum=0,str=num+"";
    while(str!=""){
        var jr=Jard(str[0],str);
        //var obj={};obj.lettre=jr[0];obj.count=jr[1];
        sum+=jr[0]**jr[1];
        str=jr[2];
        //list.push(obj);
    }
    return sum;
}


console.log(list);

for (var k = 0; k < 10000; k++) {
    if (getSum(k)==k) {
        console.log(k);
    }
}
