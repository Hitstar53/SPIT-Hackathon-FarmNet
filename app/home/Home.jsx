import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import BankCard from '../../components/Cards/BankCard'
import CreditScore from '../../components/Cards/CreditScore'
import Navbar from '../../components/navbar/Navbar'

const Home = () => {
  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle:""
        }}
      />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
            Welcome Vineet! 🎉
        </Text>
        <CreditScore creditScore={750} />
        <BankCard
            BankName="HDFC Bank"
            cardNumber="1234 5678 9012 3456"
            cardHolder="John Doe"
            expiryDate="12/24"
        />
        <Navbar />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    card: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: 'red',
        borderWidth: 3,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default Home