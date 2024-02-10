import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useRouter, Stack } from 'expo-router';

const Home = () => {

    const router = useRouter();

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: '#fff' },
                    headerShadowVisible: false,
                    headerTitle: ""
                }}
            />
            <View style={styles.container}>

                <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            // navigation.navigate('Login');
                        }}>
                        <Text style={styles.btnText}>Admin Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            // navigation.navigate('UserLogin');
                        }}>
                        <Text style={styles.btnText}>User Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    btn: {
        backgroundColor: 'purple',
        height: 50,
        width: '90%',
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






});





export default Home;