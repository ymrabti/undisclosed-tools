setTimeout(function () {
    var inputL = document.getElementById("url");
    inputL.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            document.getElementById("GoAction").click();
        }
    });
}, 500)
window.onload = function () {
    var modal = document.getElementById("ModalPost");
    var span = document.getElementsByClassName("close")[0];
    setTimeout(function () {
        span.onclick = function () { show_modal(false); }
        window.onclick = function (event) { if (event.target == modal) { show_modal(false); } }
    }, 500)
}
var iden = "M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z";
var pubs = "M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z";
var igtvpath = "M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z";

var timeoutDefault = 60000;
var timeoutRetry = 300000; var xhrsStatus = { aborted: false, };
var ns = 'http://www.w3.org/2000/svg';

var icons = { GraphSidecar: "Carousel", GraphVideo: "Video", igtv: "Igtv" };
var withoutResponsive = { dots: true, infinite: false, speed: 500, slidesToShow: 1, slidesToScroll: 1 };

// sidescar: mediatypesSpriteCarousel__filled__32 u-__7
// Video___: mediatypesSpriteVideo__filled__32 u-__7
// __IGTV__: mediatypesSpriteIgtv__filled__32 u-__7
// constroctur("ihssanebenalluch");

function fetchFeedPost(data, container) {
    var shortcode_media = data["graphql"]["shortcode_media"];
    var tagged_users = shortcode_media["edge_media_to_tagged_user"]["edges"];
    var location = shortcode_media["location"];
    var user = shortcode_media["owner"]; var username = user["username"];
    var pic_url = user["profile_pic_url"]; var full_name = user["full_name"];
    var is_verified = user["is_verified"]; var abonnes = user["edge_followed_by"]["count"];
    var nombrePub = user["edge_owner_to_timeline_media"]["count"];
    var taken_at_timestamp = shortcode_media["taken_at_timestamp"];
    var date_pub = new Date(taken_at_timestamp * 1000);
    var __typename = shortcode_media["__typename"];
    var is_video = shortcode_media["is_video"];
    var shortcode = shortcode_media["shortcode"];
    var captions = shortcode_media["edge_media_to_caption"]["edges"];
    var likesNbr = shortcode_media["edge_media_preview_like"]["count"];
    var commentsNbr = shortcode_media["edge_media_preview_comment"]["count"];
    var commentsPreviw = shortcode_media["edge_media_preview_comment"]["edges"];
    var comments = shortcode_media["edge_media_to_parent_comment"]["edges"];
    var caption = captions.length != 0 ? captions[0]["node"]["text"] : "";
    var link = getLink(shortcode_media);
    var cid = container["id"]; var cidjq = $(`#${cid}`);
    cidjq.children().remove();
    if (cid == "divtoreplace") { $("title").text(`Post de ${full_name} (@${username})`); }
    var _o783o1x1Y9m = createElements(container, [[`class`, `Ppjfr UE9AK wdOqh`]], `HEADER`);
    var _0_6b7ebOfaX = createElements(_o783o1x1Y9m, [[`class`, `Jv7Aj mArmR pZp3x`]], `DIV`);
    var _OKJ_C2w1Yrc = createElements(_0_6b7ebOfaX, [[`class`, `RR-M- h5uC0 mrq0Z`], [`aria-disabled`, `false`], [`role`, `button`], [`tabindex`, `0`]], `DIV`);
    var _TojekcnBHiH = createElements(_OKJ_C2w1Yrc, [[`class`, `CfWVH`], [`height`, `42`], [`width`, `42`], [`style`, `position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;`]], `CANVAS`);
    var _N0NFA7eLrKE = createElements(_OKJ_C2w1Yrc, [[`class`, `_2dbep`], [`role`, `link`], [`tabindex`, `-1`], [`style`, `width: 32px; height: 32px;`]], `SPAN`);
    var _T3RPiMr1CHq = createElements(_N0NFA7eLrKE, [[`alt`, `Photo de profil de ${username}`], [`class`, `_6q-tv`], [`data-testid`, `user-avatar`], [`draggable`, `false`], [`src`, pic_url]], `IMG`);
    var _DXieug0Z2j7 = createElements(_o783o1x1Y9m, [[`class`, `o-MQd z8cbW`]], `DIV`);
    var __GgPKgHxGV5 = createElements(_DXieug0Z2j7, [[`class`, `PQo_0 RqtMr`]], `DIV`);
    var _AJdV7RfSjyX = createElements(__GgPKgHxGV5, [[`class`, `e1e1d`]], `DIV`);
    var _QT5dsdKJk0n = createElements(_AJdV7RfSjyX, [[`class`, `Jv7Aj mArmR MqpiF`]], `SPAN`);
    var _OWd7j5SPRW_ = createElements(_QT5dsdKJk0n, [[`class`, `sqdOP yWX7d _8A5w5 ZIAjV`], [`onclick`, `constroctur("@${username}")`], [`tabindex`, `0`]], `P`, `${username}`);
    if (is_verified) {
        var divBadge = createElements(_QT5dsdKJk0n, [["class", "Igw0E IwRSH eGOV_ _4EzTm soMvl"]], "div");
        createElements(divBadge, [["class", "mTLOB Szr5J coreSpriteVerifiedBadge"], ["title", "Vérifié"]], "span", "Vérifié");
    }
    if (location) {
        var location_id = location["id"];
        var location_name = location["name"];
        var location_slug = location["slug"];
        var _ddk7Zfz9oI3 = createElements(_DXieug0Z2j7, [[`class`, `M30cS`]], `DIV`);
        var _0gq3v5CkSJd = createElements(_ddk7Zfz9oI3, [], `DIV`);
        var _jT60mZVLibD = createElements(_ddk7Zfz9oI3, [[`class`, `JF9hh`]], `DIV`);
        var _3cUk4FwWPzg = createElements(_jT60mZVLibD, [[`class`, `O4GlU`],
        [`onclick`, `constroctur("€${location_id}")`], [`tabindex`, `0`]], `P`, location_name);
    }
    var _sv67py5Oziu = createElements(container, [[`class`, `left`], ["style", "width:100%;max-width:30em;"], ["id", "secondch"]], `DIV`);
    var _zCl4SWYOmcR = createElements(_sv67py5Oziu, [[`role`, `button`], [`class`, `ZyFrc sf-root-media-container`], [`tabindex`, `-1`], [`data-sf-touch`, `1`]], `DIV`);
    var _2dM2NwPcefL = createElements(_zCl4SWYOmcR, [["id", "tagsclass"], [`class`, `kPFhm kHt39 fTh_a plVq-`], [`data-sf-skip`, `1`]], `DIV`);
    var _ZBds80k9iNA = createElements(_2dM2NwPcefL, [[`class`, `eLAPa _23QFA`], ["onclick", "twitch()"], [`role`, `button`], [`tabindex`, `-1`]], `DIV`);
    var onclick;
    var slider = createElements(_ZBds80k9iNA, [["class", "slider"]], "div");
    if (__typename != "GraphSidecar") {
        var _idJIwdRDSBA = createElements(_ZBds80k9iNA, [[`class`, `KL4Bh`]], `DIV`);
        var type__ = __typename.split("Graph")[1] + " ?";
        if (!is_video) {
            var _46jHdksoYRS = createElements(_idJIwdRDSBA, [[`class`, `FFVAD sf-notify-on-remove-250469`], [`decoding`, `auto`], [`style`, `object-fit: cover;`], [`sizes`, `300px`], [`src`, link]], `IMG`);
        } else {
            var videojhsd = createElements(_idJIwdRDSBA, [["controls", ""], [`class`, `FFVAD sf-notify-on-remove-250469`], [`style`, `object-fit: cover;`], ["onloadstart", "this.volume=0.5"], ["width", "300px"]], "video");
            var sourcejhsd = createElements(videojhsd, [["type", "video/mp4"], ["src", link]], "source");
        }
        onclick = `download('${link}','${username}')`;
    }
    else {
        var edges = shortcode_media["edge_sidecar_to_children"]["edges"];
        Un_Post = edges.map(b => {
            var node = b["node"]; var is_video = node["is_video"];
            var linld = getLink(node);
            return { "linkDownload": linld, "owner": username, "is_video": is_video };
        });
        onclick = `download_multiple(true,'Post of ${username} In Instagram Photos and Videos')`;
        setTimeout(function () { ext(edges); }, 1000);
        slick();
    }
    $("#secondch").append(`<button name='download' onclick="${onclick}"><i class="fa fa-download"></i>Download</button>`);
    if (tagged_users.length != 0) {
        var button_ident = createElements(_2dM2NwPcefL, [["class", "G_hoz LcKDX _6JfJs"]], "div", null, `<div class="HBUJV"><span aria-label="Identifications" class="glyphsSpriteUser__filled__24__grey_0 u-__7"></span></div>`);
        tagged_users.forEach(function (item, index) {
            var item_node = item["node"];
            var node_user = item_node["user"];
            var node_x = item_node["x"]; node_x = !node_x ? Math.random() : node_x;
            var node_y = item_node["y"]; node_y = !node_y ? Math.random() : node_y;
            var user_full_name = node_user["full_name"];
            var user_id = node_user["id"];
            var user_is_verified = node_user["is_verified"];
            var user_profile_pic_url = node_user["profile_pic_url"];
            var user_username = node_user["username"];
            var _VSB8hk53t9i = createElements(_2dM2NwPcefL, [[`class`, `xUdfV`], [`style`, `left: ${node_x * 100}%; margin-top: 6px; top: ${node_y * 100}%; transform: translate(-50%, 0%);`]], `DIV`);
            var _2fRu6v_rMZf = createElements(_VSB8hk53t9i, [[`class`, `JYWcJ`], [`onclick`, `constroctur("@${user_username}")`], [`tabindex`, `0`]], `P`);
            var _OLg7_OND8to = createElements(_2fRu6v_rMZf, [[`class`, `wCuNw`]], `SPAN`);
            var _KXpwmik1LEO = createElements(_OLg7_OND8to, [[`class`, `Mu0TI Vj5NV`], [`style`, `left: 50%;`]], `DIV`);
            var _drvzNSXMYIx = createElements(_OLg7_OND8to, [[`class`, `eg3Fv`]], `SPAN`, `${user_username}`);
        });
    }

    var _KcvtLM3jw0w = createElements(container, [[`class`, `right`], ["style", "max-height:30em;max-width:30em;"]], `DIV`);
    var _X1lbS3TqQTX = createElements(_KcvtLM3jw0w, [[`class`, `EDfFK ygqzn`]], `SECTION`);
    createElements(_KcvtLM3jw0w, [[`class`, `Igw0E IwRSHeGOV_ ybXk5 vwCYk`], ["style", "font-size: 16px;"]], `DIV`, undefined, `Liked  by &nbsp;<span class="sqdOP yWX7d _8A5w5"> ${beautify_numbers(likesNbr)}</span>&nbsp;people <br>`);
    createElements(_KcvtLM3jw0w, [], "br");
    createElements(_KcvtLM3jw0w, [[`class`, `Igw0E IwRSHeGOV_ ybXk5 vwCYk`], ["style", "font-size: 16px;"]], `DIV`, undefined, `${beautify_numbers(commentsNbr)}</span>&nbsp;comments`);
    createElements(_KcvtLM3jw0w, [], "br");
    var _IBR5JqaMc5S = createElements(_KcvtLM3jw0w, [[`class`, `EtaWk`], ["margin-top", "10px"]], `DIV`);
    var _IQRzAN2kJWE = createElements(_IBR5JqaMc5S, [[`class`, `XQXOT pXf-y`]], `UL`);
    var _pNB4odnO7E5 = createElements(_IQRzAN2kJWE, [[`class`, `k_Q0X NnvRN`]], `DIV`);
    var _kJWFjquWkzi = createElements(_pNB4odnO7E5, [[`class`, `c-Yi7`], [`onclick`, `constroctur("£${shortcode}")`], [`tabindex`, `0`]], `P`);
    createElements(_pNB4odnO7E5, [[`class`, `c-Yi7`], [`href`, `https://www.instagram.com/p/${shortcode}`], [`tabindex`, `0`], ["target", "_blank"]], `A`, "Comment in instagram");
    var _hl5Ob6rVQeo = createElements(_kJWFjquWkzi, [[`class`, `_1o9PC Nzb55`], [`datetime`, date_pub.toJSON()], [`title`, date_pub.toLocaleDateString()], ["style", "font-size: 16px;"]], `TIME`, date_pub.toLocaleString());
    createElements(_kJWFjquWkzi, [], "br");

    shortcode_media["text"] = caption;
    shortcode_media["created_at"] = taken_at_timestamp;
    create_comment(_IQRzAN2kJWE, shortcode_media);
    comments.forEach(function (data, index) {
        var node = data["node"];
        var _JmOPQ28K367 = createElements(_IQRzAN2kJWE, [[`class`, `Mr508`]], `UL`);
        create_comment(_JmOPQ28K367, node);
    });
}
function fetchThumbnail(VidId, container) {
    var ThumbLink = "https://i.ytimg.com/vi/" + VidId + "/maxresdefault.jpg";
    var ThumbView = "https://i.ytimg.com/vi/" + VidId + "/hqdefault.jpg";
    $("title").text(`YouTube thumbnail ${VidId}`);
    var center = createElements(container, [], "center");
    var divSli = createElements(center, [["class", "slider"]], "div");
    var Img = createElements(divSli, [["src", ThumbView], ["width", "100%"]], "img");
    var Br = createElements(center, [], "br");
    var line = createElements(center, [["onclick", "download('" + ThumbLink + "','thumbnail')"], ["name", "download"]], 'button', undefined, '<i class="fa fa-download"></i>Download');
}
function fetchHashtag(data, container) {
    var hashtag = data["graphql"]["hashtag"];
    var nombrePub = hashtag["edge_hashtag_to_media"]["count"];
    var edges = hashtag["edge_hashtag_to_media"]["edges"];
    var top_edges = hashtag["edge_hashtag_to_top_posts"]["edges"];
    var tag = hashtag["name"];
    var pic_url = hashtag["profile_pic_url"];
    head(container, `#${tag}`, null, pic_url, null, nombrePub, null, null, null, true, false, null, true);
    $("title").text(`Hashtag #${tag} sur Instagram  • Photos et vidéos`);
    createElements(container, [["class", "yQ0j1"]], "h2", undefined, `<div class="Saeqz">Meilleures publications</div><br>`);
    Posts(top_edges, container, false, null, `#${tag}`);
    createElements(container, [["class", "yQ0j1"]], "h2", undefined, `<br><br>Plus récentes<br>`);
    Posts(edges, container, false, null, `#${tag}`);
    var center = createElements(container, [], "center"); download_all(center, `Hashtag ${tag} In Instagram Photos and Videos`)
}
function fetchLocation(data, container) {
    var loca_tion = data["graphql"]["location"];
    var nombrePub = loca_tion["edge_location_to_media"]["count"];
    var edges = loca_tion["edge_location_to_media"]["edges"];
    var top_edges = loca_tion["edge_location_to_top_posts"]["edges"];
    var tag = loca_tion["name"];
    var pic_url = loca_tion["profile_pic_url"];
    head(container, `${tag}`, null, pic_url, null, nombrePub, null, null, null, true, false, null, true);
    $("title").text(`${tag} sur Instagram • Photos et vidéos`);
    createElements(container, [["class", "yQ0j1"]], "h2", undefined, `<div class="Saeqz">Images et vidéos populaires</div><br>`);
    Posts(top_edges, container, false, null, `${tag}`);
    createElements(container, [["class", "yQ0j1"]], "h2", undefined, `<br><br>Plus récentes<br>`);
    Posts(edges, container, false, null, `${tag}`);
    var center = createElements(container, [], "center"); download_all(center, `Place ${tag} In Instagram Photos and Videos`)
}
function fetchProfile(data, container) {
    var user = data["graphql"]["user"];
    var pic_url_hd = user["profile_pic_url_hd"];
    var pic_url = user["profile_pic_url"];
    var full_name = user["full_name"];
    var username = user["username"];
    var nombrePub = user["edge_owner_to_timeline_media"]["count"];
    var abonnes = user["edge_followed_by"]["count"];
    var abonnements = user["edge_follow"]["count"];
    var is_private = user["is_private"];
    var edges = user["edge_owner_to_timeline_media"]["edges"];
    var biography = user["biography"];
    var hglght_cnt = user["highlight_reel_count"];
    var is_verified = user["is_verified"];
    var ext_url = user["external_url"];
    var has_clips = user["has_clips"];
    var edges_igtv = user["edge_felix_video_timeline"]["edges"];
    head(container, username, full_name, pic_url, pic_url_hd, nombrePub, abonnements, abonnes, biography, is_private, is_verified, ext_url, false);
    $("title").text(`${full_name} (@${username}) sur Instagram • Photos et vidéos`);

    var containerPosts = createElements(container, [["id", "publications"], ["name", "_switcher_"]], "SECTION");
    Posts(edges, containerPosts, is_private, pic_url_hd, username);

    var containerIGTV = createElements(container, [["style", "display: none"], ["id", "igtv"], ["name", "_switcher_"]], "SECTION");
    Posts(edges_igtv, containerIGTV, false, null, username);
    if (edges_igtv.length == 0) {
        createElements(containerIGTV, [["class", "yQ0j1"]], "h1", undefined, `<br><br>IGTV Vide<br>`);
    }
    /*var i_bsnacct   = user["is_business_account"];console.log("is_business_account "+i_bsnacct);
    var bus_email   = user["business_email"];console.log("business_email "+bus_email);
    var bnss_name   = user["business_category_name"];console.log("business_category_name "+bnss_name);
    var ctegoenum   = user["category_enum"];console.log("category_enum "+ctegoenum);
    var isjoincent  = user["is_joined_recently"];console.log("is_joined_recently "+isjoincent);
    var cuntrlock   = user["country_block"];console.log("country_block "+cuntrlock);*/
}
function fetchStory(a) {
    alert("Story ! Soon");
}
function create_comment(pere, node) {
    var node_text = node["text"];// @ihssanebenalluch ♥♥♥
    var node_created_at = node["created_at"];// 1493553551
    var date_cmmnt = new Date(node_created_at * 1000);
    var node_owner = node["owner"];// Object
    var owner_is_verified = node_owner["is_verified"];// false
    var owner_profile_pic_url = node_owner["profile_pic_url"];
    var owner_username = node_owner["username"];// maryamsalmouni
    var node_edge_liked_by = node["edge_liked_by"];// Object
    var edge_liked_by_count = node_edge_liked_by ? node_edge_liked_by["count"] : 0;// 1
    var _XfOJU5NKVDB = createElements(pere, [[`role`, `button`], [`class`, `ZyFrc`], [`tabindex`, `0`]], `DIV`);
    var _MkOuO9Bgy9i = createElements(_XfOJU5NKVDB, [[`class`, `gElp9 rUo9f`], [`role`, `menuitem`]], `LI`);
    var _U32C4bJPn4U = createElements(_MkOuO9Bgy9i, [[`class`, `P9YgZ`]], `DIV`);
    var _joHmZVmhFPE = createElements(_U32C4bJPn4U, [[`class`, `C7I1f`]], `DIV`);
    var _DnQwsLyFWeR = createElements(_joHmZVmhFPE, [[`class`, `Jv7Aj mArmR pZp3x`]], `DIV`);
    var _Ld9NahDxPOQ = createElements(_DnQwsLyFWeR, [[`class`, `RR-M-TKzGu`], [`aria-disabled`, `true`], [`role`, `button`], [`tabindex`, `-1`]], `DIV`);
    var _gZU09Cuhv_B = createElements(_Ld9NahDxPOQ, [[`alt`, `Photo de profil de ${owner_username}`], [`class`, `_2dbep qNELH kIKUG Gai8tTPkdjh7`], [`data-testid`, `user-avatar`], [`draggable`, `false`], [`src`, owner_profile_pic_url]], `IMG`);
    var _mHzoPYg7oc6 = createElements(_joHmZVmhFPE, [[`class`, `C4VMK`]], `DIV`);
    var _WFZDc5Y1BiZ = createElements(_mHzoPYg7oc6, [[`class`, `_6lAjh`]], `H3`);
    var _rmsyjpyilqj = createElements(_WFZDc5Y1BiZ, [[`class`, `Igw0E IwRSHeGOV_ _4EzTm ItkAi`]], `DIV`);
    var _o0YFe4f6BaP = createElements(_rmsyjpyilqj, [[`class`, `Jv7Aj mArmR MqpiF`]], `SPAN`);
    var _iUcWb77Di_0 = createElements(_o0YFe4f6BaP, [[`class`, `sqdOP yWX7d _8A5w5 ZIAjV`], [`onclick`, `constroctur("@${owner_username}")`], [`tabindex`, `0`]], `A`, `${owner_username}`);
    if (owner_is_verified) {
        var divBadge = createElements(_o0YFe4f6BaP, [["class", "Igw0E IwRSH eGOV_ _4EzTm soMvl"]], "div");
        createElements(divBadge, [["class", "mTLOB Szr5J coreSpriteVerifiedBadge"], ["title", "Vérifié"]], "span", "Vérifié");
    }
    var _IaSC1t_TVkk = createElements(_mHzoPYg7oc6, [[`class`, ``]], `SPAN`, undefined, text2Html(node_text));
    var _2Hu7CfW6lbI = createElements(_mHzoPYg7oc6, [[`class`, `Igw0E IwRSHeGOV_ _4EzTm pjcA_ aGBdT`]], `DIV`);
    var _vLiiOMHob1c = createElements(_2Hu7CfW6lbI, [[`class`, `_7UhW9PIoXz MMzan _0PwGv uL8Hv`]], `DIV`);
    var _NV_IkBgqQol = createElements(_vLiiOMHob1c, [[`class`, `FH9sR Nzb55`], [`datetime`, date_cmmnt.toJSON()], [`title`, date_cmmnt.toLocaleDateString()]], `TIME`, date_cmmnt.toLocaleString());
    var _2JKkqm5QEPS = createElements(_vLiiOMHob1c, [], `BR`);
    node_edge_liked_by ? createElements(_vLiiOMHob1c, [[`class`, `FH9sR`]], `SPAN`, `${edge_liked_by_count} mentions J’aime`) : 0;
    var _2JKkqm5QEPS = createElements(pere, [], `BR`);
    // var node_did_report_as_spam      = node["did_report_as_spam"];// false
    // var node_id                      = node["id"];// 17879582911043274
    // var node_viewer_has_liked        = node["viewer_has_liked"];// false
    // var node_is_restricted_pending   = node["is_restricted_pending"];// false
    // var node_edge_threaded_comments  = node["edge_threaded_comments"];// Object
    // var edge_threaded_comments_count        = node_edge_threaded_comments["count"];// 0
    // var edge_threaded_comments_page_info     = node_edge_threaded_comments["page_info"];// Object
    // var edge_threaded_comments_edges         = node_edge_threaded_comments["edges"];// Array
    // var page_info_has_next_page     = edge_threaded_comments_page_info["has_next_page"];// false
    // var page_info_end_cursor         = edge_threaded_comments_page_info["end_cursor"];// Object
}
function circularpic(pere, full_name, profile_pic_url) {
    var line066 = createElements(pere, [['class', "XjzKX"]], 'div');
    var line067 = createElements(line066, [['class', "RR-M- "], ["aria-disabled", "true"], ["role", "button"], ["tabindex", "-1"], ["data-ext-skip", "1"]], 'div');
    var size = 150;
    var line068 = createElements(line067, [['class', "CfWVH"], ["height", "168"], ["width", "168"], ["style", "position: absolute; top: -9px; left: -9px; width: 168px; height: 168px;"]], 'canvas');
    var line070 = createElements(line067, [['class', "_2dbep"], ["role", "link"], ["tabindex", "-1"], ["style", "width: " + size + "px; height: " + size + "px;"]], 'div');
    var line071 = createElements(line070, [["alt", "Photo de profil de " + full_name], ["class", "_6q-tv"], ["data-testid", "user-avatar"], ["draggable", "false"], ["src", profile_pic_url]], "img");
}
function head(container, username, full_name, profile_pic_url, profile_pic_url_hd, nombrePub, abonnements, abonnes, biography, is_private, is_verified, ext_url, modaal) {
    var line065 = createElements(container, [['class', "vtbgv"]], 'header');
    var line075 = createElements(line065, [["class", "zwlfE"]], "section");
    circularpic(line075, full_name, profile_pic_url);
    var line076 = createElements(line075, [["class", "nZSzR"]], "div");
    !modaal ? createElements(line076, [["class", "_7UhW9 fKFbl yUEEX KV-D4 fDxYl"], ["href", "https://www.instagram.com/" + username + "/"], ["target", "_blank"]], "a", username) :
        createElements(line076, [["class", "_7UhW9 fKFbl yUEEX KV-D4 fDxYl"], ["onclick", "constroctur('" + username + "')"]], "p", username);
    if (is_verified) {
        var divBadge = createElements(line076, [["class", "Igw0E IwRSH eGOV_ _4EzTm soMvl"]], "div");
        createElements(divBadge, [["class", "mTLOB Szr5J coreSpriteVerifiedBadge"], ["title", "Vérifié"]], "span", "Vérifié");
    }
    var line124 = createElements(line075, [["class", "k9GMp"]], "ul");
    var line125 = createElements(line124, [["class", "Y8-fY"]], "li");
    var line126 = createElements(line125, [["class", "-nal3"]], "span");
    createElements(line126, [["class", "g47SY"]], "span", beautify_numbers(nombrePub));
    createElements(line126, [], "span", " publications");
    createElements(line126, [], "br");
    if (abonnes) {
        var line130 = createElements(line124, [["class", "Y8-fY"]], "li");
        var line131 = createElements(line130, [["class", "-nal3"], ["tabindex", "0"]], "p");
        createElements(line131, [["class", "g47SY"]], "span", size_plain(abonnes));
        createElements(line131, [], "span", " abonnés");
        createElements(line131, [], "br");
    }
    if (abonnements) {
        var line135 = createElements(line124, [["class", "Y8-fY"]], "li");
        var line136 = createElements(line135, [["class", "-nal3"], ["tabindex", "0"]], "p");
        createElements(line136, [["class", "g47SY"]], "span", size_plain(abonnements));
        createElements(line136, [], "span", " abonnements");
        createElements(line136, [], "br");
    }
    var line141 = createElements(line075, [["class", "-vDIg"]], "div");
    if (full_name) {
        var line142 = createElements(line141, [["class", "rhpdm"]], "h1", full_name + "\n");
    }
    if (biography) {
        var biography2 = text2Html(biography);
        var line142 = createElements(line141, [], "span", undefined, biography2);
        var Lia = createElements(line141, [["class", "yLUwa"], ["href", ext_url], ["target", "_blank"]], "a", ext_url);
    }
    if (!is_private) { bar(container, username); }
}
function Posts(edges, container, is_private, profile_pic_url_hd, username) {
    var Poston = PostsCon(container);
    AllPosts(edges)
    if (!is_private) {
        var edgeslength = edges.length;
        var columns = 3;
        var r = edgeslength % columns;
        var q = (edgeslength - r) / columns;
        var p = returnpub(Poston);
        for (var i = 0; i < q; i++) {// q*i+k
            var kposts = createElements(p, [["class", "Nnq7C weEfm"]], "div");
            for (var k = 0; k < columns; k++) {
                var current = columns * i + k;
                var edge_i = edges[current]["node"];
                post(edge_i, kposts, current);
            }
        }
        if (r != 0) {
            var kposts = createElements(p, [["class", "Nnq7C weEfm"]], "div");
            for (var k = q * columns; k < q * columns + r; k++) {
                var edge_i = edges[k]["node"];
                post(edge_i, kposts, k);
            }
            for (var j = q * columns + r; j < (q + 1) * columns; j++) {
                var current = q * columns + r - 1;
                var edge_i = edges[current]["node"];
                post(edge_i, kposts, j, true);
            }
        }
        !!profile_pic_url_hd ? pdp(p, profile_pic_url_hd, username, false) : null;
    } else {
        returnprv(Poston, profile_pic_url_hd, username);
    }
}
function post(edgei, sup, index, vide = false) {
    if (!vide) {
        var caption = edgei["accessibility_caption"];
        var rss = edgei["thumbnail_resources"];
        var thumb = edgei["thumbnail_src"];
        var shortcode = edgei["shortcode"];
        var product_type = edgei["product_type"];
        var __typename = edgei["__typename"];
        var icon = icons[(product_type == "feed" || !product_type) ? __typename : product_type];
        var line213 = getLine213(sup, icon);
        var line214 = createElements(line213, [["alt", caption]/*,["id","No"+index]*/, ["class", "FFVAD"], ["decoding", "auto"], ["style", "object-fit: cover;"], ["sizes", "293px"], ["src", thumb], ["onclick", `PostClicked('${shortcode}')`]], "img");
    }
    else { createElements(sup, [["class", "_bz0w"]], "div"); }
}
function getLine213(sup, type) {
    var line210 = createElements(sup, [["class", "v1Nh3 kIKUG  _bz0w"]/*,["data-ext-skip","1"]*/], "div");
    var line211 = createElements(line210, [["tabindex", "0"]], "a");
    var line212 = createElements(line211, [["class", "eLAPa"]], "div");
    var line213 = createElements(line212, [["class", "KL4Bh"]], "div");
    // createElements(line212, [["class", "_9AhH0"],["style",'style="cursor:pointer"']], "div");
    if (type) {
        var wtrmark = createElements(line211, [["class", "u7YqG"]], "div");
        createElements(wtrmark, [["class", `mediatypesSprite${type}__filled__32 u-__7`]], "div");
    }
    return line213;
}
function returnpub(father) {
    var public1 = createElements(father, [], "div");
    var public2 = createElements(public1, [["style", "flex-direction: column; padding-bottom: 15px; padding-top: 0px;"]], "div");
    return public2;
}
function returnprv(father, profile_pic_url_hd, username) {
    var p = createElements(father, [["class", "_4Kbb_ _54f4m"]], "div");
    var privat2 = createElements(p, [["class", "QlxVY"]], "div")
    var privat2_1 = createElements(privat2, [["class", "rkEop"]], "h2", "Ce compte est privé");
    var privat2_2 = createElements(privat2, [["class", "VIsJD"]], "div", "Abonnez-vous pour voir ses photos et vidéos.");
    pdp(p, profile_pic_url_hd, username, true);
}
function PostsCon(container) {
    var line204 = createElements(container, [["class", "_2z6nI"]], "div");
    var line205 = createElements(line204, [["class", "ySN3v"]], "article");
    return line205;
}
function ReturnContainer(id) {
    var divtoreplace = document.getElementById(id);
    var perereplaceable = divtoreplace.parentElement;
    perereplaceable.removeChild(divtoreplace);
    var line064 = createElements(perereplaceable, [['class', "v9tJq AAaSh VfzDr"], ["id", id]], 'div');
    return line064;
}
function bar(container, username) {
    var line185 = createElements(container, [["class", "fx7hk"]], "div");
    elementbar(line185, true, "publications", "Publications", pubs, username);
    elementbar(line185, false, "igtv", "IGTV", igtvpath, username);
}
function elementbar(pere, courant, afusm, txtlabel, d, username) {
    var class186, class187, fill188, list189, class192;
    if (courant) {
        class186 = "_9VEo1 T-jvg"; class187 = "smsjF"; fill188 = "#262626";
        list189 = [["fill-rule", "evenodd"], ["clip-rule", "evenodd"]]; class192 = "PJXu4";
    }
    else {
        class186 = "_9VEo1"; class187 = "qzihg"; fill188 = "#8e8e8e";
        list189 = []; class192 = "_08DtY";
    }
    var line186 = createElements(pere, [["class", class186], ["tabindex", "0"]], "p");
    var line187 = createElements(line186, [["class", class187]], "span");
    var line188 = createElementsNS(line187, [["class", "_8-yf5"], ["height", "24"], ["width", "24"], ["viewBox", "0 0 48 48"], ["fill", fill188], ["aria-label", txtlabel]], "svg");
    var line189 = createElementsNS(line188, [["d", d]].concat(list189), "path");
    var line192 = createElements(line187, [["class", "PJXu4"], ["onclick", `change_onglet(this,'${afusm}')`]], "span", txtlabel);
}
function change_onglet(html_, id) {
    var grand_pere = html_.parentNode.parentNode;
    $(".T-jvg").removeClass("T-jvg"); grand_pere.classList.add("T-jvg");
    $("[name='_switcher_']").hide();
    $(`#${id}`).show();
}
function pdp(p, profile_pic_url_hd, username, is_private) {
    var kposts = createElements(p, [["class", "Nnq7C weEfm"]], "div");
    var line213 = getLine213(kposts);
    var center = createElements(line213, [], "center");
    createElements(center, [["alt", "profile_pic_url_hd"], ["decoding", "auto"], ["src", profile_pic_url_hd]], "img");
    createElements(center, [], "br");
    createElements(center, [["onclick", "download('" + profile_pic_url_hd + "','" + username + "')"], ["name", "download"]], 'button', undefined, '<i class="fa fa-download"></i>Download');
    createElements(center, [], "br");
    !is_private ? download_all(center, `Instagram user ${username} In Instagram Photos and Videos`) : null;
}
var All_Posts = []; var Un_Post = [];
function slick() { $('.slider').slick(withoutResponsive); };
PostClicked = shortcode => _gt_(`https://www.instagram.com/p/${shortcode}?__a=1`, "£", shortcode, "divModaltoreplace", "Instagram Post", fetchFeedPost);
getmn = d => Math.round(d / 60);
PhotoOrVid = sh => {
    var url = getLink(sh);
    return !sh["is_video"] ? `<img src="${url}" alt="">` : `<video controls="" onloadstart="this.volume=0.5"><source src="${url}" type="video/mp4"></video>`;
}
getLink = node => {
    var disp_rs = node["display_resources"];
    var thum_rs = node["thumbnail_resources"];
    var display_url = node["display_url"];
    var is_video = node["is_video"];
    var video_url = node["video_url"];
    var HD = !!disp_rs ? disp_rs : thum_rs;
    HD = !!HD ? HD[HD.length - 1].src : display_url;
    return (is_video && video_url) ? video_url : HD;
}
function Coller() {
    navigator.clipboard.readText()
        .then(text => { constroctur(text); })
        .catch(err => { alert('Failed to read clipboard contents : ' + err); });
}
function show_modal(disp) {
    disp ? $("#ModalPost").show() : $("#ModalPost").hide();
    $(`#divModaltoreplace`).children().remove();
}
function _gt_(url, code, pop, id, rel, func) {
    fetch(url)
    .then((data) => {console.log(data)
        var container = ReturnContainer(id);
        show_modal(id!="divtoreplace");
        $('#url').val(`${code}${pop}`);
        func(data,container);
    })
    $.get(url, {mode:'no-cors'})
    .done(function (data) {
        
    })
    .fail(function () {
        alert(`${rel} ${pop} was not found!`)
    });
}
function getThumbail(a, id) {
    var container = ReturnContainer(id);
    $("#url").val(`$${a}`);
    fetchThumbnail(a, container);
}
function constroctur(input) {
    input = input.trim(); All_Posts = [];
    var ig = `instagram.com/`; var yt = `youtube.com`; var ytb = `youtu.be/`;
    var rx1 = `[a-zA-Z0-9\-_\.]{2,}`, rx2 = `[\u0600-\u06FFa-zA-Z0-9\-_\.]{2,}`;
    var ends = `[\/,?]`;
    var definitions =
        [
            {
                code: "§", rel: "STORY INSTA", _u: true,
                func: _gt_, funct: fetchStory,
                base_url: `https://www.${ig}`,
                matches: [RegExp(`${ig}stories/(.*)${ends}`), /§(\d*)/]
            }
            , {
                code: "*", rel: "IGTV POST", _u: true,
                func: _gt_, funct: fetchFeedPost,
                base_url: `https://www.${ig}tv/`,
                matches: [RegExp(`${ig}tv/(${rx1})${ends}`), /\*(.*)/]
            }
            , {
                code: "~", rel: "REEL POST", _u: true,
                func: _gt_, funct: fetchFeedPost,
                base_url: `https://www.${ig}reel/`,
                matches: [RegExp(`${ig}reel/(${rx1})${ends}`), /~(.*)/]
            }
            , {
                code: "£", rel: "POST_FEED INSTA", _u: true,
                func: _gt_, funct: fetchFeedPost,
                base_url: `https://www.${ig}p/`,
                matches: [RegExp(`${ig}p/(${rx1})${ends}`), RegExp(`£(${rx1})`)]
            }
            , {
                code: "€", rel: "LOCATIONS INSTA", _u: true,
                func: _gt_, funct: fetchLocation,
                base_url: `https://www.${ig}explore/locations/`,
                matches: [/€(.*)/]
            }
            , {
                code: "#", rel: "HASHTAG INSTA", _u: true,
                func: _gt_, funct: fetchHashtag,
                base_url: `https://www.${ig}explore/tags/`,
                matches: [RegExp(`#(${rx2})`)]
            }
            , {
                code: "@", rel: "USERNAME ISTAGRAM", _u: true,
                func: _gt_, funct: fetchProfile,
                base_url: `https://www.${ig}`,
                matches: [
                    RegExp(`${ig}(${rx1})${ends}`),
                    /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,}$/, RegExp(`@(${rx1})`)
                ]
            }
            , {
                code: "$", rel: null, _u: false,
                func: getThumbail, funct: null,
                base_url: ``,
                matches: [RegExp(`${yt}.*(v=|\/embed\/)(.{11})`), RegExp(`${ytb}(.{11})`), /\$(.{11})/]
            }
        ];
    var comp = definitions.find(u => u["matches"].reduce((a, b) => input.match(b) ? a + 1 : a, 0));
    var mches = comp.matches;
    var mss = mches.find(i => input.match(i));
    if (mss) {
        var rel = comp.rel; var code = comp.code;
        var shortcode = input.match(mss).pop();
        var link = comp.base_url + shortcode;
        link += comp._u ? '?__a=1' : '';
        var fonction = comp.func;
        var fonctiot = comp.funct;
        fonctiot ? fonction(link, code, shortcode, "divtoreplace", rel, fonctiot) : fonction(shortcode, "divtoreplace");
    }
}

