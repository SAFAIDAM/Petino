import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      {/** header components */}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
