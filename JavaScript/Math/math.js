function returnNonCommuns(nombre1,nombre2){
	var str1=""+nombre1;var str2=""+nombre2;indice=0;
	var max=Math.max(str1.length,str2.length)+2;
	while(haveComm(str1,str2) && indice<max){
		var char=str1.charAt(i);
	    var ind1=str1.indexOf(char);
	    var ind2=str2.indexOf(char);
		str1=str1.substring(0,ind1)+str1.substring(ind1+1,str1.length);
		str2=str2.substring(0,ind2)+str2.substring(ind2+1,str2.length);
		indice+=1;
	}
	return [str1,str2,indice];
}

function iter(num) {
	var liste=returnNonCommuns(num,2*num);
	if (liste[0]=="") {
		liste[0]="1";
	}
	var haut=parseInt(liste[1]);var bas=parseInt(liste[0]);
	if (haut/bas==2)
	{
		console.log("Nombre Mrabtien = "+num);
	}else{
		console.log(num+" non satisfait");
	}
}

function haveComm(str1,str2){
	var have=false;
	for(i=0;i<str1.length;i++){
		if(str2.includes(str1[i])){
			have=true;
		}
	}
	return have;
}
function ReplaceComm(str1,str2){
	var sr1=str1,sr2=str2;
	for(i=0;i<str1.length;i++){
		console.log(str2+" includes("+str1[i]+") : "+str2.includes(str1[i]));
		if(str2.includes(str1[i])){
			sr1.replace(str1[i],"T");
			sr2.replace(str1[i],"T");
		}
	}
	return [sr1,sr2];
}


function ReplaceCommunes(str1,str2){
	var sr1="",sr2="",commune="";
	var str1store=str1,str2store=str1;
	while(str1!=""){
		console.log("new longueur = "+str1.length);
		if(!str2.includes(str1[i])){
			sr1+=str1[i];
		}
		else{
			commune+=str1[i];
		}
		str1=str1.substring(1);
	}
	for(i=0;i<commune.length;i++){
		if(!str2.includes(commune[i])){
			sr2+=str2[i];
		}else{
			str2=str2.substring(1);
		}
	}
	return [sr1,sr2];
}

function Jard(char,str) {
	var avant=str.length;
	str=str.replaceAll(char,"");console.log(str);
	var apres=str.length;
	return [char,(avant-apres),str];
}


var list=[];var str="329948579898272349086371269528946823";
while(str!=""){
	var jr=Jard(str[0],str);
	var obj={};obj.lettre=jr[0];obj.count=jr[1];
	str=jr[2];
	list.push(obj);
}
console.log(list);
///////////////////////////////////////////////////////////////////////////////////

function getArraysIntersection(a1,a2){
    return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
}


function getArraysIntersection(a1,a2){
    return  a1.filter(x => a2.includes(x));
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    }).filter(function (e, i, c) { // extra step to remove duplicates
        return c.indexOf(e) === i;
    });
}

function getArraysIntersection(arr1,arr2){
    return  commonValues = arr1.filter(function(value) { 
       return arr2.indexOf(value) > -1;
   });
}

var arr1 = [12, 54, 2, 4, 6, 34, 3,12];
var arr2 = [54, 2, 5, 12, 4, 1, 3, 34];
console.log(unCommonArray(arr1, arr2));

////////////////////////////////////////////////////////////////////////////

var unCommonArray = (first, second) => {
   const res1 = [];const res2 = [];
   for(let i = 0; i < first.length; i++){
      if(second.indexOf(first[i]) === -1){
         res1.push(first[i]);
      }
   };
   for(let j = 0; j < second.length; j++){
      if(first.indexOf(second[j]) === -1){
         res2.push(second[j]);
      };
   };
   return [res1.join(""),res2.join("")];
};

function NombresMrabtiens(limit,p,q) {
	var count=0;
	var mrab=[];
	for (i = 0; i < limit; i++) {
		var left=q*i+"",right=p*i+"";
		var liste=unCommonArray(left,right);
		if (liste[0]=="") {
			liste[0]="1";
		}
		if (liste[1]=="") {
			liste[1]="1";
		}
		var haut=parseInt(liste[1]);var bas=parseInt(liste[0]);
		if (haut/bas==p/q
			&& haut==p && bas==q
			&& liste[0].length<left.length 
			&& liste[1].length<right.length 
			&& left[left.length-1]!="0"
			&& p/q!=1)

		{
			mrab.push(i);
			count++;
		}
	}
	return mrab;
}
	// 3,1 361
	// 2,1 825
	// 5,1 607