import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import termsdata from "./termsdata";
import ErorrPage404 from "./pages/ErorrPage404";
import Public from "./pages/Public";
import Profile from "./pages/Profile";
import PublicUser from "./pages/PublicUser";
import AdminId from "./pages/Admin";
import ProtectAdmin from "./components/ProutectAdmin";
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
      <Routes>
        <Route element={<PrivateRoute />}>
          
          <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErorrPage404 />} />
          <Route path="/Terms" element={<Terms termsdata={termsdata} />} />
          <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/public" element={<Public />} />
        </Route>
        <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} /> 
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/publicuser/:id" element={<PublicUser />} />
        </Route>
        <Route element={<ProtectAdmin />}>
          <Route exact path="/admin/*" element={<AdminId />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/rescue" element={<Rescue/> } />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/rescue-create-post" element={<RescueCreateP />} /> 
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/rescue-update-post/:id" element={<RescueUpdateP/>} />  
        </Route>
        
          
          
          

      </Routes>
      <Toaster />
      

    </BrowserRouter>
  );
}



// function AdminLayout() {
//   return (
//     <Admin dataProvider={restProvider("http://localhost:8000")}>
//       <Resource name="user" list={PostList} />
//     </Admin>
//   );
// }


export default App;
