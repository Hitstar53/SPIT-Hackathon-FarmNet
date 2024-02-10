import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Loan = ({ profilePic, name, amount, dueDate }) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push('/loan/LoanPayment')}>
            <View style={styles.card}>
                <Image source={require("../../assets/ppl.webp")} style={styles.profilePic} />
                <View style={styles.details}>
                    <View>
                        <Text style={styles.dueDate}>{dueDate}</Text>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <Text style={styles.amount}>{amount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  details: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 5,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red', // or any color to highlight due date
  },
});

export default Loan;