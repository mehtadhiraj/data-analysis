// Deleting button and file input filed
function deleteField(deleteButtonId){
    let buttonId = document.getElementById(deleteButtonId);
    let deleteNodeIndex = parseInt(deleteButtonId.charAt(deleteButtonId.length - 1))
    let csvFile = document.getElementById('csvFile'+deleteNodeIndex);
    let brElement = document.getElementById('br'+deleteNodeIndex);
    csvFile.parentNode.removeChild(csvFile);
    buttonId.parentNode.removeChild(buttonId);
    brElement.parentNode.removeChild(brElement);
}

/* 
    By fetching the length of all the input elememts we can find
    the number of input elements hence we can appned the new element
    by giving a unique and value to name attribute.
*/
document.getElementById('add').addEventListener('click', function(e){
    //get all input elements
    let inputFileElements = document.getElementsByClassName('csv-file')
    // create new input element
    let newInputFileElement = document.createElement("INPUT");
    let brTag = document.createElement("br");
    brTag.setAttribute('id',"br"+inputFileElements.length);
    //set all the attributes of new element
    newInputFileElement.setAttribute("type", "file");
    newInputFileElement.setAttribute("class", "csv-file button button1");
    newInputFileElement.setAttribute("name", "csvfile"+inputFileElements.length); // making value unique
    newInputFileElement.setAttribute("id", "csvFile"+inputFileElements.length);
    newInputFileElement.setAttribute("required", "true");

    //Creating delete buttons 
    let newDeleteButton = document.createElement("INPUT");
    newDeleteButton.setAttribute("type", "button");
    newDeleteButton.setAttribute("class", "button button2 delete");
    newDeleteButton.setAttribute("name", "delete"+inputFileElements.length); // making value unique
    newDeleteButton.setAttribute("id", "delete"+inputFileElements.length);
    newDeleteButton.setAttribute("value", "-");
    newDeleteButton.setAttribute("onclick", "deleteField('delete"+inputFileElements.length+"')");
    document.getElementById('import-div').style.height = 250+inputFileElements.length*30+"px";
    //appending the element
    this.parentElement.append(newInputFileElement);
    this.parentElement.append(" ");
    this.parentElement.append(newDeleteButton);
    this.parentElement.append(brTag);
})

