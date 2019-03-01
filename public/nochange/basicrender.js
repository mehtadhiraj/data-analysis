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

/*A method 'neighnors' is defined which will take one attribute, node id of a node and return all the nodes which are it's neighbor*/
sigma.classes.graph.addMethod('neighbors',
function(node_id)
{
	var k,
	neighbors = {};
	var index = this.allNeighborsIndex[node_id] || {};
	for (k in index)
		neighbors[k] = this.nodesIndex[k];
	return neighbors;
});
/*--------------------------------------------------------------------------------------------------------------------------------*/
// Set the size of each node based on degree
s1 = new sigma({graph: mygraph});	
let degreeNodes = [],
	nodeSize    = [],
	i           = 0,
	maxvalue    = 0;

nodes.forEach(function (node) {
	nodeSize[i]  = degreeNodes[node.id] = Object.keys(s1.graph.neighbors(node.id)).length;
	node['size']  = degreeNodes[node.id];
	i++;
	if(degreeNodes[node.id] > maxvalue){
		maxvalue = degreeNodes[node.id];
	}
});

let nodeWithMaxDegree = [];
nodes.forEach(function (node) {
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
	// newDivision[newDivisionIndex].setAttribute('class','coin');
	// newDivision[newDivisionIndex].setAttribute('href', fileNames.join('-')+'/commonnodes');
	// newDivision[newDivisionIndex].setAttribute('target','_blank');
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
