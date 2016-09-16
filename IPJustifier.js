// ==UserScript==
// @name       Dedicated IP Justifyer
// @namespace  http://smugzombie.com
// @version    0.1
// @match      https://*/index.php/DHS/View/*
// @match      https://*/index.php/VPH/View/*
// @copyright  2014+, Ron Egli
// ==/UserScript==

function get_ip_table(){

var ip_table = document.getElementById('ipv4_addresses_panel');
var newIpTable = '';
var actions_cells = ip_table.getElementsByClassName('last_cell');
var table_rows = ip_table.children[1].children[0].children[0].getElementsByTagName('tr');

// Define variables to be used later
window.myincrement = 0;
window.ip_count = 0;
window.justified_ips = 0;

// Unique DNS string = Unique DNS Server IP
// SSL String = SSL Certificate
// HTTP String = HTTP 1.0 Site

window.my_ip_array = [];
window.my_domain_array = [];
window.my_justification_array = [];

// Offset arrays by 1
window.my_ip_array.push("null");
window.my_domain_array.push("null");
window.my_justification_array.push("null");

// Define the header of the new table 
table_header = "\
    <div class='table-title fat-padding collapse_bar ' for='ipv4_justification_panel_content' collapse_img='ipv4_justification_panel_collapse_button'> \
    <div style='float: left;'><strong>IPv4 Justification Checker</strong></div> \
    <div style='float: right;' class='collapse_button' id='ipv4_justification_panel_collapse_button' for='ipv4_justification_panel_content'> \
        <a href='//testscrpt.com/monkey/?p=IPhelp' target='_blank' style='font-size: 8pt;'><img src='//src.testscrpt.com/monkeywrench/resources/images/monkey.png' width='9' height='9'> Help</a> - <img src='/static/icon_minus.gif' width='9' height='9'> \
    </div> \
    <div class='right-side-content' style='float: right;'> \
    </div> \
    </div> \
    ";

// Gather info for, and build, new table    
for(i = 1; i < actions_cells.length; i++)
	{
        // Fetch Current Row's IP address and add to IP Array
        current_IP = actions_cells[i].getElementsByClassName('justify_ip')[0].getAttribute('ip_address');
        window.my_ip_array.push(current_IP);

        // Fetch Current Row's Domain, Clean It Up, then Add to Domain Array
        current_DOMAIN = table_rows[i].children[5].innerHTML.trim();
        current_DOMAIN = current_DOMAIN.replace('"', ""); current_DOMAIN = current_DOMAIN.replace('<br>', "");
        current_DOMAIN = current_DOMAIN.toLowerCase()
        if(current_DOMAIN == ""){current_DOMAIN = "null";}else{} // If current domain blank, define as "null" (string) to check for later
        window.my_domain_array.push(current_DOMAIN);

        // Fetch Current Row's Justification Reason and add to Justification Array
        current_JUSTIFICATION = table_rows[i].children[4].innerHTML.trim()
        window.my_justification_array.push(current_JUSTIFICATION);

        // Check if ODD or EVEN 
        if (i%2 == 0){odd_even = "even";}else{odd_even = "odd";}

        // As we will truncate the domain name in the near future if too long, lets define the full length here
        current_DOMAIN_value = current_DOMAIN;

        // If we already checked, make it say Recheck
        buttonText = "Recheck";

        // If domain = "null", give the user a text box, otherwise add it to the table and put the loading icon in the results column
        if(current_DOMAIN == "null"){current_DOMAIN = "<input type='text' value='' placeholder='google.com' name='' id='justify_this_" + i + "' style='height: 10px;'>"; current_DOMAIN_value = 'null'; buttonText = "Check"; loading = "";}
        else{current_DOMAIN = truncate(current_DOMAIN); loading = "<img src='//src.testscrpt.com/ocelotlegacy/resources/images/spinner.gif' style='height: 10px;'>";}
        
        // Add new rows to the table
        newIpTable += " \
        <tr id='justify_row_" + i + "' class='" + odd_even + "'> \
            <td class='common_td id_row'>"+i+"</td> \
            <td style='padding-left: 5px;' class='common_td'>"+ current_IP +"</td> \
            <td class='common_td'>" + current_DOMAIN + "</td> \
            <td id='is_valid_"+i+"' class='JustificationResults common_td results_td'>"+loading+"</td> \
            <td text-align: center; class='JustificationButton common_td button_row' > \
                <button id='justify_button_"+i+"' style='font-size: 11px; height: 15px; padding-top: 0px;' class='ip_buttons' onclick=\"get_external_results_this('" + current_DOMAIN_value + "','" + current_IP + "','" + i + "', '0')\">"+buttonText+"</button> \
            </td> \
        </tr> \
        ";
    }   

    // Define new tables contents
    ipv4_justify_addresses_panel_contents = " <br> \
    <div class='toolzilla-table' style='width: 100%' id='justification_table'>"+ table_header + " \
    <table id='ipv4_justification_panel_content' style='width: 100%; border-collapse:collapse;'> \
    <tbody class='grid'> \
        <tr class='head' style='background-color: #F5F5F5; background-image: url(/static/table-header-bg.gif);'> \
            <th style='width: 20px;' class='common_th common_th id_row'></th> \
            <th style='width: 110px;' class='common_th common_td' >IP</th> \
            <th class='common_th common_td' >Domain</th> \
            <th style='min-width: 430px; max-width: 640px;' class='common_th common_td'>Results (Type, Port, IP, Cert, Exp, Iss)</th> \
            <th  class='common_th common_td button_row'></th> \
        </tr> " + newIpTable+" \
    </tbody> \
    </table>\
    </div> \
    ";
	
    // Define new element, then give data to it.
    var ipv4_justify_addresses_panel = document.createElement("div");
    ipv4_addresses_panel.appendChild(ipv4_justify_addresses_panel);
    ipv4_justify_addresses_panel.innerHTML = ipv4_justify_addresses_panel_contents;
    
    // Style Table
    add_styles();

    // Set the IP count variable
    window.ip_count = window.my_ip_array.length;

    // Debug, Let us know you have built the table
    console.log('IPJustify: Loaded.');
    
    // Fire off auto checker
    get_external_results(my_domain_array[1], my_ip_array[1], 1);
}

