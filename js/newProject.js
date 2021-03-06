"use strict";

class project{
//name is name, sheetsURL is url of project spreadsheet, trackerURL is tracker url
	constructor(name, sheetsURL, trackerURL){
		this.name = name;
		this.sheetsURL = sheetsURL;
		this.trackerURL = trackerURL;
	}
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
	//pull values by ID from html form
	var name = document.getElementById("projectName").value;
	var sheetsURL = document.getElementById("sheetsURL").value;
	var trackerURL = document.getElementById("trackerURL").value;

	//creating the project object
	var newProject = new project(name, sheetsURL, trackerURL);

	//append new project to projectList array
	appendToStoredArray('projectList', newProject);

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
	addProject();
	//check for length of array after addition
	var newlength = (JSON.parse(localStorage.getItem('projectList'))).length;

	//successful if new array contains more entries
	if (newlength > oldlength){
		alert("New project successfully added");
		window.location.href="newProject.html";
	}
	else alert("failed");
});

//logs project list on load
console.log(localStorage.getItem('projectList'));

//brings you back to catalogue page
document.getElementById('catalogueButton').addEventListener('click', function(){
	window.location.href="popup.html";
});

