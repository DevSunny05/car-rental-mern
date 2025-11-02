import React, { useEffect, useState } from "react";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const dialogStyle = {
  width: "100%",
  maxWidth: 560,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 10px 40px rgba(2,6,23,0.2)",
  overflow: "hidden",
};

const headerStyle = {
  padding: "16px 18px",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const bodyStyle = { padding: 18 };
const footerStyle = {
  padding: 12,
  borderTop: "1px solid #eee",
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
};

const BookingModel = ({
  isOpen,
  onClose,
  car,
  onSave,
  pickupDate,
  returnDate,
  setPickupDate,
  setReturnDate,
  handleBooking,
}) => {
  const calculateTotal = () => {
    // returns total price as number (0 if invalid or dates not set)
    if (!car) return 0;
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (isNaN(start) || isNaN(end)) return 0;
    // diff in milliseconds
    const diffMs = end.getTime() - start.getTime();
    // if end is before start, invalid
    if (diffMs < 0) return 0;
    const msPerDay = 1000 * 60 * 60 * 24;
    // count full days; same-day booking counts as 1 day
    let days = Math.ceil(diffMs / msPerDay);
    if (days === 0) days = 1;
    const pricePerDay = Number(car.price) || 0;
    return days * pricePerDay;
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // basic validation
    if (!pickupDate || !returnDate) {
      alert("Please select both pickup and return dates.");
      return;
    }
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (end.getTime() < start.getTime()) {
      alert("Return date must be the same or after pickup date.");
      return;
    }

    const booking = {
      pickupDate,
      returnDate,
      total: calculateTotal(),
    };
    if (handleBooking) handleBooking(booking);
    else if (onSave) onSave(booking);
    else console.log("Booking:", booking);
    onClose && onClose();
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true">
      <div style={dialogStyle}>
        <div style={headerStyle}>
          <div>
            <strong>Book {car ? car.name : "vehicle"}</strong>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              {car ? `₹${car.price} / day` : ""}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: 0,
              fontSize: 18,
              cursor: "pointer",
            }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={submit} style={bodyStyle}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <label style={{ flex: 1, fontSize: 13, color: "#374151" }}>
                From
                <input
                  required
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 6,
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                  }}
                />
              </label>
              <label style={{ flex: 1, fontSize: 13, color: "#374151" }}>
                To
                <input
                  required
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 8,
                    marginTop: 6,
                    borderRadius: 6,
                    border: "1px solid #e5e7eb",
                  }}
                />
              </label>
            </div>
          </div>
        </form>

        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <div style={{ marginRight: 8, alignSelf: "center", fontWeight: 600 }}>
            Total: <span style={{ color: "#0d6efd" }}>₹{calculateTotal()}</span>
          </div>
          <button
            onClick={submit}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: 0,
              background: "#0d6efd",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModel;
