import React, { useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "./Header";
import Headers from "./Headers";


const OtpPage = () => {
  const { state } = useLocation()
  const pinCode = state.pinCode 
  const phone = state.phone 

  const fields = {
    otpnumber: null,
  };
  const [formFields, setFormFields] = useState(fields);
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  if(!pinCode || !phone) {
    return <Navigate to={"/ref"} />
  }
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [submitted, setSubmitted] = useState(false);
//   const homeOtp = searchParams.get("otp");
//   console.log("homeOTP", homeOtp)
//   const number = searchParams.get("number");
//   console.log("number", number);
//   const mynum = number;
//   console.log("My number =", mynum);
//  const handleChange = (e) => {
//    const inputValue = e.target.value;
//    const digitsOnly = inputValue.replace(/\D/g, ""); // Remove non-digit characters
//    const maxLength = 4; // Maximum length of 4 digits

//    // Truncate the input value to the maximum length
//    const truncatedValue = digitsOnly.slice(0, maxLength);

//    setFormFields(() => ({ otpnumber: truncatedValue }));
//  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    if(formFields.otpnumber?.length !== 4) {
      setError('Invalid code')
      return;
    }
    if(formFields.otpnumber !== pinCode) {
      setError('Wrong code')
      return;
    }
    navigate('/refferal', { state: { phone: phone } })
  };
  return (
    <>
      <Headers />
      <form
        className="flex flex-col justify-center items-center h-screen"
        onSubmit={onSubmit}
      >
        <div className="md:text-[26px] text-[18px] text-[#65B6ED] font-bold">
          OTP Number
        </div>
        {error && (
          <div className="bg-red-400 text-white px-4 py-1 rounded my-4 text-[14px]">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="flex items-center w-5/5">
          <input
            type="text"
            placeholder="Enter OTP number ..."
            className="px-4 py-2 md:w-[40vw] w-[90vw] border border-[#65B6ED] rounded-lg focus:outline-none"
            value={formFields.otpnumber ?? ""}
            onChange={(e) => {
              if (error != null) {
                setError(null);
              }
              setFormFields({ otpnumber: e.target.value.toString() });
            }}
          />
        </div>
        <button className="px-4 py-2 border border-[#65B6ED] bg-white hover:bg-[#65B6ED] hover:text-white text-[#65B6ED] rounded-lg mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default OtpPage;
