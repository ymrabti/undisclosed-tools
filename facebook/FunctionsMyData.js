function getDateFromPlain(datePlainText) {
    var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var templist1 = datePlainText.split(','); var year = parseInt(templist1[1]); var JourDayNamePlainText = templist1[0];
    var templist2 = JourDayNamePlainText.split(' '); var day = parseInt(templist2[1]); var Month = 0;
    for (mn = 0; mn < 12; mn++) { if (templist2[0] == Months[mn]) { Month = mn + 1; } };
    var time = templist1[2]; var templist3 = time.split(' ');
    var time2 = templist3[1].split(':'); var heure = parseInt(time2[0]); var minutes = parseInt(time2[1]);
    if (templist3[2] == "PM" && heure != 12) { heure += 12; }
    else if (templist3[2] == "AM" && heure == 12) { heure -= 12; };
    var export_date = year + "-" + Month + "-" + day + " " + heure + ":" + minutes;
    //console.log(export_date);
    return export_date;
}
var nomUser = 'Younes Mrabti';
function GenerateScriptInsert(NomTable, ListeVariables) {
    var sql = "insert into " + NomTable + " values (";
    var longueur = ListeVariables.length;
    for (v = 0; v < longueur - 1; v++) {
        var typeElement = typeof (ListeVariables[v]);
        if (typeElement != "string" || ListeVariables[v] == "default") { sql += ListeVariables[v] + ","; }
        else { sql += "'" + ListeVariables[v] + "',"; }
    }
    if (typeof (ListeVariables[longueur - 1]) != "string" || ListeVariables[longueur - 1] == "default") { sql += ListeVariables[longueur - 1] + ");\n"; }
    else { sql += "'" + ListeVariables[v] + "');\n" };
    return sql;
}
function getLamPhi(lambdaphi) {
    var listeLP = lambdaphi.replace('(', '').replace(')', '').split(', ');
    listeLP[0] = parseFloat(listeLP[0]);
    listeLP[1] = parseFloat(listeLP[1]);
    return listeLP;
}