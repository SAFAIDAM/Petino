import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Track image loading state

  useEffect(() => {
    if (currentUser && currentUser.user.profilePicture) {
      setIsLoading(false); // Set loading to false when image URL is available
    }
    console.log(currentUser.user.profilePicture)
  }, [currentUser]); // Re-run only when currentUser changes

  return (
    <div className="bg-sky-200">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
        <Link to="/">
          <h1 className="font-bold">Auth</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <>
                {isLoading ? (
                  <img
                    src="path/to/placeholder.png" // Replace with your placeholder image
                    alt="Loading..."
                    className="object-cover rounded-full h-7 w-7"
                  />
                ) : (
                  <img
                    src={currentUser.user.profilePicture}
                    alt=""
                    className="object-cover rounded-full h-7 w-7"
                    onError={() => setIsLoading(true)} // Handle broken image case
                  />
                )}
              </>
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
