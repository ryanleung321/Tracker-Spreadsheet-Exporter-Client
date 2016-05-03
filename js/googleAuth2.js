"use strict";
var currentKey = JSON.parse(localStorage.getItem('privateKey'));

if (currentKey != null){
	document.getElementById('privateKey').value = currentKey
}

console.log(currentKey);

document.getElementById('nextButton').addEventListener('click', function(){
	var privateKey = document.getElementById('privateKey').value;
	localStorage.setItem('privateKey', JSON.stringify(privateKey));
	window.location.href = "popup.html"
});

document.getElementById('getCredentialsButton').addEventListener('click', function(){
	chrome.tabs.create({ url:  'http://gspread.readthedocs.io/en/latest/oauth2.html'});
});

