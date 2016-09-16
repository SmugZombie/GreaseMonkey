// ==UserScript==
// @name         Imgur Downloader 2.0
// @namespace    http://testscrpt.com
// @version      0.1
// @description  Downloads Images from Imgur
// @author       Regli (ron@r-egli)
// @match        http://imgur.com/gallery/*
// @grant        none
// ==/UserScript==

window.currentURL = window.location.href;

function scanDownloadables(){
    window.imageClass = document.getElementsByClassName('image');
    window.imageCount = imageClass.length;
    window.images = [];

    for (var i = imageClass.length - 1; i >= 0; i--) {
        if(imageClass[i].innerHTML.indexOf('src') !== -1){
            mySrc = imageClass[i].children[0].src;
            if(mySrc == undefined){
                //console.log(imageClass[i].innerHTML);
                mySrc = imageClass[i].children[0].children[0].src;
                if(mySrc == undefined || mySrc == ""){
                    mySrc = imageClass[i].children[0].children[0].children[0].src;
                    if(mySrc == undefined || mySrc == ""){
                        mySrc = imageClass[i].children[0].children[0].children[0].src;
                        if(mySrc == undefined || mySrc == ""){
                            console.log('Need I try harder sire?');
                        }
                        else{
                            /*images.unshift(mySrc);
                            highlightImage(i);*/
                            addToArray(mySrc, i);
                        }
                    }
                    else{
                        //images.unshift(mySrc);
                        //highlightImage(i);
                        addToArray(mySrc, i);
                    }
                }
                else{
                    //console.log(mySrc);
                    //images.unshift(mySrc);
                    //highlightImage(i);
                    addToArray(mySrc, i);
                }
            }
            else if(mySrc == ""){
                if(imageClass[i].children[0].innerHTML.indexOf('video-container') === -1){
                    mySrc = imageClass[0].children[0].children[1].children[0].src;
                    //images.unshift(mySrc);
                    addToArray(mySrc, i);
                }
            }
            else{
                //console.log(mySrc);
                //images.unshift(mySrc);
                //highlightImage(i);
                addToArray(mySrc, i);
            }
        }
    };

    window.newImageCount = window.images.length;

    console.log("Initial Images Found: "+window.imageCount);
    console.log("Total Image Sources Found: "+window.newImageCount);
    console.log(window.images);
}

function addToArray(imageUrl, id){
    if(images.indexOf(imageUrl) === -1){
        window.images.unshift(mySrc);
        highlightImage(id);
    }
}

function scanURLChange(){
    if(window.location.href == window.currentURL || window.location.href == window.currentURL + "#"){ setTimeout(scanURLChange, 2000); return; }
    else{
        scanDownloadables();
        window.currentURL = window.location.href;
    }
    setTimeout(scanURLChange, 2000);
}

function highlightImage(image){
    //imageClass[image].parent().style.border = "green 3px solid";
    if(imageClass[image].innerHTML.indexOf('dwnldbtn') === -1){
        imageClass[image].innerHTML += "<button id='dwnldbtn' onclick='downloadImage(" + image + ")' class='btn btn-default' style='position: absolute; bottom: 5px; left: 5px; padding: 4px; font-size: 6px; background-color: rgb(133,191,37); color: black;'><img style='height: 15px' src='//testscrpt.com/images/download.png' /></button>";
    }
}

function downloadImage(image){
    if(window.images.length == 1){
        image = 0;
    }
    SaveToDisk(window.images[image]);
}

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



function downloadAll(){
    for (var i = window.images.length - 1; i >= 0; i--) {
	SaveToDisk(window.images[i]);
};
}

document.addEventListener("keydown", function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    console.log(keycode);
    if(keycode == '110' || keycode == '17'){ // Keypad .
        downloadAll(); 
        return;
    }
});

scanDownloadables();
scanURLChange();

document.getElementById('main-nav').children[0].innerHTML += "<li class=''><a href='#' onclick='scanDownloadables()' ><img style='height: 17px; padding-top: 3px' src='//testscrpt.com/images/refresh-white.png' /></a></li> <li><a href='#' onclick='downloadAll()' ><img style='height: 17px; padding-top: 3px' src='//testscrpt.com/images/download-white.png' /></a></li>";
