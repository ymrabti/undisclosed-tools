var user = temp1["graphql"]["user"];
var biography = user["biography"];
var has_requested_viewer = user["has_requested_viewer"];
var requested_by_viewer = user["requested_by_viewer"];
var followed_by_viewer = user["followed_by_viewer"];
var follows_viewer = user["follows_viewer"];
var blocked_by_viewer = user["blocked_by_viewer"];
var has_blocked_viewer = user["has_blocked_viewer"];
var country_block = user["country_block"];
var business_category_name = user["business_category_name"];
var business_email = user["business_email"];
var category_enum = user["category_enum"];
var connected_fb_page = user["connected_fb_page"];
var external_url = user["external_url"];
var external_url_linkshimmed = user["external_url_linkshimmed"];
var has_ar_effects = user["has_ar_effects"];
var has_channel = user["has_channel"];
var has_clips = user["has_clips"];
var has_guides = user["has_guides"];
var highlight_reel_count = user["highlight_reel_count"];
var id = user["id"];
var is_business_account = user["is_business_account"];
var is_joined_recently = user["is_joined_recently"];
var is_private = user["is_private"];
var is_verified = user["is_verified"];
var overall_category_name = user["overall_category_name"];
var restricted_by_viewer = user["restricted_by_viewer"];
var full_name = user["full_name"];
var profile_pic_url = user["profile_pic_url"];
var username = user["username"];
var nombrePub = user["edge_owner_to_timeline_media"]["count"];
var abonnes = user["edge_followed_by"]["count"];
var abonnements = user["edge_follow"]["count"];
var edges = user["edge_owner_to_timeline_media"]["edges"];
var edge_mutual_followed_by = user["edge_mutual_followed_by"];
var edge_mutual_followed_by_edges = edge_mutual_followed_by["count"];
var edge_mutual_followed_by_count = edge_mutual_followed_by["edges"];

/*var  = user[""];
var  = user[""];
var  = user[""];*/

var iden="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z";
var pubs="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z";




var container=container();
head();
bar();
Posts(edges,PostsCon);
/*var line0xx=createElements(line0nn,[["class",""]],"");str.split(" ").join(" \"\n+\"")
var line0xx=createElements(line0nn,[["class",""]],"");
var line0xx=createElements(line0nn,[["class",""]],"");
var line0xx=createElements(line0nn,[["class",""]],"");
var line0xx=createElements(line0nn,[["class",""]],"");
var line0xx=createElements(line0nn,[["class",""]],"");
var line0xx=createElements(line0nn,[["class",""]],"");
var line0xx=createElements(line0nn,[["class",""]],"");*/

//var line0xx=createElements(line0nn,[["class",""]],"");//   , ["",""]  ,


//				,["",""]


