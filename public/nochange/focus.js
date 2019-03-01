function focus(nodeId,nodeLabel,divisionToChange){

		var arr=[],str = []; //declared to store the relevant nodes and their attributes
		i = 0;
		s.graph.nodes().forEach(
		function(n)
		{
			if(toKeep[n.id])
			{				
				arr[i] = n.id;
				str[i++] = n.label;
			}
		});
		arr.splice(arr.indexOf(nodeId),1); //To remove the clicked node itself
		str.splice(str.indexOf(nodeLabel),1);
		var deg = arr.length;
		var myarr = arr.join();
		var mystr = str.join("<br>");
				

				document.getElementById(divisionToChange[0]).innerHTML = "";
				var newcontent = document.createTextNode(nodeLabel);
				document.getElementById(divisionToChange[0]).appendChild(newcontent);
				var linebreak = document.createElement('br');
				document.getElementById(divisionToChange[0]).appendChild(linebreak);
				var newcontent = document.createTextNode("Degree:"+deg);
				document.getElementById(divisionToChange[0]).appendChild(newcontent);
				var linebreak = document.createElement('br');
				document.getElementById(divisionToChange[0]).appendChild(linebreak);

							var keys = Object.keys(nodes[0]);
							console.log(keys);
							var indexOfLabel = keys.indexOf("label");
							var index = search_arrayobjects(nodeLabel,nodes,keys[indexOfLabel]);
							console.log(index);
							
							for(var attr in nodes[index])
							{
								if(attr!="x" && attr!="y" && attr!="label" && attr !='size' && attr!="id" && attr!="type" && attr!="color")
								{
								//console.log(attr+":"+nodes[index][attr]);
								var newcontent = document.createTextNode(attr+":"+nodes[index][attr]);
								document.getElementById(divisionToChange[0]).appendChild(newcontent);
								var linebreak = document.createElement('br');
								document.getElementById(divisionToChange[0]).appendChild(linebreak);								
								}
							}


				document.getElementById(divisionToChange[1]).innerHTML = "";
				var newDiv = [];
				for(iter = 0;iter<str.length;iter++)
				{
				newDiv[iter] = document.createElement('div');
				newDiv[iter].textContent = str[iter];
				newDiv[iter].setAttribute('class','note');
				document.getElementById(divisionToChange[1]).appendChild(newDiv[iter]);
				}

			
	/*This part controls the coloring of relevant edges*/
	s.graph.nodes().forEach(
		function(n)
		{
          if (toKeep[n.id])
          		n.color = n.originalColor;
          else
          	n.color = '#eee';
        });
		s.graph.edges().forEach(
		function(e)
		{	
			e.color = "#eee";
    	});
		s.graph.adjacentEdges(nodeId).forEach( 
		function(ee)
		{
		ee.color=ee.originalColor;
		});
		
	var n = s.graph.nodes(nodeId);
	sigma.misc.animation.camera(
	  s.camera, 
	  {
	    x: n[s.camera.readPrefix + 'x'], 
	    y: n[s.camera.readPrefix + 'y'],
	    ratio: 0.95
	  }, 
	  { duration: s.settings('animationsTime') }
	);
	s.refresh();
	myFunction();
}
