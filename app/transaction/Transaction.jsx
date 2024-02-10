import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import TransactionCard from '../../components/Cards/TransactionCard'
import { Stack } from 'expo-router';
import { useTranslation } from "react-i18next";
import { AsyncStorage } from "react-native";

const Transaction = () => {
  const transactionData = {
    transactionDate: '2024-02-10',
    amount: '$100.00',
    sender: 'John Doe',
  };
  return (
    <ScrollView>
      <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{t("loanOverTime")}</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "March", "Apr", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={350}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Transaction History</Text>
      </View>
      <View style={styles.container}>
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      <TransactionCard
        transactionDate={transactionData.transactionDate}
        amount={transactionData.amount}
        sender={transactionData.sender}
      />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    gap: 20,
  },
});

export default Transaction