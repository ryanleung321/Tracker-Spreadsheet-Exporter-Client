class project{
//name is name, sheetsURL is url of project spreadsheet, trackerURL is tracker url, daysActive is an array comprised of bools that keeps track of days active
	constructor(name, sheetsURL, trackerURL, daysActive){
		this.name = name;
		this.sheetsURL = sheetsURL;
		this.trackerURL = trackerURL;
		this.daysActive = daysActive;
	}
}

function getSelected(){
	var inputElements = document.getElementsByClassName('savedProjects');
	
}

function openProject(project){

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
		linebreak = document.createElement("br");
		//append to the end of the label
		label.appendChild(linebreak)

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

});

console.log(localStorage.getItem('projectList'));

var catologueArray = JSON.parse(localStorage.getItem('projectList'));

//display message for no saved projects
if (catologueArray === null) {
	document.getElementById("tester").innerHTML = "No Projects Currently Saved";
}


document.getElementById('tester').appendChild(makeForm(catologueArray));

















