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
// import { allCountries } from "country-telephone-data";
// import "react-flags-select/css/react-flags-select.css";

// import './EmployerForm.css' // Import the CSS file with the custom styles

const EmployerForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [posted, setPosted] = useState("");
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    name: "",
    gender: "",
    email: "",
    country_code: "",
    phoneNumber: "",
    city: "",
    company_name: "",
    est_salary:"",
    description:""
  });
  const [selectedClass, setSelectedClass] = useState("");
  const [genderr, setGender] = useState("female");
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [submitted, setSubmitted] = useState("");

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
    setPosted(1);
    e.preventDefault();
    console.log({
      email: formFields.email,
      phone: formFields.phoneNumber.replace("+", "").slice(2),
      tel_country_code: formFields.phoneNumber.replace("+", "").slice(0, 2),
      name: formFields.name,
      lat: location.latitude,
      lng: location.longitude,
      // tag: "employer",
      company_name: formFields.company_name,
      gender: formFields.gender,
      city: formFields.city,
      description: formFields.description,
      est_salary: formFields.est_salary,
    });
    const data = {
      email: formFields.email,
      phone: formFields.phoneNumber.replace("+", "").slice(2),
      tel_country_code: formFields.phoneNumber.replace("+", "").slice(0, 2),
      name: formFields.name,
      lat: location.latitude,
      lng: location.longitude,
      // tag: "employer",
      company_name: formFields.company_name,
      gender: formFields.gender,
      city: formFields.city,
      description: formFields.description,
      est_salary:formFields.est_salary
    };
    // return;
    const result = await axios.post(
      "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/jobs/post",
      data
    );
    setError(result.data.message);
    setSubmitted(result.data.status);
    if (result.data.status === 200) {
      // navigate("/submitted")
      navigate("/submitted");
    }
    console.log("Submitted", submitted);
    console.log("Resulttt", result.data, data);
    // console.log("search", formFields , location.latitude , location.longitude );
  };

  return (
    <div>
      <div className="block md:hidden">{/* <Header /> */}</div>
      <div className="hidden md:block">{/* <WebHeader1 /> */}</div>

      <div className="flex flex-col items-center w-[full]">
        <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Post a <span className="font-bold">Job</span>
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
              <div className="mt-4">
                <div className="text-[15px]">Enter Your Company Name</div>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      company_name: e.target.value,
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
              <div className="mt-4">
                <div className="text-[15px]">Enter Estimated Salary</div>
                <input
                  type="text"
                  placeholder="Estimated Salary"
                  className="form-input border px-3 py-3
                  border-[#5e5954]
                  rounded-md
                  focus:outline-none
                  w-full h-[45px]"
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      est_salary: e.target.value,
                    }));
                  }}
                />
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

          <div className="mt-4">
            <label
              className="block text-[#828181] font-semibold text-[18px] mb-2"
              htmlFor="message"
            >
              Job Description
            </label>
            <textarea
              className="appearance-none border-[2px] border-[#9e9e9e] rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="5"
              onChange={(e) => {
                setFormFields(() => ({
                  ...formFields,
                  description: e.target.value,
                }));
              }}
              placeholder="Enter Job Description"
            ></textarea>
          </div>

          <div className="flex flex-row justify-between text-[14px] md:text-[19px]">
            <div className="text-[#a2a2aa]">
              By Clicking on "POST JOB" you will agree to
              <span className="text-[#43418d] font-bold">
                Terms & Conditions
              </span>
            </div>
            {posted === 1 ? (
              error === "" ? (
                <div className="text-[20px] font-bold">loading....</div>
              ) : (
                <div className="text-[20px] font-bold text-red-500">
                  {error}
                </div>
              )
            ) : (
              <div>
                <button className="form-button rounded-md mb-5 text-[15px] w-[100px] md:px-2 md:w-[130px] h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white">
                  Post Job
                </button>
              </div>
            )}
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

export default EmployerForm;
