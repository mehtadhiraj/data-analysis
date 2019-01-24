var string = localStorage.getItem("storage");
var index = JSON.parse("[" + string + "]");
string = localStorage.getItem("textStorage");
var text = string;
string = localStorage.getItem("commonStorage");
var common_index = parseInt(string);
var common_nodes = [];
var common_edges = [];


for(i=0;i<nodes.length;i++)
{
if(nodes[i].label===text)
	{common_nodes.push(nodes[i]);}
if(nodes[i][common_between[common_index]]===text)
	{common_nodes.push(nodes[i]);}
}

for(i=0;i<edges.length;i++)
{
if(edges[i].source===common_between[common_index]+":"+text)
	{common_edges.push(edges[i]);}
}

var nodes = [];var edges = [];

nodes = common_nodes;edges = common_edges;

var commongraph = {nodes,edges};



var settings_config =
{minNodeSize:5,maxNodeSize:5,minEdgeSize:0.8,maxEdgeSize:0.9,animationsTime:1,labelThreshold:100,/*drawLabels:false,*/
enableEdgeHovering:false,enableHovering:false};

var forceconfig={linLogMode:false,outboundAttractionDistribution:false,adjustSizes:true,edgeWeightInfluence:false,scalingRatio:5,
strongGravityMode:true,gravity:2,barnesHutOptimize:true,barnesHutTheta:0.4,slowDown:2,startingIterations:1,iterationsPerRender:5};

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






s = new sigma({graph: commongraph});	
s.addRenderer({container:document.getElementById('commoncontainer')});
s.settings(settings_config);
s.startForceAtlas2(forceconfig);
s.refresh();

