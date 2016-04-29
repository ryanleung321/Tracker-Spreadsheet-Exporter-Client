"use strict";

var projectID = JSON.parse(localStorage.getItem('deleteThisProject'));
var catalogueArray = JSON.parse(localStorage.getItem('projectList'));
var name = catalogueArray[projectID].name;
document.getElementById('projectName').innerHTML = name;

function deleteProject(projectNum){
	var catalogueArray = JSON.parse(localStorage.getItem('projectList'));
	catalogueArray.splice(projectNum, 1);
	localStorage.setItem('projectList', JSON.stringify(catalogueArray));
}

//brings you back to catalogue page
document.getElementById('catalogueButton').addEventListener('click', function(){
	window.location.href="popup.html";
});

document.getElementById('deleteButton').addEventListener('click', function(){
	deleteProject(projectID);
	window.location.href="popup.html";
});
