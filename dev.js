function extrct_vriables_frm_json_global(def_pere, def_obj, def_arr, junction, obj, name, parent, ListScripts, current_tab) {
    var keys = Object.keys(obj).reverse();
    var c_t = getTabs(current_tab);
    var reduce1 = junction(keys, obj, name, parent, c_t);
    ListScripts.push(reduce1);
    var objts = keys.filter(key => def_obj(obj[key], key));
    objts.forEach(function (item, index) {
        var obj_item = obj[item];
        var obj_pere = def_pere(name, item);
        extrct_vriables_frm_json_global(def_pere, def_obj, def_arr, junction, obj_item, item, obj_pere, ListScripts, current_tab);
    });
    var arrys = keys.filter(key => def_arr(obj[key], key));
    arrys.forEach(function (item, index) {
        var this_array = obj[item];
        if (this_array.length != 0) {
            ListScripts.push(`\n${c_t}///////////////// LIST NIVEAU ${current_tab} ////////////////\n`);
            var obj_pere = def_pere(name, item);
            var n_parent = obj_pere; var ind_rand = randomTag(3);
            var o_parent = `${n_parent}[indx_${ind_rand}]`;
            ListScripts.push(`${c_t}for (var indx_${ind_rand} in ${n_parent}){\n`);
            var ind = 0; var item1_inex1 = this_array[ind];
            if (item1_inex1) {
                extrct_vriables_frm_json_global(def_pere, def_obj, def_arr, junction, item1_inex1, item, o_parent, ListScripts, current_tab + 1);
            }
            ListScripts.push(`${c_t}}\n`);
            // obj[item].forEach(function(item1,index1){//    extract_all_variables_from_json(item1,item,name,ListScripts);// });
        }
    });
}// genralisation de extract_all_variables_from_json          // INNER_JSON
function get_variables_json_general(def_pere, def_objcts, def_arrays, func, o, name = "_", start_parent = "node", start_tab = 0) {
    var list = [];
    extrct_vriables_frm_json_global(def_pere, def_objcts, def_arrays, func, o, name, start_parent, list, start_tab);
    return list.join('\n');
}// genralisation de get_json_variables                       // INNER_JSON

////////////////////////////////////////////////////////////////////////////////////////////////////

function extract_all_variables_from_json(obj, name, parent, ListScripts, current_tab) {
    var keys = Object.keys(obj).reverse();
    const txtmxI = Intervalle(getMx(keys));
    var c_t = getTabs(current_tab);
    var reduce1 = keys.reduce((a, c) => {
        var txtI = Intervalle(c.length); var tabs = getTabs(txtmxI - txtI + 1);
        var oc = obj[c]; var n_name = `${name}_${c}`;
        var comment = def_arrays1(oc, "") ? `Array` : typeof (oc) == "object" ? (!oc ? oc : `Object`) : typeof (oc) == "string" ? oc.replaceAll('\n', ' ') : oc;
        var curr = `${c_t}var ${n_name}${tabs} = ${parent}["${c}"];console.log(${n_name})// ${comment}\n`;
        return curr + a;
    }, ``);
    ListScripts.push(reduce1);
    var objts = keys.filter(k => def_objcts(obj[k], k));
    var arrys = keys.filter(key => def_arrays1(obj[key]));
    objts.forEach(function (item, index) {
        var obj_item = obj[item];
        ListScripts.push(`\n${c_t}///////////// OBJET NIVEAU ${current_tab} //////////////\n`);
        ListScripts.push(`${c_t}if (${getparent(parent)}_${item}){\n`);
        extract_all_variables_from_json(obj_item, item, `${name}_${item}`, ListScripts, current_tab + 1);
        ListScripts.push(`${c_t}}\n`);
    });
    arrys.forEach(function (item, index) {
        var this_array = obj[item];
        if (this_array.length != 0) {
            ListScripts.push(`\n${c_t}///////////// LIST NIVEAU ${current_tab} //////////////\n`);
            var n_parent = `${name}_${item}`; var ind_rnd = randomTag(5);
            ListScripts.push(`${c_t}for (var index${ind_rnd} in ${n_parent}){\n`);
            var ind = 0; var item1_inex1 = this_array[ind];
            if (item1_inex1) {
                extract_all_variables_from_json(item1_inex1, item, `${n_parent}[index${ind_rnd}]`, ListScripts, current_tab + 1);
            }
            ListScripts.push(`${c_t}}\n`);
            // obj[item].forEach(function(item1,index1){//    extract_all_variables_from_json(item1,item,name,ListScripts);// });
        }
    });
}                                                             // INNER_JSON _ ALL
function get_json_variables(o, name, start_parent, start_tab) {
    var list = [];
    extract_all_variables_from_json(o, name, start_parent, list, start_tab);
    return list.join('\n');
}// Example copy(get_json_variables(temp1,'temp1','temp1',0)) // INNER_JSON _ ALL