function Posts(edges){
	var edgeslength=edges.length;
	var columns=3;
	var r=edgeslength%columns;
	var q=(edgeslength - r)/columns;
	var Poston=PostsCon();
	var p=returnpub(Poston);

	for (var i = 0; i < q; i++) {// q*i+k
		var kposts=createElements(p,[["class","Nnq7C weEfm"]],"div");
		for (var k = 0; k < columns; k++) {
			var current=columns*i+k;
			var edge_i=edges[current]["node"];
			post(edge_i,kposts);
		}
	}
	if (r!=0) {
		for (var k = q*columns; k < q*columns+r; k++) {
			var current=columns*i+k;
			var edge_i=edges[current]["node"];
			post(edge_i,kposts);
		}
	}
}
function post(edgei,sup) {
	if (!is_private) {
		var caption=edgei["accessibility_caption"];
		var ressources=edgei["thumbnail_resources"];
		var thumb=edgei["thumbnail_src"];
		var shortcode=edgei["shortcode"];
		var srcset="";
		for (var j = 0; j < ressources.length-1; j++) {
			srcset+=ressources[j]["src"]+" "+ressources[j]["config_width"]+"w,";
		}
		srcset+=ressources[ressources.length-1]["src"]+" "+ressources[ressources.length-1]["config_width"]+"w";
		var line210=createElements(sup,[["class","v1Nh3 kIKUG  _bz0w"],["data-ext-skip","1"]],"div");
		var line211=createElements(line210,[["href","/p/"+shortcode+"/"],["tabindex","0"]],"a");
		var line212=createElements(line211,[["class","eLAPa"]],"div");
		var line213=createElements(line212,[["class","KL4Bh"]],"div");
		var line216=createElements(line212,[["class","_9AhH0"]],"div");
		var line214=createElements(line213,[["alt",caption], ["class","FFVAD"], ["decoding","auto"], ["style","object-fit: cover;"], ["sizes","293px"], ["srcset",srcset] , ["src",thumb]],"img");

	} else {
		returnprv(PostsCon);
	}
}
function returnpub(argument) {
	AlaUne();
	var public1=createElements(argument,[],"div");
	var public2=createElements(public1,[["style","flex-direction: column; padding-bottom: 1577px; padding-top: 0px;"]],"div");
	return public2;
}
function returnprv(argument) {
	var privat1=createElements(argument,[["class","_4Kbb_ _54f4m"]],"div");
	var privat2=createElements(privat1,[["class","QlxVY"]],"div")
	var privat2_1=createElementsInner(privat2,[["class","rkEop"]],"h2","Ce compte est privé");
	var privat2_2=createElementsInner(privat2,[["class","VIsJD"]],"div","Abonnez-vous pour voir ses photos et vidéos.");
}
function PostsCon(){
	var line204=createElements(container,[["class","_2z6nI"]],"div");
	var line205=createElements(line204,[["class","ySN3v"]],"article");
	return line205;
}
function container(){
	/*var body = document.getElementsByTagName('body')[0];
	var line062=createElements(body,[['class','_9eogI E3X2T']],'section');
	var line063=createElements(line062,[['class','SCxLW  o64aR'],['role','main']],'main');*/
	var divtoreplace=document.getElementById("divtoreplace");
	var perereplaceable=divtoreplace.parentElement;
	perereplaceable.removeChild(divtoreplace);
	var line064=createElements(perereplaceable,[['class',"v9tJq AAaSh VfzDr"],["id","divtoreplace"]],'div');
	return line064;
}


