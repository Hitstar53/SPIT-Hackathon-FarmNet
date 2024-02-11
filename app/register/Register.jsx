import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AsyncStorage } from "react-native";
import { Stack } from "expo-router";


import DateTimePicker from '@react-native-community/datetimepicker'; import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Modal,
  Pressable,
  Alert,
  FlatList
} from "react-native";
import LottieView from "lottie-react-native";

import QueryString from "query-string";
import * as Location from "expo-location";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyBh-8G4kOXSBYzcoHzjC_R0QZo8frsZnPY",
  authDomain: "notevault-5684a.firebaseapp.com",
  projectId: "notevault-5684a",
  storageBucket: "notevault-5684a.appspot.com",
  messagingSenderId: "118095513364",
  appId: "1:118095513364:web:07f431474bdc7c100da401",
  measurementId: "G-TNBL9KNV7J",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Register = () => {

  const cropsData = [
    "Apple",
    "Banana",
    "Blackgram",
    "Chickpea",
    "Coconut",
    "Coffee",
    "Cotton",
    "Grapes",
    "Jute",
    "kidneybeans",
    "Lentil",
    "maize",
    "Mango",
    "Mothbeans",
    "Mungbean",
    "Muskmelon",
    "Orange",
    "Papaya",
    "pigeonpeas",
    "Pomegranate",
    "Rice",
    "Watermelon",

  ]


  const [cropsList, setCropsList] = useState([])


  const { t } = useTranslation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [aadharnumber, setAadharNumber] = useState();
  const [farmSize, setFarmSize] = useState();
  const [annualRevenue, setAnnualRevenue] = useState();
  const [soilType, setSoilType] = useState();

  const [imageType, setImageType] = useState();

  const [userImage, setUserImage] = useState();
  const [aadhaarImage, setAadhaarImage] = useState();


  const [userImageURL, setUserImageURL] = useState();
  const [aadhaarImageURL, setAadhaarImageURL] = useState();

  const [mobileNumber, setMobileNumber] = useState();
  const [dob, setDob] = useState();


  const [aadhaarName, setAadhaarName] = useState();
  let aadharurl = ""
  let userurl = ""

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [completeLocationData, setCompleteLocationData] = useState();


  const [currPage, setCurrPage] = useState(0)

  const soils = {
    0: "Clay",
    1: "Sandy",
    2: "slity",
    3: "peaty",
    4: "chalky",
    5: "loamy",
  }

  const removeImage = async () => {
    try {
      setImage(null);
      setModalVisible(false);
    } catch ({ messge }) {
      alert("Error removing image: " + error.message);
      setModalVisible(false);
    }
  };

  const selectGalleryImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      // setImage(image);

      if (imageType === 'aadhaar') {
        setAadhaarImage(image);
      }

      else if (imageType === 'user') {
        setUserImage(image);
      }
      // console.log(image);
      setModalVisible(false);
      handleImageUpload(image);
    } catch (error) {
      throw new Error(error);
    }
  };



  const handleImageUpload = async (imageURI) => {
    try {
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child("images/" + Date.now()); // Use a unique name for the file
      await fileRef.put(blob);
      const downloadURL = await fileRef.getDownloadURL();
      // console.log("File available at", downloadURL);
      if (imageType === 'aadhaar') {
        setAadhaarImageURL(downloadURL);
        console.log("Aadhaar Image URL: ", downloadURL)
        aadharurl = downloadURL
        setImageType('')
      }
      else {
        setUserImageURL(downloadURL);
        userurl = downloadURL
        console.log("User Image URL", downloadURL)
        setImageType('')
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location)
      setLocation(location);
      // console.log("location", location)
      setLatitude(location["coords"]["latitude"]);
      setLongitude(location["coords"]["longitude"]);

      // console.log(location)

      try {
        const apiKey = "012c78ac25824b05aef150531241002";
        const days = 14;
        const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location["coords"]["latitude"]},${location["coords"]["longitude"]}&days=${days}&aqi=no`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        setCompleteLocationData(data);
        // console.log("weather", data)
        console.log(data["current"]["temp_c"]);
        console.log(data["current"]["humidity"]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const columnWidth = screenWidth; // Adjust based on your column width

  const handleScroll = (x) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, animated: true });
      setScrollOffset(x);
    }
  };

  const handleLeftScroll = () => {
    const newOffset = Math.max(0, scrollOffset - columnWidth);
    handleScroll(newOffset);
  };

  const handleRightScroll = () => {
    const newOffset = Math.min(
      screenWidth * (numColumns - 1),
      scrollOffset + columnWidth
    );
    handleScroll(newOffset);
  };

  const numColumns = 8;

  const getLang = async () => {
    const lang = await AsyncStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };



  const handleSubmit = async () => {
    // axios code to post data

    const userdata = {
      aadhar: aadharnumber,
      aadharimg: aadhaarImageURL,
      profileimg: userImageURL,
      phoneno: mobileNumber,
      dob: dob,
      name: aadhaarName
    }
    console.log(userdata)
    try {
      const res = await axios.post("https://farmnet-node.onrender.com/api/user", userdata)
      console.log(location)
      const userid = res.data.user._id
      console.log(userid)
      const profile = {
        // userid is object id of user
        user:  userid,
        aadhar: aadharnumber,
        landSize: Number(farmSize),
        avgyeild: Number(annualRevenue),
        crops: cropsList,
        soiltype: soils[soilType],
        location: completeLocationData["location"]["name"],
        address: completeLocationData["location"]["region"],
      }
      console.log(profile)
      const res2 = await axios.post("https://farmnet-node.onrender.com/api/profile", profile)
      console.log(res2)

    } catch (error) {
      console.log(error)

    }


  }



  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable native scrolling
        ref={scrollViewRef}
      >
        <View style={styles.columnsContainer}>
          {/* Render columns */}
          <View
            style={[
              styles.column,
              { width: screenWidth, height: screenHeight - 200 },
            ]}
          >
            <Text style={styles.text}>Name on Adhaar Card</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name here"

              onChangeText={setAadhaarName}
              value={aadhaarName}
            />
            <Text style={styles.text}>Aadhar Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Aadhaar Number"
              onChangeText={(text) => setAadharNumber(text)}
            />
          </View>


          <View style={[styles.column, { width: screenWidth }]}>


            <Text style={styles.text}>Mobile Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Aadhaar Number"
              onChangeText={(text) => setMobileNumber(text)}
            />

            <Text style={styles.text}>Date of birth</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Aadhaar Number"
              // onChangeText={setPassword}
              // value={password}
              // secureTextEntry={true}
              onChangeText={(text) => setDob(text)}
            />

          </View>




          <View style={[styles.column, { width: screenWidth }]}>
            <View style={styles.innerContainer}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View></View>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => uploadImage()}
                    >
                      <Text style={styles.textStyle}>Camera</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => selectGalleryImage()}
                    >
                      <Text style={styles.textStyle}>Gallery</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => removeImage()}
                    >
                      <Text style={styles.textStyle}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              {/* <Image source={{ uri: image }} style={styles.imageContainer} /> */}


              {
                aadhaarImage ? <Image source={{ uri: aadhaarImage }} style={styles.imageContainer} /> : <LottieView
                  source={require("../../assets/aadhar.json")}
                  style={{ width: 400, height: 200, marginTop: -250 }}
                  autoPlay
                  loop
                />
              }

              <Text style={styles.FarmText}>Aahaar Photo</Text>

              {/* <TouchableOpacity> <Text>Upload Image</Text> </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  setModalVisible(true)
                  setImageType('aadhaar')
                }}
              >
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.column, { width: screenWidth }]}>
            <View style={styles.innerContainer}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View></View>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => uploadImage()}
                    >
                      <Text style={styles.textStyle}>Camera</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => selectGalleryImage()}
                    >
                      <Text style={styles.textStyle}>Gallery</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => removeImage()}
                    >
                      <Text style={styles.textStyle}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>

              {/* <Image source={{ uri: image }} style={styles.imageContainer} /> */}

              {
                userImage ? <Image source={{ uri: userImage }} style={styles.imageContainer} /> : <LottieView
                  source={require("../../assets/upload_image.json")}
                  style={{ width: 400, height: 200, marginTop: -250 }}
                  autoPlay
                  loop
                />
              }

              <Text style={styles.FarmText}>Your Photo</Text>

              {/* <TouchableOpacity> <Text>Upload Image</Text> </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  setModalVisible(true)
                  setImageType('user')
                }}
              >
                {/* <Text style={styles.buttonText}>User Image</Text> */}
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.column, { width: screenWidth }]}>
            <View style={styles.innerinnerContainer}>
              <LottieView
                source={require("../../assets/farm.json")}
                style={{ width: 400, height: 200, marginTop: -250 }}
                autoPlay
                loop
              />
              <Text style={styles.FarmText}>Farm Size</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={farmSize}
                onChangeText={(text) => setFarmSize(text)}
              />
            </View>
          </View>
          <View style={[styles.column, { width: screenWidth }]}>
            <View style={styles.innerinnerContainer}>
              <LottieView
                source={require("../../assets/revenue.json")}
                style={{ width: 400, height: 200, marginTop: -250 }}
                autoPlay
                loop
              />
              <Text style={styles.FarmText}>Annual Revenue</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={annualRevenue}
                onChangeText={(text) => setAnnualRevenue(text)}
              />
            </View>
          </View>

          <View style={[styles.column, { width: screenWidth }]}>
            <TouchableOpacity onPress={() => handleSubmit()}>

              <Text style={styles.FarmText}> Soil Type </Text>
            </TouchableOpacity>
            <View style={styles.soilImageContainers}>
              {/* First row */}
              {/*Generate two buttons with set background images and text above */}

              <View>
                <Text style={{ fontSize: 18, marginLeft: 45 }}>Clay</Text>
                <TouchableOpacity
                  onPress={() => setSoilType(0)}
                >
                  <Image
                    style={styles.soilImageContainer}
                    source={require("../../assets/soil/clay.jpg")}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={{ fontSize: 18, marginLeft: 45 }}>sandy</Text>
                <TouchableOpacity
                  onPress={() => setSoilType(1)}
                >
                  <Image
                    style={styles.soilImageContainer}
                    source={require("../../assets/soil/sandy.jpg")}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={{ fontSize: 18, marginLeft: 45 }}>Slity</Text>

                <TouchableOpacity
                  onPress={() => setSoilType(2)}
                >
                  <Image
                    style={styles.soilImageContainer}
                    source={require("../../assets/soil/slity.jpg")}
                  />
                </TouchableOpacity>

              </View>


              <View>

                <Text style={{ fontSize: 18, marginLeft: 45 }}>Peaty</Text>
                <TouchableOpacity
                  onPress={() => setSoilType(3)}
                >
                  <Image
                    style={styles.soilImageContainer}
                    source={require("../../assets/soil/peaty.jpg")}
                  />
                </TouchableOpacity>

              </View>


              <View>

                <Text style={{ fontSize: 18, marginLeft: 45 }}>chalky</Text>
                <TouchableOpacity
                  onPress={() => setSoilType(4)}
                >

                  <Image
                    style={styles.soilImageContainer}
                    source={require("../../assets/soil/chalky.jpg")}
                  />
                </TouchableOpacity>
              </View>


              <View>

                <Text style={{ fontSize: 18, marginLeft: 45 }}>Loam</Text>

                <TouchableOpacity
                  onPress={() => setSoilType(5)}
                >

                  <Image
                    style={styles.soilImageContainer}
                    source={require("../../assets/soil/loamy.jpg")}
                  />
                </TouchableOpacity>
              </View>

            </View>


          </View>

          <View style={[styles.column, { width: screenWidth }]}>
            <View style={styles.innerinnerContainer}>
              <LottieView
                source={require("../../assets/crop.json")}
                style={{ width: 400, height: 200, marginTop: -250 }}
                autoPlay
                loop
              />
              <Text style={styles.FarmText}>Type of Crops</Text>

              <FlatList
                data={cropsData}
                numColumns={2} // Set the number of columns
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.radioButton}
                    onPress={() => {
                      setCropsList([...cropsList, item])
                      console.log(cropsList)
                    }}
                  >
                    <Text style={styles.radioText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.toString()}
              />



              {/* <TouchableOpacity style={styles.submitBtn}
                onPress={handleRightScroll}

              >
                <View>
                  <Text style={styles.submitText}>Submit</Text>
                </View>
              </TouchableOpacity>
 */}






            </View>
          </View>
          {/* Add more columns as needed */}
        </View>


      </ScrollView>
      {/* Buttons for scrolling */}
      <View style={styles.buttonArrowContainer}>
        <TouchableOpacity
          style={styles.scrollArrowButton}
          onPress={

            () => {
              handleLeftScroll()
              currPage > 0? setCurrPage(currPage-1) : setCurrPage(0)
            }
          }
        >
          <Image
            style={styles.navigataionBtn}
            source={require("../../assets/arrow.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scrollArrowButton}
          onPress={
            ()=>{
              handleRightScroll()
              currPage<7? setCurrPage(currPage+1) : setCurrPage(7)
            }
          }
        >

          {
            currPage === 7 ? <Text style={styles.submitText}>Submit</Text> : <Image
              style={styles.navigataionBtn}
              source={require("../../assets/right-arrow.png")}
              />
          }

        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerinnerContainer: {
    marginTop: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  amountInput: {
    padding: 15,
    // borderWidth: 0.2,
    width: "90%",
    marginLeft: 15,
    fontSize: 20,
  },
  FarmText: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 40,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  columnsContainer: {
    flexDirection: "row",
    // borderWidth: 0.2,
  },
  column: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderColor: "black",
  },
  buttonArrowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  scrollArrowButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  navigataionBtn: {
    height: 35,
    width: 35,
  },

  detailContainer: {
    width: 315,
    height: 375,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fffff",
    borderWidth: 0.2,
    padding: 10,
    marginBottom: 100,
  },

  text: {
    margin: 15,
  },

  textInput: {
    padding: 15,
    borderWidth: 0.2,
    width: "90%",
    marginLeft: 15,
  },

  submitText: {
    fontSize: 20,
    backgroundColor: "lightblue",
    width:100,
    height:50,
    textAlign: "center",
    padding: 10,

  },

  imageContainer: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  buttonContainer: {
    height: 50,
    width: 150,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "white",
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

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#54BFFC",
    width: 130,
    height: 60,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 2,
    marginLeft: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  column: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderColor: "black",
  },
  soilImageContainers: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  soilImageContainer: {
    width: screenWidth / 3, // Divide by 3 to fit three images in a row
    height: screenWidth / 3, // Adjust height as needed
    margin: 5, // Adjust margin between images
    backgroundColor: "lightgray", // Add background color for better visualization
  },

  radioButton: {
    margin: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 150,

  },
  radioText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },

  submitBtn: {
    width: 100,
    height: 50,
  },

  soilText:{
    fontSize:24,

  }
});

export default Register;
