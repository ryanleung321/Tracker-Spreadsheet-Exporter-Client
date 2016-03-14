"use strict";

class project{
//name is name, sheetsURL is url of project spreadsheet, trackerURL is tracker url, daysActive is an array comprised of bools that keeps track of days active
	constructor(name, sheetsURL, trackerURL, daysActive){
		this.name = name;
		this.sheetsURL = sheetsURL;
		this.trackerURL = trackerURL;
		this.daysActive = daysActive;
	}
}

//append values to storage
function appendToStorage(key, data){
    var old = localStorage.getItem(key);
    if(old === null) old = "";
    localStorage.setItem(key, old + data);
}

//append values to an array stored in localStorage
function appendToStoredArray(key, data){
	var array = JSON.parse(localStorage.getItem(key));
	array.push(data);
	localStorage.setItem(key, JSON.stringify(array));
	console.log(localStorage.getItem(key)); //should log json string of array
}

//invoked on submitButton click
function addProject() {
	//check for previous projectList entries, create one if none
	if (localStorage.getItem('projectList') === null){
		var arrayOfProjects = new Array();
		localStorage.setItem('projectList', JSON.stringify(arrayOfProjects));
	}

	//pull values by ID from html form
	var name = document.getElementById("projectName").value;
	var sheetsURL = document.getElementById("sheetsURL").value;
	var trackerURL = document.getElementById("trackerURL").value;

	//get checkbox elements by class name
	var inputElements = document.getElementsByClassName('dayCheckbox');

	//new array of days chosen
	var dayArray = new Array();
	for(var i=0; inputElements[i]; ++i){
		if(inputElements[i].checked){
        	dayArray[i] = true;
      	}
      	else{
      		dayArray[i] = false;
      	}
	}

	//creating the project object
	var newProject = new project(name, sheetsURL, trackerURL, dayArray);

	//append new project to projectList array
	appendToStoredArray('projectList', newProject);

	console.log(newProject); //should log newProject object
}

//runs addProject on click
document.getElementById('submitButton').addEventListener('click', function(){
	addProject();
	window.location.href="popup.html";
});

//logs project list on load
console.log(localStorage.getItem('projectList'));

//brings you back to catalogue page
document.getElementById('catalogueButton').addEventListener('click', function(){
	window.location.href="popup.html";
});
