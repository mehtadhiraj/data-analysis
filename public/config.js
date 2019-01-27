var array_for_nodes = new Array(),
	labelmakers = [],
	totalNodes = parseInt(document.querySelector('#fileLength').innerHTML),
	fileNames = document.querySelector('#fileNames').innerHTML.split(","),
	leafNodeValue = document.getElementById('leafNode').innerHTML,
	leafNodeIndex = parseInt(leafNodeValue.charAt(leafNodeValue.length-1)),
	leafNode = fileNames[leafNodeIndex].charAt(0).toUpperCase()+fileNames[leafNodeIndex].slice(1);

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

var arrayofleafnodes = window[fileNames[leafNodeIndex]]; //Change
console.log(arrayofleafnodes);
var leafnodetype;
for(i=0;i<array_for_nodes.length;i++){
	if(array_for_nodes[i]===arrayofleafnodes){leafnodetype=i;}
}

// To find the common between element
var commonBetween = [];
for (let labelIndex = 0; labelIndex < labelmakers.length; labelIndex++) {
	if(labelmakers[labelIndex] != labelmakers[leafNodeIndex]){
		commonBetween.push(labelmakers[labelIndex]);
	}
}

console.log(commonBetween, labelmakers)
var nodes = [],
	edges = [],
	nodetype_count = 0,
	count_nodes = 0;

function search_arrayobjects(nameKey, myArray,k){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][k] === nameKey) { 
           return i;
        }
    }
}



for(iteration=0;iteration<array_for_nodes.length;iteration++)
{
var nodearray = [];
nodearray = array_for_nodes[iteration];
for(i=0;i<nodearray.length;i++)
	{
	if(nodearray[i][labelmakers[nodetype_count]] != undefined){
		console.log(labelmakers[nodetype_count] ,nodearray[i][labelmakers[nodetype_count]]);
		nodes.push({
					"x":300*Math.random(),
					"y":300*Math.random(),
					"size":0.005*Math.random(),
					"label":nodearray[i][labelmakers[nodetype_count]],
					"id":labelmakers[nodetype_count]+":"+nodearray[i][labelmakers[nodetype_count]],
					"type":nodetype_count
					});
					for(var iter in nodearray[i])
					{
					if(iter===labelmakers[nodetype_count]){continue;}
					nodes[count_nodes][iter] = nodearray[i][iter];
					}
		count_nodes++;
		}
	}
nodetype_count++;
}


var count_edges = 0;
for(i=0;i<players.length;i++){
	if(players[i].Players != undefined){
		edges.push({
			"source":"Country:"+players[i].Country,
			"target":"Players:"+players[i].Players,
			"size":Math.random(),
			"id":String(count_edges),
			"label":players[i].Players,
			});
	count_edges++;
	}

}

var key = Object.keys(clubs[0]);
// console.log('here is country info', countryinfo)
// for(i=0;i<players.length;i++){ 	
// 	if(search_arrayobjects(players[i].Country,countryinfo,key[0])!=undefined){
// 		if(players[i].Player != undefined){
// 			edges.push({
// 				"source":"Countryinfo:"+players[i].Country,
// 				"target":"Players:"+players[i].Player,
// 				"size":Math.random(),
// 				"id":String(count_edges),
// 				"label":players[i].Player,
// 				});
// 			count_edges++;
// 		}

// 	}
// }

console.log('here is club info', clubs)
for(i=0;i<players.length;i++){

	if(search_arrayobjects(players[i].Club,clubs,key[0])!=undefined){
		if(players[i].Players != undefined){
			edges.push({
						"source":"Clubs:"+players[i].Club,
						"target":"Players:"+players[i].Players,
						"size":Math.random(),
						"id":String(count_edges),
						"label":players[i].Players,
						});
			count_edges++;
		}
	}
}

var nodecolors = ["#ff0000","#0000ff","#00ff00"];
// console.log(arrayofcolors);
nodes.forEach(function(n){
	n.color= nodecolors[n.type]; 
	// n.color = arrayofcolors[0];
});

console.log(nodes,edges)
var mygraph = {nodes,edges};
localStorage.setItem("nodeStorage",nodes);
localStorage.setItem("edgeStorage",edges);



