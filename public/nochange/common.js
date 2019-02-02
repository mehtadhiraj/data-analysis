$("#common").click(function(){
// if(selectioncount!=1){alert("You have to select 2 leaf nodes!");return;}
document.getElementById("selectioninfo").innerHTML = "Connections between them:<br>";
var word = [];
for (i=0;i<=selectioncount;i++){
	word[i] = newDiv[i].textContent;
}

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

console.log(word);

var index = [];
for (i=0;i<=selectioncount;i++){
	index[i] = search_arrayobjects(word[i],nodes,"label")
}

let nodeId = []

for (let j = 0; j < index.length; j++) {
	nodeId.push(nodes[index[j]].id);
}	

let edgeSource = [];
for (let j = 0; j < nodeId.length; j++) {
	for(var i=0; i< edges.length; i++){
		if(edges[i].target == nodeId[j]){
			edgeSource.push(edges[i].source);
		}
		if(edges[i].source == nodeId[j]){
			edgeSource.push(edges[i].target);
		}

	}
}

edgeSource.sort();

let uniqueAndFrequency = findFrequency(edgeSource);
// for(let i = edgeSource.length-1; i>0; i--){
// 	if(edgeSource[i]==edgeSource[0]){
// 		edgeSource.pop();
// 	}
// }
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

// let newDivision = [];
// let newDivisionIndex = 0
// if(edgeSource.length == 1){
// 	newDivision[newDivisionIndex] = document.createElement('div');
// 	newDivision[newDivisionIndex].textContent = edgeSource[0];
// 	newDivision[newDivisionIndex].setAttribute('class','coin');
// 	selectioninfo.appendChild(newDivision[newDivisionIndex]);	
// }else{
// 	newDivision[newDivisionIndex] = document.createElement('div');
// 	newDivision[newDivisionIndex].textContent = "";
// 	newDivision[newDivisionIndex].setAttribute('class','coin');
// 	selectioninfo.appendChild(newDivision[newDivisionIndex]);
// }

// for (let edge = 0; edge < edgeTarget.length; edge++) {
		
// }

console.log({index, nodeId, edges, edgeSource, uniqueAndFrequency});  
// var newDivision = [];
// for(i=0;i<common_between.length;i++)
// 	{
// 	if(nodes[index[0]][common_between[i]]===nodes[index[1]][common_between[i]])
// 		{
// 				newDivision[i] = document.createElement('div');
// 				newDivision[i].textContent = nodes[index[0]][common_between[i]];;
// 				newDivision[i].setAttribute('class','coin');
// 				selectioninfo.appendChild(newDivision[i]);

// 		}
// 	else
// 		{
// 				newDivision[i] = document.createElement('div');
// 				newDivision[i].textContent = "";
// 				newDivision[i].setAttribute('class','coin');
// 				selectioninfo.appendChild(newDivision[i]);

// 		}
	

// 	}
	var common_index;
	localStorage.setItem("storage",index);
	$('.coin').click(function(e)
		{
		// var txt = $(e.target).text();
		var txtTags = document.querySelector('#selectioninfo').childNodes;
		var txt = [];
		for(var txtTagsIndex = 2; txtTagsIndex < txtTags.length; txtTagsIndex++){
			txt.push(txtTags[txtTagsIndex].textContent)		
		}
		console.log(txt)
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
