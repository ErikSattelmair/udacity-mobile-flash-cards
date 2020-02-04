import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from './middleware'
import { purple } from "./utils/colors";
import FlashCardStatusBar from './components/FlashCardStatusBar'
import Navigation from "./components/Navigation";

export default function App() {
  return (
      <Provider store={createStore(reducer, middleware)}>
          <View style={styles.container}>
              <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
              <Navigation />
          </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
