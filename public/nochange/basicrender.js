var settings_config = {
						minNodeSize:3,
			 	 		maxNodeSize:20,
						minEdgeSize:0.1,
						maxEdgeSize:0.6,
						animationsTime:1,
						labelThreshold:100,
						/*drawLabels:false,*/
						enableEdgeHovering:false,
						enableHovering:false
					};
var forceconfig={
				linLogMode:false,
				outboundAttractionDistribution:false,
				adjustSizes:true,
				edgeWeightInfluence:false,
				scalingRatio:5,
				strongGravityMode:true,
				gravity:2,
				barnesHutOptimize:true,
				barnesHutTheta:0.4,
				slowDown:2,
				startingIterations:1,
				iterationsPerRender:5
				};

/*
	A method 'neighnors' is defined which will take one attribute, 
	node id of a node and return all the nodes which are it's neighbor
*/
sigma.classes.graph.addMethod('neighbors',
function(node_id){
	var k,
	neighbors = {};
	var index = this.allNeighborsIndex[node_id] || {};
	for (k in index)
		neighbors[k] = this.nodesIndex[k];
	return neighbors;
});

// Get random hexadecimal colour value
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


// Assigning each node a colour
function setNodeColour(neighbors, length, color){
	for(var i=0; i<length; i++){	
		if(assignedNodes.indexOf(neighbors[i]) == -1){
			colorNodes[neighbors[i]] = color;
			assignedNodes.push(neighbors[i]);
		}
	}
}

// Set the size of each node based on degree
s1 = new sigma({graph: mygraph});	
let degreeNodes       = [],
	nodeSize          = [],
	i                 = 0,
	maxvalue          = 0,
	color             = "#000",
	colorNodes 	      = {},
	assignedNodes     = [],
	nodeWithMaxDegree = [],
	keys,
	length;

// Assigning colours and finding maximum degree.
nodes.forEach(function (node) {
	length = nodeSize[i]  = degreeNodes[node.id] = Object.keys(s1.graph.neighbors(node.id)).length;
	keys = Object.keys(s1.graph.neighbors(node.id));
	node['size']  = degreeNodes[node.id];
	i++;
	if(assignedNodes.indexOf(node.id) == -1){
		color = getRandomColor();
		colorNodes[node.id] = color;
		assignedNodes.push(node.id);
	}
	setNodeColour(keys, length, color);

	if(degreeNodes[node.id] > maxvalue){
		maxvalue = degreeNodes[node.id];
	}
});

// Alloting each node a color and sorting for maximum degree
nodes.forEach(function (node) {
	node.color = colorNodes[node.id];
	if(degreeNodes[node.id] == maxvalue){
		nodeWithMaxDegree.push(node.id + ": " + maxvalue);
	}
})

// Appending a common ndoes list
let newDivision = [];
let newDivisionIndex = 0
maxdegree = document.getElementById('maxdegree');
for(let i = 0; i < nodeWithMaxDegree.length; i++){
	newDivision[newDivisionIndex] = document.createElement('div');
	newDivision[newDivisionIndex].textContent = nodeWithMaxDegree[i];
	maxdegree.appendChild(newDivision[newDivisionIndex]);
	newDivision[newDivisionIndex].append(document.createElement('br'));
	newDivisionIndex++;				
}

localStorage.setItem("nodeStorage",nodes);
mygraph = {nodes, edges};

// Create new sigma graph with the size updated
s = new sigma({graph: mygraph});
s.addRenderer({container:document.getElementById('container')});
s.settings(settings_config);
s.startForceAtlas2(forceconfig);
s.refresh();

console.log(degreeNodes);
console.log(nodes);
console.log(nodeSize);

var selectioncount  = -1;
