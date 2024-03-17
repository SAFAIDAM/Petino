import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute() {
  const {currentUser} = useSelector(state => state.user)
  return currentUser ? <Outlet/> : <Navigate to='/signup'/>
}

export default PrivateRoute