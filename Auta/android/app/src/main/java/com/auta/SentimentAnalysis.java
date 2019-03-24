package com.auta;

import com.auta.sentiment.SentimentAnalyzer;
import com.auta.sentiment.SentimentResult;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SentimentAnalysis extends ReactContextBaseJavaModule {

    public SentimentAnalysis(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName(){
        return "Sentiment";
    }

    /*
    * "very negative" = 0 "Negative" = 1 "Neutral" = 2 "Positive" = 3
    * "very positive" = 4
     */
    @ReactMethod
    public void analyze(String sentence, Callback errorCallback, Callback successCallback){
        SentimentAnalyzer sentimentAnalyzer = new SentimentAnalyzer();
        sentimentAnalyzer.initialize();
        SentimentResult sentimentResult = sentimentAnalyzer.getSentimentResult(sentence);

        successCallback.invoke((int) sentimentResult.getSentimentScore());
    }
}
