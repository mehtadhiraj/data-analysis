/*Controls the node click feature,when a node is clicked,if it is a user node,in the box of clicked node information,the username and the posts that user is associated with is shown along with the degree.Only those nodes and corresponding edges are hold to their original color.Rest of the nodes and edges are colored gray.Same thing happens when a post edge is clicked.Except here in the clicked node information box,the post link,poster and commenters are shown along with degree.*/


s.bind('clickNode',
	function(e)
	{
		var nodeId = e.data.node.id;
		var nodeLabel = e.data.node.label;
		toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node; //Because along with the neighbor nodes,the clicked node itself has to be kept for coloring.
		//console.log(Object.keys(toKeep).length); //Do not delete this line
		var divisionToChange = ["nodeinfo","connectinfo"];
		// $('#nodeinfodiv').show();
		$("#ac-1").prop('checked', true);
		//$("#ac-2").prop('checked', true);
		focus(nodeId,nodeLabel,divisionToChange);
      });


var newDiv = [];
s.bind('rightClickNode',
	function(e)
	{
		if(e.data.node.type!=leafnodetype){alert("Not Leaf Node!");return;}
		
		selectioncount++;
		if(selectioncount===0)
		{
			document.getElementById("selectioninfo").innerHTML = "Username added: ";
		}
		if(selectioncount<2)
			{
			//console.log("registered");
			var newContent = e.data.node.label;
			newDiv[selectioncount] = document.createElement('div');
			newDiv[selectioncount].textContent = newContent;
			//newDiv[selectioncount].setAttribute('class','coin');
			selectioninfo.appendChild(newDiv[selectioncount]);
			}			
		
	});

