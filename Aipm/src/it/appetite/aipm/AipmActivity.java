package it.appetite.aipm;

import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class AipmActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        super.setIntegerProperty("splashscreen", R.drawable.appetite_splash);
        
        super.loadUrl("file:///android_asset/www/index.html", 5000);
    }
}
