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
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        /*
        var beaconsList = document.getElementById('beacons');
        alert('start');
		estimoteBeacons.startRangingBeaconsInRegion(function () {
			alert('start11');
			setInterval(function () {
				estimoteBeacons.getBeacons(function (beacons) {
					alert('start123');
					for(var i = 0; i < beacons.length; i++){
						var item = document.createElement('li');
						item.innerText = beacons[i].major + '/' + beacons[i].minor + ' - ' + beacons[i].distance;
						item.id = 'beacon_' + beacons[i].major + '_' + beacons[i].minor;

						beaconsList.appendChild(item);
					}
				});
			}, 1000);
		});
		alert('end');

        console.log('Received Event: ' + id);
        */
        
        var beaconManager = new BeaconManager();
        var beaconsList = document.getElementById('beacons');
        beaconManager.startPulling(1000);
        beaconManager.on('updated', function(beacon){
            var item = document.getElementById('beacon_' + beacon.major + '_' + beacon.minor);

            if(item) {
                item.innerText = beacon.major + '/' + beacon.minor + ' - ' + formatAccuracy(beacon.accuracy);
            }
        });
        beaconManager.on('added', function(beacon) {
            var item = document.createElement('li');
            item.innerText = beacon.major + '/' + beacon.minor + ' - ' + formatAccuracy(beacon.accuracy);
            item.id = 'beacon_' + beacon.major + '_' + beacon.minor;

            beaconsList.appendChild(item);
        });
        beaconManager.on('removed', function(beacon) {
            var item = document.getElementById('beacon_' + beacon.major + '_' + beacon.minor);

            if(item) {
                beaconsList.removeChild(item);
            }
        });

        console.log('Received Event: ' + id);
    }
};

function formatAccuracy(meters) {
	//alert(meters + "type: " +typeof(meters));
    if(meters > 1) {
    	//alert(meters + "type: " +typeof(meters));
        return meters.toFixed(3) + ' m';
    } else {
    	//alert(meters + "type: "+ typeof(meters));
        return (meters * 100).toFixed(3) + ' cm';
    }
}