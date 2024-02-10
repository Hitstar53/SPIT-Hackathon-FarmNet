import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {

    const router = useRouter();

    return (
        <View>
            <Text>Home</Text>
            <TouchableOpacity style={styles.navigateBtn} onPress={() => {
                router.push('/login/Login')
            }}>
                <Text>Go to Login</Text>
            </TouchableOpacity>
        </View>
    )
}


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

    navigateBtn:{
        width: 35,
        height: 35,
        backgroundColor: 'red',
    }
  });





export default Home;