////////////////////////////////////////////////////////////////////////////////////////////////////

function json_parser(obj, parent, ListScripts, current_tab, ListNames) {
    var keys = Object.keys(obj).reverse();
    const txtmxI = Intervalle(getMx(keys));
    var c_t = getTabs(current_tab);// getparent(parent)
    keys.forEach(key => {
        var tabs = getTabs(txtmxI - Intervalle(key.length) + 1); key = key.replaceAll('-', '');
        var ths_obj = obj[key]; var n_name = `${key}${randomTag(4)}`;//`${name}_${key}`;
        var inclus = ListNames.includes(n_name); inclus ? console.log(inclus) : null; ListNames.push(n_name);
        var comment = def_arrays1(ths_obj, "") ? `Array : ${ths_obj.length}` : typeof (ths_obj) == "object" ? (!ths_obj ? ths_obj : `Object`) : typeof (ths_obj) == "string" ? ths_obj.replaceAll('\n', ' ') : ths_obj;
        var curr = `${c_t}let ${n_name}${tabs} = ${parent}["${key}"];console.log(${n_name});// ${comment}`;
        var next_tab = current_tab + 1;
        ListScripts.push(curr);
        if (def_objcts(ths_obj)) {
            ListScripts.push(`${c_t}///////////// OBJET NIVEAU ${current_tab} //////////////`);
            ListScripts.push(`${c_t}if (${n_name}){`);
            json_parser(ths_obj, n_name, ListScripts, next_tab, ListNames);
            ListScripts.push(`${c_t}}`);
        } else if (def_arrays1(ths_obj, key)) {
            var ths_objlength = ths_obj.length;
            if (ths_objlength != 0) {
                ListScripts.push(`${c_t}///////////// LIST NIVEAU ${current_tab} //////////////`);
                var ind_rnd = `index${randomTag(5)}`;
                ListScripts.push(`${c_t}for (let ${ind_rnd} in ${n_name}){// ${ths_objlength}`);
                var ths_obj0 = ths_obj[0]; var n_name_ind = `${n_name}[${ind_rnd}]`;
                json_parser(ths_obj0, n_name_ind, ListScripts, next_tab, ListNames);
                ListScripts.push(`${c_t}}`);
            }
        }
    });
}                                                             // INNER_JSON _ TOOL
function get_parse(o, start_parent, start_tab = 0) {
    var list = []; var Names = [];
    json_parser(o, start_parent, list, start_tab, Names);
    return list.join('\n');
}// Example copy(get_parse(temp1,'temp1'))                    // INNER_JSON _ TOOL

////////////////////////////////////////////////////////////////////////////////////////////////////

