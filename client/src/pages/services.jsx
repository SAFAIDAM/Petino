import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Posts from "./ServicePost";
import "../components/style.css";

const services = () => {
  return (
    <>
      <Navbar />
      <Posts />
      <Footer />
    </>
  );
};

export default services;
