if (edge_mutual_followed_by_edges.length == 1) {
    diff = edge_mutual_followed_by_count - 1; ndauthers = " et " + diff + " autres";
    var node0 = edge_mutual_followed_by_edges[0]["node"]["username"];
    var line146 = createElements(line145, [["class", "_32eiM"]], "span", node0);
    var line_146 = createElements(line145, [], "span", " est abonné(e)");
}
else if (edge_mutual_followed_by_edges.length == 2) {
    diff = edge_mutual_followed_by_count - 2; ndauthers = " et " + diff + " autres";
    var node0 = edge_mutual_followed_by_edges[0]["node"]["username"];
    var node1 = edge_mutual_followed_by_edges[1]["node"]["username"];
    var line146 = createElements(line145, [["class", "_32eiM"]], "span", node0);
    var line_146 = createElements(line145, [], "span", " et ");
    var line146_1 = createElements(line145, [["class", "_32eiM"]], "span", node1);
    var line_146_1 = createElements(line145, [], "span", " ont abonné(e)");
}
else if (edge_mutual_followed_by_edges.length > 2) {
    diff = edge_mutual_followed_by_count - 1; ndauthers = " et " + diff + " autres";
    var node0 = edge_mutual_followed_by_edges[0]["node"]["username"];
    var node1 = edge_mutual_followed_by_edges[1]["node"]["username"];
    var node2 = edge_mutual_followed_by_edges[2]["node"]["username"];
    var line_146_2 = createElements(line145, [], "span", "Abonnés :");
    var line146 = createElements(line145, [["class", "_32eiM"]], "span", node0);
    var line_146 = createElements(line145, [], "span", ", ");
    var line146_1 = createElements(line145, [["class", "_32eiM"]], "span", node1);
    var line_146_1 = createElements(line145, [], "span", ", ");
    var line146_2 = createElements(line145, [["class", "_32eiM"]], "span", node2);
}
if (diff != 0) {
    var line_146_1 = createElements(line145, [], "span", ndauthers);
}