function create_elements_scripts_from_json(json, tag, lpere, Scripts) {
    var keys = Object.keys(json);
    var randomTg = (tag != "start") ? randomTag(11) : lpere;
    var valus = keys.filter(key => key.match(/_[a-zA-Z]/));
    // var texts=keys.filter(key=> key=="#text");
    var text = json["#text"];
    var innerText = (typeof (text) == "object" || !text) ? "" : `,\`${text}\``;
    if (tag != "start" && tag != "#text") {
        ret = `var ${randomTg} = createElements(${lpere},[`;
        ret += valus.map(key => aux(json, key)).join() + `],\`${aux1(tag)}\`${innerText});`;
        Scripts.push(ret);
    }
    var arrys = keys.filter(key => def_arrays(json[key], key));
    var objts = keys.filter(key => def_objcts(json[key], key));
    objts.forEach(function (item_objts, index_objts) {
        create_elements_scripts_from_json(json[item_objts], item_objts, randomTg, Scripts);
    });
    arrys.reverse().forEach(function (item_arrys, index_arrys) {
        json[item_arrys].forEach(function (item_objts, index_objts) {
            create_elements_scripts_from_json(item_objts, item_arrys, randomTg, Scripts);
        });
    });
}                                                             // CREATE_SCRIPTS _ ALL
function create_elements_json_scripts(o, name, start_parent) {
    var list = [];
    create_elements_scripts_from_json(o, name, start_parent, list);
    return list.join('\n');
}//                                                           // CREATE_SCRIPTS _ ALL
function HTML_TO_SCRIPTS(HTML) {
    var json = xmlToJson(HTML);
    var json_string = JSON.stringify(json);
    var json_string_min = minify(json_string);
    var json_min = JSON.parse(json_string_min);
    return create_elements_json_scripts(json_min, "start", "document.body");
}                                                             // CREATE_SCRIPTS _ ALL

////////////////////////////////////////////////////////////////////////////////////////////////////

function Json_to_scripts(json, tag, lpere, ListScripts, current_tab) {
    var keys = Object.keys(json);
    var c_t = getTabs(current_tab);
    var randomTg = (tag != "start") ? randomTag(11) : lpere;
    var valus = keys.filter(key => key.match(/_[a-zA-Z]/));
    // var texts=keys.filter(key=> key=="#text");
    var text = json["#text"];
    var innerText = (typeof (text) == "object" || !text) ? "" : `,\`${text}\``;
    if (tag != "start" && tag != "#text") {
        var lst_vs = valus.map(key => aux(json, key)).join();
        ret = `${c_t}var ${randomTg} = createElements(${lpere},[${lst_vs}],${aux1(tag)}${innerText});`;
        ListScripts.push(ret);
    }
    var arrys = keys.filter(key => def_arrays(json[key], key));
    var objts = keys.filter(key => def_objcts(json[key], key));
    objts.forEach(function (item_objts, index_objts) {
        Json_to_scripts(json[item_objts], item_objts, randomTg, ListScripts, current_tab);
    });
    arrys.reverse().forEach(function (item_arrys, index_arrys) {
        var this_array = json[item_arrys]; var tar_len = this_array.length;
        if (tar_len > 10) {
            var item1_inex1 = this_array[tar_len - 1];
            ListScripts.push(`\n${c_t}///////////// LIST NIVEAU ${current_tab} //////////////\n`);
            ListScripts.push(`${c_t}for (let i=0;i<${tar_len};i++){\n`);
            Json_to_scripts(item1_inex1, item_arrys, randomTg, ListScripts, current_tab + 1);
            ListScripts.push(`${c_t}}\n`);
        }
        else {
            this_array.forEach(function (item_objts, index_objts) {
                Json_to_scripts(item_objts, item_arrys, randomTg, ListScripts, current_tab);
            });
        }
    });
}//                                                           // CREATE_SCRIPTS _ TOOL
function get_json_scripts(o, name, start_parent, start_tab) {
    var list = [];
    Json_to_scripts(o, name, start_parent, list, start_tab);
    return list.join('\n');
}//                                                           // CREATE_SCRIPTS _ TOOL
function GET_HTML_SCRIPTS(HTML) {
    var json = xmlToJson(HTML);
    // var json_string = JSON.stringify(json);
    // var json_string_min = minify(json_string);
    // var json_min = JSON.parse(json_string_min);
    return get_json_scripts(json, "start", "document.body", 0);
}                                                             // CREATE_SCRIPTS _ TOOL
// You are overriding current access token, that means some other app is expecting different access token and you will probably break things. Please consider passing access_token directly to API parameters instead of overriding the global settings.

////////////////////////////////////////////////////////////////////////////////////////////////////

