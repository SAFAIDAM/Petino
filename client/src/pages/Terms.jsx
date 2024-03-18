import React from "react";
import logo from "../assets/logo-terms.png";
import vector from "../assets/vectore.png";

function Terms(props) {
  const { termsdata } = props;
  const data = termsdata.map((item) => {
    return (
      <ul className="list-disc" key={item.id}>
        <li>
          <span>{item.title}</span>
          {item.content}
        </li>
      </ul>
    );
  });
  return (
    <div>
      <div className="flex flex-col items-center mt-6">
        <div>
          <img className="w-[100px] md:w-[200px]" src={logo} alt="" />
        </div>
        <div className="mt-4 w-[300px] md:w-[650px] text-center">
          <h1 className="text-lg md:text-2xl">
            Welcome to Petino , where pet passion meets community connection.
            Please take a moment to review our Terms & Conditions:
          </h1>
        </div>
      </div>
      
      <section>
        <div>
          <h1 className="mt-6 text-center heading-signup">
            Conditions: <img src={vector} alt="" />
          </h1>
        </div>
        <div>{data}</div>
      </section>
    </div>
  );
}

export default Terms;
