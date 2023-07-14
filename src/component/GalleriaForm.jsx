import React from "react";
import WebHeader1 from "./WebHeader1";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PhoneInput from "react-phone-number-input";
// import FlagSelect from "react-flags-select";
import "./ReactPhone.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GalleriaHeader from "./GalleriaHeader";
import GalleriaFooter from "./GalleriaFooter";
// import { allCountries } from "country-telephone-data";
// import "react-flags-select/css/react-flags-select.css";

// import './GalleriaForm.css' // Import the CSS file with the custom styles

const GalleriaForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [posted, setPosted] = useState("");
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    post: "",
    type: "",
  });
 const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState("");
useEffect(() => {
  document.title = "GalleriaProperties";
}, []);
  const onSubmit = async (e) => {
    setPosted(1);
    e.preventDefault();
    console.log({
      type: formFields.type,
      post: formFields.post,
    });
    const data = {
      type: formFields.type,
      post: formFields.post,
    };
    // return;
    const result = await axios.post(
      `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/galleria/post?post=${formFields.post}&id=${formFields.type}`
    );
    console.log("Resulttt",result)
    // setError(result.data.message);
    // setSubmitted(result.data.status);
    if (result.status === 200) {
      // navigate("/submitted")
      navigate("/galleria/t");
    }
    console.log("Submitted", submitted);
    // console.log("Resulttt", result.data, data);
    // console.log("search", formFields , location.latitude , location.longitude );
  };
const handleChange = (e) => {
  setSelectedOption(e.target.value);
  setFormFields(() => ({
    ...formFields,
    type: e.target.value,
  }));
};

  return (
    <div>
      <div className="block md:hidden">{/* <Header /> */}</div>
      <div className="hidden md:block">{/* <WebHeader1 /> */}</div>
       <GalleriaHeader/>
      <div className="flex flex-col items-center w-[full]">
        <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Post a <span className="font-bold">Property</span>
        </div>
        <form
          onSubmit={onSubmit}
          className="text-[#75747c]  mt-[25px] text-[20px] w-[80%] md:w-[40%] mx-auto"
        >
          <div className="flex flex-wrap w-full">
            <div className=" w-full md:mt-7 md:mb-[20px] mt-1">
              <div>
                <div className="text-[15px]">
                  Enter Post
                </div>
                <input
                  type="text"
                  placeholder="post"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      post: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Enter Property Type</div>
                <select
                  id="propertyType"
                  value={selectedOption}
                  onChange={handleChange}
                  className="w-full border-[1px] border-black py-2 rounded-md"
                >
                  <option value="">Select an option</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between text-[14px] md:text-[19px]">
            <div className="text-[#a2a2aa] my-5">
              By Clicking on "POST Property" you will agree to
              <span className="text-[#43418d] font-bold">
                Terms & Conditions
              </span>
            </div>
            {posted === 1 ? (
              <div className="text-[20px] font-bold">loading....</div>
            ) : (
              <div>
                <button className="form-button rounded-md my-5 md:text-[17px] text-[14px] py-1 px-2 w-[80px] md:px-2 md:w-[130px] md:h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white">
                  Post
                </button>
              </div>
            )}
          </div>
        </form>
        {submitted === 500 ? (
          <div className="font-semibold text-red-700">{error}</div>
        ) : null}
      </div>
      <GalleriaFooter />
    </div>
  );
};

export default GalleriaForm;
