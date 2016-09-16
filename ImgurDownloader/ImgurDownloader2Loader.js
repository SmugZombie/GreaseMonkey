// ==UserScript==
// @name         Imgur Downloader 2.0 Loader
// @namespace    http://smugzombie.com
// @version      0.1
// @description  Downloads Images from Imgur
// @author       Regli (ron@r-egli)
// @match        http://imgur.com/*
// @grant        none
// ==/UserScript==

  console.log("Imgur Downloader 2.0 is Loading...");
  var monkeywrenchLoader = document.createElement('script');
  monkeywrenchLoader.type = 'text/javascript';
  monkeywrenchLoader.src = '//testscrpt.com/gmscripts/ImgurDownloader2.js';
  document.getElementsByTagName("head")[0].appendChild(monkeywrenchLoader);
