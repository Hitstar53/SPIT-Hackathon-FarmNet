import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TransactionCard = ({ transactionDate, amount, sender }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.amount}>{amount}</Text>
        <Image source={require("../../assets/ppl.webp")} style={styles.profilePic} />
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', marginTop: 10, marginBottom: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.value}>{transactionDate}</Text>
        <Text style={styles.value}>{sender}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#ccc',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});

export default TransactionCard;