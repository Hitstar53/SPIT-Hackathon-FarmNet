import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Loan from '../../components/Cards/Loan';

const PayLoan = () => {
  const loanData = [
    {
      profilePic: 'https://example.com/profile-pic-1.jpg',
      name: 'John Doe',
      amount: '$500.00',
      dueDate: '2024-02-28',
    },
    {
      profilePic: 'https://example.com/profile-pic-2.jpg',
      name: 'Jane Smith',
      amount: '$300.00',
      dueDate: '2024-03-15',
    },
    // Add more loan data as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Loan Payments</Text>
      <ScrollView>
        {loanData.map((loan, index) => (
          <Loan
            key={index}
            profilePic={loan.profilePic}
            name={loan.name}
            amount={loan.amount}
            dueDate={loan.dueDate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default PayLoan;
