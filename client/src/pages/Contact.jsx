import React from "react";

const Contact = () => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <h2>For Any Asistance</h2>

        <h2 className="mt-3 text-success">
          <i className="fa-solid fa-phone-volume"></i>+91 112233 445566
        </h2>

        <h2 className="mt-3">
          <i className="fa-solid fa-envelop"></i>help@centeapp.com
        </h2>
      </div>
    </>
  );
};

export default Contact;
