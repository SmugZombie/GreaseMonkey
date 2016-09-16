// ==UserScript==
// @name         Imgur Downloader
// @namespace    http://smugzombie.com
// @version      0.1
// @description  Download Imgur Images Easily
// @author       ron@digdns.com
// @match        http://imgur.com/*
// @grant        Regli@
// ==/UserScript==

function SaveToDisk(fileURL) {
    // for non-IE
    fileName = fileURL.substring(fileURL.lastIndexOf("/") + 1).split("?")[0];
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

function addDownloadFeature(){
    console.log("Imgur Downloader Enabled");
    document.addEventListener("keydown", function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        console.log(keycode);
        if(keycode == '68'){ // d
            src = document.getElementsByClassName("image")[0].children[0].src;
            if(src == undefined){
            	src = document.getElementsByClassName("image")[0].children[0].children[0].src;
            }
            if(src == undefined){
            	src = document.getElementsByClassName("image")[0].children[0].children[0].children[0].src
            }
            if(src == undefined){
                src = document.getElementsByClassName("image")[0].children[0].children[0].children[0].children[0].src;
            }
            //console.log(src);
            SaveToDisk(src);
        }
    });
    
}
setTimeout(addDownloadFeature, 300);

/* CURRENTLY.. This doesnt seem to support GIF's as they are WEBM based */
