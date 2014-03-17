var WifiPlugin = {
	callNativeFunction: function(){
		return cordova.exec(success, fail, "com.wifi.wifigeolocator", native_action, [resultType]);
	}
};

var divShowing;

APobj = new Object();
Apobj.ssid = "NULL";
Apobj.mac = "NULL";
Apobj.security = "NULL";
Apobj.frequency = -999;
Apobj.signal = -999;
Apobj.lat = 0;
Apobj.lon = 0;
/*
Now we are getting into the code that actually does something. 
We need to create two functions, one when we press the start button, and one when we press the stop button. 
The start button will make sure we have a current location, 
then it starts an interval that calls a function every few seconds. 
The time is determined by the settings the user saves. 
The stop button clears the interval so we stop scanning. 
We also show and hide start and stop buttons, this just makes the UI a little cleaner.
*/
function startButtonPressed(scanType){
	if(){
		inter = setInterval(function(){startScanning(scanType)}, scanState*1000);
	}else{
		alert("You need to turn on your GPS");
	}
	$('#startButton').hide();
	$('stopButton').show();
	$('#analyzeStartButton').hide();
	$('#analyzeStopButton').show();
}

function stopButtonPressed(){
	clearInterval(inter);
	$('#stopButton').hide();
	$('startButton').show();
	$('#analyzeStopButton').hide();
	$('#analyzeStartButton').show();
}
/*
Next we will need to create functions to turn the wifi radio on and off. 
They just call the function in the WifiPlugin object we created earlier. 
They send the success and error handlers and a native action string. 
This string tells the native code what to do.
*/
function turnOnWifi(){
	WifiPlugin.callNativeFunction(wifiNativePluginSuccessHandler, nativePluginErrorHandler, "TurnOn", null);
}

function turnOffWifi(){
	WifiPlugin.callNativeFunction(wifiNativePluginSuccessHandler, nativePluginErrorHandler, "TurnOff", null);
}
/*
	We also need to create a function that tells the plugin to start scanning. 
	It receives a scanType string, which is the name of the callback function that should be called. 
	It changes based on which button is pressed.
*/
function startScanning(scanType){
	WifiPlugin.callNativeFunction(scanType, nativePluginErrorHandler, "Scan", null);
}

/*
Next we need to create two functions. 
One of them will be the success callback for the capture screen. 
It parses the JSON data and then uploads data to the server. 
The other will be the success callback for the analyze screen. 
It will also decode the JSON data and then display it properly.
*/

function captureNativePluginSuccessHandler(result){
	var latt = latitude;
	var longg = longitude;
	var key, i = 0, str;
	var newRes = [];
	for (key in result.AP){
		var obj = {
			ssid: result.AP[key].SSID,
			mac: result.AP[key].MAC,
			security: result.AP[key].SECURITY,
			frequency: result.AP[key].FREQUENCY,
			signal: result.AP[key].SIGNAL,
			lat: latitude,
			lon: longitude,
		}
		upload(obj);
	}
}

function analyzeNativePluginSuccessHandler(result){
	var key, i = 0, str="";
	var arr = [], ids = [];
	var previous = "", next = "", identity="";
	
	for (key in result.AP){
		var obj = {
			ssid: result.AP[key].SSID,
			mac: result.AP[key].MAC,
			security: result.AP[key].SECURITY,
			frequency: result.AP[key].FREQUENCY,
			signal: result.AP[key].SIGNAL,
			lat: latitude,
			lon: longitude,
		}
		arr.push(obj);
	}
	
	for(i = 0; i < arr.length; i++){
		identity = arr[i].ssid;
		identity = identity.replace(/\s+/g, '');
		var signal = 100 - Math.abs(arr[i].signal);
		if(i!= arr.length-1) next = arr[i+1].ssid;
		
		if(arr[i].ssid != previous){
			ids.push(identity);
			str += "<div onclick=\"showDiv(\'listdiv"+identity+"\')\" id=\"maindiv"+arr[i].ssid+"\" data-role=\"listview
					\" " +
					"data-inset=\"true\"><table><tr><td><h3>"+arr[i].ssid+"<h3></td><td><progress value="+signal+" max=\"100\">" +
					"</td></tr></table></div>";
			if(arr[i].ssid == next){
				str += "<div id=\"listdiv"+identity+"\" class=\"sublists\" data-role=\"listview\" data-inset=\"true\">";
			}
			previous = arr[i].ssid;
		}else{
			str += "<li class=\"aps"+arr[i].ssid+"\" data-role=\"listview\" data-inset=\"true\"><table><tr><td><h3>"+arr[i].ssid +
					"<h3></td><td><progress value="+signal+" max=\"100\"></progress>"+arr[i].signal+"</td></tr><tr><td>Channel:"
					+arr[i].frequency+"</td><td>Security: "+arr[i].security+"</td></tr></table></li>";
			if(next != arr[i].ssid ){
				str += "</div>";
			} 
			previous = arr[i].ssid;
		}
	}
	$(".aps").trigger("create");
	$('#analyzeResults').html(str);
	$("#analyzeResults").trigger("create");
	$(".sublists").hide();
	$("#"+divShowing).show();
}

function nativePluginErrorHandler(result){
	alert("error" + result);

}

function wifiNativePluginSuccessHandler(result){

}

function showDiv(divToShow){
	if($("#"+divToShow).is(':visible'))
		divShowing="";
	else
		divShowing=divToShow;
	$("#"+divToShow).toggle();
}

function upload(toUp){
	var xmlhttp = new XMLHttpRequest();
	var url = ;
	url += "lat="+toUp.lat+"&long="+toUp.lon+"&ssid="+toUp.ssid+"&mac="+toUp.mac+"&freq="+toUp.frequency+
			"&sec="+toUp.security+"&signal="+toUp.signal;
	xmlhttp.open("GET", url. true);
	xmlhttp.send(null);
	console.log(url);
}


















































