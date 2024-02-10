import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import { icons } from '../../constants';

const Navbar = () => {
    const router = useRouter();

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
            router.push("/games-section/Games");
        }}>
        <Image style={styles.image} source={ require('D:/Programming/expo_router_tutorial/assets/icons/chevron-left.png') }/>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
            router.push("/games-section/Games");
        }}>
        <Image style={styles.image} source={ require('D:/Programming/expo_router_tutorial/assets/icons/location.png') }/>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
            router.push("/games-section/Games");
        }}>
        <Image style={styles.image} source={ require('D:/Programming/expo_router_tutorial/assets/icons/chevron-right.png') }/>
      </TouchableOpacity>
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
});

export default Navbar;