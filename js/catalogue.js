"use strict";

//declare some variables
var socket = null;
var isopen = false;
var clearToLine;
var sheetNumber;

//connect to server on load
window.onload = function() {

	//connect to websocket location
	socket = new WebSocket("wss://pivotalportwss.herokuapp.com//");
	// socket = new WebSocket("ws://localhost:9000");

	//use for debugging on localhost
	// socket = new WebSocket("ws://0.0.0.0:9000");

    socket.binaryType = "arraybuffer";

    //log connection status on attempted connection
    socket.onopen = function() {
    	console.log("Connected!");
    	isopen = true;
    }

    //displays the message from server when one arrives
	socket.onmessage = function(e) {
		if (typeof e.data == "string") {
			console.log("Text message received: " + e.data);
			document.getElementById('errorMessageField').innerHTML = e.data;
		} else {
			console.log("Error: message not string");
		}
	}

	//error for when the connection is closed
	socket.onclose = function(e) {
		document.getElementById('errorMessageField').innerHTML = "An error occured and the connection was closed";
		console.log("Connection closed.");
		socket = null;
		isopen = false;
	}
};

//makes server "request"
function sendToServer() {
	//check if connection is open
	if (isopen) {
		//get selected project
		var selectedProject = getSelectedProject();


		//check if user has actually selected a project and display an error and prompt if they didnt
		if (selectedProject === undefined){
			console.log("User did not select a project");
			document.getElementById('errorMessageField').innerHTML = "Please select a project";
			return;
		}

		//get user preferences
		var clearNum = document.getElementById('clearNum').value;
		var sheetNum = document.getElementById('sheetNum').value;
		// var additionalOptions = document.getElementById('additionalOptions').value;

		//check if user has given valid transfer options; display error if not
		if (isNaN(clearNum) || clearNum === ''){
			console.log("clearNum is not a valid number")
			document.getElementById('errorMessageField').innerHTML = "Please give a valid line number";	
			return
		}
		if (isNaN(sheetNum) || sheetNum === ''){
			console.log("sheetNum is not a valid number")
			document.getElementById('errorMessageField').innerHTML = "Please give a valid sheet number";	
			return
		}
		// if (additionalOptions !== 'N' && additionalOptions !== 'Y' && additionalOptions !== 'L'){
		// 	console.log("additionalOptions did not contain a valid input")
		// 	document.getElementById('errorMessageField').innerHTML = "Please give a valid additional option";	
		// 	return
		// }

		//create object to be sent
		var object = new Object();
		object.clrLn = clearNum;
		object.shtNm = sheetNum;
		// object.addOp = additionalOptions;
		object.trURL = selectedProject.trackerURL;
		object.shURL = selectedProject.sheetsURL;
		object.tauth = JSON.parse(localStorage.getItem('trackerAuth'));
		object.email = JSON.parse(localStorage.getItem('clientEmail'));
		object.prkey = JSON.parse(localStorage.getItem('privateKey'));

		//send object to python web socket after converting to JSON object
		socket.send(JSON.stringify(object));
		console.log("Object message sent.");               
	} else {
		console.log("Connection not opened.")
		document.getElementById('errorMessageField').innerHTML = "Connection could not be opened";
	}
};

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

var trackerAuth = JSON.parse(localStorage.getItem('trackerAuth'));
var clientEmail = JSON.parse(localStorage.getItem('clientEmail'));
var privateKey = JSON.parse(localStorage.getItem('privateKey'));

console.log(trackerAuth);
console.log(clientEmail);
console.log(privateKey);

if (trackerAuth === null){
	window.location.href = "trackerAuth.html"
};

if (clientEmail === null && trackerAuth != null){
	window.location.href = "googleAuth1.html"
};

if (privateKey === null && trackerAuth != null && clientEmail != null){
	window.location.href = "googleAuth2.html"
};

//bind new project page to add project button
document.getElementById('newProject').addEventListener('click', function(){
	chrome.tabs.create({url: chrome.extension.getURL('newProject.html')});
});

//bind open project button to opening urls of selected project
document.getElementById('openProject').addEventListener('click', function(){
	var selected = getSelectedProject();
	openProject(selected);
});

//deletes selected project with delete button
document.getElementById('deleteProject').addEventListener('click', function(){
	var selected = getSelectedIndex();
	if (selected === undefined){
		console.log("User did not select a project");
		document.getElementById('errorMessageField').innerHTML = "Please select a project";
	} else {
		localStorage.setItem('deleteThisProject', JSON.stringify(selected));
		window.location.href="deleteProject.html";			
	};
});

//creates the catalogue array
var catalogueArray = JSON.parse(localStorage.getItem('projectList'));
console.log(catalogueArray);

//display message for no saved projects
if (catalogueArray === null) {
	document.getElementById('catalogueField').innerHTML = "No projects currently saved";
}

//fill the area with a catalogue if there is one
else document.getElementById('catalogueField').appendChild(makeForm(catalogueArray));

//calls sendToServer on click
document.getElementById('transferStories').addEventListener('click', sendToServer);

//edits project on click
document.getElementById('editProject').addEventListener('click', function(){
	var selectedProject = getSelectedProject();
	var selectedProjectID = getSelectedIndex();

	//checks if project was selected
	if (selectedProject === undefined){
		console.log("User did not select a project");
		document.getElementById('errorMessageField').innerHTML = "Please select a project";
	} else {
		//saves projectID and project in localStorage
		localStorage.setItem('editThisProjectID', JSON.stringify(selectedProjectID));
		localStorage.setItem('editThisProject', JSON.stringify(selectedProject));
		console.log(localStorage.getItem('editThisProject'));
		chrome.tabs.create({url: chrome.extension.getURL('editProject.html')});		
	};
});

document.getElementById('editAuth').addEventListener('click', function(){
	window.location.href = 'trackerAuth.html';
});


String.prototype.escapeSpecialChars = function() {
    return this.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
};







