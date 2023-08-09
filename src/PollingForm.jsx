import React, { useCallback } from "react";
import WebHeader1 from "./WebHeader1";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PhoneInput from "react-phone-number-input";
import ReactModal from "react-modal";
// import FlagSelect from "react-flags-select";
import "./ReactPhone.css";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Acceptance from "./Acceptance";
// import { allCountries } from "country-telephone-data";
// import "react-flags-select/css/react-flags-select.css";

// import './PolingForm.css' // Import the CSS file with the custom styles

const PolingForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [potentialRevenue, setPotentialRevenue] = useState(null);
  // console.log(potentialRevenue)
  const [posted, setPosted] = useState("");
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    gender: "",
    email: "",
    number: "",
    address: "",
    days: 10,
    pr: "",
    country_code: "",
    phoneNumber: "",
    category: "",
  });
  const [isOpen1, setIsOpen1] = useState(false);
  // const [isClose1, setIsClose1] = useState(false);
  const openModal1 = useCallback(() => setIsOpen1(true), []);
  const closeModal1 = useCallback(() => setIsOpen1(false), []);
  const [selectedClass, setSelectedClass] = useState("");

  const handleChange1 = (e) => {
    setSelectedOption(e.target.value);
    setFormFields(() => ({
      ...formFields,
      category: e.target.value,
    }));
  };
  const [genderr, setGender] = useState("female");

  const [submitted, setSubmitted] = useState("");
  const handleIncrement = () => {
    setFormFields((prevFields) => ({
      ...prevFields,
      days: prevFields.days + 1,
    }));
  };

  const handleDecrement = () => {
    if (formFields.days > 10) {
      setFormFields((prevFields) => ({
        ...prevFields,
        days: prevFields.days - 1,
      }));
    }
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setFormFields(() => ({
      ...formFields,
      category: e.target.value,
    }));
  };
  const [selectCategory, setSelectedCategory] = useState("");
  const [secondAmount, setSecondAmont] = useState("");
  const [thirdAmount, setThirdAmount] = useState("");
  const setnum2 = (num) => {
    const mynum = num * 2;
    setSecondAmont(mynum * 2);
    return mynum;
  };
  const handlePhoneInputChange = (newValue) => {
    // const countryCode =  newValue.slice(0,3)
    // console.log("CountryCode",countryCode)
    setFormFields(() => ({
      ...formFields,
      country_code: newValue,
    }));
    setFormFields(() => ({
      ...formFields,
      phoneNumber: newValue,
    }));
  };
  const calculateProduct = () => {
    const number = parseInt(formFields.number);
    const product = number * 1950;
    setFormFields((prevFields) => ({
      ...prevFields,
      pr: product,
    }));
    // if (!isNaN(number)) {
    //   const product = number * 1950;
    //   setFormFields((prevFields) => ({
    //     ...prevFields,
    //     pr: product,
    //   }));
    // } else {
    //   setFormFields((prevFields) => ({
    //     ...prevFields,
    //     pr: 0, // or any other default value if desired
    //   }));
    // }
  };
  const handleNumberChange = (e) => {
    const number = e.target.value;
    setFormFields((prevFields) => ({
      ...prevFields,
      number: e.target.value,
    }));
    const product = number * 1950;
    setFormFields((prevFields) => ({
      ...prevFields,
      pr: product,
    }));
  };

  const Total =
    formFields.pr * 1 +
    formFields.pr * 2 +
    formFields.pr * 3 +
    formFields.pr * 7 +
    formFields.pr * 10;
  const sendSms = async (number) => {
    // closeModal1()
    const result = await axios.post(
      `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/customer/message?email=${number.email}&phone=${number.phone}&revenue=${number.revenue}`
    );
    console.log("Resulttt", result);
    if (result.status === 200) {
      closeModal1();
      window.location.reload();
    }
  };
  const [resData, SetresData] = useState("");
  const [sub, setSub] = useState("");
  const onSubmit = async (e) => {
    setSub(1);
    // openModal1();
    e.preventDefault();
    console.log({
      email: formFields.email,
      phone: formFields.phoneNumber,
      // tel_country_code: formFields.phoneNumber.replace("+", "").slice(0, 2),
      name: formFields.name,
      days: formFields.days,
      address: formFields.address,
      pr: formFields.pr,
      category: formFields.category,
      number: formFields.number,
      gender: formFields.gender,
    });
    const data = {
      email: formFields.email,
      phone: formFields.phoneNumber,
      // tel_country_code: formFields.phoneNumber.replace("+", "").slice(0, 2),
      name: formFields.name,
      days: formFields.days,
      address: formFields.address,
      pr: formFields.pr,
      category: formFields.category,
      number: formFields.number,
      gender: formFields.gender,
    };
    const result = await axios.post(
      `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/customer/post?email=${formFields.email}&phone=${formFields.phoneNumber}
        &name=${formFields.name}&days=${formFields.days}&address=${formFields.address}&revenue=${formFields.pr}&category=${formFields.category}
        &customers=${formFields.number}&gender=${formFields.gender}`
    );
    console.log("Resulttt", result.data.data);
    // SetresData(result.data.data)
    if (result.status === 200) {
      // <Acceptance data={result.data.data} />;
      window.location.href = `/acceptance?data=${encodeURIComponent(
        JSON.stringify(result.data.data)
      )}`;
      setPosted(1);
      // navigate("/acceptance");
    }
  };
  // console.log("ResponseData", resData)

  return (
    <div>
      <div className="block md:hidden">{/* <Header /> */}</div>
      <div className="hidden md:block">{/* <WebHeader1 /> */}</div>

      <div className="flex flex-col items-center w-[full]">
        <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Request for Market Partner
        </div>
        <form
          onSubmit={onSubmit}
          className="text-[#75747c]  mt-[25px] text-[20px] w-[80%] md:w-[60%] mx-auto"
        >
          <div className="flex flex-wrap w-full">
            <div className=" w-full lg:w-1/2 md:mt-7 md:mb-[20px] mt-1">
              <div>
                <div className="text-[15px]">
                  Enter Your first and last name
                </div>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Enter Your Email address</div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  required
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Enter Your Address</div>
                <input
                  type="text"
                  placeholder="Address"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      address: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className=" w-full lg:w-1/2 md:px-2 mt-7 mb-[10px]">
              <div>
                <div className="text-[15px]">Select Your Gender</div>
                <div className="flex flex-row rounded-md h-[45px] w-full text-center cursor-pointer ">
                  {genderr === "male" ? (
                    <div
                      className="w-[33%]  border-[1px] py-1 border-[#5e5954] bg-[#5e5954]  text-white rounded-l-md hover:bg-slate-200"
                      onClick={(e) => {
                        setFormFields(() => ({
                          ...formFields,
                          gender: "male",
                        }));
                      }}
                    >
                      Male
                    </div>
                  ) : (
                    <div
                      className="w-[33%]  border-[1px] py-1 border-[#5e5954] rounded-l-md hover:bg-slate-200"
                      onClick={(e) => {
                        setFormFields(() => ({
                          ...formFields,
                          gender: "male",
                        }));
                        setGender("male");
                      }}
                    >
                      Male
                    </div>
                  )}
                  {genderr === "female" ? (
                    <div
                      className="w-[33%] border-[1px]  py-1 border-[#5e5954] bg-[#5e5954] hover:bg-slate-200 text-white"
                      onClick={(e) => {
                        setFormFields(() => ({
                          ...formFields,
                          gender: "female",
                        }));
                      }}
                    >
                      Female
                    </div>
                  ) : (
                    <div
                      className="w-[33%] border-[1px]  py-1 border-[#5e5954] hover:bg-slate-200"
                      onClick={(e) => {
                        setFormFields(() => ({
                          ...formFields,
                          gender: "female",
                        }));
                        setGender("female");
                      }}
                    >
                      Female
                    </div>
                  )}
                  {genderr === "other" ? (
                    <div
                      className="w-[33%] py-1 border-[1px] bg-[#5e5954] text-white rounded-r-md border-[#5e5954] hover:bg-slate-200"
                      onClick={(e) => {
                        setFormFields(() => ({
                          ...formFields,
                          gender: "other",
                        }));
                      }}
                    >
                      Other
                    </div>
                  ) : (
                    <div
                      className="w-[33%] py-1 border-[1px] rounded-r-md  border-[#5e5954] hover:bg-slate-200"
                      onClick={(e) => {
                        setFormFields(() => ({
                          ...formFields,
                          gender: "other",
                        }));
                        setGender("other");
                      }}
                    >
                      Other
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[15px]">Enter Your phone number</div>
                {/* <div className="mt-4">
                  <div className="text-[15px]">Enter Your Address</div> */}
                <input
                  type="number"
                  required
                  placeholder="Phone Number"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      phoneNumber: e.target.value,
                    }));
                  }}
                />
                {/* </div> */}
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Select Your Business Category</div>
                <select
                  id="CategoryType"
                  value={selectedOption}
                  onChange={handleChange}
                  className="w-full border-[1px] border-black py-2 rounded-md"
                >
                  <option value="">Category</option>
                  <option value="job">Job</option>
                  <option value="hr">HR</option>
                  <option value="property">Property</option>
                  <option value="food">Food</option>
                  <option value="mobilephone">Mobile Shop</option>
                  <option value="electrician">Electrician</option>
                  <option value="ac service">AC Service</option>
                  <option value="jobshr">Jobs(HR)</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="IT services">IT Services</option>
                  <option value="pet care">Pet Care</option>
                  <option value="Producer">Producer</option>
                  <option value="Executive Producer">Executive Producer</option>
                  <option value="Storyboard Artist">Storyboard Artist</option>
                  <option value="Camera operators">Camera operators</option>
                  <option value="Set designer">Set designer</option>
                  <option value="Studio technician">Studio technician</option>
                  <option value="Writer">Writer</option>
                  <option value="Editor ">Editor </option>
                  <option value="Music mixer">Music mixer</option>
                  <option value="Social media manager">
                    Social media manager
                  </option>
                  <option value="Content creator">Content creator</option>
                  <option value="Physician">Physician</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Actor">Actor</option>
                  <option value="Model">Model</option>
                  <option value="Extras Day Player">Extras Day Player</option>
                  <option value="Backstage Worker">Backstage Worker</option>
                  <option value="Makeup Artist">Makeup Artist</option>
                  <option value="Hair Artist ">Hair Artist</option>
                  <option value="Costume designer">Costume designer</option>
                  <option value="Caterer">Caterer </option>
                  <option value="Transportation Management">
                    Transportation Management
                  </option>
                  <option value="Security">Security</option>
                </select>
              </div>
            </div>
          </div>

          {/* </div> */}
          <div className="mt-4 text-[22px] font-bold">
            {" "}
            Estimated Commitment
          </div>
          <div className="mt-4 flex flex-wrap w-full">
            <div className=" w-full md:w-[30%]">
              <div className="text-[15px]">Customer</div>
              <input
                type="number"
                required
                placeholder="Number"
                value={formFields.number}
                className="form-input border px-3 py-3
          border-[#5e5954]
          rounded-md
          focus:outline-none
          w-full h-[45px]"
                onChange={handleNumberChange}
              />
            </div>
            <div className=" w-full md:w-[30%] md:ml-[5%]">
              <div className="text-[15px]">Days</div>

              <input
                type="number"
                required
                value={formFields.days}
                min={10}
                max={15}
                className="form-input border px-3 py-3 border-[#5e5954] rounded-md focus:outline-none w-full h-[45px]"
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue) && inputValue >= 10) {
                    setFormFields((prevFields) => ({
                      ...prevFields,
                      days: inputValue,
                    }));
                  }
                }}
              />

              {/* <button onClick={handleIncrement}>+</button>
              <button onClick={handleDecrement}>-</button> */}
            </div>

            <div className=" w-full md:w-[30%] md:ml-[5%]">
              <div className="text-[15px]">Potential Revenue</div>
              <input
                type="text"
                className="form-input border px-3 py-3
              border-[#5e5954]
              rounded-md
              focus:outline-none
              w-full h-[45px]"
                placeholder="Potential revenue"
                value={formFields.pr}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-row justify-between text-[14px] mt-5 md:text-[19px]">
            <div className="flex flex-col">
              <div className="text-[#5c5c5d] w-full  flex flex-col">
                <div>Note :</div>
                <div>
                  You are required to register 10 businesses in the First 15
                  Days to qualify for the next phase of 15 Days. In which you
                  have to register an additional 20 Businesses. Your Shared
                  Structure is :
                </div>
                <div>Revenue Shared : 10%</div>
                <div>1-10 Registered Businesses : 20%</div>
                <div>11-30 Registered Businesses : 25%</div>
                <div>Above30 Registered Businesses : 30%</div>
              </div>
              <div className="w-full ml-5 mt-[35px] flex justify-end">
                {/* {posted === 1 ? (
                  error === "" ? (
                    <div className="text-[20px] font-bold">loading....</div>
                  ) : (
                    <div className="text-[20px] font-bold text-red-500">
                      {error}
                    </div>
                  )
                ) : ( */}
                {sub === "" ? (
                  <div>
                    <button className="form-button rounded-md mb-5 text-[15px] w-[100px] md:px-2 md:w-[130px] h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white">
                      Next
                    </button>
                  </div>
                ) : (
                  <div className="text-[20px] font-bold">loading....</div>
                )}

                {/* )} */}
              </div>
            </div>
          </div>
        </form>
        {sub === "" ? (
          <div></div>
        ) : (
          <div className="text-[26px] font-bold text-red-500 flex justify-center">
            Thanks for becoming a market partner of OneCallApp
          </div>
        )}
        {submitted === 500 ? (
          <div className="font-semibold text-red-700">{error}</div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default PolingForm;
