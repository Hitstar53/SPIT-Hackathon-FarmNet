import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import LottieView from "lottie-react-native";

const LoanRequest = () => {
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

  return (
    <View style={styles.container}>
      <View>
      <LottieView
        source={require("../../assets/loan.json")} // Replace with the path to your Lottie animation file
        autoPlay
        loop
        style={styles.animation}
      />
      </View>
      <View style={styles.inputContainer}>
      <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Repayment Time (in months)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter repayment time"
            value={repaymentTime}
            onChangeText={(text) => setRepaymentTime(text)}
          />
        </View>
        <Text style={styles.sliderLabel}>Interest Range: {interestRange}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20}
          step={1}
          value={interestRange}
          onValueChange={(value) => setInterestRange(value)}
        />
        <TouchableOpacity style={styles.requestButton} onPress={handleRequestLoan}>
          <Text style={styles.buttonText}>Request Loan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoanRequest;

const styles = StyleSheet.create({
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
  sliderLabel:{
    fontSize: 16,
    fontWeight: "bold",
  }
});


