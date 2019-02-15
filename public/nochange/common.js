$("#common").click(function(){
	// if(selectioncount!=1){alert("You have to select 2 leaf nodes!");return;}
	document.getElementById("selectioninfo").innerHTML = "Connections between them:<br>";
	var word = [];
	for (i=0;i<=selectioncount;i++){
		word[i] = newDiv[i].textContent;
	}

	// Finding the frequency of occurrence of all the source and target nodes.
	function findFrequency(arr) {
		var unique = [], frequency = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				unique.push(arr[i]);
				frequency.push(1);
			} else {
				frequency[frequency.length-1]++;
			}
			prev = arr[i];
		}
		return [unique, frequency];
	}

	// Get all the index of selected nodes
	var index = [];
	for (i=0;i<=selectioncount;i++){
		index[i] = search_arrayobjects(word[i],nodes,"label")
	}
	let nodeId = []
	for (let j = 0; j < index.length; j++) {
		nodeId.push(nodes[index[j]].id);
	}	

	// Get all the corresponidng edges of the selected nodes.
	let edgeSource = [];
	for (let j = 0; j < nodeId.length; j++) {
		for(var i=0; i< edges.length; i++){
			if(edges[i].target == nodeId[j]){
				console.log("target : " + edges[i].target)
				console.log("source : " + edges[i].source)
				console.log({i,j});
				edgeSource.push(edges[i].source);
			}
			if(edges[i].source == nodeId[j]){
				console.log("target : " + edges[i].target)
				console.log("source : " + edges[i].source)
				console.log({i,j});
				edgeSource.push(edges[i].target);
			}

		}
	}

	let uniqueAndFrequency = findFrequency(edgeSource);

	// Appending a common ndoes list
	let newDivision = [];
	let newDivisionIndex = 0
	for(let i = 0; i < uniqueAndFrequency[0].length; i++){
		if(uniqueAndFrequency[1][i] % nodeId.length == 0){
			newDivision[newDivisionIndex] = document.createElement('a');
			newDivision[newDivisionIndex].textContent = uniqueAndFrequency[0][i];
			newDivision[newDivisionIndex].setAttribute('class','coin');
			newDivision[newDivisionIndex].setAttribute('href', fileNames.join('-')+'/commonnodes');
			newDivision[newDivisionIndex].setAttribute('target','_blank');
			selectioninfo.appendChild(newDivision[newDivisionIndex]);
			newDivision[newDivisionIndex].append(document.createElement('br'));
			newDivisionIndex++;				
		}
	}

	var common_index;
	localStorage.setItem("storage",index);
	$('.coin').click(function(e){
		// var txt = $(e.target).text();
		var txtTags = document.querySelector('#selectioninfo').childNodes;
		var txt = [];
		for(var txtTagsIndex = 2; txtTagsIndex < txtTags.length; txtTagsIndex++){
			txt.push(txtTags[txtTagsIndex].textContent)		
		}
		if(txt!=""){			
			for(i=0;i<common_between.length;i++){
				if(txt===newDivision[0].textContent){
					common_index = i;
					localStorage.setItem("commonStorage",common_index);
				}
			}		
			localStorage.setItem("textStorage",txt);
			// window.open("common/"+fileNames);
		}

	});
	selectioncount = -1;
});
