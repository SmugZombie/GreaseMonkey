// ==UserScript==
// @name         LolAfkMakeBettererer
// @namespace    http://smugzombie.com
// @version      0.1
// @description  Makes browsing lolafk less work
// @author       ron@digdns.com
// @match        http://lolafk.com/*
// @grant        Regli@
// ==/UserScript==

document.addEventListener("keydown", function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    console.log(keycode);
	if(keycode == '39'){ // Right Arrow
		images.click();	
	}
    else if(keycode == '37'){ // Left Arrow
     	window.history.back();   
    }
    else if(keycode == '38'){ // Up Arrow
        manipulate("bigger");
    }
    else if(keycode == '40'){ // Down Arrow
        manipulate("normal");    
    }
});

function manipulate(size){
    if(size == "bigger"){
        images.style.height = "90%";
    }
    else if(size == "normal"){
        //images.style.height = "90%";
    }
}
