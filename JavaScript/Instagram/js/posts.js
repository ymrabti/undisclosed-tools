function AllPosts(edges){listMedia=[];edges.forEach(function(item,index){var node=item["node"];
    var __typename=node["__typename"];
    var username=node["owner"]["username"];
    if(__typename!="GraphSidecar"){var is_video=node["is_video"];var linkDownload=getLink(node);var oMedia={"is_video":is_video,"linkDownload":linkDownload,"owner":username};listMedia.push(oMedia);}else{var edges1=node["edge_sidecar_to_children"]["edges"];edges1.forEach(function(item1,index){var node1=item1["node"];var is_video=node1["is_video"];var linkDownload=getLink(node1);var oMedia={"is_video":is_video,"linkDownload":linkDownload,"owner":username};listMedia.push(oMedia);});}});}






function PostClicked(shortcode){var link="https://www.instagram.com/p/"+shortcode+"?__a=1";$.get(link).done(function (data){var shortcode_media=data["graphql"]["shortcode_media"];
    var __typename=shortcode_media["__typename"];
    var username=shortcode_media["owner"]["username"];var dura=shortcode_media["video_duration"];var textdura=!!dura?"deduree"+getmn(dura)+"minutes":"";
    if(__typename!="GraphSidecar"){var type__=__typename.split("Graph")[1]+textdura+"?";if(confirm("Telechargercette"+type__)){downUnic(shortcode_media,username);}}else{var edges=shortcode_media["edge_sidecar_to_children"]["edges"];if(confirm("TelechargerTousles"+edges.length+"elements?")){edges.forEach(function(item,index){setTimeout(function (){downUnic(item["node"],username,index+1);},1500*(index+1))});}}}).fail(function (err){console.log(err["responseJSON"]);})}






function demarrerPost(data,container){var shortcode_media=data["graphql"]["shortcode_media"];
var __typename=shortcode_media["__typename"];
var username=shortcode_media["owner"]["username"];var center=createElements(container,[],"center");
if(__typename!="GraphSidecar"){var type__=__typename.split("Graph")[1]+"?";var line=createElements(center,[["onclick","download('"+showUnic(center,shortcode_media)+"','"+username+"')"]],'button',"Telecharger");}else{var edges=shortcode_media["edge_sidecar_to_children"]["edges"];listMedia=edges.map(b=>{var node=b["node"];var is_video=node["is_video"];var linkDownload=getLink(node);return{"linkDownload":linkDownload,"owner":username,"is_video":is_video};});$("center").remove();createElements(ReturnContainer(),[],"center");$("center").append("<divclass='wrapper'><divclass='slider'></div></div><buttononclick='download_multiple(true)'>Telecharger</button>");setTimeout(function (){ext(edges);},1000);slick();}}