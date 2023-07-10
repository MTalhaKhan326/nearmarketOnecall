import React, { useState } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import Loading from "./basic/Loading";
import "./PhonePage.css"; // Replace "PhonePage.css" with the actual CSS file name
import axios from "axios";
import { AppImages } from "../Asset/images/image.js";
import Header from "./Header";
import Headers from "./Headers";

const RefferalPage = () => {
  const { state } = useLocation()
  const userPhone = state?.phone 
  
  // const [searchParams, setSearchParams] = useSearchParams();
  // const number = searchParams.get("num");
  const fields = {
    search: null,
  };
  const [formFields, setFormFields] = useState(fields);
  const [error, setError] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  if(!userPhone) {
    return <Navigate to="/ref" />
  }
  // let randomNumber = Math.floor(1000 + Math.random() * 9000);
  // console.log("RandomNumber", randomNumber);
  // const message = `your OTP code is ${randomNumber}`;
  const onSubmit = async (e) => {
    e.preventDefault();

    setError(null)
    setShowSuccessMessage(false)
    
    const phone = formFields.search
    if(!phone) {
      setError('Please enter phone number');
      return;
    }

    
    
    let phoneWithoutCountryCode = phone.toString().trim().replace(/[^0-9]/gi, "")
    if(phoneWithoutCountryCode.length < 10 || phoneWithoutCountryCode.length > 11) {
      setError('Invalid phone number');
      return;
    }
    phoneWithoutCountryCode = phoneWithoutCountryCode.substr(-10)

    const telCountryCode = "92"
    const fullPhoneNumber = `${telCountryCode}${phoneWithoutCountryCode}`
    const refCode = userPhone?.replace(/[^0-9]/gi, "").substr(-4).toString()
    const apiUrl = "https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/refferal-data";
    const requestBody = {
      phone: fullPhoneNumber,
      refferal_code: refCode 
    };
    setIsLoading(true)
    axios.post(apiUrl, requestBody).then(res => {
      console.log(res)
      if(res.data.error) {
        setError(res.data.message ?? "Something went wrong!")
        return;
      }
      setShowSuccessMessage(true)
      setFormFields(fields)
    }).catch(e => {
      console.log(e)
      setError('Something went wrong. Please try again')
    }).finally(() => {
      setIsLoading(false)
    }) 

  //   setIsLoading(true);
  //   console.log("search", formFields.search, message);
  //   try {
  //     setIsLoading(true)
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  //     const resp = await response.json();
  //     if (response.ok) {
  //       // API call was successful
  //       setRes(resp.message);
  //       console.log("Response", res.message);
  //       console.log("Message sent successfully!");
  //        window.location.href = `https://oc92.com/ref`;
  //     } else {
  //       // API call failed
  //       console.log("Error sending message");
  //       // Handle error scenarios
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //     // Handle network errors or other exceptions
  //   }finally{
  //  setIsLoading(false);
  //   }

  };

  return (
    <>
      <Headers />
      {/* <div className="flex flex-row text-[22px] mx-3">
        <div className="font-bold">Refferal Code = </div>
        <div className="ml-2">{number?.slice(-4)}</div>
      </div> */}
      <form
        className="flex flex-col justify-center items-center h-screen"
        onSubmit={onSubmit}
      >
        <div className="md:text-[26px] text-[#65B6ED] text-[18px] font-bold">
          Refferal Phone Number
        </div>
        {error && (
          <div className="bg-red-400 text-white px-4 py-1 rounded my-4 text-[14px]">
            <strong>Error:</strong> {error}
          </div>
        )}
        {showSuccessMessage && (
          <div className="bg-green-400 text-white px-4 py-1 rounded my-4 text-[14px]">
            <strong>Successfully added referral.</strong>
          </div>
        )}
        <div className="flex items-center w-5/5">
          <input
            type="text"
            placeholder="Enter your referral's phone number i.e. 03360123456"
            className="px-4 py-2 md:w-[40vw] w-[90vw] border border-[#65B6ED] rounded-l-lg focus:outline-none"
            onChange={(e) => {
              setFormFields(() => ({ search: e.target.value }));
            }}
          />
        </div>

        <button
          className="px-4 py-2 bg-white hover:bg-[#65B6ED] text-[#65B6ED] border border-[#65B6ED] hover:text-white rounded-lg mt-3 relative w-[100px] h-[30px] disabled:bg-[#65B6ED]"
          disabled={isLoading}
        >
          <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            {isLoading ? (
              <img src={AppImages.loading} alt="loading" className="w-[20px]" />
            ) : (
              "Submit"
            )}
          </span>
        </button>

        {/* {isLoading && (
          <div className="loader-overlay">
            {res === "" ? <div>Loading..</div> : <div>{res}</div>}
          </div>
        )} */}
      </form>
    </>
  );
};

export default RefferalPage;