function download_multiple(post, TextMark) {
    var elements = !!post ? Un_Post : All_Posts.filter(item => !item.is_video);
    var cPhotos = elements.filter(item => !item.is_video).length;
    var cVideos = elements.filter(item => item.is_video).length;
    var cElemts = elements.length;
    var confirmText = "Download " + cElemts + " elements (" + cPhotos + " photos";
    cVideos != 0 ? confirmText += " and " + cVideos + " videos) ?" : confirmText += ") ?";
    // var username__ = "";
    if (confirm(confirmText)) {
        var zip = new JSZip();
        elements.forEach(function (item, index) {
            var link_down = item["linkDownload"];
            // username__ = item["owner"]? `${item["owner"]} `:"Instagram ";
            JSZipUtils.getBinaryContent(link_down,
                function (err, data) {
                    if (err) {
                        if (!(err.code === 404 || err.code === 410)) {
                            alert(`error code ${err.code}`);
                        }
                    } else {
                        zip.file(GetFilename(link_down), data, { binary: true });
                    }
                }, xhrsStatus, timeoutDefault
            );
            /*setTimeout(function () {
                download(item["linkDownload"],item["owner"],(index+1));
            }, 1500*(index+1))*/
        });
        $("#ModalDownload").show();
        setTimeout(function () {
            zip.generateAsync({ type: "blob" },
                function (meta) {
                    var file_curr = meta["currentFile"];
                    var percent = Math.floor(meta["percent"]);
                    var elemnt = $("#progressBar");
                    var strpct = `${percent}%`;
                    elemnt.width(strpct);
                    elemnt.text(strpct);
                    $("#currentFile").text(file_curr);
                    if (!file_curr) {
                        $("#currentFile").text("Zipping complete !");
                        setTimeout(function () {
                            $("#ModalDownload").hide();
                        }, 300)
                    }
                })
                .then(function (content) {
                    var date = new Date();
                    saveAs(content, `${TextMark + " " + get_daba()}.zip`);
                });
        }, 1000)
    }
}
function toDataURL(url) {
    return fetch(url).then((response) => {
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);
    });
}
function GetFilename(url) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?\.[a-zA-Z0-9]*)/);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}
function get_extension(link) {
    var list = link.split("?")[0].split(".");
    return list[list.length - 1];
}
function get_daba() {
    var date = new Date();
    return date.toJSON().replaceAll(/[\-:TZ]/g, "_");
}
function file_name(link, username, index) {
    var daba = get_daba();
    var extension = get_extension(link);
    var numeroPost = index ? ` ${index}` : "";
    var nom = username ? `${username} ` : "";
    return `${nom + daba + numeroPost}.${extension}`;
}
async function download(link, username, index) {
    var a = document.createElement("a");
    a.href = await toDataURL(link);
    a.download = file_name(link, username, index);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function twitch() {
    var tags = $("#tagsclass"); var classtags = "fTh_a plVq-";
    tags.hasClass(classtags) ? tags.removeClass(classtags) : tags.addClass(classtags)
}
function AllPosts(edges) {
    edges.forEach(function (item, index) {
        var node = item["node"];
        var __typename = node["__typename"];
        var username = node["owner"]["username"];
        var edges_children = node["edge_sidecar_to_children"];
        if (__typename != "GraphSidecar" || !edges_children) {
            var is_video = node["is_video"];
            var linkDownload = getLink(node);
            var oMedia = { "is_video": is_video, "linkDownload": linkDownload, "owner": username };
            All_Posts.push(oMedia);
        }
        else {
            var edges1 = edges_children["edges"];
            edges1.forEach(function (item1, index) {
                var node1 = item1["node"];
                var username1 = node1["owner"]["username"];
                var is_video = node1["is_video"];
                var linkDownload = getLink(node1);
                var oMedia = { "is_video": is_video, "linkDownload": linkDownload, "owner": username };
                All_Posts.push(oMedia);
            });
        }
    });
}
function text2Html(text) {
    var ushg = /[#,@][\u0600-\u06FFa-zA-Z0-9\-_\.]{1,}/gi;
    var m_ai = /[a-zA-Z0-9._-]{1,}@[a-zA-Z0-9._-]{1,}\.[a-zA-Z0-9._-]{2,3}/gi;
    return text.replaceAll(m_ai, item => link_(item, true))
        .replaceAll(ushg, item => link_(item, false))
        .replaceAll(/\n/gi, "<br>");
}
function link_(item, email) {
    var mail = !email ? ` onclick="constroctur('${item}')"` : ``;
    return `<a class="notranslate"${mail} tabindex="0">${item}</a>`
}
function ext(data) {
    data.forEach(function (item, index) {
        $(".slider").slick("slickAdd", PhotoOrVid(item["node"]));
    });
}
function beautify_numbers(number) {
    var str = "" + number; var list = str.split('');
    return list.reverse().reduce((b, a, index) => index % 3 != 0 || index == 0 ? a + b : a + ` ${b}`, "");
}
function size_plain(number) {
    var i = 3; var div = 1024; var return_text = "";
    while (number >= div && i >= 0) {
        number = number / div; i -= 1; div = 1000;
    }
    number = Math.ceil(number * 100) / 100;
    if (i == 3) { return_text = number + " "; } else if (i == 2) { return_text = number + " " + "k"; }
    else if (i == 1) { return_text = number + " " + "m"; } else if (i == 0) { return_text = number + " " + "B"; }
    return return_text;
}
function createElements(parent, liste, name, innerText, innerHTML) {
    var node = document.createElement(name);
    if (liste.length != 0) {
        for (var i = 0; i < liste.length; i++) {
            node.setAttribute(liste[i][0], liste[i][1]);
        }
    }
    if (innerText) { node.innerText = innerText; }
    if (innerHTML) { node.innerHTML = innerHTML; }
    parent.append(node); return node;
}
function createElementsNS(parent, liste, name, innerText, innerHTML) {
    var node = document.createElementNS(ns, name);
    if (liste.length != 0) {
        for (var i = 0; i < liste.length; i++) {
            node.setAttribute(liste[i][0], liste[i][1]);
        }
    }
    if (innerText) { node.innerText = innerText; }
    if (innerHTML) { node.innerHTML = innerHTML; }
    parent.appendChild(node); return node;
}
function createbyjquery(parent, object, name, innerText, innerHTML) {
    var node = $(`<${name}>`);
    Object.keys(object).forEach(function (key) {
        node.attr(key, object[key]);
    })
    innerText ? node.text(innerText) : "";
    innerHTML ? node.html(innerHTML) : "";
    node.appendTo($(`${parent}`)); return node;
}
function download_all(center, Text) {
    createElements(center, [["onclick", `download_multiple(false,"${Text}")`], ["name", "download"]], 'button', undefined, '<i class="fa fa-download"></i>Download All')
}
function Cleartext() { $('#url').val(""); }
function returnDeviceInfos() {
    var w = screen.width;
    var h = screen.height;
    var ratio = window.devicePixelRatio || 1;
    var w1 = screen.width * ratio;
    var h1 = screen.height * ratio;
    var txt = 'w = ' + w + '\n' + 'h = ' + h + '\n' + 'ratio = ' + ratio + '\n' + 'w1 = ' + w1 + '\n' + 'h1 = ' + h1 + '\n';
}