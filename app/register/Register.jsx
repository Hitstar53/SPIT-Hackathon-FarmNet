import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AsyncStorage } from "react-native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";

import * as Location from 'expo-location';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Register = () => {

  const { t } = useTranslation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  



  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const columnWidth = screenWidth; // Adjust based on your column width

  const handleScroll = (x) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, animated: true });
      setScrollOffset(x);
    }
  };

  const handleLeftScroll = () => {
    const newOffset = Math.max(0, scrollOffset - columnWidth);
    handleScroll(newOffset);
  };

  const handleRightScroll = () => {
    const newOffset = Math.min(
      screenWidth * (numColumns - 1),
      scrollOffset + columnWidth
    );
    handleScroll(newOffset);
  };

  const numColumns = 3;

  const getLang = async () => {
    const lang = await AsyncStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };


  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable native scrolling
        ref={scrollViewRef}
      >
        <View style={styles.columnsContainer}>
          {/* Render columns */}
          <View
            style={[
              styles.column,
              { width: screenWidth, height: screenHeight - 200 },
            ]}
          >
            <Text>Your Name</Text>
            <TextInput
              //   style={styles.textInput}
              //   onChangeText={setEmail}
              //   value={email}
              placeholder={t("adhaarCardName")}
            />
          </View>
          <View style={[styles.column, { width: screenWidth }]}>
            <Text>Column 2</Text>
          </View>
          <View style={[styles.column, { width: screenWidth }]}>
            <Text>Column 3</Text>
          </View>
          {/* Add more columns as needed */}
        </View>
      </ScrollView>
      {/* Buttons for scrolling */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.scrollButton}
          onPress={handleLeftScroll}
        >
          <Text>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scrollButton}
          onPress={handleRightScroll}
        >
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnsContainer: {
    flexDirection: "row",
  },
  column: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  scrollButton: {
    backgroundColor: "#54BFFC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default Register;
