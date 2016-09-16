// ==UserScript==
// @name         Password Show-er
// @namespace    https://raw.github.com/SmugZombie/GreaseMonkey/PasswordShow-er.js
// @version      0.1
// @description  Shows stored passwords
// @author       ron.egli@smugzombie.com
// @match        https://*
// @match        http://*
// @grant        none
// ==/UserScript==


window.findPasswords = function(){
    // Find all input fields on the page
    inputs = document.getElementsByTagName('input');

    // If any have the type of "password" lets change that to "text"
    for (var i = inputs.length - 1; i >= 0; i--) {
        if(inputs[i].type == "password"){ inputs[i].type = "text";}
    };
}

// Get the full page content
var html = document.getElementsByTagName('html')[0];

// Create the button
myButton = document.createElement("div");
myButton.innerHTML = "<div id='userscript_button' style='position: absolute; top: 8px; right: 10px; padding: 5px; background-color: red; z-index: 999999999;'><button onclick='window.findPasswords()'>View Password</button></div>";

// Append to the full page 
html.appendChild(myButton);
