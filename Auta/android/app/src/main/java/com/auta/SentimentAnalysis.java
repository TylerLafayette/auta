package com.auta;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class SentimentAnalysis extends ReactContextBaseJavaModule {

    public SentimentAnalysis(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName(){
        return "Sentiment";
    }
}
