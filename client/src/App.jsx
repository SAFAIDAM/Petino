import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms"
import Header from "./components/Header";
import Rescue from "./pages/Rescue";
import RescueCreateP from "./pages/RescueCreateP";
import RescueUpdateP from "./pages/RescueUpdateP";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
    {/** header components */}
      <ToastContainer />
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/rescue" element={<Rescue/> } />
          <Route path="/rescue-create-post" element={<RescueCreateP />} /> 
          <Route path="/rescue-update-post/:id" element={<RescueUpdateP/>} />  


      </Routes>

    </BrowserRouter>
  
  )
  

}

export default App;
