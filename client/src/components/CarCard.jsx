import { Link } from "react-router";

const CarCard = ({ car }) => {
  return (
    <Link to={`/cars/${car?.id}`} style={{ textDecoration: "none" }}>
      <div
        key={car.id}
        style={{
          width: 300,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <img
          src={car.image || "https://source.unsplash.com/featured/?car"}
          alt={car.name}
          style={{ width: "100%", height: 180, objectFit: "cover" }}
        />
        <div style={{ padding: 12 }}>
          <h4 style={{ margin: "0 0 8px" }}>{car.name}</h4>
          <p style={{ margin: "0 0 8px", fontSize: 14 }}>{car.about}</p>
          <p style={{ margin: 0, fontWeight: 600 }}>Price: {car.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
