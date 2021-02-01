/******************************************************   *******************************************************/

/******************************************************  Mydata Messages Messenger *******************************************************/

var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var UserName=messagesElements[n].firstElementChild.firstElementChild.innerText;
	var list=UserName.split("'");UserName=list.join("''");
	/*if(list.length>1)
	{
		UserName="";for(k=0;k<list.length;k++){UserName+=list[k]+"''"}
	}*/
	var UserMediaLink=messagesElements[n].firstElementChild.firstElementChild.href;
	var list2=UserMediaLink.split("/");UserMediaLink=list2[list2.length-2];
	var sql ="insert into FriendsMessages values (default,'"+UserName+"','"+UserMediaLink+"');\n";
	sqlGlobal+=sql;
}
copy(sqlGlobal);

/******************************************************   *******************************************************/

/****************************************************** Mydata FriendList  *******************************************************/

var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var date=messagesElements[n].lastChild.innerText;
	var UserName=messagesElements[n].firstChild.innerText;
	var list=UserName.split("'");UserName=list.join("''");
	
	var sql ="insert into FriendsListFromMyData values (default,'"+UserName+"','"+getDateFromPlain(date)+"','Received',"+nomUser+");\n";
	sqlGlobal+=sql;
}
copy(sqlGlobal);

/******************************************************   *******************************************************/

/****************************************************** User Interests  *******************************************************/

var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var interestName=messagesElements[n].innerText;
	
	var sql ="insert into UserInterests values (default,'"+interestName+"'"+","+nomUser+");\n";
	sqlGlobal+=sql;
}
copy(sqlGlobal);
/******************************************************   *******************************************************/

/******************************************************   *******************************************************/


var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var date=messagesElements[n].lastChild.innerText;
	
	var liste=["default",AppName,getDateFromPlain(date),nomUser];
	var sql = GenerateScriptInsert("FbAppsWebSites",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);


/******************************************************   *******************************************************/

/****************************************************** Mes Commentaires  *******************************************************/
var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var AppName1=messagesElements[n].firstChild.nextElementSibling.innerText;
	var list=AppName.split("'");AppName=list.join("''");
	var list=AppName1.split("'");AppName1=list.join("''");
	var date=messagesElements[n].lastChild.innerText;
	if(AppName.length>inte1){inte1=AppName.length}
	if(AppName1.length>inte2){inte2=AppName1.length}
	var liste=["default",AppName,AppName1,getDateFromPlain(date),nomUser];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("Commentaires",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);

/******************************************************   *******************************************************/

/****************************************************** Following And Followers  *******************************************************/
var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var list=AppName.split("'");AppName=list.join("''");
	var date=messagesElements[n].lastChild.innerText;
	if(AppName.length>inte1){inte1=AppName.length}
	var liste=["default",AppName,'Unfollow Page',getDateFromPlain(date),nomUser];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("FollUnfoll",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);console.log(inte1);console.log(inte2);

/******************************************************   *******************************************************/

/****************************************************** Reactions  *******************************************************/

