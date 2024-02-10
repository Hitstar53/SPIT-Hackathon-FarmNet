import React from "react";
import CropItem from "./CropItem";
import styles from "./Market.module.css";
import cropsData from "../../assets/crops.json";

const Market = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cropsData.map((crop) => (
          <CropItem
            key={crop.id}
            cropName={crop.name}
            cropDesc={crop.description}
            cropImg={crop.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Market;
