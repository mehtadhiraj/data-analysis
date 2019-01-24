$("#common").click(function(){
if(selectioncount!=1){alert("You have to select 2 leaf nodes!");return;}
document.getElementById("selectioninfo").innerHTML = "Connections between them:<br>";
var word = [];
for (i=0;i<=selectioncount;i++)
	{
	word[i] = newDiv[i].textContent;
	}

console.log(word);

var index = [];
for (i=0;i<=selectioncount;i++)
	{
	index[i] = search_arrayobjects(word[i],nodes,"label")
	}

console.log(typeof index);
var newDivision = [];
for(i=0;i<common_between.length;i++)
	{
	if(nodes[index[0]][common_between[i]]===nodes[index[1]][common_between[i]])
		{
				newDivision[i] = document.createElement('div');
				newDivision[i].textContent = nodes[index[0]][common_between[i]];;
				newDivision[i].setAttribute('class','coin');
				selectioninfo.appendChild(newDivision[i]);

		}
	else
		{
				newDivision[i] = document.createElement('div');
				newDivision[i].textContent = "";
				newDivision[i].setAttribute('class','coin');
				selectioninfo.appendChild(newDivision[i]);

		}
	

	}
		var common_index;
		localStorage.setItem("storage",index);
		$('.coin').click(function(e)
			{
			var txt = $(e.target).text();

			if(txt!=""){			
				for(i=0;i<common_between.length;i++){
				if(txt===newDivision[i].textContent){common_index = i;localStorage.setItem("commonStorage",common_index)}}		
				localStorage.setItem("textStorage",txt);
				window.open("common.html");
				}

			});
		selectioncount = -1;
});
