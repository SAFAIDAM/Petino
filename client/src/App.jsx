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
import ProtectAdmin from "./components/ProutectAdmin";
import CreateRecord from "./components/CreateRecord";
import AdminBlog from "./pages/AdminBlog";
import AdminRecords from "./pages/AdminRecords";
import EditeRecord from "./components/EditeRecord";
import AdminUsers from "./pages/AdminUsers";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost"

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
          <Route path="/Blog" element={<Posts />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/publicuser/:id" element={<PublicUser />} />
        </Route>
        <Route element={<ProtectAdmin />}>
          <Route exact path="/admin" element={<AdminUsers />} />
        </Route>
        <Route element={<ProtectAdmin />}>
          <Route exact path="/admin/blogs" element={<AdminBlog />} />
        </Route>
        <Route element={<ProtectAdmin />}>
          <Route exact path="/admin/create" element={<CreateRecord />} />
        </Route>
        <Route element={<ProtectAdmin />}>
          <Route exact path="/admin/records" element={<AdminRecords />} />
        </Route>
        <Route element={<ProtectAdmin />}>
          <Route exact path="/admin/update/:id" element={<EditeRecord />} />
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