function AlaUne(){
	var line152=createElements(container,[["class","_4bSq7"]],"div");
	var line153=createElements(line152,[["class","EcJQs"]],"div");
	var line154=createElements(line153,[["class","ekfSF"],["role","presentation"]],"div");
	var line155=createElements(line154,[["class","_9nCnY"]],"div");
	var line156=createElements(line155,[["class","vi798"]],"ul");
	var line157=createElements(line156,[["style","transform: translateX(0px); width: 24px;"]],"li");
	var line159=createElements(line156,[["style","transform: translateX(2640px); width: 24px;"]],"li");
	for (var i = 0; i < edges.length; i++) {
		var translate=24+i*132;
		var line161=createElements(line156,[["class","Ckrof"],["tabindex","-1"],["style","transform: translateX("+translate+"px); width: 24px;"]],"li");
		var line162=createElements(line161,[["class","Igw0E rBNOH YBx95 _4EzTm"],["style","width: 125px;"]],"div");
		var line163=createElements(line162,[["class","_3D7yK"],["aria-disabled","false"],["role","menuitem"],["tabindex","0"]],"div");
		var line164=createElements(line163,[["class","aoVrC D1yaK"],["aria-disabled","true"],["aria-label","Ouvrir les stories"],["role","button"],["tabindex","-1"]],"div");
		var line171=createElementsInner(line163,[["class","eXle2"]],"div",edges[i]["node"]["location"]["name"]);
		var line165=createElements(line164,[["height","87"],["width","87"],["style","position: absolute; top: -5px; left: -5px; width: 87px; height: 87px;"]],"canvas");
		var line167=createElements(line164,[["style","width: 77px; height: 77px;"],["class","tUtVM"]],"div");
		var line168=createElements(line167,[["class","NCYx"],["alt","Photo de profil de "+edges[i]["node"]["location"]["name"]],["src",edges[i]["node"]["thumbnail_resources"][0]["src"]]],"img");
	};
}
function bar(){
	var line185=createElements(container,[["class","fx7hk"]],"div");
	
	elementbar(line185,false,"","Publications",pubs);
	elementbar(line185,true,"tagged/","Identifié(e)",iden);
}
function elementbar(pere,courant,afusm,txtlabel,d){
	if (courant) {
		var line186=createElements(pere,[["class","_9VEo1 T-jvg"],["href","/"+username+"/"+afusm],["tabindex","0"]],"a");
		var line187=createElements(line186,[["class","smsjF"]],"span");
		var line188=createElements(line187,[["class","_8-yf5"],["height","12"],["width","12"],["viewBox","0 0 48 48"] ,["fill","#262626"] ,["aria-label",txtlabel]],"svg");
		var line189=createElements(line188,[["fill-rule","evenodd"],["d",d],["clip-rule","evenodd"]],"path");
		var line192=createElementsInner(line187,[["class","PJXu4"]],"span",txtlabel);
	}
	else{
		var line186=createElements(pere,[["class","_9VEo1"],["href","/"+username+"/"+afusm],["tabindex","0"]],"a");
		var line187=createElements(line186,[["class","qzihg"]],"span");
		var line188=createElements(line187,[["class","_8-yf5"],["height","12"],["width","12"],["viewBox","0 0 48 48"] ,["fill","#8e8e8e"] ,["aria-label",txtlabel]],"svg");
		var line189=createElements(line188,[["d",d]],"path");
		var line192=createElementsInner(line187,[["class","_08DtY"]],"span",txtlabel);
	}
}


