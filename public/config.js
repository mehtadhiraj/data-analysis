/**/

var array_for_nodes = new Array();

array_for_nodes[0] = players; //These are names of array in the files (either in the same or different files)
array_for_nodes[1] = country;
array_for_nodes[2] = clubs;
//console.log(array_for_nodes);


var labelmakers = ["Player","Country","Club"]; //These are labels for each array which will define label (during hover) for the node.



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

var arrayforleafnodes = [];
arrayofleafnodes = players; //Change

var leafnodes = "Player";  //Change

var leafnodetype;
for(i=0;i<array_for_nodes.length;i++)
	{
	if(array_for_nodes[i]===arrayofleafnodes){leafnodetype=i;}
	}


var common_between = ["Country","Club"];


