import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import InfoCard from "../../components/Cards/InfoCard";
import axios from "axios";

const CropInfo = () => {
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    axios.get("https://your-api-endpoint.com/crops")
      .then(response => {
        setCropData(response.data);
      })
      .catch(error => {
        console.error("Error fetching crop data:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoCardsContainer}>
        <InfoCard iconName="thermometer" text2="Temperature" text1="25°C" />
        <InfoCard iconName="tint" text2="Humidity" text1="60%" />
        <InfoCard iconName="seedling" text2="Soil Moisture" text1="Medium" />
      </View>

      <View style={styles.cropCardsContainer}>
      <CropCard cropName={"Rice"} />
        {/* {cropData.map((crop, index) => (
          <CropCard key={index} cropName={crop.name} cropImage={crop.image} />
        ))} */}
      </View>
    </View>
  );
};

const CropCard = ({ cropName }) => (
  <TouchableOpacity style={styles.cropCard}>
    <Image
          style={styles.backgroundImage}
          source={"../../assets/cardbg.png"}
        />
    <Text style={styles.cropName}>{cropName}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoCard: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "80%",
    height: undefined,
    borderRadius: 10,
    resizeMode: "cover",
    opacity: 0.8,
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 14,
    color: "#777",
  },
  cropCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cropCard: {
    width: "30%",
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  cropImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cropName: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CropInfo;