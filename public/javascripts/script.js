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
    //set all the attributes of new element
    newInputFileElement.setAttribute("type", "file");
    newInputFileElement.setAttribute("class", "csv-file button button1");
    newInputFileElement.setAttribute("name", "csvfile"+inputFileElements.length); // making value unique
    newInputFileElement.setAttribute("id", "csvFile");

    //Creating radio buttons 
    let newInputRadioElement = document.createElement("INPUT");
    newInputRadioElement.setAttribute("type", "checkbox");
    newInputRadioElement.setAttribute("name", "leafnode"+inputFileElements.length); // making value unique
    newInputRadioElement.setAttribute("id", "leafnode"+inputFileElements.length);
    document.getElementById('import-div').style.height = 250+inputFileElements.length*30+"px";
    //appending the element
    this.parentElement.append(newInputFileElement);
    this.parentElement.append(" ");
    this.parentElement.append(newInputRadioElement);
    this.parentElement.append(brTag);
})