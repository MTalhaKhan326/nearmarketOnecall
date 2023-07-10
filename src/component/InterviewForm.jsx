import React from 'react'
import WebHeader1 from './WebHeader1'
import { useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import PhoneInput from 'react-phone-number-input';
// import FlagSelect from "react-flags-select";
import './ReactPhone.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { allCountries } from "country-telephone-data";
// import "react-flags-select/css/react-flags-select.css";

// import './InterviewForm.css' // Import the CSS file with the custom styles

const InterviewForm = () => {
    const navigate = useNavigate();
    
    const [value, setValue] = useState();
  const [formFields, setFormFields] = useState({
    name: "",
    gender: "",
    email: "",
    country_code:"",
    phoneNumber: "",
    city: "",
    type: "",
    comment: "",
  });
const [selectedClass, setSelectedClass] = useState("");
const [genderr , setGender] = useState('female')
const [location, setLocation] = useState({
  latitude: null,
  longitude: null,
});
const [submitted, setSubmitted] = useState('')
const [posted, setPosted] = useState("");
const [error, setError] = useState("");

useEffect(() => {
  navigator.geolocation.getCurrentPosition(function (position) {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
}, []);


const handleOptionChange = (e) => {
  setSelectedClass(e.target.value);
  setFormFields(() => ({
    ...formFields,
    type: e.target.value,
  }));
  // console.log(e.target.value);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    setPosted(1);
   
    console.log({
      phone: formFields.phoneNumber.replace("+", "").slice(2).substring(),
      email: formFields.email,
      tel_country_code: formFields.phoneNumber.replace("+", "").slice(0, 2),
      name: formFields.name,
      lat: 0.150470001852,
      lng: 0.15938877028198,
      tag: "employee",
      job_class: "any",
      gender: formFields.gender,
      city: formFields.city,
      comments: formFields.comment,
      // name: formFields.name,
      // email: formFields.email,
      // phone: formFields.phone,
      // tel_country_code: "+92",
      // lat: location.latitude,
      // lng: location.longitude,
      // tag: "employee",
      // job_class: formFields.type,
      // gender: formFields.gender,
      // city: formFields.city,
      // comments: formFields.comment,
    });
    const data = {
      // phone: "3218879542",
      // email: "mtk326@gmail.com",
      // tel_country_code: "92",
      // name: "john",
      // lat: 0.150470001852,
      // lng: 0.15938877028198,
      // tag: "employee",
      // job_class: "any",
      // gender: "male",
      // city: "lahore",
      // comments: "ok",
      email: formFields.email,
      phone: formFields.phoneNumber.replace("+", "").slice(2),
      tel_country_code: formFields.phoneNumber.replace("+", "").slice(0, 2),
      name: formFields.name,
      lat: location.latitude,
      lng: location.longitude,
      tag: "employee",
      job_class: formFields.type,
      gender: formFields.gender,
      city: formFields.city,
      comments: formFields.comment,
    };
    // return;
    const result = await axios.post(
      "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/jobs/employee",
      data
    );
    setSubmitted(result.data.status)
    setError(result.data.message);
    if (result.data.status === 200) {
      // navigate("/submitted")
      navigate("/submitted");
    } else {
      setPosted("");
    }
    console.log("Submitted",submitted)
    console.log("Resulttt",result.data,data)
    // console.log("search", formFields , location.latitude , location.longitude );
  };

  return (
    <div>
      <div className="block md:hidden">
        <Header />
      </div>
      <div className="hidden md:block">
        <WebHeader1 />
      </div>

      <div className="flex flex-col items-center w-[full]">
        <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Your are <span className="font-bold">Selected</span> for Interview
        </div>
        <form
          onSubmit={onSubmit}
          className="text-[#75747c]  mt-[45px] text-[20px] w-[80%] md:w-[60%] mx-auto"
        >
          <div className="text-[20px]  font-bold">
            PROVIDE YOUR INFORMATION FOR INTERVIEW
          </div>
          <div className="text-[18px]">
            You will receive call from our office for interview and other
            opportunities
          </div>
          <div className="flex flex-wrap w-full">
            <div className=" w-full lg:w-1/2 mt-7 mb-[20px]">
              <div>
                <div className="text-[15px]">
                  Enter Your first and last name
                </div>
                <input
                  type="text"
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
                  type="text"
                  placeholder="Email Address"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className=" w-full lg:w-1/2 md:px-2 md:mt-7 mt-2 mb-[10px]">
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
                <div className=" flex flex-row">
                  <PhoneInput
                    className="px-[6%] py-3 border-[1px] h-[45px] rounded-md w-full border-[#5e5954]"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={handlePhoneInputChange}
                    // onChange={setValue}
                  />
                </div>
              </div>
            </div>
            <div className=" w-full lg:w-1/2 mb-[20px]">
              <div>
                <div className="text-[15px]">Enter Your City (current)</div>
                <input
                  type="text"
                  placeholder="Lahore"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      city: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-[#fcfcfc] rounded-md border-[2px] my-5 border-[#9c9c9c] py-3 px-3 text-black">
            <div className="text-[#82817f] font-medium text-[18px]">
              SELECT JOB TYPE
            </div>
            <div className="flex flex-wrap w-full">
              <div className=" w-full lg:w-1/2 mt-5">
                <div className="flex flex-row">
                  <input
                    type="radio"
                    className="form-radio text-[#82817f] h-4 w-4 mt-2 focus:text-black"
                    value="any"
                    checked={selectedClass === "any"}
                    onChange={handleOptionChange}
                  />
                  <div className="flex flex-col">
                    <span className="ml-2 mt-[-5px] text-[#706f6d]">
                      All Kind
                    </span>
                    <div className="ml-2 text-[12px] text-[#706f6d]">
                      Any job with suitable salary
                    </div>
                  </div>
                </div>
                <div className="flex flex-row my-4 md:my-[32px]">
                  <input
                    type="radio"
                    className="form-radio text-gray-600 h-4 w-4 mt-2"
                    value="class3"
                    checked={selectedClass === "class3"}
                    onChange={handleOptionChange}
                  />
                  <div className="flex flex-col">
                    <span className="ml-2 mt-[-5px] text-[#706f6d]">
                      Class3
                    </span>
                    <div className="ml-2 text-[12px] text-[#706f6d]">
                      Admin & Support staff, Marketing & Sales, Recenptionist,
                      etc
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full lg:w-1/2 md:my-5">
                <div className="flex flex-row">
                  <input
                    type="radio"
                    className="form-radio text-gray-600 h-4 w-4 mt-2"
                    value="class4"
                    checked={selectedClass === "class4"}
                    onChange={handleOptionChange}
                  />
                  <div className="flex flex-col">
                    <span className="ml-2 mt-[-5px] text-[#706f6d]">
                      Class4
                    </span>
                    <div className="ml-2 text-[12px] text-[#706f6d]">
                      Office boy, Driver, Helper, Peon, Waiter, Maid , Delivery
                      boy, Watchman, etc
                    </div>
                  </div>
                </div>
                <div className="flex flex-row my-4">
                  <input
                    type="radio"
                    className="form-radio text-gray-600 h-4 w-4 mt-2"
                    value="class2"
                    checked={selectedClass === "class2"}
                    onChange={handleOptionChange}
                  />
                  <div className="flex flex-col">
                    <span className="ml-2 mt-[-5px] text-[#706f6d]">
                      Class 2
                    </span>
                    <div className="ml-2 text-[12px] text-[#706f6d]">
                      Accounts, Call Center Agents, Manager level, etc
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full lg:w-1/2 ">
                <div className="flex flex-row">
                  <input
                    type="radio"
                    className="form-radio text-gray-600 h-5 mt-2 w-5"
                    value="class1"
                    checked={selectedClass === "class1"}
                    onChange={handleOptionChange}
                  />
                  <div className="flex flex-col">
                    <span className="ml-2  text-[#706f6d]">Class 1</span>
                    <div className="ml-2 text-[12px] text-[#706f6d]">
                      Seniar Positions, Experienced Staff, Designer / Developer,
                      Engineer of any kind,etc
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block text-[#828181] font-semibold text-[18px] mb-2"
              htmlFor="message"
            >
              Comments (Optional)
            </label>
            <textarea
              className="appearance-none border-[2px] border-[#9e9e9e] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="5"
              onChange={(e) => {
                setFormFields(() => ({
                  ...formFields,
                  comment: e.target.value,
                }));
              }}
              placeholder="Comments to explain your skill or any thing else"
            ></textarea>
          </div>

          <div className="flex flex-row justify-between text-[14px] md:text-[19px]">
            <div className="text-[#a2a2aa]">
              By Clicking on "Apply Now" you will agree to{" "}
              <span className="text-[#43418d] font-bold">
                Terms & Conditions
              </span>
            </div>
             {posted === 1 ? (
              <div className="text-[20px] font-bold">loading....</div>
            ) : (
            <div>
              <button className="form-button rounded-md mb-5 text-[15px] w-[100px] md:px-2 md:w-[130px] h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white">
                Apply Now
              </button>
            </div>)}
          </div>
        </form>
        {submitted === 500 ? (
          <div className="font-semibold text-red-700">{error}</div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default InterviewForm;
