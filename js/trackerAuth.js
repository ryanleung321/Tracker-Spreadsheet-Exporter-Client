"use strict";
var currentToken = JSON.parse(localStorage.getItem('trackerAuth'));

if (currentToken != null){
	document.getElementById('trackerToken').value = currentToken
}

console.log(currentToken);

document.getElementById('nextButton').addEventListener('click', function(){
	var token = document.getElementById('trackerToken').value;
	localStorage.setItem('trackerAuth', JSON.stringify(token));
	window.location.href = "googleAuth1.html"
});

document.getElementById('tokenButton').addEventListener('click', function(){
	chrome.tabs.create({ url:  'https://www.pivotaltracker.com/profile'});
});