function circularpic(pere) {
	var line066=createElements(pere,[['class',"XjzKX"]],'div');
var line067=createElements(line066,[['class',"RR-M- "],["aria-disabled","true"],["role","button"],["tabindex","-1"],["data-ext-skip","1"]],'div');
var line068=createElements(line067,[['class',"CfWVH"],["height","168"],["width","168"],["style","position: absolute; top: -9px; left: -9px; width: 168px; height: 168px;"]],'canvas');
var line070=createElements(line067,[['class',"_2dbep"],["role","link"],["tabindex","-1"],["style","width: 150px; height: 150px;"]],'div');
var line071=createElements(line070,[["alt","Photo de profil de "+full_name],["class","_6q-tv"],["data-testid","user-avatar"],["draggable","false"],["src",profile_pic_url]],"img");

}
function head() {
	
var line065=createElements(container,[['class',"vtbgv"]],'header');
circularpic(line065);

var line075=createElements(line065,[["class","zwlfE"]],"section");
var line076=createElements(line075,[["class","nZSzR"]],"div");
var line077=createElementsInner(line076,[["class","_7UhW9 fKFbl yUEEX KV-D4 fDxYl"]],"h2",username);
var line078=createElements(line076,[["class","Igw0E IwRSH eGOV_ ybXk5 _4EzTm"]],"div");
var line079=createElements(line078,[["class","Igw0E IwRSH eGOV_ ybXk5 _4EzTm"]],"div");
var line080=createElements(line079,[["class","_862NM"]],"div");
var line081=createElements(line080,[["class","Igw0E IwRSH eGOV_ vwCYk JI_ht"]],"div");
var line082=createElementsInner(line081,[["class","sqdOP L3NKy _4pI4F _8A5w5"],["type","button"]],"button","Contacter");
var line085=createElements(line079,[],"div");
var line086=createElements(line085,[["class","Igw0E IwRSH eGOV_ _4EzTm"],["style","height: 30px;"]],"div");
var line087=createElements(line086,[["class","FLeXg bqE32"]],"span");
var line088=createElements(line087,[["class","vBF20 _1OSdk"]],"span");
var line096=createElements(line087,[["class","mLCHD _1OSdk"]],"span");
var line089=createElements(line088,[["class","_5f5mN    -fzfL     _6VtSN     yZn4P"]],"button");
var line097=createElements(line096,[["class","_5f5mN    -fzfL    KUBKM      yZn4P"]],"button");
var line090=createElements(line089,[["class","Igw0E rBNOH YBx95 _4EzTm"],["style","height: 28px;"]],"div");
var line098=createElements(line097,[["class","OfoBO"]],"div");
var line091=createElements(line090,[["class","glyphsSpriteFriend_Follow u-__7"]],"span");
var line099=createElements(line098,[["class","_5fEvj coreSpriteDropdownArrowGrey9"]],"div");

var line109=createElements(line076,[["class","AFWDX"]],"div");
var line110=createElements(line109,[["class","wpO6b"],["type","button"]],"button");
var line111=createElements(line110,[["class","QBdPU"]],"div");
var line112=createElements(line111,[["class","_8-yf5 "],["aria-label","Options"],["fill","#262626"],["viewBox","0 0 48 48"],["height","24"],["width","24"]],"svg");
var line113=createElements(line112,[["cx","82440"],["cy","24"],["fill-rule","evenodd"],["clip-rule","evenodd"],["r","4.5"]],"circle");
var line115=createElements(line112,[["cx","82440"],["cy","24"],["fill-rule","evenodd"],["clip-rule","evenodd"],["r","4.5"]],"circle");
var line117=createElements(line112,[["cx","82440"],["cy","24"],["fill-rule","evenodd"],["clip-rule","evenodd"],["r","4.5"]],"circle");


var line124=createElements(line075,[["class","k9GMp"]],"ul");

var line125=createElements(line124,[["class","Y8-fY"]],"li");
var line130=createElements(line124,[["class","Y8-fY"]],"li");
var line135=createElements(line124,[["class","Y8-fY"]],"li");
/**/
var line126=createElements(line125,[["class","-nal3"]],"span");

var line131=createElements(line130,[["class","-nal3 "],["tabindex","0"],["href","/"+username+"followers/"]],"a");

var line136=createElements(line135,[["class","-nal3 "],["tabindex","0"],["href","/"+username+"following/"]],"a");


var line127=createElementsInner(line126,[["class","g47SY"]],"span",nombrePub);
var line132=createElementsInner(line131,[["class","g47SY"]],"span",abonnes);
var line127=createElementsInner(line136,[["class","g47SY"]],"span",abonnements);

var line_127=createElementsInner(line126,[],"span"," publications");
var line_132=createElementsInner(line131,[],"span"," abonnés");
var line_127=createElementsInner(line136,[],"span"," abonnements");

var line141=createElements(line075,[["class","-vDIg"]],"div");
var line142=createElementsInner(line141,[["class","rhpdm"]],"h1",full_name+"\n");
var line142=createElementsInner(line141,[],"span",biography);
var line143=createElements(line141,[],"br");
var line144=createElements(line141,[["class","_32eiM"],["tabindex","0"],["href","/"+username+"/followers/mutualOnly"]],"a");

var line145=createElements(line144,[["class","tc8A9"]],"span");
var line146=createElementsInner(line145,[["class","_32eiM"]],"span","xxxxxxxxxxxx");
var line_146=createElementsInner(line145,[],"span"," est abonné(e)");
}
function createElements(parent, liste, name) {
    var node = document.createElement(name);
    if (liste.length!=0) {
        for (var i = 0; i < liste.length; i++) {
        	node.setAttribute(liste[i][0], liste[i][1]);
        }
    }
    parent.append(node);return node;
}
function createElementsInner(parent, liste, name, innerText) {
    var node = document.createElement(name);
    if (liste.length!=0) {
        for (var i = 0; i < liste.length; i++) {
        	node.setAttribute(liste[i][0], liste[i][1]);
        }
    }
    node.innerText=innerText;
    parent.append(node);return node;
}
