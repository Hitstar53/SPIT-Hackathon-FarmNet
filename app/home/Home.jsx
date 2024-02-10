import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import BankCard from "../../components/Cards/BankCard";
import CreditScore from "../../components/Cards/CreditScore";
import SquareCard from "../../components/Cards/SquareCard";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  return (
    // <View style={styles.container1}>
    //   <Stack.Screen
    //     options={{
    //       headerStyle: { backgroundColor: "#fff" },
    //       headerShadowVisible: false,
    //       headerTitle: "",
    //     }}
    //   />

    //   <View style={styles.container2}>
    //     <View style={{ flexDirection: "row" }}>
    //       <Image
    //         source={require("../../assets/ppl.webp")}
    //         style={styles.profilePic}
    //       />
    //   <View style={styles.userDetails}>
    //     //         <Text style={styles.greetingText}>Hello,</Text>
    //     //         <Text style={styles.customerName}>Vineet Parmar</Text>
    //     //       </View>
    //     </View>

    //     <CreditScore creditScore="750" />
    //   </View>
    //   <View>
    //     <BankCard
    //       BankName="HDFC Bank"
    //       cardNumber="1234 5678 9012 3456"
    //       cardHolder="John Doe"
    //       expiryDate="12/24"
    //     />
    //   </View>
    //   {/* <Navbar /> */}
    // </View>

    <View style={styles.container}>

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView>
      <View style={styles.detailsContainer}>
        <Image
          source={require("../../assets/ppl.webp")}
          style={styles.profilePic}
        />

        <View style={styles.userDetails}>
          <Text style={styles.greetingText}>Hello,</Text>
          <Text style={styles.customerName}>Vineet Parmar</Text>
        </View>

        <View style={{ marginLeft: 50 }}>
          <CreditScore creditScore="750" />
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
            <SquareCard iconName="paper-plane" text1="Pay Loan" text2="Lorem Ipsum" />
            <SquareCard iconName="wallet" text1="Request" text2="Version 2.0" />
          </View>
          <View style={styles.srow}>
            <SquareCard iconName="user-friends" text1="Contact" text2="Version 3.0" />
            <SquareCard iconName="chart-line" text1="Analyse" text2="Version 4.0" />
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
