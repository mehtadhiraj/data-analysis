var array_for_nodes = new Array(),
	labelmakers = [],
	// Fetch filename and files length from DOM
	totalNodes = parseInt(document.querySelector('#fileLength').innerHTML),
	fileNames = document.querySelector('#fileNames').innerHTML.split(",");
	
	

for (let index = 0; index < fileNames.length; index++) {
	array_for_nodes[index] = window[fileNames[index]]; //These are names of array in the files (either in the same or different files)
	labelmakers.push(fileNames[index].charAt(0).toUpperCase()+fileNames[index].slice(1)) //These are labels for each array which will define label (during hover) for the node.

}

var common_between = [],
	nodes 				   = [],
	edges 					 = [],
	nodetype_count   = 0,
	count_nodes      = 0,
	nodeExistence    = [],
	edgeExistence    = [],
	edge             = -1,
	nodeIds 				 = {};
	
// Search function for all the nodes
function search_arrayobjects(nameKey, myArray,k){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][k] === nameKey) { 
           return i;
        }
    }
}

// Check whether node is created or not
function checkNode(id) {
	for (let j = 0; j < nodes.length; j++) {
		if(nodes[j]['id'] == id){
			return false;
		}
	}
	return true;
}

// Generation of nodes
for(iteration=0;iteration<array_for_nodes.length;iteration++){
	var nodearray = [];
	nodearray = array_for_nodes[iteration];
	var ObjectKeys = Object.keys(nodearray[0]);
	for(i=0;i<nodearray.length;i++){
		for(var objectIndex = 0; objectIndex < 2; objectIndex++){
			// If node is created then skip else create a new node
			// if(nodes.length > 0){
			// 	nodeExistence = checkNode(nodearray[i][ObjectKeys[objectIndex]]);
			// }
			if(nodeExistence.indexOf(nodearray[i][ObjectKeys[objectIndex]]) == -1){
				if(nodearray[i][ObjectKeys[objectIndex]] != undefined){
					nodeIds[nodearray[i][ObjectKeys[objectIndex]]] = 0;
					common_between.push(nodearray[i][ObjectKeys[objectIndex]]);
					nodeExistence.push(nodearray[i][ObjectKeys[objectIndex]])
					nodes.push({
						"x":300*Math.random(),
						"y":300*Math.random(),
						"label":nodearray[i][ObjectKeys[objectIndex]],
						"id":nodearray[i][ObjectKeys[objectIndex]],
						"type":nodetype_count
					});
					if(ObjectKeys.length > 2){
						for (var iter = 0; iter < ObjectKeys.length; iter++) {
							nodes[nodes.length-1][ObjectKeys[iter]] = nodearray[i][ObjectKeys[iter]];
						}
					}
					count_nodes++;
				}
			}
		}
	}
	nodetype_count++;
}
var count_edges = 0;

// Generation of edges
for(iteration=0;iteration<array_for_nodes.length;iteration++){
	var nodearray = [];
	nodearray = array_for_nodes[iteration];
	var ObjectKeys = Object.keys(nodearray[0]);
	for(i=0;i<nodearray.length;i++){
		// If the combination of source and target node exist then skip else create a new edge
		if(edgeExistence.length > 0){
			edge = edgeExistence.indexOf(nodearray[i][ObjectKeys[0]] + "+" + nodearray[i][ObjectKeys[1]]);
		}
		if(edge == -1){
			nodeIds[nodearray[i][ObjectKeys[0]]] = nodeIds[nodearray[i][ObjectKeys[0]]]+1;
			nodeIds[nodearray[i][ObjectKeys[1]]] = nodeIds[nodearray[i][ObjectKeys[1]]]+1;
			edgeExistence.push(nodearray[i][ObjectKeys[0]] + "+" + nodearray[i][ObjectKeys[1]]);
			edges.push({
				"source":nodearray[i][ObjectKeys[0]],
				"target":nodearray[i][ObjectKeys[1]],
				"size":Math.random(),
				"id":String(count_edges),
				"label":nodearray[i][ObjectKeys[1]],
			});
			count_edges++;
		}
	}
}
console.log({nodeIds, nodes, edges, nodeExistence});

var mygraph = {nodes,edges};
localStorage.setItem("nodeStorage",nodes);
localStorage.setItem("edgeStorage",edges);



