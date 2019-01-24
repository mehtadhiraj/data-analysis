/*To stop and resume the force layout method*/



$("#stopforce").click(function(){

if(s.isForceAtlas2Running())
		{
			s.stopForceAtlas2();
			document.getElementById("stopforce").innerHTML = "Play";
		}
else
		{
			s.startForceAtlas2(forceconfig);
			document.getElementById("stopforce").innerHTML = "Pause";
		}
});
