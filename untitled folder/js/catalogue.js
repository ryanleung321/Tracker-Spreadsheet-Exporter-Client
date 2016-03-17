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

//return selected project 
function getSelectedProject(){
	//create an array of all the input elements
	var inputElements = document.getElementsByClassName('savedProjects');

	//find the selected project by looping until one is checked
	for(var i=0; inputElements[i]; ++i){
		if(inputElements[i].checked){
        	var selectedProjectNumber = i;
        	break;
      	}
	}

	//pull the array of saved projects
	var catalogueArray = JSON.parse(localStorage.getItem('projectList'));

	//return the selected project within the array
	return catalogueArray[selectedProjectNumber];
}

//opens the tabs
function openProject(project){
	chrome.tabs.create({ url: project.sheetsURL});
	chrome.tabs.create({ url: project.trackerURL });
}

//return the selected project's array index
function getSelectedIndex(){
	//create an array of all the input elements
	var inputElements = document.getElementsByClassName('savedProjects');

	//find the selected project by looping until one is checked
	for(var i=0; inputElements[i]; ++i){
		if(inputElements[i].checked){
        	var selectedProjectNumber = i;
        	break;
      	}
	}

	//return the selected project index
	return selectedProjectNumber;
}

function deleteProject(projectNum){
	var catalogueArray = JSON.parse(localStorage.getItem('projectList'));
	catalogueArray.splice(projectNum, 1);
	localStorage.setItem('projectList', JSON.stringify(catalogueArray));
}

//generates the form element
function makeForm(array){
	//create the form element
	var form = document.createElement('form');

	for(var i = 0; i < array.length; i++){
		//create the input item
		var radio = document.createElement('input');

		//set radio button attributes
		radio.setAttribute('type', 'radio');
		radio.setAttribute('value', 'radio');
		radio.setAttribute('name', 'radio');

		//group the buttons into a class
		radio.setAttribute('class', 'savedProjects');

		//assign its value as the current array entry
		radio.setAttribute('value', i);

		//set the label to be added 
		var label = document.createElement('label');
		//append radio button to label
		label.appendChild(radio);
		//assign text to the label
		label.appendChild(document.createTextNode(array[i].name));

		//create a linebreak element
		var linebreak = document.createElement("br");
		//append to the end of the label
		label.appendChild(linebreak);

		//Add to the form
		form.appendChild(label);
	}

	return form;
}

document.getElementById('newProject').addEventListener('click', function(){
	// window.location.href="newProject.html";
	chrome.tabs.create({url: chrome.extension.getURL('newProject.html')});
});

document.getElementById('openProject').addEventListener('click', function(){
	var selected = getSelectedProject();
	openProject(selected);
});

document.getElementById('deleteProject').addEventListener('click', function(){
	var selected = getSelectedIndex();
	deleteProject(selected);
	window.location.href="popup.html";	
});

console.log(localStorage.getItem('projectList'));

var catalogueArray = JSON.parse(localStorage.getItem('projectList'));

//
if (catalogueArray.length === 0){
	catalogueArray = null;
}


//display message for no saved projects
if (catalogueArray === null) {
	document.getElementById('tester').innerHTML = "No Projects Currently Saved";
}

document.getElementById('tester').appendChild(makeForm(catalogueArray));