/* Automatic Function */
function get_external_results(domain, ip, row_id){
    // Let the function know how many IPs we have to check
	window.ip_count = window.my_ip_array.length - 1;

    // Debug
	console.log("IPJustify: [Debug] Domain: "+ domain +" IP: "+ ip+ " ID: "+ row_id);

    // The test number is the same as the row number
	window.test_id = row_id;

    // If the row_id (test_id) called is higher than the ip_count, return
	if(window.test_id > ip_count ){return;} //There should be no more results

    // If domain is null, increment tests then recall this function with the new test number
	if(domain == 'null'){window.test_id ++; get_external_results(my_domain_array[window.test_id], my_ip_array[window.test_id], window.test_id); return;}
 	
    // If domain is not null, Fire the Ajax Request
    if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
	else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var response = xmlhttp.responseText; 
			document.getElementById('is_valid_'+row_id).innerHTML = response; 
			window.test_id ++; 
            // If the response returned anything with the invalid.png, consider it a invalid test
			if(response.indexOf('invalid.png') === -1 ){
				window.justified_ips ++; // if valid, incrememnt this number
			}
			// Precheck the next domain in the list, If "null" or not empty, will fire again, otherwise continue
            if(!my_domain_array[window.test_id] == ''){
				get_external_results(my_domain_array[window.test_id], my_ip_array[window.test_id], window.test_id);
			}
            // If no more domains to test, complete the table with the results
			else{complete_tests(); return;} }
	}
    xmlhttp.open("GET","http://ssl.testscrpt.com/check.php?query="+domain+"&ip="+ip+"&type="+my_justification_array[row_id],true); xmlhttp.send();
} 

