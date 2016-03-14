class project{
//name is name, sheetsURL is url of project spreadsheet, trackerURL is tracker url, daysActive is an array comprised of bools that keeps track of days active
	constructor(name, sheetsURL, trackerURL, daysActive){
		this.name = name;
		this.sheetsURL = sheetsURL;
		this.trackerURL = trackerURL;
		this.daysActive = daysActive;
	}
}

document.getElementById('newProject').addEventListener('click', function(){
	window.location.href="newProject.html";
});

console.log(localStorage.getItem('projectList'));

var catologueArray = JSON.parse(localStorage.getItem('projectList'));

if (catologueArray === null) {
	document.getElementById("tester").innerHTML = "No Projects Currently Saved";
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');
    list.style.listStyleType = "none";

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i].name));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo:
document.getElementById('testing').appendChild(makeUL(catologueArray));