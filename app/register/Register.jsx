import React from "react";
import { View, Text } from "react-native";
import NewScreen from "../../components/Scroll/HorizontalScroll";
import { useTranslation } from "react-i18next";
import { AsyncStorage } from "react-native";
import { useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Register = () => {
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
