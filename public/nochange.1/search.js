var typed_label;

var array = [];

nodes.forEach(function(n){array.push(n.label)});




autocomplete(document.getElementById("test"),array);
/*Takes the label,i.e username from the function called above,matches with it with the id of the node and rest of the work is same as described in the nodeclick code(nodeclick.js)*/

$("#buttonId").click(function(){
	var	typed_label = $("#test").val();
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
	});
