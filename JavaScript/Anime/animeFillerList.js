var table = document.getElementsByTagName('table')[0];
var tbody=table.tBodies[0];



var lt=getListe(tbody);
var listeParts=getListeParts(tbody);
var indexes=[];var maxes=[];var indexes_mines=[];var mines=[];

for (var x = 0; x < lt.length; x++) 
	{indexes.push(0);maxes.push(0);indexes_mines.push(Infinity);mines.push(Infinity);}

for(n=0;n<listeParts.length;n++)
{
	for (var x = 0; x < lt.length; x++) {
		if(tbody.rows[n].className.trim()==lt[x])
		{
			if(maxes[x]<listeParts[n].length){maxes[x]=listeParts[n].length;indexes[x]=n;}
			if(mines[x]>listeParts[n].length){mines[x]=listeParts[n].length;indexes_mines[x]=n;}
		}
	}
}


for (var x = 0; x < lt.length; x++) {
	writeMaxes(x);writeMines(x);
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
function getListe(tbody)
{
	var lt=[];
	for(n=0;n<tbody.rows.length;n++)
		{if(!lt.includes(tbody.rows[n].className.trim())){lt.push(tbody.rows[n].className.trim());}}
	return lt;
}
function getListeParts(tbody){
	var listeParts=[];var listeTrees=[];var typeepisodefirst=tbody.rows[0].className;
	for(n=0;n<tbody.rows.length;n++)
	{var typeepisode=tbody.rows[n].className.trim();var numberepisode=tbody.rows[n].children[0].innerText;
		var titleepisode=tbody.rows[n].children[1].innerText.replace("'","_").replace("'","_");
		var airingDateepisode=tbody.rows[n].children[3].innerText;
		var objet={};objet.typeepisode=typeepisode;objet.numberepisode=numberepisode;
		objet.titleepisode=titleepisode;objet.airingDateepisode=airingDateepisode;
		if(typeepisode!=typeepisodefirst){typeepisodefirst=typeepisode;listeParts.push(listeTrees);listeTrees=[];}
		listeTrees.push(objet);}return listeParts;}

/* ******************************************			****************************************** */

//var stringify=JSON.stringify(listeParts);copy(stringify);
/* *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

function getGlobalSQL(){
	var sqlGlobal="";
	for(n=0;n<tbody.rows.length;n++)
	{
		var typeepisode=tbody.rows[n].className;
		var numberepisode=tbody.rows[n].children[0].innerText;
		var titleepisode=tbody.rows[n].children[1].innerText.replace("'","_").replace("'","_");
		var airingDateepisode=tbody.rows[n].children[3].innerText;
		var sql ="insert into animeFillerList values ('NarutoShippuden',"
		+numberepisode+",'"+titleepisode+"','"+typeepisode+"','"+airingDateepisode+"');\n";
		//var sql =GenerateScriptInsert("animeFillerList");
		sqlGlobal+=sql;
	}
	return sqlGlobal;//copy(sqlGlobal);
}
//"mixed_canon_filler","manga_canon","filler"
//getListePartsUnions(tbody,[["manga_canon","filler"],["mixed_canon_filler"]])


//var listeq=listeParts[indicefiller];
//console.log("max = "+maxParts +" from "+listeq[0].airingDateepisode +" to "
//	+listeq[listeq.length-1].airingDateepisode+"\nEpisodes From "
//	+listeq[0].numberepisode +" to "+listeq[listeq.length-1].numberepisode);


/* *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * 


var indice=0;
var maxParts=listeParts[0].length;
for(n=0;n<listeParts.length;n++)
{
	if(maxParts<listeParts[n].length)
	{
		maxParts=listeParts[n].length;indice=n;
	}
}
var listeq=listeParts[indice];
console.log("max = "+maxParts +" from "+listeq[0].airingDateepisode +" to "
	+listeq[listeq.length-1].airingDateepisode+"\nEpisodes From "
	+listeq[0].numberepisode +" to "+listeq[listeq.length-1].numberepisode);


var l=[];for(k=0;k<listeParts.length;k++){l.push(listeParts[k].length)};


polygonText.forEach(myFunctionFille);
function myFunctionFille(itemfils, index) {
    if (index != 0) {
        var itemint = itemfils.split(" ");
        pol[index - 1] = [];
        pol[index - 1][0] = parseFloat(itemint[0]);
        pol[index - 1][1] = parseFloat(itemint[1]);
    }

}
 *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */