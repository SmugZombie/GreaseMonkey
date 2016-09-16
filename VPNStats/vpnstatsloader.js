// ==UserScript==
// @name         VPN Usage Calculator Loader
// @namespace    http://testscrpt.com
// @version      0.1
// @description  Displays VPN usage with OpenVPN
// @author       Regli (ron@r-egli.com)
// @match        https://vpn.digdns.com/admin/log_reports
// @grant        none
// ==/UserScript==

  console.log("VPN Usage Calculator is Loading...");
  var monkeywrenchLoader = document.createElement('script');
  monkeywrenchLoader.type = 'text/javascript';
  monkeywrenchLoader.src = '//testscrpt.com/scripts/vpnstats.js';
  document.getElementsByTagName("head")[0].appendChild(monkeywrenchLoader);
