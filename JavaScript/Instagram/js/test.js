var i = 0;
var sb = ["TextA", "TextB"];
setInterval(function() {
    i = (i + 1) % 2;
    $("title").text(`${sb[i]}`);
}, 300);

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




navigator.connection.addEventListener("change",function () {
  let rtt = navigator.connection.rtt;
  let effectiveType = navigator.connection.effectiveType;
  console.log(effectiveType);
  if (rtt > 500 || effectiveType == "2g") {
    // slow connection
  }
});

    // video player , server , mobile app , api(stories) , extension
    // html code viewer || beautify minify codes
    // cinema.ma | arbre family | russian rollet
    // tweets
    // 
// distributionUrl=file\:///D\:/Android/wrapper/dists/gradle-6.5-all.zip