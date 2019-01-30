var array_for_nodes = new Array(),
	labelmakers = [],
	totalNodes = parseInt(document.querySelector('#fileLength').innerHTML),
	fileNames = document.querySelector('#fileNames').innerHTML.split(",");
	
	

for (let index = 0; index < fileNames.length; index++) {
	array_for_nodes[index] = window[fileNames[index]]; //These are names of array in the files (either in the same or different files)
	labelmakers.push(fileNames[index].charAt(0).toUpperCase()+fileNames[index].slice(1)) //These are labels for each array which will define label (during hover) for the node.

}
console.log(array_for_nodes);
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


var nodes = [],
	edges = [],
	nodetype_count = 0,
	count_nodes = 0,
	nodeExistence = true,
	nodeIds = {};

function search_arrayobjects(nameKey, myArray,k){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][k] === nameKey) { 
           return i;
        }
    }
}

function checkNode(id) {
	for (let j = 0; j < nodes.length; j++) {
		if(nodes[j]['id'] === id){
			return false;
		}
	}
	return true;
}


for(iteration=0;iteration<array_for_nodes.length;iteration++){
	var nodearray = [];
	nodearray = array_for_nodes[iteration];
	var ObjectKeys = Object.keys(nodearray[0]);
	for(i=0;i<nodearray.length;i++){
		for(var objectIndex = 0; objectIndex < 2; objectIndex++){
			if(nodes.length > 0){
				nodeExistence = checkNode(nodearray[i][ObjectKeys[objectIndex]]);
			}
			if(nodeExistence == true){
				if(nodearray[i][ObjectKeys[objectIndex]] != undefined){
					nodeIds[nodearray[i][ObjectKeys[objectIndex]]] = 0;
					nodes.push({
						"x":300*Math.random(),
						"y":300*Math.random(),
						"size":0.005*Math.random(),
						"label":nodearray[i][ObjectKeys[objectIndex]],
						"id":nodearray[i][ObjectKeys[objectIndex]],
						"type":nodetype_count
					});
					// for(var iter in nodearray[i]){
					// 	if(iter===ObjectKeys[objectIndex]){continue;}
					// 	console.log('here it is',iter,ObjectKeys[objectIndex]);
					// 	nodes[count_nodes][iter] = nodearray[i][iter];
					// }
					count_nodes++;
				}
			}
		}
	}
	nodetype_count++;
}
console.log(nodeIds);
var count_edges = 0;

for(iteration=0;iteration<array_for_nodes.length;iteration++){
	var nodearray = [];
	nodearray = array_for_nodes[iteration];
	var ObjectKeys = Object.keys(nodearray[0]);
	for(i=0;i<nodearray.length;i++){
		nodeIds[nodearray[i][ObjectKeys[0]]] = nodeIds[nodearray[i][ObjectKeys[0]]]+1;
		nodeIds[nodearray[i][ObjectKeys[1]]] = nodeIds[nodearray[i][ObjectKeys[1]]]+1;
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

// nodes.forEach(function(node){
// 	node['size'] = nodeIds[node['id']];
// })

console.log(nodeIds);
// for(i=0;i<players.length;i++){
// 	if(players[i].Players != undefined){
// 		edges.push({
// 			"source":"Country:"+players[i].Country,
// 			"target":"Players:"+players[i].Players,
// 			"size":Math.random(),
// 			"id":String(count_edges),
// 			"label":players[i].Players,
// 		});
// 		count_edges++;
// 	}

// }

// var key = Object.keys(clubs[0]);


// // console.log('here is club info', clubs)
// for(i=0;i<players.length;i++){

// 	if(search_arrayobjects(players[i].Club,clubs,key[0])!=undefined){
// 		if(players[i].Players != undefined){
// 			edges.push({
// 						"source":"Clubs:"+players[i].Club,
// 						"target":"Players:"+players[i].Players,
// 						"size":Math.random(),
// 						"id":String(count_edges),
// 						"label":players[i].Players,
// 						});
// 			count_edges++;
// 		}
// 	}
// }

var nodecolors = ["#ff0000","#0000ff","#00ff00","#000000", '#ff00ff', '#ffff00', '#00ffff'];
// console.log(arrayofcolors);
nodes.forEach(function(node){
	node['size'] = nodeIds[node['id']];
	node.color= nodecolors[node.type]; 
	// n.color = arrayofcolors[0];
});

// console.log(nodes,edges)
var mygraph = {nodes,edges};
localStorage.setItem("nodeStorage",nodes);
localStorage.setItem("edgeStorage",edges);



