import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms"
import Signup from "./pages/Signup";
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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  
  )
  

}

export default App;
