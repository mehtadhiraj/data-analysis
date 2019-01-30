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
function(nodeId)
{
	var k,
	neighbors = {};
	var index = this.allNeighborsIndex[nodeId] || {};
	for (k in index)
		neighbors[k] = this.nodesIndex[k];
	return neighbors;
});
/*--------------------------------------------------------------------------------------------------------------------------------*/

s = new sigma({graph: mygraph});	
console.log(mygraph);
s.addRenderer({container:document.getElementById('container')});
s.settings(settings_config);
s.startForceAtlas2(forceconfig);
s.refresh();


var selectioncount  = -1;
