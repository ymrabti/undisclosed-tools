var table = document.getElementsByTagName('table')[0];
var tbody=table.tBodies[0];
var listeTypes=["manga_canon","mixed_canon_filler","filler"];
function getListePartsUnions(tbody,list){
	var listeParts=[];var listeTrees=[];
	var nombre=0,indice=0;//var ink=0;
	for(n=0;n<tbody.rows.length;n++)
	{
		//var listeEncours=list[ink];
		var listeEncours=list[indice];
		var rown=tbody.rows[n];var type=rown.className.trim();
		var wai = getIndice(list,type);
		if(wai>=0){
			var num=rown.children[0].innerText;var airing=rown.children[3].innerText;
			var title=rown.children[1].innerText.replace("'","_").replace("'","_");
			var objet={};objet.type=type;objet.num=num;
			objet.title=title;objet.airing=airing;//console.log(!listeEncours.includes(type));
			if(!listeEncours.includes(type))
			{
				//ink=ink+1;ink=ink%list.length;listeEncours=list[ink];
				indice=getIndice(list,type);listeEncours=list[indice];
				if(listeTrees.length!=0){listeParts.push(listeTrees);}nombre+=1;
				listeTrees=[];
			}
			listeTrees.push(objet);
		}
	}
	listeParts.push(listeTrees);
	//var stringify=JSON.stringify(listeParts);copy(stringify);
	console.log("changes = "+nombre);return listeParts;
}
function getIndice(list,type){
	var indice=-1;var i=0;
	while(i<list.length && !list[i].includes(type)){i+=1;}
	if(i==list.length){i=-1;}indice=i;return indice;
}
function getListUnions(definition,list){
	var listeRetour=[];var listSplit=definition.split(",");
	for(var x=0;x<listSplit.length;x++){
		if(!listSplit[x].includes("-")){var single=parseInt(listSplit[x])-1;listeRetour.push([list[single]]);}
		else{var otherListe=listSplit[x].split("-");var pair1=parseInt(otherListe[0])-1,pair2=parseInt(otherListe[1])-1;
		var listInter=[];for(n=pair1;n<=pair2;n++){listInter.push(list[n]);}listeRetour.push(listInter);
		}
	}
	return listeRetour;
}
function writeMaxes(indexe){
	var listeq=listeParts[indexes[indexe]];
	console.log("MAX de "+lt[indexe]+ " : Longueur = "+maxes[indexe] +"\n\tDates from "+listeq[0].airingDateepisode 
		+" to "+listeq[listeq.length-1].airingDateepisode+"\n\tEpisodes From "
		+listeq[0].numberepisode +" to "+listeq[listeq.length-1].numberepisode);
}
function writeMines(indexe){
	var listeq=listeParts[indexes_mines[indexe]];
	console.log("MIN de "+lt[indexe]+ " : Longueur = "+mines[indexe] +"\n\tDates from "+listeq[0].airingDateepisode 
		+" to "+listeq[listeq.length-1].airingDateepisode+"\n\tEpisodes From "
		+listeq[0].numberepisode +" to "+listeq[listeq.length-1].numberepisode);
}
function getListe(list)
{
	var lt=[];
	for(n=0;n<list.length;n++)
		{if(!lt.includes(list[n].type)){lt.push(list[n].type);}}
	return lt;
}




var listq=getListUnions("1,2-3",listeTypes);
var listeParts=getListePartsUnions(tbody,listq);
var listpartsn=listeParts[listeParts.length-1];
console.log(listpartsn);
console.log(getListe(listpartsn));

var indexes=[];var maxes=[];var indexes_mines=[];var mines=[];

for (var x = 0; x < listq.length; x++) 
	{indexes.push(0);maxes.push(0);indexes_mines.push(Infinity);mines.push(Infinity);}

for(n=0;n<listq.length;n++)
{
	for (var x = 0; x < listq.length; x++) {
		if(listq[x].includes(tbody.rows[n].className.trim()))
		{
			if(maxes[x]<listeParts[n].length){maxes[x]=listeParts[n].length;indexes[x]=n;}
			if(mines[x]>listeParts[n].length){mines[x]=listeParts[n].length;indexes_mines[x]=n;}
		}
	}
}


for (var x = 0; x < listq.length; x++) {
	writeMaxes(x);writeMines(x);
}
