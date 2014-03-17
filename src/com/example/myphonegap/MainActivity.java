package com.example.myphonegap;

import android.os.Bundle;

import org.apache.cordova.DroidGap;

@SuppressWarnings("deprecation")
public class MainActivity extends DroidGap  {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//setContentView(R.layout.activity_main);
		//加载assets/www目录下的的index.html加载estimoteBeacons
        //super.loadUrl("file:///android_asset/www/index.html");
        //加载 wifiinfo的界面
        super.loadUrl("file:///android_asset/www/wifiInfo.html");
	}
}
