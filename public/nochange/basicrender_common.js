var string = localStorage.getItem("storage");
var index = JSON.parse("[" + string + "]");
string = localStorage.getItem("textStorage");
var text = string.split(',');
var copyText = text;
string = localStorage.getItem("commonStorage");
var selectedNode = localStorage.getItem('selectedStorage');
selectedNode = selectedNode.split(',');
var common_index = parseInt(string);
var common_nodes = [];
var common_edges = [];

console.log(text, selectedNode);

function findFrequency(arr) {
    var unique = [], frequency = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            unique.push(arr[i]);
            frequency.push(1);
        } else {
            frequency[frequency.length-1]++;
        }
        prev = arr[i];
    }
    return [unique, frequency];
}

let nodeids = []
for(var textIndex = 0; textIndex < text.length; textIndex++){
	for(i=0;i<edges.length;i++){
		if(edges[i].source===text[textIndex]){
			common_edges.push(edges[i]);
			nodeids.push(edges[i].target);	
		}
		if(edges[i].target===text[textIndex]){
			common_edges.push(edges[i]);
			nodeids.push(edges[i].source);
		}
	}
}

nodeids.sort();
console.log(nodeids)
let uniqueAndFrequency = findFrequency(nodeids);
let unique = uniqueAndFrequency[0];
let frequency = uniqueAndFrequency[1];
text = (unique+','+text).split(',');
text = findFrequency(text)[0];
console.log(text);
console.log(common_index);
for (let index = 0; index < text.length; index++) {
	for(i=0;i<nodes.length;i++){
		if(nodes[i].id == text[index]){
			common_nodes.push(nodes[i]);
		}
	}
}


// for(var j = 0; j < nodeids.length; j++){
// 	for(i=0;i<nodes.length;i++){
// 		if(nodes[i].id==nodeids[j])
// 			{common_nodes.push(nodes[i]);
// 		}
// 		// if(nodes[i][common_between[common_index]]===text)
// 		// 	{common_nodes.push(nodes[i]);}
// 	}
// }	
var nodeColors = ["#ff0000","#0000ff","#00ff00","#000000", '#ff00ff', '#ffff00', '#00ffff'];

for (let index = 0; index < unique.length; index++) {
	// common_nodes[index].size = frequency[index];
	if(selectedNode.indexOf(text[index]) != -1){
		common_nodes[index].color = "#22ffa0";
	}else{
		if(copyText.indexOf(text[index]) != -1){
			common_nodes[index].color = "#a0ff22";
		}else{
			common_nodes[index].color = nodeColors[common_nodes[index].type];
		}
	}
}


var nodes = [];var edges = [];

nodes = common_nodes;edges = common_edges;

var commongraph = {nodes,edges};

console.log({common_edges,common_nodes,commongraph, frequency})

var settings_config =
{minNodeSize:5,maxNodeSize:20,minEdgeSize:0.8,maxEdgeSize:0.9,animationsTime:1,labelThreshold:100,/*drawLabels:false,*/
enableEdgeHovering:false,enableHovering:false};

var forceconfig={linLogMode:false,outboundAttractionDistribution:false,adjustSizes:true,edgeWeightInfluence:false,scalingRatio:5,
strongGravityMode:true,gravity:2,barnesHutOptimize:true,barnesHutTheta:0.4,slowDown:2,startingIterations:1,iterationsPerRender:5};

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






s1 = new sigma({graph: commongraph});	
let degreeNodes = [];

common_nodes.forEach(function (node) {
	degreeNodes[node.id] = Object.keys(s1.graph.neighbors(node.id)).length;
	// data = degreeNodes[node.id];
	node['size']  = degreeNodes[node.id];
});
s = new sigma({graph: commongraph});
s.addRenderer({container:document.getElementById('commoncontainer')});
s.settings(settings_config);
s.startForceAtlas2(forceconfig);
s.refresh();

