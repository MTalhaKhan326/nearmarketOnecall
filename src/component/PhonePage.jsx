import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./basic/Loading";
import "./PhonePage.css"; // Replace "PhonePage.css" with the actual CSS file name
import { AppImages } from "../Asset/images/image.js";
import axios from "axios";
import { isValidJSON } from "../utils/helpers.js";
import Header from "./Header";
import Headers from "./Headers";

const PhonePage = () => {
  const fields = {
    search: null,
  };
  const [formFields, setFormFields] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [pinCode, setPincode] = useState(Math.floor(1000 + Math.random() * 9000).toString())
  const navigate = useNavigate()

  // let randomNumber = Math.floor(1000 + Math.random() * 9000);
  // console.log("RandomNumber", randomNumber);
  // const message = `your OTP code is ${randomNumber}`;

  const onSubmit = (e) => {
    e.preventDefault();

    setError(null)
    
    const phone = formFields.search
    if(!phone) {
      setError('Please enter your phone number');
      return;
    }
    
    const phoneWithoutCountryCode = phone.toString().trim().replace(/[^0-9]/gi, "").substr(-10)
    if(phoneWithoutCountryCode.length !== 10) {
      setError('Invalid phone number');
      return;
    }
    const telCountryCode = "92"
    const fullPhoneNumber = `${telCountryCode}${phoneWithoutCountryCode}`
    const apiUrl = "https://crm.onecallapp.com/api/user-message/send-message-to-user/1/2?platform=lifetime";
    const requestBody = {
      phone: fullPhoneNumber,
      message: `Your OTP for One Call Referral is ${pinCode}`,
      platform: "lifetime",
    };
    
    // not more than 20 codes should be sent in a day
    const today = new Date()
    const todayDateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    let codeSentCount = localStorage.getItem('code_sent_count')
    codeSentCount = codeSentCount && isValidJSON(codeSentCount) ? JSON.parse(codeSentCount) : { [todayDateString]: 0 }
    const isTodayLimitReached = codeSentCount[todayDateString] >= 20
    if(isTodayLimitReached) {
      setError('Your otp limit for today has reached to its limit.')
      return null;
    }
    
    setIsLoading(true)
    axios.post(apiUrl, requestBody).then(res => {
      if(typeof res.data === 'string' && res.data.substring(0, 2) === 'OK') {
        console.log('code is sent')
        navigate(`/otp`, { state: { pinCode: pinCode, phone: fullPhoneNumber } })
      }
    }).catch(e => {
      console.log(e)
      setError('Something went wrong. Please try again.')
    }).finally(() => {
      setIsLoading(false)
      codeSentCount[todayDateString] = codeSentCount[todayDateString] + 1
      localStorage.setItem('code_sent_count', JSON.stringify(codeSentCount))
    })
  };

  return (
    <>
      <Headers />
      <form
        className="flex flex-col justify-center items-center h-screen"
        onSubmit={onSubmit}
      >
        <div className="md:text-[26px] text-[18px] font-bold text-[#65B6ED]">
          Phone Number
        </div>
        {error && (
          <div className="bg-red-400 text-white px-4 py-1 rounded my-4 text-[14px]">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="flex items-center w-5/5">
          <input
            type="text"
            placeholder="Enter Phone number ..."
            className="px-4 py-2 md:w-[40vw] w-[90vw] border border-[#65B6ED] rounded-lg focus:outline-none"
            onChange={(e) => {
              if (error !== null) {
                setError(null);
              }
              setFormFields(() => ({ search: e.target.value }));
            }}
          />
        </div>
        <button
          className="px-4 py-2 bg-white text-[#65B6ED] border border-[#65B6ED] hover:bg-[#65B6ED] hover:text-white rounded-lg mt-3 relative w-[100px] h-[30px] disabled:bg-[#65B6ED]"
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
      </form>
    </>
  );
};

export default PhonePage;
