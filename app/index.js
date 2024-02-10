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

const LandingPage = () => {
  const router = useRouter();
  const [langModalVisible, setLangModalVisible] = useState(false);

  const { t } = useTranslation();

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setLangModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          visible={langModalVisible}
          onRequestClose={() => setLangModalVisible(false)}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={Object.keys(languageResources)}
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
      <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <Text style={styles.btnText}>Lending Institute</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <Text style={styles.btnText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectLangaugeBtn}
        onPress={() => {
          setLangModalVisible(true);
        }}
      >
        <Text>Select Language</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "black",
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
    borderWidth: 0.2,
    borderRadius: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  languagesList: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#6258e8",
  },

  languageButton: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "white",
  },
});
