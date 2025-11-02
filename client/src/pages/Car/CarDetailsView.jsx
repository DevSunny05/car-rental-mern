import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { Link } from "react-router";
import cars from "../../Data/carsData.json";
import placeholder from "../../assets/react.svg";
import BookingModel from "../../components/BookingModel";
import toast from "react-hot-toast";

const CarDetailsView = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const car = cars.find((c) => String(c.id) === String(id));
  const [mainImage, setMainImage] = useState(car ? car.image : placeholder);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width < 640;

  // Inline style objects
  const containerStyle = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 16,
    minHeight: "72vh",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
    gap: 20,
    alignItems: "start",
    marginTop: 16,
  };

  const galleryStyle = { display: "flex", flexDirection: "column" };

  const mainImageStyle = {
    borderRadius: 12,
    overflow: "hidden",
    background: "linear-gradient(180deg,#fff,#f6fbff)",
    boxShadow: "0 12px 30px rgba(2,6,23,0.06)",
  };

  const mainImgStyle = {
    width: "100%",
    height: isMobile ? 260 : 380,
    objectFit: "cover",
    display: "block",
  };

  const thumbsStyle = { display: "flex", gap: 8, marginTop: 12 };
  const thumbBtnStyle = {
    border: 0,
    background: "transparent",
    padding: 0,
    borderRadius: 8,
    overflow: "hidden",
    cursor: "pointer",
  };
  const thumbImgStyle = (active) => ({
    width: isMobile ? 64 : 84,
    height: isMobile ? 48 : 56,
    objectFit: "cover",
    display: "block",
    borderRadius: 8,
    opacity: active ? 1 : 0.9,
    outline: active ? "2px solid #0d6efd" : "none",
  });

  const detailsStyle = { paddingBottom: 8 };
  const headingStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexDirection: isMobile ? "column" : "row",
  };
  const titleStyle = { margin: 0, fontSize: 20 };
  const priceStyle = {
    background: "linear-gradient(90deg,#0d6efd,#6366f1)",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 8,
    fontWeight: 700,
  };
  const aboutStyle = { color: "#6b7280", margin: "10px 0" };
  const specsStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
    gap: 8,
    listStyle: "none",
    padding: 0,
    margin: "8px 0",
    color: "#6b7280",
  };
  const specItemStyle = { margin: 0 };

  const actionsStyle = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginTop: 12,
    flexDirection: isMobile ? "column" : "row",
  };
  const btnBase = {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 8,
    textDecoration: "none",
    textAlign: "center",
  };
  const btnPrimary = { ...btnBase, background: "#0d6efd", color: "#fff" };
  const btnGhost = {
    ...btnBase,
    background: "transparent",
    border: "1px solid rgba(15,23,42,0.06)",
    color: "#6b7280",
  };

  if (!car) {
    return (
      <div>
        <div style={containerStyle}>
          <h2>Car not found</h2>
          <p>The car you're looking for doesn't exist or the id is invalid.</p>
          <Link to="/cars" style={btnPrimary}>
            Back to cars
          </Link>
        </div>
      </div>
    );
  }

  const thumbnails = [car.image, placeholder, car.image];
  const handleBooking = (booking) => {
    // booking object comes from BookingModel and contains pickupDate, returnDate, total
    try {
      // basic validation (redundant if BookingModel already validated)
      if (!booking || !booking.pickupDate || !booking.returnDate) {
        toast.error("Invalid booking data");
        return;
      }

      // Example: replace with API call to submit booking
      console.log("Booking submitted from CarDetailsView:", booking);
      // feedback to user (you may replace with toast)
      toast.success(
        `Booking confirmed for ${car.name}. Total: ₹${booking.total}`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to submit booking.");
    }
  };

  return (
    <>
      <main style={containerStyle}>
        <div style={gridStyle}>
          <aside style={galleryStyle}>
            <div style={mainImageStyle}>
              <img src={mainImage} alt={`${car.name}`} style={mainImgStyle} />
            </div>

            <div style={thumbsStyle}>
              {thumbnails.map((t, idx) => {
                const active = t === mainImage;
                return (
                  <button
                    key={idx}
                    onClick={() => setMainImage(t)}
                    aria-label={`Show image ${idx + 1}`}
                    style={thumbBtnStyle}
                  >
                    <img
                      src={t}
                      alt={`${car.name} ${idx + 1}`}
                      style={thumbImgStyle(active)}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          <section style={detailsStyle}>
            <div style={headingStyle}>
              <h1 style={titleStyle}>{car.name}</h1>
              <div style={priceStyle}>₹{car.price} / day</div>
            </div>

            <p style={aboutStyle}>{car.about}</p>

            <ul style={specsStyle}>
              <li style={specItemStyle}>
                <strong>Category:</strong> {car.category}
              </li>
              <li style={specItemStyle}>
                <strong>Seats:</strong> {car.seats}
              </li>
              <li style={specItemStyle}>
                <strong>Fuel:</strong> {car.fuel}
              </li>
              <li style={specItemStyle}>
                <strong>Year:</strong> {car.year}
              </li>
              <li style={specItemStyle}>
                <strong>Mileage:</strong> {car.milege} km/l
              </li>
              <li style={specItemStyle}>
                <strong>Transmission:</strong>{" "}
                {car.transmition ? "Automatic" : "Manual"}
              </li>
            </ul>

            <div style={actionsStyle}>
              <button
                onClick={() => setShow(true)}
                style={{
                  ...btnPrimary,
                  padding: isMobile ? "12px 16px" : "12px 18px",
                }}
              >
                Book Now
              </button>
              <Link to="/cars" style={btnGhost}>
                Back to Listings
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Booking modal (controlled) */}
      <BookingModel
        isOpen={show}
        onClose={() => setShow(false)}
        car={car}
        handleBooking={handleBooking}
        pickupDate={pickupDate}
        setPickupDate={setPickupDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
      />
    </>
  );
};

export default CarDetailsView;
