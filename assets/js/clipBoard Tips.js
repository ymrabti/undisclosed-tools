
    // logger.err(err, true);
    // C:/Users/y.mrabti/cloudflared.exe tunnel --url localhost:6842
    // cloudflared.exe tunnel --url http://192.168.1.184:59206
async function getClipboardContents() {
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {console.log(`${type}`);
        if (type.includes("image")) {
            var blob = await clipboardItem.getType(type);
            var image = $('<img/>');image.attr("width","75%");
            var reader=new FileReader()
            reader.addEventListener('loadend',()=>{
              var contents=reader.result;
              image.attr("src",contents);
              $("#divtoreplace").append(image);
            })
            if(blob instanceof Blob) reader.readAsDataURL(blob)
        }
        else if (type.includes("text/plain")) {
            var txt = await clipboardItem;
            $("#divtoreplace").text(txt);
        }
      }
    }
  } catch (err) {console.error(err.name, err.message);}
}
async function writeClipImg() {
  try {
    const imgURL = Imge;
    const data = await fetch(imgURL);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);console.log('Fetched image copied.');
  } catch(err) {console.error(err.name, err.message);}
}
function copying(txt){
  var cb = document.getElementById("cb");
  cb.value = txt;
  cb.style.display='block';
  cb.select();
  document.execCommand('copy');
  cb.style.display='none';
}
function copyToClipboard (text) {
  /*if (navigator.clipboard) { // default: modern asynchronous API
    return navigator.clipboard.writeText(text);
  } else */if (window.clipboardData && window.clipboardData.setData) {// for IE11
    window.clipboardData.setData('Text', text);
    return Promise.resolve();
  } else {// workaround: create dummy input
    const input = document.createElement('textarea');
    input.setAttribute("cols","10");
    input.value = text;
    document.body.append(input);
    input.focus();
    input.select();
    document.execCommand('copy');
    input.remove();
    return Promise.resolve();
  }
}
function copyToClipboard1(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}