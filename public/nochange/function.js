
/*This part is triggered when the commenter usernames in the clicked node information box are clicked after a post is clicked.The working is same as nodeclick*/








function method(txt)
{
	var typed_label = txt;
	var keys = Object.keys(nodes[0]);
	console.log(keys);
	var indexOfLabel = keys.indexOf("label");
	var index = search_arrayobjects(typed_label,nodes,keys[indexOfLabel]);
	var nodeId = nodes[index].id;
	var nodeLabel = nodes[index].label;
	toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = nodes[index]; //Because along with the neighbor nodes,the clicked node itself has to be kept for coloring.
	//console.log(Object.keys(toKeep).length); //Do not delete this line
	var divisionToChange = ["nodeinfo","connectinfo"];
	focus(nodeId,nodeLabel,divisionToChange);
}

function myFunction()
{
var x = document.getElementsByClassName("note");
		$('.note').click(function(e) {
  		var txt = $(e.target).text();
  		console.log(txt);
		method(txt);
		});
}
