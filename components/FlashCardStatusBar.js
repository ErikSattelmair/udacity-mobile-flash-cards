import {StatusBar, View} from "react-native";
import Constants from "expo-constants";
import React from "react";

export default function FlashCardStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}
