var array_for_nodes = new Array(),
	labelmakers = [],
	// Fetch filename and files length from DOM
	totalNodes = parseInt(document.querySelector('#fileLength').innerHTML),
	fileNames = document.querySelector('#fileNames').innerHTML.split(",");
	
	

for (let index = 0; index < fileNames.length; index++) {
	array_for_nodes[index] = window[fileNames[index]]; //These are names of array in the files (either in the same or different files)
	labelmakers.push(fileNames[index].charAt(0).toUpperCase()+fileNames[index].slice(1)) //These are labels for each array which will define label (during hover) for the node.

}
/*This section produces colors of particular numbers(assigned in number_of_colors),use this if you can adjust node colors on this*/

/*

var number_of_colors = 32; //Change this as per requirement
var palette = new DistinctColors({count: number_of_colors});
var arrayofcolors = [];var red,green,blue;
for(i=0;i<number_of_colors;i++)
	{
	red = palette[i]._rgb[0];
	green = palette[i]._rgb[1];
	blue = palette[i]._rgb[2];
	arrayofcolors[i] = rgbToHex(red, green, blue);
	}

*/

/*--------------------------------------------------------------------------------------------------------------------------------*/
// var leafnodetype;
// for(i=0;i<array_for_nodes.length;i++){
// 	if(array_for_nodes[i]===arrayofleafnodes){leafnodetype=i;}
// }


var common_between = [],
	nodes = [],
	edges = [],
	nodetype_count = 0,
	count_nodes = 0,
	nodeExistence = true,
	edgeExistence = [],
	edge = -1;
	nodeIds = {};
	// nodeData = {};

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
		if(nodes[j]['id'] === id){
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
	// console.log(ObjectKeys);
	for(i=0;i<nodearray.length;i++){
		for(var objectIndex = 0; objectIndex < 2; objectIndex++){
			// If node is created then skip else create a new node
			if(nodes.length > 0){
				nodeExistence = checkNode(nodearray[i][ObjectKeys[objectIndex]]);
			}
			if(nodeExistence == true){
				if(nodearray[i][ObjectKeys[objectIndex]] != undefined){
					nodeIds[nodearray[i][ObjectKeys[objectIndex]]] = 0;
					common_between.push(nodearray[i][ObjectKeys[objectIndex]]);
					nodes.push({
						"x":300*Math.random(),
						"y":300*Math.random(),
						// "size":0.005*Math.random(),
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
let nodeName       = [],
	nodeDegree 	   = [],
	count          = 0,
	nodeDegreeName = {};

nodes.forEach(function (node) {
	nodeName.push(node.id);
	nodeDegree[count] = 0;
	nodeDegreeName[node.id] = 0;
	edges.forEach(function (edge) {
		if(edge.source == node.id){
			nodeDegree[count]++;
			nodeDegreeName[node.id]++;  
		}else{
			if(edge.target == node.id){
				nodeDegree[count]++;
				nodeDegreeName[node.id]++;
			}	
		}
	})
	count++;
})

let indexOfNodes = [];
let degreeCount = 0; 
let maxValue = Math.max.apply(nodeDegree);
for (let i = 0; i < nodeDegree.length; i++) {
	if(nodeDegree[i] == maxValue){
		indexOfNodes[degreeCount] = nodeDegree.indexOf(maxValue);
		nodeDegree.splice(maxValue, 1);
	}
}

console.log({nodeIds, nodes, edges, nodeDegree, nodeName, maxValue, nodeDegreeName});
var nodecolors = ["#ff0000","#0000ff","#00ff00","#000000", '#ff00ff', '#ffff00', '#00ffff'];
let degree = [];

 
function getRandomNumber(low, high) {
	var r = Math.floor(Math.random() * (high - low + 1)) + low;
	return r;
}

function getRandomColor() {
	var characters = "0123456789ABCDEF";
	var color = '#';
  
	for (var i = 0; i < 6; i++) {
	  color += characters[getRandomNumber(0, 15)];
	}
	
	return color;
}

// Setting node colour and size
nodes.forEach(function(node){
	
	// node['size'] = nodeDegreeName[node.id];
	// node.color= nodecolors[node.type]; 
	node.color = getRandomColor();
});

var mygraph = {nodes,edges};
localStorage.setItem("nodeStorage",nodes);
localStorage.setItem("edgeStorage",edges);



