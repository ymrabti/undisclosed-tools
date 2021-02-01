var friends=document.getElementsByClassName("_698");
var active=getActive(friends);
while(active>0){
	for(k=0;k<friends.length;k++)
	{
		var as = friends[k].getElementsByTagName('a') ;var li=as[as.length-1].href;
		if(!li.includes('younes.kun.9k')){friends[k].parentElement.removeChild(friends[k]);}
	}
	var friends=document.getElementsByClassName("_698");
	var active=getActive(friends);
}


function getActive(friends){
	var active=0,nonactive=0;
	var unfriended=0,friend=0;
	for(k=0;k<friends.length;k++)
	{
		var as = friends[k].getElementsByTagName('a') ;
		var li=as[as.length-1].href;
		if(!li.includes('younes.kun.9k')){active+=1;}
		else{nonactive+=1;}
		if(as.length<3){unfriended+=1;}
		else{friend+=1;}
	}
	/**/console.log("active = "+active);
	console.log("nonactive = "+nonactive);
	console.log("totale = "+(active+nonactive));
	console.log("unfriended = "+unfriended);
	console.log("friend = "+friend);return active;
}





var liste = document.getElementsByClassName('size_cell');
var arr=[];
for (var m = 0; m < liste.length; m++) {
	var plain=liste[m].innerText;
	var nameFolder=liste[m].parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText;
	//console.log(nameFolder+ "\t\t" +size_transformation(plain));
	var obj={};obj.size=size_transformation(plain);obj.nameFolder=nameFolder;
	obj.folder=liste[m].parentElement.firstElementChild.nextElementSibling.firstElementChild.href.includes("?");
	arr.push(obj);
}
arr.sort(function(a,b){
	var keyA=a.size;var keyB=b.size;
	if(keyA<keyB){return -1;}if (keyA>keyB){return 1;}return 0;}
);

for (var k = 0; k < arr.length; k++) {arr[k].size=size_plain(arr[k].size);}copy(arr);
var table=document.getElementById('filetable');table.tBodies[0];

function size_transformation(plain)
{
	var list=plain.split(' ');var return_size=0;if (list.length==1) {list=plain.split('+');}
	var valeur=parseFloat(list[0].replace(',','.'));if( list[1].toUpperCase()=="GB"){return_size=valeur*1000*1000*1024}
	else if(list[1].toUpperCase()=="MB"){return_size=valeur*1000*1024}
	else if(list[1].toUpperCase()=="KB"){return_size=valeur*1024}
	else if(list[1].toUpperCase()=="B"){return_size=valeur}
	return return_size;
}
function size_plain(number){
	/*var number=100000000;*/var i=3;var div=1024;var return_text="";
	while(number>=div && i>=0){number=number/div;i-=1;div=1000;
	/*console.log("number  "+number);console.log("div "+div);console.log("i  "+i);console.log("\n\n");*/}
	number=Math.ceil(number*100)/100;
	if (i==3) {return_text=number+" "+"B";}else if (i==2) {return_text=number+" "+"kB";}
	else if (i==1) {return_text=number+" "+"MB";}else if (i==0) {return_text=number+" "+"GB";}
	/*console.log(return_text);*/return return_text;
}