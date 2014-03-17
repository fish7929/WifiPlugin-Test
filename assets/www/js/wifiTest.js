/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var app = {
    // Application Constructor
    initialize: function() {
        
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//alert('erwer');
        //app.receivedEvent('deviceready');
		//var str = "";
		setInterval(function () {
                window.plugins.WifiInfo.get(function(wifi){ 
					//console.log(wifi[0][0].SSID + "****HELLO*****");
					//直接显示json字符串
					//alert(JSON.stringify(wifi));
					app.updateTableData(wifi.available);
				});
            }, 1000);
		/*
        window.plugins.WifiInfo.get(function(wifi){ 
            //console.log(wifi[0][0].SSID + "****HELLO*****");
			//直接显示json字符串
			//alert(JSON.stringify(wifi));
			app.updateTableData(wifi.available);
		});
		*/
    },
    // Update DOM on a Received Event
    /*
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
	*/
	updateTableData: function (info){
		//alert('2');
		$("#available tr:gt(0):not(:eq(0))").remove();
		
		var element = $('#available tr:gt(0)');
		if (info.length == 0) {
			return false;	
		}
		for (var i = 0; i < info.length; i++){
			if (i == 0){
				element.find('td:eq(0)').text(info[i].SSID);
				element.find('td:eq(1)').text(info[i].BSSID);
				element.find('td:eq(2)').text(info[i].level);
				element.find('td:eq(3)').text(info[i].frequency);
			}else {
				var newRow = element.clone(true);
				newRow.find('td:eq(0)').text(info[i].SSID);
				newRow.find('td:eq(1)').text(info[i].BSSID);
				newRow.find('td:eq(2)').text(info[i].level);
				newRow.find('td:eq(3)').text(info[i].frequency);
				element.after(newRow);
			}
		}
	}
};

/*
$(document).ready(function(){
	alert("0");
	var wifiInfo = new WifiInfo();
	window.plugins.WifiInfo.get(function(wifi){ 
		alert('1');
		alert(JSON.stringify(wifi));
		updateTableData(wifi.available);
	});
	
	wifiInfo.get(function(wifi){ 
		alert('1');
		alert(JSON.stringify(wifi));
		updateTableData(wifi.available);
	});
	
	
	function updateTableData(info){
		alert('2');
		var element = $('#available tr:gt(0)');
		if (info.length == 0) {
			return false;	
		}
		for (var i = 0; i < info.length; i++){
			if (i == 0){
				element.find('td:eq(0)').text(info[i].level);
				element.find('td:eq(1)').text(info[i].frequency);
				element.find('td:eq(2)').text(info[i].BSSID);
				element.find('td:eq(3)').text(info[i].SSID);
			}else {
				var newRow = element.clone(true);
				element.find('td:eq(0)').text(info[i].level);
				element.find('td:eq(1)').text(info[i].frequency);
				element.find('td:eq(2)').text(info[i].BSSID);
				element.find('td:eq(3)').text(info[i].SSID);
				element.before(newRow);
			}
		}
	}
});
*/