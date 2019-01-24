var nodes = [];var edges = [];
var nodetype_count = 0;var count_nodes = 0;

for(iteration=0;iteration<array_for_nodes.length;iteration++)
{
var nodearray = [];
nodearray = array_for_nodes[iteration];
for(i=0;i<nodearray.length;i++)
	{
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
nodetype_count++;
}


var count_edges = 0;
for(i=0;i<players.length;i++)
{
edges.push({
			"source":"Country:"+players[i].Country,
			"target":"Player:"+players[i].Player,
			"size":Math.random(),
			"id":String(count_edges),
			"label":players[i].Player,
			});
count_edges++;
}
var key = Object.keys(clubs[0]);

for(i=0;i<players.length;i++)
{

if(search_arrayobjects(players[i].Club,clubs,key[0])!=undefined)
	{
	edges.push({
				"source":"Club:"+players[i].Club,
				"target":"Player:"+players[i].Player,
				"size":Math.random(),
				"id":String(count_edges),
				"label":players[i].Player,
				});
	count_edges++;
	}
}

var nodecolors = ["#ff0000","#0000ff","#00ff00"];
//console.log(arrayofcolors);
nodes.forEach(function(n){
n.color= nodecolors[n.type];
//n.color = arrayofcolors[0];
});


var mygraph = {nodes,edges};
localStorage.setItem("nodeStorage",nodes);
localStorage.setItem("edgeStorage",edges);
