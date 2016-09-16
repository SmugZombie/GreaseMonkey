// ==UserScript==
// @name         My Facebook Timer Loader
// @namespace    http://testscrpt.com
// @version      0.1
// @description  Allows you to keep track of how long you have been on facebook today.
// @author       ron.egli@terraverdeservices.com
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

  console.log("Facebook Timer is Loading...");
  var monkeywrenchLoader = document.createElement('script');
  monkeywrenchLoader.type = 'text/javascript';
  monkeywrenchLoader.src = '//testscrpt.com/gmscripts/FacebookTimer.js';
  document.getElementsByTagName("head")[0].appendChild(monkeywrenchLoader);


inputs = document.getElementsByTagName('input');

  for (var i = inputs.length - 1; i >= 0; i--) {
  	inputs[i].type = "text";
  };
