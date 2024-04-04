import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("api/users")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <div>
    {users.map((user) => (
      <div key={user._id}>
        
        <div className="singleUser">
        <p>
          <Link to={`/publicuser/${user._id}`}>
          <img className="w-36 " src={user.profilePicture} alt="user" />
          </Link>
          
        </p>
          <p className="m-3 ">{user.username}</p>
        <p className="edit">
        </p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Home;
// const [isLoading, setIsLoading] = useState(true);
//   const params = useParams();
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     setIsLoading(true);
//     userFetch();
//   }, []);

//   const userFetch = () => {
//     axios
//       .get(`http://localhost:8000/api/user/${params.id}`)
//       .then((result) => {
//         setUser(result.data);
//         console.log(user)
//         setIsLoading(false);
//       })
//       .catch((err) => console.log(err));
//   };