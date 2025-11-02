import React from "react";
import CarCard from "../../components/CarCard";
import CarData from "../../Data/carsData.json";

const Cars = () => {
  return (
    <div style={{ minHeight: "80vh", marginTop: 50, padding: 16 }}>
      <h3 style={{ textAlign: "center", marginBottom: 8 }}>
        Explore our car collections
      </h3>
      <p style={{ textAlign: "center", marginBottom: 16 }}>
        Click on the car to see spec and price
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {CarData && CarData.map((car) => <CarCard car={car} />)}
      </div>
    </div>
  );
};

export default Cars;
