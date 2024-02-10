import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React , { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const getFonts = () => {
  return Font.loadAsync({
    'FlamaRegular': require('./assets/fonts/FlamaRegular.otf'),
    'FlamaItalic' : require('./assets/fonts/FlamaItalic.otf'),
    'FlamaBoldItalic' : require('./assets/fonts/FlamaBoldItalic.otf'),
    'HankenBook' : require('./assets/fonts/HankenBook.ttf'),
    'HankenLight' : require('./assets/fonts/HankenLight.ttf'),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {  
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
