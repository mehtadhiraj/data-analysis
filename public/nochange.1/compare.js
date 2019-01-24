$("#compare").click(function(){
console.log("hmm");
if(compare_mode===false)
	{
	compare_mode=true;
	document.getElementById("compare").innerHTML = "Comparison:OFF";
	}
else if(compare_mode===true)
	{
	compare_mode=false;
	document.getElementById("compare").innerHTML = "Comparison:ON";
	}


});
