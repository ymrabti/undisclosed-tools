function test_regexp() {
    return list_tests.map(function(current) {
        var target = constroctur(current);
        var obj = {};var mches = target.matches;
        var mss=mches.find(i=>current.match(i));
        var script = ``;
        if (mss) {
            var rel = target.rel;
            var shortcode = current.match(mss).pop();
            var link = target.base_url + shortcode ;
            link += target._u ? '?__a=1':'';
            // obj.pop=shortcode;obj.rel=rel;obj.regexp=mss;
            script = `('${link}','divtoreplace','${rel}')`;
        }
        return script;
    });

}
shoow= (txt,lab,fetch) => fetch ? txt.replace(lab,""): !txt.includes(lab) ? lab.concat(txt): txt;
function text2HtmlBetter(text) {
    var biography = text.split("\n").map(function(item1,index1){
      return item1.split(" ").map((item,index)=>{
        var hg=item.match(/#[\u0600-\u06FFa-zA-Z0-9\-_\.]{1,29}/);
        var usn=item.match(/@[a-zA-Z0-9\-_\.]{1,29}/);
        var mail=item.match(/[a-zA-Z0-9._-]{1,29}@[a-zA-Z0-9._-]{1,29}\.[a-zA-Z0-9._-]{2,3}/);
        return !!mail ? `<a class="notranslate" tabindex="0">${item}</a>`
        :!!(hg ||usn) ? `<a class="notranslate" onclick="constroctur('${item}')" tabindex="0">${item}</a>`
        :item;
        }).join(" ");
    });
    html = biography.join("<br>");
    return html;
}
function detectUrl(URL) {
  URL = URL.trim();show_modal("none");All_Posts = [];
  var mSId = URL.match(/instagram\.com\/stories\/.*\/(.*?)[\/,?]/);
  var mSUN = URL.match(/instagram\.com\/stories\/(.*?)\//);
  var mSI1 = URL.match(/§[0-9]*/);

  var mUN1 = URL.match(/instagram\.com\/(.*?)[\/,?]/);
  var mUN0 = URL.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,29}$/);
  var mUN2 = URL.match(/@[a-zA-Z0-9\-_\.]{1,29}/);

  var mPt1 = URL.match(/instagram\.com\/p\/(.*?)[\/,?]/);
  var mPt2 = URL.match(/£[a-zA-Z0-9\-_\.]{1,29}/);

  var mT1  = URL.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);
  var mT2  = URL.match(/youtube\.com.*(v=|\/embed\/)(.{11})/);
  var mT3  = URL.match(/youtu.be\/(.{11})/);
  var mT4  = URL.match(/\$.{11}/);

  var mHtg = URL.match(/#[\u0600-\u06FFa-zA-Z0-9\-_\.]{1,29}/);

  var unb = ["p","stories"];
  if (mUN1){id=mUN1.pop();if(!unb.includes(id)){$("#url").val(shoow(id,"@",false));getProfile(shoow(id,"@",true));}}
  if (mUN0){id=mUN0.pop();$("#url").val(shoow(id,"@",false));getProfile(shoow(id,"@",true))}
  if (mSId){id=mSId.pop();$("#url").val(shoow(id,"§",false));getStory(shoow(id,"§",true))}
  if (mSUN){id=mSUN.pop();$("#url").val(shoow(id,"§",false));getStory(shoow(id,"§",true))}
  if (mPt1){id=mPt1.pop();$("#url").val(shoow(id,"£",false));getPost(shoow(id,"£",true),"divtoreplace")}
  if (mT1) {id=mT1 .pop();$("#url").val(shoow(id,"$",false));getThumbail(shoow(id,"$",true))}
  if (mT2) {id=mT2 .pop();$("#url").val(shoow(id,"$",false));getThumbail(shoow(id,"$",true))}
  if (mT3) {id=mT3 .pop();$("#url").val(shoow(id,"$",false));getThumbail(shoow(id,"$",true))}
  if (mUN2){$("#url").val(URL);getProfile(shoow(URL,"@",true))}
  if (mHtg){$("#url").val(URL);getHashtag(shoow(URL,"#",true))}
  if (mPt2){$("#url").val(URL);getPost(shoow(URL,"£",true),"divtoreplace")}
  if (mSI1){$("#url").val(URL);getStory(shoow(URL,"§",true))}
  if (mT4) {$("#url").val(URL);getThumbail(shoow(URL,"$",true))}
}
function getProfile(a) {
    $.get("https://www.instagram.com/" + a + "/?__a=1")
        .done(function (data) {
            var container = ReturnContainer("divtoreplace");
            fetchProfile(data,container);
        })
        .fail(function () {
            alert(`Username was not found! ${a}`)
        })
}
function getSharedData(a) {
    $.get("https://www.instagram.com/" + a)
        .done(function (data) {
            var container = ReturnContainer("divtoreplace");
            var fetch = data.match(/<script type="text\/javascript">window._sharedData =(.*?);/g)
                .pop()
                .replaceAll("<script type=\"text/javascript\">window._sharedData =","")
                .replaceAll(";","");
            var retour = JSON.parse(fetch)["entry_data"]["ProfilePage"][0];
            fetchProfile(retour,container);
        })
        .fail(function () {
            alert('Username was not found! '+a)
        })
}
function getPost(a,id) {
    $.get("https://www.instagram.com/p/" + a + "/?__a=1")
        .done(function (data) {
            var container = ReturnContainer(id);
            show_modal(id!="divtoreplace");
            fetchFeedPost(data,container);
        })
        .fail(function () {
            alert('Post was not found! '+a)
        })
}
function getHashtag(a) {
    $.get(`https://www.instagram.com/explore/tags/${a}/?__a=1`)
        .done(function (data) {
            var container = ReturnContainer("divtoreplace");
            fetchHashtag(data,container);
        })
        .fail(function () {
            alert('Hashtag was not found! '+a)
        })
}
function getLocation(a) {
    $.get(`https://www.instagram.com/explore/locations/${a}/?__a=1`)
        .done(function (data) {
            var container = ReturnContainer("divtoreplace");
            fetchLocation(data,container);
        })
        .fail(function () {
            alert('Location was not found! '+a)
        })
}



