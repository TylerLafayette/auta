package com.auta;

import com.facebook.react.ReactActivity;
import com.facebook.react.shell.MainReactPackage;
import com.auta.CustomMlPackage;
import java.util.List;
import com.facebook.react.ReactPackage;
import java.util.Arrays;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Auta";
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new CustomMlPackage());
    }
}
