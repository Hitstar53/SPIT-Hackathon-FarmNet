import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
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
      <LottieView
        source={require("./path-to-your-animation.json")} // Replace with the path to your Lottie animation file
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Repayment Time (e.g., 6 months)"
          value={repaymentTime}
          onChangeText={(text) => setRepaymentTime(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Interest Range (e.g., 5% - 10%)"
          value={interestRange}
          onChangeText={(text) => setInterestRange(text)}
        />
        <TouchableOpacity style={styles.requestButton} onPress={handleRequestLoan}>
          <Text style={styles.buttonText}>Request Loan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  animation: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    marginTop: 20,
    width: "80%",
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
});

export default LoanRequest;
