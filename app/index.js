import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useState } from "react";
import LanguageModal from "../components/LanguageModal";
import i18next, { languageResources } from "./services/i18next";
import { useTranslation } from "react-i18next";
import languagesList from "./services/languagesList.json";
import { AsyncStorage } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const LandingPage = () => {
  const router = useRouter();
  const [langModalVisible, setLangModalVisible] = useState(false);

  const saveSelectedLang = async (lng) => {
    await AsyncStorage.setItem("lng", lng);
  };

  const { t } = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setLangModalVisible(false);
    saveSelectedLang(lng);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          visible={langModalVisible}
          onRequestClose={() => setLangModalVisible(false)}
          animationType="slide"
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                style={styles.languagesList}
                data={Object.keys(languageResources)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.languageButton}
                    onPress={() => changeLng(item)}
                  >
                    <Text style={styles.lngName}>
                      {languagesList[item].nativeName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <Text style={styles.title}>{t("welcome")}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          router.push("/home/Home");
        }}
      >
        <Text style={styles.btnText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          router.push("/transaction/Transaction");
        }}
      >
        <Text style={styles.btnText}>Transactions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          router.push("/crop/CropInfo");
        }}
      >
        <Text style={styles.btnText}>Crop Information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => { router.push("/login/Login")}}>
        <Text style={styles.btnText}>{t("enter")}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => { 
        router.push("/loan/LoanRequest")
       }}>
        <Text style={styles.btnText}>Request Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => { 
        router.push("/loan/PayLoan")
       }}>
        <Text style={styles.btnText}>Pay Loan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.selectLangaugeBtn}
        onPress={() => {
          setLangModalVisible(true);
        }}
      >
        <Text>Select Language</Text>
        <FontAwesome5 name="language" size={25} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    height: "100%",
    width: "70%",
    margin: 20,
    backgroundColor: "#6258e8",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  selectLangaugeBtn: {
    width: "50%",
    height: 50,
    borderRadius: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  languagesList: {
    width: "100%",
  },

  languageButton: {
    screenWidth: "100%",
    padding: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "white",
  },
});
