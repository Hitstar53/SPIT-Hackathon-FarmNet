import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {router} from 'expo-router';

import i18next, { languageResources } from "./services/i18next"
import { useTranslation } from "react-i18next";
import { AsyncStorage } from "react-native";
import languagesList from "./services/languagesList.json";

const StartingScreen = () => {
  const languages = [
    'English',
    'हिंदी',
    'தமிழ்',
    'తెలుగు',
    'ಕನ್ನಡ',
    'മലയാളം',
    'मराठी',
    'বাংলা',
    'ગુજરાતી',
  ];

  const selectedLanguage = 'English'; // Set the initially selected language

  const renderButtons = () => {

    const saveSelectedLang = async (lng) => {
      await AsyncStorage.setItem("lng", lng);
    };

    const languagesList = ["en", "hn", "ta", "te", "kn", "ml", "mr", "bn", "gu"]
  
    const { t } = useTranslation();
  
    const changeLng = (lng) => {
      i18next.changeLanguage(languagesList[lng]);
      saveSelectedLang(lng);
      router.push('/language/StartingScreen')

    };
  

    return (
      <View style={styles.mainContainer}>
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => changeLng(index) }>
            <Text style={styles.buttonText}>{language}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleLanguageSelection = (selectedLanguage) => {
    // Handle the selection logic
    console.log('Selected language:', selectedLanguage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>
      {renderButtons()}
    </View>
  );
};

export default StartingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 120, 
    height: 100,
    margin: 10,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#4f3d56', // Adjust the button color as needed
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    
  },
});