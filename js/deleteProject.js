"use strict";


var projectID = JSON.parse(localStorage.getItem('deleteThisProject'));
var catalogueArray = JSON.parse(localStorage.getItem('projectList'));
var name = catalogueArray[projectID].name;

//displays name of project to be deleted
document.getElementById('projectName').innerHTML = name;

//deletes project from array 
function deleteProject(projectNum){
	var catalogueArray = JSON.parse(localStorage.getItem('projectList'));

	//deletes one item from projectNum index
	catalogueArray.splice(projectNum, 1);
	localStorage.setItem('projectList', JSON.stringify(catalogueArray));
}

//brings you back to catalogue page
document.getElementById('catalogueButton').addEventListener('click', function(){
	window.location.href="popup.html";
});

//deletes on press and brings you to popup
document.getElementById('deleteButton').addEventListener('click', function(){
	deleteProject(projectID);
	window.location.href="popup.html";
});
