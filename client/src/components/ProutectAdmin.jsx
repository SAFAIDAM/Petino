
import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const ProtectAdmin = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser.role === "admin";
 
  if (isAdmin) {
    return <Outlet {...props} />;
  }
 else if(!isAdmin){
  return <Navigate to='*'/>
  }

};

export default ProtectAdmin;