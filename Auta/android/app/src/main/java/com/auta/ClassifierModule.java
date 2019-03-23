package com.auta;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

import org.tensorflow.contrib.android.TensorFlowInferenceInterface;

public class ClassifierModule extends ReactContextBaseJavaModule {

    private static TensorFlowInferenceInterface inferenceInterface;
    private static final String PB_ADDRESS = "frozen_DistractionClassifier.pb";
    private final String[] LABELS = {"Concentrated", "Depressed", "Distracted", "Sleepy"};
    String input = "conv2d_1_input", output = "activation_5/Sigmoid";
    private static final WIDTH = 64, HEIGHT = 64;
    final int NUM_OUTPUT_CLASSES = 4;

    public ClassifierModule(ReactApplicationContext reactContext){
        super (reactContext)
        inferenceInterface = new TensorFlowInferenceInterface(getAssets(), PB_ADDRESS);
    }

    public String getName(){
        return "Classifier";
    }

    @ReactMethod
    public void classify(Bitmap bmp, Callback errorCallback, Callback successCallback){
        // Take a bitmap and change it into a float array
        assert bmp.getWidth() == WIDTH && bmp.getHeight() == HEIGHT;

        int[] pixels = new int[WIDTH*HEIGHT];
        float[] brightness = new float[WIDTH*HEIGHT];
        float[] r = new float[WIDTH*HEIGHT];
        float[] g = new float[WIDTH*HEIGHT];
        float[] b = new float[WIDTH*HEIGHT];

        bmp.getPixels(pixels, 0, WIDTH, 0, 0, WIDTH, HEIGHT);

        for (int i = 0; i < pixels.length; i++) {
            r[i] = ((pixels[i]) >> 16 & 0xff)/255.0f;
            g[i] = ((pixels[i]) >> 8 & 0xff)/255.0f;
            b[i] = ((pixels[i]) & 0xff)/255.0f;
        }

        float[] inputArray = new float[3*WIDTH*HEIGHT];

        for (int i=0;i<WIDTH*HEIGHT;i++) {
            inputArray[(3*i)] = r[i];
            inputArray[(3*i)+1] = g[i];
            inputArray[(3*i)+2] = b[i];
        }

        // Make a prediction with the image
        float[] prediction = predict(inputArray);

        // form prediction from labels
        float max = 0.0f;
        int maxI = 0;

        for (int i=0;i<prediction.length;i++){
            max = (max > prediction[i]) ? max : prediction[i];
            maxI = (max > prediction[i]) ? maxI : i;
        }

        successCallback.invoke(LABELS[maxI]);
    }

    private float[] predict(float[] inputArray){
        float outputArray[] = new float[NUM_OUTPUT_CLASSES];

        // feed the image to the classifier
        inferenceInterface.feed(input, inputArray, 1, WIDTH, HEIGHT, 3);
        inferenceInterface.run(new String[] {output});
        inferenceInterface.fetch(output, outputArray);

        // return prediction
        return outputArray;
    }
}