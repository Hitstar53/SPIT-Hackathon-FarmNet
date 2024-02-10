import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TempLoan = () => {
  return (
    <View style={styles.container}>
      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/ppl.webp")} // Replace with the path to your profile pic
          style={styles.profilePic}
        />
        <Text style={styles.name}>Your Name</Text>
        <Text style={styles.bankName}>Bank Name</Text>
      </View>

      {/* Amount */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>$500</Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={() => alert("Payment successful!")}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "spcace-evenly",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bankName: {
    fontSize: 16,
    color: "#777",
  },
  amountContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  amountText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TempLoan;