/* On Click of Button */
function get_external_results_this(domain, ip, row_id, auto){
    if(domain == 'null' && auto == 0){ domain = document.getElementById('justify_this_'+row_id).value; if(domain != ""){ get_external_results_this(domain, ip, row_id); document.getElementById('justify_button_'+row_id).innerHTML='Recheck'; }else{return;} return;}
    else if(domain == 'null' && auto == 1){return;}
    console.log('IPJustify: Getting Data for '+ domain + " Justification Type: " + my_justification_array[row_id]);
    document.getElementById('is_valid_'+row_id).innerHTML = "<img src='//src.testscrpt.com/ocelotlegacy/resources/images/spinner.gif' style='height: 10px;'>";
    if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
    else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
    xmlhttp.onreadystatechange=function(){if (xmlhttp.readyState==4 && xmlhttp.status==200){var response = xmlhttp.responseText; console.log(response); document.getElementById('is_valid_'+row_id).innerHTML = response; }}
    xmlhttp.open("GET","http://ssl.testscrpt.com/check.php?query="+domain+"&ip="+ip+"&type=SSL%20Certificate"); xmlhttp.send();
}  

/* Created to cleanly truncate a domain name*/
function truncate(string){
   if (string.length > 25){return string.substring(0,25)+'...';}
   else{return string;}
};

// Add the final row to the table
function complete_tests(){
	console.log("IPJustify: We're Done Here");
	var table_end = document.createElement("tr");
	ipv4_justification_panel_content.appendChild(table_end);
	percent_verified = ((justified_ips / ip_count) * 100).toFixed(1);
	allowed_without = ip_count - 1;
	if(justified_ips < allowed_without){verified = 'red'; verified_img = "//src.testscrpt.com/monkeywrench/resources/images/invalid.png"; verified_title = "Current Justification Insufficient for More IP Addresses";}
	if(justified_ips == allowed_without){verified = 'green'; verified_img = "//src.testscrpt.com/monkeywrench/resources/images/warn.png"; verified_title = "Current Justification Insufficient for More IP Addresses";}
	if(justified_ips > allowed_without){verified = 'green'; verified_img = "//src.testscrpt.com/monkeywrench/resources/images/valid.png"; verified_title = "Current Justification Acceptable for More IP Addresses";}
    if(ip_count < 3){verified = 'green'; verified_img = "//src.testscrpt.com/monkeywrench/resources/images/valid.png"; verified_title = "Current Justification Acceptable for More IP Addresses";}
    if(ip_count == 3){verified = 'green'; verified_img = "//src.testscrpt.com/monkeywrench/resources/images/warn.png"; verified_title = "Current Justification Insufficient for More IP Addresses";}    
    table_end.innerHTML = "<td colspan=5 style='border-top: solid 1px #B2B2B2;'><center><span style='color: " + verified + ";'><strong>"+ justified_ips +"</strong> of <strong>" + ip_count + "</strong></span> IPs Verified - <span style='color: " + verified + ";'><strong>" + percent_verified + "%</strong> Verified <span style='cursor: help;' title='"+verified_title+"'><img style='height: 12px;' src='"+verified_img+"' /></span></span></center></td>";
}

// Add our custom styles to the page
function add_styles(){
    console.log("IPJustify: Adding Stylesheet");
    var stylesheet = document.createElement("style");
    stylesheet.innerHTML = "\
    /* #ipv4_justification_panel_content .odd{background-color: rgb(156, 223, 156);} */ \
    #ipv4_justification_panel_content .JustificationResults{font-size: 6pt; vertical-align: bottom; padding-bottom: 2px;} \
    #ipv4_justification_panel_content .even{background-color: #F5F5F5;} \
    .common_td{border-right: 1px solid #B2B2B2; border-left: 1px solid #B2B2B2; padding-left: 10px; vertical-align: top;} \
    .common_th{text-align: left; height: 15px; padding-top: 4px; border: 1px solid #b2b2b2;} \
    /* .id_row{border-left: 0px;} */ \
    /*.button_row{border-right: 0px;} */ \
    .ip_buttons{width: 60px;} \
    ";
    justification_table.appendChild(stylesheet);

}

/* Make sure we are on the right type of page */
if(document.URL.indexOf('VPH') !== -1 || document.URL.indexOf('DHS') !== -1 ) {
    console.log('IPJustify: Loading...');
    setTimeout(get_ip_table, 500);
}