var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var NodeName=messagesElements[n].firstChild.nextElementSibling.firstChild.firstChild.firstChild.firstElementChild.nodeName;
	var AppName1="";
	if(NodeName=="IMG"){
		var listReact=messagesElements[n].firstChild.nextElementSibling.firstChild.firstChild.firstChild.firstElementChild.src.split("/");
		AppName1=listReact[listReact.length-1].split(".")[0];
	}else{
		AppName1="sticker";
	}
	var list=AppName.split("'");AppName=list.join("''");
	var date=messagesElements[n].lastChild.innerText;
	if(AppName.length>inte1){inte1=AppName.length}
	var liste=["default",		AppName,AppName1,getDateFromPlain(date),		nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("MyReactions",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);console.log(inte1);console.log(inte2);


/******************************************************   *******************************************************/

/****************************************************** MyLocations  *******************************************************/
var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";var nbrlctns=0;
for(n=0;n<messagesElements.length;n++)
{
	var Header=messagesElements[n].firstChild.innerText;
	var list=Header.split("'");Header=list.join("''");
	var body=messagesElements[n].firstChild.nextElementSibling;
	var childSibling=body.firstElementChild;
	var CountLocations=body.childElementCount;
	var BodyElement="";
	for(iter=0;iter<CountLocations;iter++){
		var lambdaphi=messagesElements[n].firstChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.innerText;
		var datetime=messagesElements[n].firstChild.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.innerText;
		var lambda=0;var phi=0;[lambda,phi]=getLamPhi(lambdaphi);
		var liste=["default",		Header,lambda,phi,getDateFromPlain(datetime),		nomUser,"default"];
		var sql = "/*"+n+"*/"+ GenerateScriptInsert("MyLocactions",liste);
		sqlGlobal+=sql;
		childSibling=body.firstElementChild.nextElementSibling;nbrlctns+=1;
	}
	if(Header.length>inte1){inte1=Header.length}
}
copy(sqlGlobal);console.log(inte1);console.log(inte2);




/******************************************************   *******************************************************/

/****************************************************** Polls  *******************************************************/
var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var AppName1=messagesElements[n].firstChild.nextElementSibling.innerText;
	var list=AppName.split("'");AppName=list.join("''");
	var list=AppName1.split("'");AppName1=list.join("''");
	var date=messagesElements[n].lastChild.innerText;
	if(AppName.length>inte1){inte1=AppName.length}
	if(AppName1.length>inte2){inte2=AppName1.length}
	var liste=["default",AppName,AppName1,getDateFromPlain(date),nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("Polls",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);
/******************************************************   *******************************************************/

/****************************************************** Pokes  *******************************************************/
var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var list=AppName.split("'");AppName=list.join("''");
	var date=messagesElements[n].lastChild.innerText;
	if(AppName.length>inte1){inte1=AppName.length}
	var liste=["default",AppName,getDateFromPlain(date),nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("Pokes",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);

/******************************************************   *******************************************************/

/****************************************************** Search History  *******************************************************/

var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var list=AppName.split("'");AppName=list.join("''");
	//AppName=AppName.split("You searched for ")[1];
	var date=messagesElements[n].lastChild.innerText;
	if(AppName.length>inte1){inte1=AppName.length}
	var liste=["default",			AppName,getDateFromPlain(date)			,nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("SearchHistory",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);


/******************************************************   *******************************************************/

/****************************************************** Account Activity  *******************************************************/
var maxHeader=0;var maxBrowser=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var Header=messagesElements[n].firstChild.innerText;
	var list=Header.split("'");Header=list.join("''");
	
	var body=messagesElements[n].firstChild.nextElementSibling;
	var trs=messagesElements[n].getElementsByClassName('_51mx');
	var browser="",cookie="",Time=trs[0].firstElementChild.nextElementSibling.innerText
	IpAdress=trs[1].firstElementChild.nextElementSibling.innerText;
	if(trs.length==3){
		if(trs[2].firstElementChild.innerText=="Browser"){
			Browser=trs[2].firstElementChild.nextElementSibling.innerText;cookie="";
		}else if(trs[2].firstElementChild.innerText=="Cookie"){
			cookie=trs[2].firstElementChild.nextElementSibling.innerText;Browser="";
		}
	}else if(trs.length==4){
		Browser=trs[2].firstElementChild.nextElementSibling.innerText;
		cookie=trs[3].firstElementChild.nextElementSibling.innerText;
	}
	
	var liste=["default",		Header,getDateFromPlain(Time),IpAdress,Browser,cookie,		nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("AccountActivity",liste);
	sqlGlobal+=sql;

	if(Header.length>maxHeader){maxHeader=Header.length}
	if(Browser.length>maxBrowser){maxBrowser=Browser.length}
}
copy(sqlGlobal);console.log("maxHeader : "+maxHeader);console.log("maxBrowser : "+maxBrowser);

/******************************************************   *******************************************************/

/****************************************************** Account Statut Change  *******************************************************/

var inte1=0;var inte2=0;
var messagesElements=document.getElementsByClassName('_4-u2 _3-94 _4-u8');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	var list=AppName.split("'");AppName=list.join("''");
	//AppName=AppName.split("You searched for ")[1];
	var date=messagesElements[n].lastChild.innerText;date=date.split("Time:")[1];
	if(AppName.length>inte1){inte1=AppName.length}
	var liste=["default",			AppName,getDateFromPlain(date)			,nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("AccountStatutChange",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);
/******************************************************   *******************************************************/

/****************************************************** Administrative Records  *******************************************************/

var maxHeader=0;var maxBrowser=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var Header=messagesElements[n].firstChild.innerText;
	var list=Header.split("'");Header=list.join("''");
	
	var body=messagesElements[n].firstChild.nextElementSibling;
	var trs=messagesElements[n].getElementsByClassName('_51mx');
	var browser="",cookie="",IpAdress="",Time=trs[0].firstElementChild.nextElementSibling.innerText;
	if(trs.length==3){
		Browser=trs[1].firstElementChild.nextElementSibling.innerText;
		cookie=trs[2].firstElementChild.nextElementSibling.innerText;
	}else if(trs.length==4){
		IpAdress=trs[1].firstElementChild.nextElementSibling.innerText;
		Browser=trs[2].firstElementChild.nextElementSibling.innerText;
		cookie=trs[3].firstElementChild.nextElementSibling.innerText;
	}
	
	var liste=["default",		Header,getDateFromPlain(Time),IpAdress,Browser,cookie,		nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("AdminRec",liste);
	sqlGlobal+=sql;

	if(Header.length>maxHeader){maxHeader=Header.length}
	if(Browser.length>maxBrowser){maxBrowser=Browser.length}
}
copy(sqlGlobal);console.log("maxHeader : "+maxHeader);console.log("maxBrowser : "+maxBrowser);

/******************************************************   *******************************************************/

/****************************************************** Login Protection Data  *******************************************************/

var maxHeader=0;var maxUpdated=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var Header=messagesElements[n].firstChild.innerText;
	var list=Header.split("'");Header=list.join("''");//console.log(n);
	
	var body=messagesElements[n].firstChild.nextElementSibling;
	var trs=messagesElements[n].getElementsByClassName('_51mx');
	var Created=trs[0].firstElementChild.nextElementSibling.innerText,Updated="",IpAdress="";
	if(trs.length==2){
		if(trs[1].firstElementChild.innerText=="Updated"){
			Updaed=trs[1].firstElementChild.nextElementSibling.innerText;
		}else if(trs[1].firstElementChild.innerText=="Ip Adress"){
			IpAdress=trs[1].firstElementChild.nextElementSibling.innerText;
		}
	}else if(trs.length==3){
		Updated=trs[1].firstElementChild.nextElementSibling.innerText;
		Updated=getDateFromPlain(Updated);
		IpAdress=trs[2].firstElementChild.nextElementSibling.innerText;
	}
	
	var liste=["default",		Header,getDateFromPlain(Created),Updated,IpAdress,		nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("LoginProtectionData",liste);
	sqlGlobal+=sql;

	if(Header.length>maxHeader){maxHeader=Header.length}
	if(Updated.length>maxUpdated){maxUpdated=Updated.length}
}
copy(sqlGlobal);console.log("maxHeader : "+maxHeader);console.log("maxUpdated : "+maxUpdated);



/******************************************************   *******************************************************/

/****************************************************** Logins And LogOuts  *******************************************************/

var maxHeader=0;var maxUpdated=0;
var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var Header=messagesElements[n].firstChild.innerText;
	var list=Header.split("'");Header=list.join("''");//console.log(n);
	
	var body=messagesElements[n].firstChild.nextElementSibling;
	var trs=messagesElements[n].getElementsByClassName('_51mx');
	var Created=trs[0].firstElementChild.nextElementSibling.innerText
		,Updated=trs[1].firstElementChild.nextElementSibling.innerText
		,IpAdress=trs[2].firstElementChild.nextElementSibling.innerText;
	
	
	var liste=["default",		Header,getDateFromPlain(Created),Updated,IpAdress,		nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("LoginsOuts",liste);
	sqlGlobal+=sql;

	if(Header.length>maxHeader){maxHeader=Header.length}
	if(Updated.length>maxUpdated){maxUpdated=Updated.length}
}
copy(sqlGlobal);console.log("maxHeader : "+maxHeader);console.log("maxUpdated : "+maxUpdated);


/******************************************************   *******************************************************/

/****************************************************** Used Ip Adresses  *******************************************************/

var messagesElements=document.getElementsByClassName('pam _3-95 _2pi0 _2lej uiBoxWhite noborder');
var sqlGlobal="";
for(n=0;n<messagesElements.length;n++)
{
	var AppName=messagesElements[n].firstChild.innerText;
	//AppName=AppName.split("You searched for ")[1];
	var date=messagesElements[n].lastChild.innerText;date=date.split("Time:")[1];
	var liste=["default",			AppName			,nomUser,"default"];
	var sql = "/*"+n+"*/"+ GenerateScriptInsert("IpAdressUsed",liste);
	sqlGlobal+=sql;
}
copy(sqlGlobal);