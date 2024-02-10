import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import LanguageModal from '../components/navbar/LanguageModal';

const LandingPage = () => {
    
    const router = useRouter();
    const [langModalVisible, setLangModalVisible] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            
          }}>
          <Text style={styles.btnText}>Lending Institute</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            
          }}>
          <Text style={styles.btnText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectLangaugeBtn}
          onPress={() => {
            setLangModalVisible(true);
          }}>
          <Text>Select Language</Text>
        </TouchableOpacity>
        <LanguageModal
          langModalVisible={langModalVisible}
          setLangModalVisible={setLangModalVisible}
        //   onSelectLang={x => {
        //     setSelectedLang(x);
        //     saveSelectedLang(x);
        //   }}
        />
      </View>
    );
  };
  
  export default LandingPage;


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
    },
    btn: {
      backgroundColor: 'black',
      height: 50,
      width: '70%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    btnText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '600',
    },
    selectLangaugeBtn: {
      width: '50%',
      height: 50,
      borderWidth: 0.2,
      borderRadius: 10,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
  });