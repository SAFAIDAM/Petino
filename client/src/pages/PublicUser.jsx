import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router";
import axios from "axios";
import Menu from "../components/Menu";
import nocontent from "../assets/empty-space.png";

function PublicUser() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [user, setUser] = useState({});
  const [isUserFetched, setIsUserFetched] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    userFetch();
  }, []);

  const userFetch = () => {
    axios
      .get(`http://localhost:8000/api/user/${params.id}`)
      .then((result) => {
        setUser(result.data);
        setIsUserFetched(true);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="max-w-6xl p-3 mx-auto">
        {/* div that wrraps the all page*/}
        {/* menu container */}
        {/**  here */}
        <Menu />
        <h1 className="flex items-center justify-center mt-10 mb-4 text-lg font-bold heading">
          profile page
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <ClipLoader color="#D34A01" size={50} />
          </div>
        ) : (
          <div className="bg-[#ffffff] border border-[#bcbcbc] rounded-[30px] mb-24 pb-24">
            <div>
              {/** DIPLAYING USERS PRIFILE AND FUNCTIONALITIES */}
              <div className="justify-between gap-3 p-10 m-6 align-middle items-cente md:flex">
                <div className="items-center justify-center md:flex gap-7">
                  <img
                    className="rounded-full ml-9 md:ml-0 w-[130px] h-[130px] object-cover"
                    src={user.profilePicture}
                    alt=""
                  />
                  <div>
                    <h1 className="mt-2 text-2xl font-bold text-center md:text-start md:mt-9">
                      {user.username}
                    </h1>
                    <a
                      target="_blank"
                      onClick={(e) => {
                        window.location.href = `mailto:${user.email}`;
                      }}
                    >
                      <p className="md:w-[380px] mb-1 text-xs p-2 rounded-md text-center md:text-start  w-[190px] truncate hover:underline hover:text-[#EA7F48]">
                        Write me an E-Mail{" "}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
              {isUserFetched ? (
                <div className="items-center justify-center md:flex">
                <div>
                  <div className="flex-col justify-center text-center md:gap-4 md:flex md:text-left p-9">
                    {/** Bio container */}
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Bio
                      </h1>
                      <p className="md:w-[400px] text-sm p-4 text-center rounded-md ">
                        {user.bio || "No bio available"}
                      </p>
                    </div>
                    {/** Experiences container */}
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Experience
                      </h1>
                      <p className="md:w-[400px] text-sm p-4 text-center rounded-md ">
                        {user.experience || "No experience available"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
                <div>
                  <div className="flex flex-col justify-center gap-6 text-center md:text-left p-9">
                    <div>
                      <div>
                        <h1 className="mb-2 text-xl font-bold heading-signup ">
                          Categories
                        </h1>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                          <p className="bg-[#FFD4BB] text-sm text-center rounded-full pt-1 pb-1 text-[#E06C2E] text-ellipsis">
                            category
                          </p>
                          <p className="bg-[#FFD4BB] text-sm text-center rounded-full pt-1 pb-1 text-[#E06C2E] text-ellipsis">
                            category
                          </p>
                          <p className="bg-[#FFD4BB] text-sm text-center rounded-full pt-1 pb-1 text-[#E06C2E] text-ellipsis">
                            cate
                          </p>
                          <p className="bg-[#FFD4BB] text-sm text-center rounded-full pt-1 pb-1 text-[#E06C2E] text-ellipsis">
                            cat
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="mb-2 text-xl font-bold heading-signup">
                        Social links
                      </h1>
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#000000"}
                          fill={"none"}
                        >
                          <path
                            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M17.5078 6.5L17.4988 6.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <a target="_blank" href={user.instagramLink}>
                          <p className="md:w-[380px] mb-1 text-xs p-2 rounded-md  w-[190px] truncate hover:underline hover:text-[#EA7F48]">
                            {user.instagramLink ||
                              "https://exampleyourlink.com"}
                          </p>
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#000000"}
                          fill={"none"}
                        >
                          <path
                            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.9265 8.02637H13.9816C12.9378 8.02637 12.0894 8.86847 12.0817 9.91229L11.9964 21.4268M10.082 14.0017H14.8847"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <a target="_blank" href={user.facebookLink}>
                          <p className="md:w-[380px] mb-1 text-xs p-2 rounded-md  w-[190px] truncate hover:underline hover:text-[#EA7F48]">
                            {user.facebookLink ||
                              "https://exampleyourlink.com"}
                          </p>
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#000000"}
                          fill={"none"}
                        >
                          <path
                            d="M9.5 14.5L14.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.8463 14.6095L19.4558 12C21.5147 9.94113 21.5147 6.60303 19.4558 4.54416C17.397 2.48528 14.0589 2.48528 12 4.54416L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.397 2.48528 14.0589 4.54416 12L7.1537 9.39045"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <a target="_blank" href={user.optionalLink}>
                          <p className="md:w-[380px] mb-1 text-xs p-2 rounded-md  w-[190px] truncate hover:underline hover:text-[#EA7F48]">
                            {user.optionalLink ||
                              "https://exampleyourlink.com"}
                          </p>
                        </a>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                <img
                className="flex items-center justify-center mt-7 ml-auto mr-auto md:w-[300px] w-[200px] text-center"
                src={nocontent}
                alt=""
              />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
      {""}
      <footer className="flex items-center justify-center p-3">
        <div className="justify-start mt-4 text-center md:flex gap-36 mb-7 ">
          <p>
            Copyright @2024 All rights reserved | this project was made with
            love Copyright @2024 All rights reserved | this project was made
            with love
            <Link to="/Terms">
              <span className="text-[#D34A01] hover:underline">
                {" "}
                Tirms & Services
              </span>{" "}
            </Link>
          </p>
          <div className="flex items-center justify-center gap-2 text-center md:mt-0 mt-9">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b460a"}
                fill={"none"}
              >
                <path
                  d="M12 11L8 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.97368 16.5724C10.5931 16.8473 11.2787 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.9108 7.24367 13.7646 7.66921 14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b460a"}
                fill={"none"}
              >
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5078 6.5L17.4988 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#9b460a"}
                fill={"none"}
              >
                <path
                  d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PublicUser;
