	
s.graph.nodes().forEach(
function(n)
{
  n.originalColor = n.color;
});


s.graph.edges().forEach(
function(e)
{
	e.originalColor = e.color;
});


