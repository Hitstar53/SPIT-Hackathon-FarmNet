import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreditScore = ({ creditScore }) => {
  const getBorderColor = () => {
    // Determine the border color based on the credit score
    if (creditScore >= 700) {
      return "#2ecc71"; // Green for good score
    } else if (creditScore >= 600) {
      return "#f39c12"; // Orange for average score
    } else {
      return "#e74c3c"; // Red for poor score
    }
  };

  return (
    <View style={styles.creditCardContainer}>
      <View
        style={[
          styles.creditCardCircle,
          { borderColor: getBorderColor() },
        ]}
      >
        <Text style={styles.creditScore}>{creditScore}</Text>
      </View>
      <Text style={styles.creditCardText}>Credit Score</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  creditCardContainer: {
    alignItems: "center",
  },
  creditCardCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  creditScore: {
    fontSize: 28,
    fontWeight: "bold",
  },
  creditCardText: {
    fontSize: 16,
  },
});

export default CreditScore;
