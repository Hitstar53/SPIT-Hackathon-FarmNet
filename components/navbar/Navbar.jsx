import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// import { icons } from '../../constants';
import { FontAwesome5 } from "@expo/vector-icons";


const Navbar = () => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          router.push("/language/StartingScreen");
        }}>
        <Image style={styles.image} source={require('../../assets/home.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/Chatbot/Chatbot");
        }}>
        <Image source={require('../../assets/chatbot.png')} style={styles.chatImage} />
 
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/crop/CropInfo");
        }}>
        <FontAwesome5 name="info" size={32} style={{marginTop: 10}} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {
          router.push("/games-section/Games");
        }}>
        <Image style={styles.image} source={ require('D:/Programming/expo_router_tutorial/assets/icons/chevron-right.png') }/>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '8%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },

  image: {
    width: 35,
    height: 35,
    marginTop: 10,
  },

  chatImage:{
    width:42,
    height: 40,
    marginTop: 5,
  }
});

export default Navbar;