function textXmltoXml(text) {
    var min = minify(text);
    var cls = close_tags(min);
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(text, "text/html");
    var xmlDoc = parser.parseFromString(text, "text/xml");
    return htmlDoc.body;
}
function xmlToJson(xml) {
    var obj = {};// do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    if (xml.nodeType == 1) { // element// do attributes
        if (xml.attributes.length > 0) {
            // obj["Attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj/*["Attributes"]*/[`_${attribute.nodeName}`] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        var txt = xml.nodeValue.trim();
        if (txt.length != 0) { obj/*['__text']*/ = txt }
    }
    return obj;
}
function minify(text) {
    var regsexp = [/\n/gi, / {2,}/gi, /\t/gi];
    regsexp.forEach(function (item, index) {
        text = replace_regexp(text, item, "");
    });
    return text;
}
function trimify(text) {
    var regsexp = [/ {2,}/gi, /\t/gi];
    regsexp.forEach(function (item, index) {
        text = replace_regexp(text, item, " ");
    });
    return text;
}
replace_regexp = (text, regexp, rempl) => {
    var match = text.match(regexp);
    return match ? text.replaceAll(regexp, rempl) : text;
}
function randomTag(length) {
    var listLetters = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN_0123456789";
    var tag = "_";
    for (i in [...Array(length)]) {
        var rand_index = rand(listLetters.length - 1, 0);
        tag += listLetters[rand_index];
    }
    return tag;
}
rand = (Min, Max) => Math.round((Max - Min) * Math.random() + Min)
defpere = (name, item) => `${name}_${item}`
getTabs = n => "\t".repeat(n)
getMx = list => Math.max.apply(Math, list.map(o => o.length))
Intervalle = n => Math.floor(n / 4)
aux = (json, key) => {
    var jsn_k = json[key];
    var key_r = `\`${key.replace('_', '')}\``;
    var js_k_tr = trimify(jsn_k.trim());
    return `[${key_r}, \`${js_k_tr}\`]`;
}
aux1 = tag => `\`${tag}\``  //!!tag?:'sdiv'
def_objcts = (o, k) => !Array.isArray(o) && typeof (o) == "object" && o != null
def_arrays = (o, k) => Array.isArray(o) && k != "#text"
def_arrays1 = (o, k) => Array.isArray(o)
getparent = text => text.split("[")[0]

////////////////////////////////////////////////////////////////////////////////////////////////////

