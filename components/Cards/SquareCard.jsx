import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SquareCard = ({ icon, text1, text2, iconName }) => {
  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <View style={styles.square}>
      <FontAwesome5 name={iconName} size={25} color="#333" />
      </View>
      <Text style={styles.text}>{text1}</Text>
      <Text style={styles.text1}>{text2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 165,
        height: 165,
        alignItems: "center",
        borderRadius: 20,
        borderColor: "#ddd", // Light border color
        borderWidth: 1,
        padding: 30,
        margin: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      square: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      },
      icon: {
        fontSize: 40,
        color: "#333", // Icon color
      },
      text: {
        marginTop: 8,
        fontSize: 18,
        color: "#333",
        fontWeight: "bold", // Text color
      },
      text1: {
        marginTop: 6,
        fontSize: 14,
        color: "#999",
        fontWeight: "bold", // Text color
      },
});

export default SquareCard;
