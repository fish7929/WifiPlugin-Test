var WifiInfo= function() {
};

WifiInfo.prototype.get = function(success, fail) {
		//alert('inner');
		Cordova.exec(success, success, 'WifiInfoPlugin', null, [] );
		//alert('inner end');
};

cordova.addConstructor(function() {

	if (!window.plugins) {
		window.plugins = {};
	}
	window.plugins.WifiInfo = new WifiInfo();
});