function initilize_editor(value, language) {
    require(['vs/editor/editor.main'], function () {
        var editor = monaco.editor.create(document.getElementById('container'), {
            value: value,
            language: language
        });
    });
}
funct_attr = (keys, obj, name, parent, c_t) => {
    const txtmxI = Intervalle(getMx(keys));
    return keys.reduce((a, c) => {
        var txtI = Intervalle(c.length); var tabs = getTabs(txtmxI - txtI + 1);
        var oc = obj[c]; var n_name = `${name}_${c}`;
        var comment = def_arrays1(oc) ? `Array` : typeof (oc) == "object" ? (!oc ? oc : `Object`) : typeof (oc) == "string" ? oc.replaceAll('\n', ' ') : oc;
        var curr = `${c_t}var ${n_name}${tabs} = ${parent}["${c}"];console.log(${n_name})// ${comment}\n`;
        return curr + a;
    }, ``);
}
function createElements(parent, liste, name, innerText, innerHTML) {
    var node = document.createElement(name);
    if (liste.length != 0) {
        for (var i = 0; i < liste.length; i++) {
            node.setAttribute(liste[i][0], liste[i][1]);
        }
    }
    if (innerText) { node.innerText = innerText; }
    if (innerHTML) { node["value"] = innerHTML; }
    parent.append(node); return node;
}
function Coller() {
    navigator.clipboard.readText()
        .then(text => {
            var XML = textXmltoXml(text);
            var json_frmXml = xmlToJson(XML);
            show_script(json_frmXml);
        })
        .catch(err => { throw ('Failed to read clipboard contents : ' + err); });
}
function textify(argument) {
    return JSON.stringify(argument).replaceAll(/[\[\]\{\}\,"']/g, '');
}
function show2(text) {
    $('textarea').val(text);
    $('textarea')[0].select();
}
function show_script(json) {
    var Scripts = create_elements_json_scripts(json, "start", `$("body")[0]`);
    show2(Scripts);
}
function close_tags(text) {
    var undiscloseds = ['img', 'meta', 'br', 'link', 'hr'];
    undiscloseds.forEach(function (tag, index) {
        var regexp = RegExp(`<${tag}(.*?)>`, 'g');
        text = replace_regexp(text, regexp, m => `${m}</${tag}>`);
    });
    return text;
}

function getunique(arr) {
    var obj = {};
    arr.map(a => (a in obj) ? obj[a]++ : obj[a] = 1);
    return Object.keys(obj).sort((a, b) => -1 * (a.length - b.length));
}
function GetBalises(text) {
    // return text.match(/<[\u0600\u06FF\?a-z:\/\.A-Z\= \-\"0-9_]{1,}>/gi);
    // return text.match(/<[a-z0-9]{1,}[ ,>]/gi);
    return text.match(/<[a-z0-9]{1,}(.*?)>/gi);
}


var temp1 =
{
    "id": "17879582911043274",
    "text": "@ihssanebenalluch ♥♥♥",
    "created_at": 1493553551,
    "did_report_as_spam": false,
    "owner": {
        "id": "3067401022",
        "is_verified": false,
        "profile_pic_url": "https://instagram.fcmn5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/101061954_934856766965318_4472058061858537472_n.jpg?_nc_ht=instagram.fcmn5-1.fna.fbcdn.net&_nc_ohc=-bu7DG8SCZQAX9TJUqY&tp=1&oh=6edd2f4684fdc23c33e022ad7893fba2&oe=603D95C1",
        "username": "maryamsalmouni"
    },
    "viewer_has_liked": false,
    "edge_liked_by": {
        "count": 1,
        "liste": [
            { "count": 1, "temp": 8982771, "some": "hello" }
            , { "count": 1, "temp": 8982771, "some": "hello" }
            , { "count": 1, "temp": 8982771, "some": "hello" }
            , { "count": 1, "temp": 8982771, "some": "hello" }
            , { "count": 1, "temp": 8982771, "some": "hello" }
            , { "count": 1, "temp": 8982771, "some": "hello" }
            , { "count": 1, "temp": 8982771, "some": "hello" }

        ]
    },
    "is_restricted_pending": false,
    "edge_threaded_comments": {
        "count": 0,
        "page_info": {
            "has_next_page": false,
            "end_cursor": null
        },
        "edges": []
    }
};
//require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
/*require(['vs/editor/editor.main'], function() {
  var editor = monaco.editor.create(document.getElementById('container'), {
    value: `var temp1_edge_threaded_comments\t = temp1["edge_threaded_comments"];console.log(temp1_edge_threaded_comments)// Object\n///////////// LIST NIVEAU 0 //////////////\nfor (var index_nLFeg in temp1_edge_threaded_comments){// undefined\n}\nvar temp1_is_restricted_pending\t = temp1["is_restricted_pending"];console.log(temp1_is_restricted_pending)// false\nvar temp1_edge_liked_by\t\t\t = temp1["edge_liked_by"];console.log(temp1_edge_liked_by)// Object\n///////////// LIST NIVEAU 0 //////////////\nfor (var index_HCQyN in temp1_edge_liked_by){// undefined\n}\nvar temp1_viewer_has_liked\t\t = temp1["viewer_has_liked"];console.log(temp1_viewer_has_liked)// false\n`,
    language: 'javascript'
  });
});*/
var testScript = `var temp1_edge_threaded_comments\t = temp1["edge_threaded_comments"];console.log(temp1_edge_threaded_comments)// Object\n///////////// LIST NIVEAU 0 //////////////\nfor (var index_nLFeg in temp1_edge_threaded_comments){// undefined\n}\nvar temp1_is_restricted_pending\t = temp1["is_restricted_pending"];console.log(temp1_is_restricted_pending)// false\nvar temp1_edge_liked_by\t\t\t = temp1["edge_liked_by"];console.log(temp1_edge_liked_by)// Object\n///////////// LIST NIVEAU 0 //////////////\nfor (var index_HCQyN in temp1_edge_liked_by){// undefined\n}\nvar temp1_viewer_has_liked\t\t = temp1["viewer_has_liked"];console.log(temp1_viewer_has_liked)// false\n`;
//initilize_editor(testScript,'javascript');


//copy(get_scripts(temp1,'temp1','temp1',0))
