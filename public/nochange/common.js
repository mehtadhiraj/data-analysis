$("#common").click(function(){
	// if(selectioncount!=1){alert("You have to select 2 leaf nodes!");return;}
	document.getElementById("selectioninfo").innerHTML = "Connections between them:<br>";
	var word = [];
	for (i=0;i<=selectioncount;i++){
		word[i] = newDiv[i].textContent;
	}

	// Remove the duplicates from the array and keep all the unique values
	function findUnique(arr) {
		var unique = [], frequency = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				unique.push(arr[i]);
			} 
			prev = arr[i];
		}
		return unique;
	}

	// Get all the index of selected nodes
	var index = [];
	for (i=0;i<=selectioncount;i++){
		index[i] = search_arrayobjects(word[i],nodes,"label")
	}
	let nodeId = [],
		selectedArrays = [];
	for (let j = 0; j < index.length; j++) {
		nodeId.push(nodes[index[j]].id);
		selectedArrays[j] = [];
	}	

	// Get all the corresponidng edges of the selected nodes.
	for (let j = 0; j < nodeId.length; j++) {
		for(var i=0; i< edges.length; i++){
			if(edges[i].target == nodeId[j]){
				selectedArrays[j].push(edges[i].source);
			}else{
				if(edges[i].source == nodeId[j]){
					selectedArrays[j].push(edges[i].target);
				}
			}
		}
	}

	// Get all the unique value of the generated array
	let unique = [];
	for(var i = 0; i<selectedArrays.length; i++){
		unique[i] = findUnique(selectedArrays[i]);
	}

	// Find the array with maximum length
	let greatestLength = 0;
	let greatestLengthIndex = "";
	for(var i = 0; i<selectedArrays.length; i++){
		if(selectedArrays[i].length > greatestLength){
			greatestLength = selectedArrays[i].length;
			greatestLengthIndex = i; 
		}
	}

	console.log({ selectioncount, nodeId, selectedArrays, unique, greatestLength, greatestLengthIndex});
	
	/* 
		-> Array with max length is compared with the other 
		arrays to find the common nodes between them
		-> If the occurence of given word is equal to the number
		of nodes selected than it is added to the commmon nodes
	*/
	let commonNodes = [];
	let maxNodes = unique.splice(greatestLengthIndex, 1); 
	for (let j = 0; j < maxNodes[0].length; j++) {
		commoncount = 0;
		for(var i = 0; i<unique.length; i++){
			if(unique[i].indexOf(maxNodes[0][j]) != -1){
				commoncount++;  
				if(commoncount == unique.length){
					commonNodes.push(maxNodes[0][j]); 
				}
			}
		}
	}
	
	console.log({commonNodes, maxNodes, unique});
		
	// Appending a common ndoes list
	let newDivision = [];
	let newDivisionIndex = 0
	for(let i = 0; i < commonNodes.length; i++){
			newDivision[newDivisionIndex] = document.createElement('a');
			newDivision[newDivisionIndex].textContent = commonNodes[i];
			newDivision[newDivisionIndex].setAttribute('class','coin');
			newDivision[newDivisionIndex].setAttribute('href', fileNames.join('-')+'/commonnodes');
			newDivision[newDivisionIndex].setAttribute('target','_blank');
			selectioninfo.appendChild(newDivision[newDivisionIndex]);
			newDivision[newDivisionIndex].append(document.createElement('br'));
			newDivisionIndex++;				
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
			localStorage.setItem("selectedStorage",nodeId);
			// window.open("common/"+fileNames);
		}

	});
	selectioncount = -1;
});
