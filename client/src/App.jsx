import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms"
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <BrowserRouter>
    {/** header components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  
  )
  

}

export default App;
