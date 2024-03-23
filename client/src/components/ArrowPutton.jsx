import React from "react";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";


function ArrowPutton() {
  let navigate = useNavigate();
  return (
    <Link >
      <button onClick={() => navigate(-1)} className="font-bold bg-[#FAD0B7] hidden md:block rounded-full p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={20}
          height={20}
          color={"#e06c2e"}
          fill={"none"}
        >
          <path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Link>
  );
}

export default ArrowPutton;
