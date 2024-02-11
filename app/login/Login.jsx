import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import LoginAnim from "../../assets/LoginAnim.json";
import { useTranslation } from "react-i18next";
import { AsyncStorage } from "react-native";
import LottieView from "lottie-react-native";


import axios from "axios";

const Login = () => {
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [pin, setPin] = useState(["", "", "", ""]);
  const pinInputs = [useRef(), useRef(), useRef(), useRef()];

  const router = useRouter();

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move focus to the next input
    if (value !== "" && index < pinInputs.length - 1) {
      pinInputs[index + 1].current.focus();
    }
  };

  const { t } = useTranslation();

  const getLang = async () => {
    const lang = await AsyncStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  const handleOnPress = async() => {
    const data={
      number: number,
    }
    console.log(data)
    try {
      const response = await axios.post("https://farmnet-node.onrender.com/api/auth/signin", data) 
    } catch (error) {
      console.log(error);
    }

    
  };

  const validate = async() => {
    const data = {
      otp : pin.join(""),
    }
    try {
      const response = await axios.post("https://farmnet-node.onrender.com/api/auth/verify", data)
      if (response.status === 200) {
        console.log(response.data)
        router.push("/home/Home")
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  // Call the function to make the API request

  return (
    <View style={styles.root}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.header}>
        <Text style={styles.title}>{t("login")}</Text>
        <LottieView
          source={require("../../assets/LoginAnim.json")}
          style={{ width: 400, height: 200, marginTop: 50 }}
          autoPlay
          loop
        />
      </View>

      <View style={styles.conatiner}>
        <Text style={styles.text}>{t("mobile")}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={t("mobile")}
          onChangeText={setNumber}
          value={number}
        />
        <View style={styles.registerContainer}>
          <TouchableOpacity onPress={() => handleOnPress()}>
            <Text style={styles.registerBtn}>{t("OTP")}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{t("password")}</Text>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={pinInputs[index]}
              style={styles.pinInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(value) => handlePinChange(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (
                  nativeEvent.key === "Backspace" &&
                  index > 0 &&
                  digit === ""
                ) {
                  pinInputs[index - 1].current.focus();
                }
              }}
            />
          ))}
        </View>

        <View style={styles.registerContainer}>
          <Text style={{ fontSize: 18 }}>{t("newUser")}?</Text>
          <TouchableOpacity onPress={() => router.push("/register/Register")}>
            <Text style={styles.registerBtn}>{t("register")}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <View>
            <Text>{t("submit")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },

  image: {
    width: 50,
    height: 50,
  },

  header: {
    marginTop: 100,
    alignItems: "center",
  },

  conatiner: {
    width: 315,
    height: 375,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fffff",
    padding: 10,
    marginBottom: 100,
  },

  text: {
    margin: 15,
    fontSize: 16,
    fontWeight: "bold",
  },

  textInput: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 0.2,
    width: "87%",
    marginLeft: 15,
  },

  button: {
    backgroundColor: "#54BFFC",
    width: "55%",
    height: "13%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    marginTop: 30,
    alignSelf: "center",
  },

  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },

  pinInput: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 0.2,
    width: "20%", // Adjust this width as needed
    marginLeft: 15, // Adjust the spacing between text inputs
  },

  registerContainer: {
    marginTop: 15,
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginLeft: 40,
  },

  registerBtn: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
