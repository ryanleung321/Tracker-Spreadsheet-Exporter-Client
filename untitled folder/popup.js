function addProject() {
	//pull values by ID from html form
	var name = document.getElementById("projectName").value;
	var sheetsURL = document.getElementById("sheetsURL").value;
	var trackerURL = document.getElementById("trackerURL").value;

	//get checkbox elements by class name
	var inputElements = document.getElementsByClassName('dayCheckbox');

	//new array 
	var dayArray = new Array();
	for(var i=0; inputElements[i]; ++i){
		if(inputElements[i].checked){
        	dayArray[i] = true;
      	}
      	else{
      		dayArray[i] = false;
      	}
	}

	//for debugging purposes
	//set a value for debugging html
	document.getElementById("debugName").innerHTML = name;
	document.getElementById("debugSheets").innerHTML = sheetsURL;
	document.getElementById("debugTracker").innerHTML = trackerURL;
	document.getElementById("debugDays").innerHTML = dayArray;
	console.log(dayArray);


}

document.getElementById('submitButton').addEventListener('click', addProject);

// class project{
// //name is name, sheetsURL is url of project spreadsheet, trackerURL is tracker url, daysActive is day object comprised of bools that keeps track of days active
// 	constructor(name, sheetsURL, trackerURL, daysActive){
// 		this.name = name;
// 		this.sheetsURL = sheetsURL;
// 		this.trackerURL = trackerURL;
// 		this.daysActive = daysActive;
// 	}
// }