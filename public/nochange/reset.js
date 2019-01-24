/*Resets the graph to original rendering */
$("#resetbutton").click(function(){
	        s.graph.nodes().forEach(
			function(n)
			{
         		 n.color = n.originalColor;
        	});

	        s.graph.edges().forEach(
			function(e)
			{
		          e.color = e.originalColor;
	        });

		sigma.misc.animation.camera(s.camera, {x: 0, y: 0,ratio: 1},{ duration: s.settings('animationsTime')});
		document.getElementById("nodeinfo").innerHTML = ("Click on Node to view Information<br>");
		document.getElementById("connectinfo").innerHTML = ("Click on a Node to view connections<br>");
		document.getElementById("selectioninfo").innerHTML = ("Right Click on leaf nodes to find mutuals");
		//s.startForceAtlas2(forceconfig);
		//s.stopForceAtlas2();



		selectioncount = -1;




		if(s.isForceAtlas2Running())
		{
			document.getElementById("stopforce").innerHTML = "Pause";
		}
		else
		{
			document.getElementById("stopforce").innerHTML = "Play";
		}
		s.refresh();		
      });


s.bind('clickStage',
	function(e)
	{
		s.graph.nodes().forEach(
			function(n)
			{
         		 n.color = n.originalColor;
        	});

	        s.graph.edges().forEach(
			function(e)
			{
		          e.color = e.originalColor;
	        });
	sigma.misc.animation.camera(s.camera, {x: 0, y: 0,ratio: 1},{ duration: s.settings('animationsTime')});
	/*document.getElementById("nodeinfo").innerHTML = ("Click on a Node to view Information<br>");
	document.getElementById("connectinfo").innerHTML = ("Click on a Node to view connections<br>");
	document.getElementById("nodeinfo2").innerHTML = ("Click on Node to view Information<br>");
	document.getElementById("connectinfo2").innerHTML = ("Click on a Node to view connections<br>");*/
	
	s.refresh();
	
	});
