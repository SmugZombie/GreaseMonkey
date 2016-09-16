// ==UserScript==
// @name         My Facebook Timer
// @namespace    http://smugzombie.com
// @version      0.1
// @description  Allows you to keep track of how long you have been on facebook today.
// @author       ron@smugzombie.com
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

// Make sure this only works on the parent frame
// if(self != top){ return false; }

// Define my Cookie
window.myTime = getCookie('us_timer');
var milliseconds = (new Date).getTime();
if(window.myTime == undefined || window.myTime == ""){ window.myTime = milliseconds; setCookie('us_timer', milliseconds, 1); }

// Get the full page content
var html = document.getElementsByTagName('html')[0];

// Create the timer
myTimer = document.createElement("div");
myTimer.innerHTML = "<div id='userscript_timer' style='position: absolute; top: 8px; right: 10px; padding: 5px; background-color: red; z-index: 999999999;'>00:00:00</div>";

// Append to the full page content
html.appendChild(myTimer);

// Update the timer
function incrementTime(){
    //userscript_timer.innerHTML = formatSeconds(seconds);
    //window.myTime = seconds + 1;
    //setCookie('us_timer', window.myTime, 10);
    
    difference = milliseconds - window.myTime;
    userscript_timer.innerHTML = difference / 1000;
    //userscript_timer.innerHTML = formatSeconds(seconds);
    setTimeout(incrementTime, 1000);
}

incrementTime();

// Convert Seconds to Time
function formatSeconds(seconds){
    var date = new Date();
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function formatSeconds2(seconds){
    //var date = new Date();
    //date.setSeconds(seconds);
    //return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    return seconds;
}


// Include basic javascript functions
function setCookie(cname, cvalue, exdays) {
    var d = new Date();d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString(); document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "="; var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1); if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    } return "";
}
