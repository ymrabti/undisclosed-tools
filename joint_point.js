function computeJoinPoint(s1, s2) {
    var joint_point=0;
    if (s1<200000 && s2<200000) {
        while(s1!=s2 && s1<200000 && s2<200000){
            s1=getChiffres(s1);
            s2=getChiffres(s2);
        }
        if (s1==s2) {
            console.log("point commun = "+s1);
        } else {
            console.log("point commun tres loin !!!");
        }
    }
    return s1;
}

function getChiffres(nombre){
    var list=[];
    list.push(nombre);var i=0;
    while(nombre!=0 && i<100){
        //var nombre=471
        var alte=Math.floor(nombre/10);
        var chiff=nombre-(alte)*10;
        nombre=alte;
        //console.log("chiff : "+chiff);
        //console.log("nombre : "+nombre);
        list.push(chiff);i++;
    }
    var sum=list.reduce((a, b) => a + b, 0);
    console.log(sum);
    return sum;
}

function reverseChiffres(nombre) {
    var list=[];var nombrestr=nombre+"";
    list.push(nombre);
    for (var k = 0; k < nombrestr.length; k++) {
        list.push(parseInt(nombrestr[k]));
    }
    var sum=list.reduce((a, b) => a + b, 0);
    console.log(sum);
    return sum;
}


console.log();

computeJoinPoint(471,480)