s.bind('overNode',
	function(e)
		{
		s.settings({enableHovering:true});
		s.refresh();
		});
s.bind('outNode',
		function(e)
		{
			s.settings({enableHovering:false});			
			s.refresh();
		});

