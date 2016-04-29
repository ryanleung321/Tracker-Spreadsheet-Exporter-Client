"use strict";

//fills in form fields with project to edit 
window.onload = function(){
	var project = JSON.parse(localStorage.getItem('editThisProject'));
	console.log(project);
	document.getElementById('projectName').value = project.name
	document.getElementById('trackerURL').value = project.trackerURL
	document.getElementById('sheetsURL').value = project.sheetsURL
}

class project{
//name is name, sheetsURL is url of project spreadsheet, trackerURL is tracker url
	constructor(name, sheetsURL, trackerURL){
		this.name = name;
		this.sheetsURL = sheetsURL;
		this.trackerURL = trackerURL;
	}
}

//update values to an array stored in localStorage
function updateStoredArray(key, data, id){
	var array = JSON.parse(localStorage.getItem(key));
	array[id] = data
	localStorage.setItem(key, JSON.stringify(array));
	console.log(localStorage.getItem(key)); //should log json string of array
}

//invoked on submitButton click
function updateProject() {
	//pull values by ID from html form
	var name = document.getElementById("projectName").value;
	var sheetsURL = document.getElementById("sheetsURL").value;
	var trackerURL = document.getElementById("trackerURL").value;

	//gets project ID
	var projectID = JSON.parse(localStorage.getItem('editThisProjectID'))

	//creating the project object
	var newProject = new project(name, sheetsURL, trackerURL);

	//append new project to projectList array
	updateStoredArray('projectList', newProject, projectID);

	console.log(newProject); //should log newProject object
}

//runs addProject on click
document.getElementById('submitButton').addEventListener('click', function(){
	//check for previous projectList entries, create one if none
	if (localStorage.getItem('projectList') === null){
		var arrayOfProjects = new Array();
		localStorage.setItem('projectList', JSON.stringify(arrayOfProjects));
	}
	//check for length of array before addition
	var oldlength = (JSON.parse(localStorage.getItem('projectList'))).length;
	console.log(oldlength);
	updateProject();
	//check for length of array after addition
	var newlength = (JSON.parse(localStorage.getItem('projectList'))).length;
	console.log(newlength);

	//successful if new array contains same ammount of entries
	if (newlength === oldlength){
		alert("Project successfully updated");
		window.location.href="popup.html";
	}
	else alert("failed");
});

//logs project list on load
console.log(localStorage.getItem('projectList'));

//brings you back to catalogue page
document.getElementById('catalogueButton').addEventListener('click', function(){
	window.location.href="popup.html";
});

