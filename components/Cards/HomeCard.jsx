import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BankCard = ({ cardNumber, cardHolder, expiryDate }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>Bank Card</Text>
      <View style={styles.card}>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <Text style={styles.cardHolder}>{cardHolder}</Text>
        <Text style={styles.expiryDate}>{expiryDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  cardHolder: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  expiryDate: {
    color: '#fff',
    fontSize: 14,
  },
});

export default BankCard;
