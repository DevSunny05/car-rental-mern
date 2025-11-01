import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        return toast.error("Please provide all fields");
      }
      console.log(name, email, password);
      toast.success("Register Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ minHeight: "70vh", maxWidth: "600px", margin: "auto" }}>
        <h3 style={{ margin: "20px 0px" }}> Registration Form</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="exampleInputname"
            aria-describedby="namelHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputemail"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Phone
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="exampleInputname"
            aria-describedby="phonelHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputpassword"
            aria-describedby="passwordlHelp"
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary w-100">
          Register Now
        </button>
      </div>
    </>
  );
};

export default Register;