var i = 0;
var sb = ["TextA", "TextB"];
setInterval(function() {
    i = (i + 1) % 2;
    $("title").text($ {
        sb[i]
    });
}, 300)
hxa = int => {
    var hexa = int.toString(16);
    return `\\u${'0'.repeat(4-hexa.length)}${hexa}`;
}
unicodes = (start, nombres) => {
    for (let i = start; i <= start + nombres; i++) {
        console.log(`${hxa(i)}(${i}) = ${String.fromCharCode(i)}`);
    }
}
coding = string => string.split('').map(b => hxa(b.charCodeAt(0))).join('')
decoding = code => code.split('').join('')

$('[class="_2dbep qNELH kIKUG"]').each(function(index) {
        $(this).replaceWith($(this).children())
    })
    // 
var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
var img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({type:"blob"})
.then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});

var div = $('[class="_9eogI E3X2T"]')[0];
copy(HTML_TO_SCRIPTS(div));
let deivjson = xmlToJson(div);

var div = $('[class="_9eogI E3X2T"]')[0]; // ltEKP
copy(GET_HTML_SCRIPTS(div));
let deivjson = xmlToJson(div);


    var item_item  = item["item"];console.log(item_item)// Array
    ///////////// LIST NIVEAU 2 //////////////
    for (var index_vjGdZ in item_item){
      var item_node  = item_item[index_vjGdZ]["node"];console.log(item_node)// Object
      ///////////// OBJET NIVEAU 3 //////////////
      if (item_item_node){
        var node_user  = item_node["user"];console.log(node_user)// Object
        var node_x     = item_node["x"];console.log(node_x)// 0.83981484
        var node_y     = item_node["y"];console.log(node_y)// 0.2013889
        ///////////// OBJET NIVEAU 4 //////////////
        if (item_node_user){
          var user_full_name     = node_user["full_name"];console.log(user_full_name)// Ihssane Benalluch احسان بنعلوش
          var user_id        = node_user["id"];console.log(user_id)// 604373732
          var user_is_verified     = node_user["is_verified"];console.log(user_is_verified)// true
          var user_profile_pic_url   = node_user["profile_pic_url"];console.log(user_profile_pic_url)// https://instagram.fcmn5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/122319987_200004771642359_340119210882325320_n.jpg?_nc_ht=instagram.fcmn5-1.fna.fbcdn.net&_nc_ohc=FkhddwJ0wcYAX8kkFVo&tp=1&oh=a03dcd37fa0ae0d74048d1fc4f8b8b42&oe=60425E9D
          var user_username    = node_user["username"];console.log(user_username)// ihssanebenalluch
        }
      }
    }

navigator.connection.addEventListener("change",function () {
  let rtt = navigator.connection.rtt;
  let effectiveType = navigator.connection.effectiveType;
  if (rtt > 500 || effectiveType == "2g") {
    // slow connection
  }
}

    // video player , server , mobile app , api(stories) , extension
    // html code viewer || beautify minify codes
    // cinema.ma | arbre family | russian rollet
    // tweets
    // 
// distributionUrl=file\:///D\:/Android/wrapper/dists/gradle-6.5-all.zip