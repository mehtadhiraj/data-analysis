/*This file is not necessary for now*/


/*---------------------------------Node Array [1]---------------------------------------------*/
for(i=0;i<players.length;i++)
{
nodes.push({
			"x":300*Math.random(),
			"y":300*Math.random(),
			"size":0.005*Math.random(),
			"label":players[i][labelmakers[nodetype_count]],
			"id":labelmakers[nodetype_count]+":"+players[i][labelmakers[nodetype_count]],
			"type":nodetype_count
			});
			for(var iter in players[i])
			{
			//if(iter===label_players){continue;}
			if(iter===labelmakers[nodetype_count]){continue;}
			nodes[count_nodes][iter] = players[i][iter];			
			}
count_nodes++;			
}
nodetype_count++;
/*------------------------------------------------------------------------------*/


/*---------------------------------Node Array [2]---------------------------------------------*/
for(i=0;i<country.length;i++)
{
nodes.push({
			"x":300*Math.random(),
			"y":300*Math.random(),
			"size":0.005*Math.random(),
			"label":country[i][labelmakers[nodetype_count]],
			"id":labelmakers[nodetype_count]+":"+country[i][labelmakers[nodetype_count]],
			"type":nodetype_count
			});
			for(var iter in country[i])
			{
			//if(iter===label_country){continue;}
			if(iter===labelmakers[nodetype_count]){continue;}
			nodes[count_nodes][iter] = country[i][iter];			
			}
count_nodes++;
}
nodetype_count++;
/*------------------------------------------------------------------------------*/



/*---------------------------------Node Array [3]---------------------------------------------*/
for(i=0;i<clubs.length;i++)
{
nodes.push({
			"x":300*Math.random(),
			"y":300*Math.random(),
			"size":0.005*Math.random(),
			"label":clubs[i][labelmakers[nodetype_count]],
			"id":labelmakers[nodetype_count]+":"+clubs[i][labelmakers[nodetype_count]],
			"type":nodetype_count
			});
			for(var iter in clubs[i])
			{
			//if(iter===label_clubs){continue;}
			if(iter===labelmakers[nodetype_count]){continue;}
			nodes[count_nodes][iter] = clubs[i][iter];
			}
count_nodes++;
}
/*------------------------------------------------------------------------------*/


