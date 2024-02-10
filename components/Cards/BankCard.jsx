import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const BankCard = ({ cardNumber, cardHolder, expiryDate, BankName }) => {
  return (
    <View style={styles.cardContainer}>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/cardbg.png")}
        />
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>{BankName}</Text>
        <Image
          style={styles.visaImage}
          source={require("../../assets/visalogo.png")}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
      </View>
      <View style={styles.bankInfo}>
        <Text style={styles.personName}>{cardHolder}</Text>
        <Text style={styles.expiryDate}>{expiryDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    marginVertical: 16,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  bankInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  visaImage: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  card: {
    padding: 24,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 10,
    resizeMode: "cover",
    opacity: 0.8,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 20,
    // fontFamily: "monospace",
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardDetails: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  expiryDate: {
    color: "#000",
    fontSize: 14,
  },
});

export default BankCard;
