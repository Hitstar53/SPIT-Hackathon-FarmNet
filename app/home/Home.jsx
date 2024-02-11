import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Modal, FlatList, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import BankCard from "../../components/Cards/BankCard";
import CreditScore from "../../components/Cards/CreditScore";
import SquareCard from "../../components/Cards/SquareCard";
import Navbar from "../../components/navbar/Navbar";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  const [name, setName] = useState("");
 

 

  useEffect(() => { 
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('name');
        if (value !== null) {
          // value previously stored
          setName(value);
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  
  const { t } = useTranslation();
  const [langModalVisible, setLangModalVisible] = useState(false);


  return (
    <View style={styles.container}>

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
         
        }}
      />
            <View style={styles.centeredView}>
       
      </View>
      <ScrollView>
      <View style={styles.detailsContainer}>
        <Image
          source={require("../../assets/ppl.webp")}
          style={styles.profilePic}
        />

        <View style={styles.userDetails}>
          <Text style={styles.greetingText}>{t("hello")}</Text>
          <Text style={styles.customerName}>{name}</Text>
        </View>

        <View style={{ marginLeft: 50 }}>
          <CreditScore creditScore="600" />
        </View>
      </View>

      
        <BankCard
          BankName="HDFC Bank"
          cardNumber="1234 5678 9012 3456"
          cardHolder="John Doe"
          expiryDate="12/24 "
        />
        <View style={styles.sqcontainer}>
          <View style={styles.srow}>
            <TouchableOpacity onPress= {() => router.push("/loan/PayLoan")}><SquareCard iconName="paper-plane" text1={t("payLoan")} text2="Lorem Ipsum" /></TouchableOpacity>
            <TouchableOpacity onPress={() =>{router.push("/loan/LoanRequest")}}><SquareCard iconName="wallet" text1={t("request")} text2="Version 2.0" /></TouchableOpacity>
          </View>
          <View style={styles.srow}>
          <TouchableOpacity onPress={() =>{router.push("/crop/SellCrop")}}><SquareCard iconName="seedling" text1={t("Sell Crop")} text2="Version 3.0" /></TouchableOpacity>
          <TouchableOpacity onPress={() =>{router.push("/transaction/Transaction")}}><SquareCard iconName="chart-line" text1={t("analyse")} text2="Version 4.0" /></TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Navbar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sqcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 srow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 0,
  },
  card: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "red",
    borderWidth: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
  },
  userDetails: {
    alignItems: "flex-start",
  },
  greetingText: {
    fontFamily: "HankenBook",
    fontSize: 18,
    marginBottom: 3,
    fontWeight: "bold",
    color: "#888888",
  },
  customerName: {
    fontSize: 22,
    fontWeight: "bold",
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
});

export default Home;
