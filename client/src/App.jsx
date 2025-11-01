import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cars from "./pages/Car/Cars";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
