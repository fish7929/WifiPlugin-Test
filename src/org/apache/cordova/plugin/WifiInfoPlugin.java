package org.apache.cordova.plugin;



import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;





import android.content.Context;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.util.Log;

public class WifiInfoPlugin extends CordovaPlugin { 

    @Override 
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        
        Context context = cordova.getActivity().getApplicationContext();
        WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        
        Log.d("Test...", "inner");
        JSONObject obj = new JSONObject();
        try {
            JSONObject activity = new JSONObject();
            activity.put("BSSID", wifiInfo.getBSSID());
            activity.put("HiddenSSID", wifiInfo.getHiddenSSID());
            activity.put("SSID", wifiInfo.getSSID());
            activity.put("MacAddress", wifiInfo.getMacAddress());
            activity.put("IpAddress", wifiInfo.getIpAddress());
            activity.put("NetworkId", wifiInfo.getNetworkId());
            activity.put("RSSI", wifiInfo.getRssi());
            activity.put("LinkSpeed", wifiInfo.getLinkSpeed());
            obj.put("activity", activity); 
        
            if(wifiManager.getScanResults() != null){ 
                JSONArray available = new JSONArray();
                for (ScanResult scanResult : wifiManager.getScanResults()) {
                    JSONObject ap = new JSONObject();
                    ap.put("BSSID", scanResult.BSSID);
                    ap.put("SSID", scanResult.SSID);
                    ap.put("frequency", scanResult.frequency);
                    ap.put("level", scanResult.level);
                    //netwrok.put("timestamp", String.valueOf(scanResult.timestamp));
                    ap.put("capabilities", scanResult.capabilities);
                    available.put(ap);
                }
                obj.put("available", available); 
            }
            
        } catch (JSONException e) {
            e.printStackTrace();
            callbackContext.error("JSON Exception");
        }
        callbackContext.success(obj);
        return true;
    }
}
