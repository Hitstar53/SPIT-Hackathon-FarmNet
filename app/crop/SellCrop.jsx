import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import LottieView from "lottie-react-native";
import { Picker } from "@react-native-picker/picker";

const SellCrop = () => {
  const [amount, setAmount] = useState("");
  const [repaymentTime, setRepaymentTime] = useState("");
  const [interestRange, setInterestRange] = useState("");

  const handleRequestLoan = () => {
    // Handle the logic for submitting the loan request
    console.log("Loan requested with the following details:");
    console.log("Amount:", amount);
    console.log("Repayment Time:", repaymentTime);
    console.log("Interest Range:", interestRange);
    // You can add your logic to send this information to a server, etc.
  };

  const [selectedCrop, setSelectedCrop] = useState(null);
  const crops = [
    { id: 1, name: "Wheat" },
    { id: 2, name: "Rice" },
    { id: 3, name: "Maize" },
    { id: 4, name: "Barley" },
    { id: 5, name: "Soybeans" },
    { id: 6, name: "Sunflower" },
    { id: 7, name: "Cotton" },
    { id: 8, name: "Potato" },
    { id: 9, name: "Tomato" },
    { id: 10, name: "Carrot" },
    // Add more crops as needed
  ];  

  return (
    <View style={styles.container}>
      <View>
        <LottieView
          source={require("../../assets/cropsell.json")} // Replace with the path to your Lottie animation file
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Selling Price</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Crop Name</Text>
          <Text style={styles.selectedCrop}>
                {selectedCrop ? selectedCrop.name : "Select Crop"}
            </Text>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(itemValue, itemIndex) => {
                setSelectedCrop(crops.find((crop) => crop.id === itemValue));
              }}
            style={styles.picker}
          >
            <Picker.Item label="Select a crop" value={null} />
            {crops.map((crop) => (
          <Picker.Item key={crop.id} label={crop.name} value={crop.id} />
        ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestLoan}
        >
          <Text style={styles.buttonText}>List Item on Market</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellCrop;

const styles = StyleSheet.create({
    selectedCrop: {
        marginRight: 10,
        fontSize: 16,
      },
    inputContainer: {
        marginBottom: 20,
      },
      label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      picker: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
      },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  amountLabel: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
  },
  amountInput: {
    flex: 2,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 0, // Remove borders
    borderBottomWidth: 1, // Add borderBottom for styling
    borderColor: "#3498db", // Add borderBottom color
  },
  animation: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    marginTop: 20,
    width: "90%",
    height: "40%",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  requestButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
