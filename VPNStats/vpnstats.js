// ==UserScript==
// @name         VPN Usage Calculator
// @namespace    http://testscrpt.com
// @version      0.1
// @description  Displays VPN usage with OpenVPN
// @author       Regli (ron@r-egli.com)
// @match        https://vpn.digdns.com/admin/log_reports
// @grant        none
// ==/UserScript==

myLength = document.getElementById('log-table').children[0].children.length - 1;
window.totalUsage = 0;
window.totalBO = parseFloat("0");
window.totalBI = 0;

// Total Bytes Out
for (var i = myLength - 1; i >= 1; i--) {
	var myTR = document.getElementById('log-table').children[0].children[i].children[10].innerHTML;
    //console.log(i+" "+myTR);

    if(myTR == ""){ }
    else{
        //console.log(myTR);
        var myNumber = myTR.match(/([0-9][0-9]?[0-9]?.[0-9]?[0-9]?)\w+/g)[0];

        if(myTR.indexOf('GB') !== -1){
            //myNumber = parseFloat(myNumber.toFixed(4));
            afterDot = myNumber.substr(myNumber.indexOf('.'));
            if(afterDot.length < 5){
                    for (var i = afterDot.length; i <= 4; i++) {
                        myNumber = myNumber + "0";
                    }
                }
            myNumber = (myNumber + 0); //.toFixed(5);
            //console.log(myNumber+" MB");
            //console.log("GB: "+myNumber);
            window.totalBO = (parseFloat(window.totalBO) + parseFloat(myNumber));
        }
        else if(myTR.indexOf('MB') !== -1){
            myNumber = (myNumber / 1000).toFixed(5);
            //console.log("MB: "+myNumber);
            window.totalBO = (parseFloat(window.totalBO) + parseFloat(myNumber));
        }
         else if(myTR.indexOf('KB') !== -1){
            myNumber = (myNumber / 100000).toFixed(5);
            //console.log("KB: "+myNumber);
            window.totalBO = (parseFloat(window.totalBO) + parseFloat(myNumber));
        }
    }
};

// Total Bytes IN
for (var i = myLength - 1; i >= 1; i--) {
	var myTR = document.getElementById('log-table').children[0].children[i].children[9].innerHTML;
    //console.log(i+" "+myTR);

    if(myTR == ""){ }
    else{
        //console.log(myTR);
        var myNumber = myTR.match(/([0-9][0-9]?[0-9]?.[0-9]?[0-9]?)\w+/g)[0];

        if(myTR.indexOf('GB') !== -1){
            //myNumber = parseFloat(myNumber.toFixed(4));
            afterDot = myNumber.substr(myNumber.indexOf('.'));
            if(afterDot.length < 5){
                    for (var i = afterDot.length; i <= 4; i++) {
                        myNumber = myNumber + "0";
                    }
                }
            myNumber = (myNumber + 0); //.toFixed(5);
            //console.log(myNumber+" MB");
            //console.log("GB: "+myNumber);
            window.totalBI = (parseFloat(window.totalBI) + parseFloat(myNumber));
        }
        else if(myTR.indexOf('MB') !== -1){
            myNumber = (myNumber / 1000).toFixed(5);
            //console.log("MB: "+myNumber);
            window.totalBI = (parseFloat(window.totalBI) + parseFloat(myNumber));
        }
         else if(myTR.indexOf('KB') !== -1){
            myNumber = (myNumber / 100000).toFixed(5);
            //console.log("KB: "+myNumber);
            window.totalBI = (parseFloat(window.totalBI) + parseFloat(myNumber));
        }
    }
};

function getLast(days){
    document.getElementsByName('time_range_choice')[1].click();
    document.getElementsByName('rel_amount')[0].value = days;
    document.getElementsByClassName('btTxt')[0].click();
}

window.totalUsage = parseFloat(window.totalBO) + parseFloat(window.totalBI);
console.log("Total Bytes Out: "+window.totalBO.toFixed(2)+" GB");
console.log("Total Bytes In: "+window.totalBI.toFixed(2)+" GB");
console.log("Total Usage: " + window.totalUsage.toFixed(2)+" GB");

document.getElementById('header').innerHTML += "<div style='height: auto; width: auto; position: absolute; bottom: 10px; right: 10px; padding: 10px; border: 1px solid black'><center><u>Usage Stats:</u></center><br> Total Bytes Out: "+window.totalBO.toFixed(2)+" GB<br>Total Bytes In: "+window.totalBI.toFixed(2)+" GB<br>Total Usage: "+window.totalUsage.toFixed(2)+" GB<br><br><center><a href='#' onclick='getLast(30)'>[Get Last 30 Days]</a></center></div>";
