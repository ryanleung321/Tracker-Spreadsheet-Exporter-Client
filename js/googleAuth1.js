"use strict";
var currentEmail = JSON.parse(localStorage.getItem('clientEmail'));

if (currentEmail != null){
	document.getElementById('clientEmail').value = currentEmail
}

console.log(currentEmail);

document.getElementById('nextButton').addEventListener('click', function(){
	var clientEmail = document.getElementById('clientEmail').value;
	localStorage.setItem('clientEmail', JSON.stringify(clientEmail));
	window.location.href = "googleAuth2.html"
});

document.getElementById('getCredentialsButton').addEventListener('click', function(){
	chrome.tabs.create({ url:  'http://gspread.readthedocs.io/en/latest/oauth2.html'});
});