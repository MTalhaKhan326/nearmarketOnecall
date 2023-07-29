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
import { useNavigate, useSearchParams } from "react-router-dom";
import GalleriaHeader from "./GalleriaHeader";
import GalleriaFooter from "./GalleriaFooter";
import Footer1 from "./Footer1";
import { useCallback } from "react";
import ReactModal from "react-modal";
// import { allCountries } from "country-telephone-data";
// import "react-flags-select/css/react-flags-select.css";

// import './PreFabricated.css' // Import the CSS file with the custom styles

const PreFabricated = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [posted, setPosted] = useState("");
  const [searchParams] = useSearchParams();
  // const marker_id = searchParams.get("marker_id");
  const phoneNumber = searchParams.get("phoneNumber");
  console.log("numberrrrrrr", phoneNumber.substr(-12).replace(/\+/gi, ""));
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    message: "",
    type: "",
    location: ""
  });
  //  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isOpen1, setIsOpen1] = useState(false);

  const openModal1 = useCallback(() => setIsOpen1(true), []);
  const closeModal1 = useCallback(() => setIsOpen1(false), []);
  const handleButton1Click = async () => {
    openModal1();
    try {
      //   console.log("id", id);
      const response = await axios.post(
        "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
        {
          tag: "gp_clicked_on_unsub_btn",
          value: JSON.stringify({
            localTime: new Date(),
            link: window.location.href,
          }),
          decodeJson: "true",
        }
      );

      console.log(response.data); // Handle the response data as desired
    } catch (error) {
      console.error(error); // Handle any errors that occur during the request
    }
  };
  useEffect(() => {
    document.title = "OneCall";
  }, []);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  const handleCancel = () => {
    
    console.log("cancelllll")
    window.location.reload();
    // setFormFields({
    //   message: null,
    //   type: null,
    //   location: null,
    // });
  };
  const onSubmit = async (e) => {
    setPosted(1);
    e.preventDefault();
    if (
      formFields.type &&
      formFields.message &&
      formFields.location
    ) {
      // All required fields are filled, proceed with form submission
      console.log({
        type: formFields.type,
        size: formFields.message,
        location: formFields.location
      });
      setIsSubmitted(true);
        // const data = {
        //   //  email: formFields.email,
        //   phone: phoneNumber.replace("+", "").slice(2),
        //   tel_country_code: phoneNumber.replace("+", "").slice(0, 2),
        //   name: formFields.name,
        //   lat: location.latitude,
        //   lng: location.longitude,
        //   // tag: "employer",
        //   //  company_name: formFields.company_name,
        //   //  gender: formFields.gender,
        //   city: formFields.location,
        //   description: formFields.message,
        //   //  est_salary: formFields.est_salary,
        // };
        // console.log("Dataaaa",data)
        // return;
        const data = [
    {
      type: 'text',
      content: 'i need shed/pre-fabricated structure for ' + formFields.type + " in " + formFields.location,
      meta: {
        for: formFields.type,
        location:formFields.location,
      }
    },
    {
      type: 'text',
      content: 'Size of shed/pre-fab structure: ' + formFields.message +'meters',
      meta: {
        size: formFields.message
      }
    }
  ];
           const result = await axios.post(
             "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/create-post?key=oc.fc8ab25facba44eb959939ad6d3f8c6a",
             {
               lat: location.latitude,
               lng: location.longitude,
               category: "pre fabricated shed",
               from: phoneNumber.substr(-12).replace(/\+/gi, ""),
               post_status: 'pending',
               messages: JSON.stringify(data),
               tel_country_code: "92",
               radius: 10,
             }
           );
           if(result.status === 200){
            window.location.reload();
           }
            if (result.data.status === 200) {
              window.location.reload();
            } else {
              console.log("Its meeeeeee");
              setError(result.data.message);
              setPosted("");
            }
        console.log("result", result);
      setError("");
    } else {
      // If any required field is missing, show an error message or prevent submission
      setError("Please fill all required fields.");
      setIsSubmitted(false);
    }
  };
  
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  //  const handleChange = (event) => {
  //    setSelectedOption(event.target.getAttribute("value"));
  //  };
  const handleChange = (e) => {
    setSelectedOption(e.target.getAttribute("value"));
    setFormFields(() => ({
      ...formFields,
      type: e.target.getAttribute("value"),
    }));
    setIsSubmitted(false);
  };
//   const handleChangelocation = (e) => {
//     setSelectedOption1(e.target.getAttribute("value"));
//     setFormFields(() => ({
//       ...formFields,
//       location: e.target.getAttribute("value"),
//     }));
//     setIsSubmitted(false);
//   };

  return (
    <div>
      <div className="block md:hidden">{/* <Header /> */}</div>
      <div className="hidden md:block">{/* <WebHeader1 /> */}</div>
      <WebHeader1 />
      <div className="flex flex-col items-center w-[full]">
        {/* <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Post a <span className="font-bold">Property</span>
        </div> */}
        <form
          onSubmit={onSubmit}
          className="text-[#75747c]  mt-[15px] text-[20px] w-[90%] md:w-[50%] mx-auto"
        >
          <div className="flex  w-full">
            <div className=" w-full md:mt-5 md:mb-[20px] mt-1">
              <div>
                <div className="text-[16px] text-[#242424]">
                  Your require shed/pre-fabricated structure for
                </div>
                <div
                  id="propertyType"
                  className="w-full flex flex-col mt-[14px] rounded-md text-[11px]"
                  required
                >
                  <div className="flex flex-row">
                    <div
                      className={`flex-1 text-center py-2 w-[30%] border-[1px] rounded-md ${
                        selectedOption === "car parking" ? "bg-gray-200" : ""
                      }`}
                      value="car parking"
                      onClick={handleChange}
                    >
                      Car Parking
                    </div>
                    <div
                      className={`flex-1 text-center py-2 w-[30%] mx-2 border-[1px] rounded-md ${
                        selectedOption === "dairy/PoultryFarming"
                          ? "bg-gray-200"
                          : ""
                      }`}
                      value="dairy/PoultryFarming"
                      onClick={handleChange}
                    >
                      Dairy/Poultry Farming
                    </div>
                  </div>
                  <div className="flex flex-row mt-3">
                    <div
                      className={`flex-1 text-center py-2 w-[30%] border-[1px] rounded-md ${
                        selectedOption === "living/office" ? "bg-gray-200" : ""
                      }`}
                      value="living/office"
                      onClick={handleChange}
                    >
                      living/Office
                    </div>
                    <div
                      className={`flex-1 text-center py-2 w-[30%] mx-2 border-[1px] rounded-md ${
                        selectedOption === "Others" ? "bg-gray-200" : ""
                      }`}
                      value="Others"
                      onClick={handleChange}
                    >
                      Others
                    </div>
                  </div>
                </div>

                <div className="border-[1px] border-[#b7b4b4] mt-[14px] "></div>
                <div className="mt-[14px] text-[16px] text-[#242424]">
                  Location
                </div>
                <input
                  type="text"
                  placeholder="Location here"
                  required
                  className="form-input text-[12px] border px-3 py-2 mt-[14px]
                  border-[#5e5954]
                  rounded-full
                  focus:outline-none
                  w-full "
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      location: e.target.value,
                    }));
                  }}
                />
                <div className="border-[1px] border-[#b7b4b4] mt-[14px] "></div>
                <div className="mt-[14px] text-[16px] text-[#242424]">
                  Size of the shed/pre-feb stucture
                </div>
                <input
                  type="number"
                  placeholder="Enter Size in meters"
                  required
                  className="form-input border px-3 text-[12px] py-2 mt-[14px]
                  border-[#5e5954]
                  rounded-full
                  focus:outline-none
                  w-full "
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      message: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between text-[14px] md:text-[19px]">
            <div
              className="my-5 text-black cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </div>
            {posted === 1 ? (
              <div className="text-[20px] font-bold my-5">loading....</div>
            ) : (
              <div>
                <button className="form-button rounded-md my-5 md:text-[17px] text-[14px] py-1 px-2 w-[80px] md:px-2 md:w-[130px] md:h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white">
                  Publish
                </button>
              </div>
            )}
          </div>
        </form>
        <div className="font-semibold text-red-700">{error}</div>
        {submitted === 500 ? (
          <div className="font-semibold text-red-700">{error}</div>
        ) : null}
      </div>
      <div className="border-[1px] border-[#b7b4b4] mt-[14px] mb-[8px] "></div>
      <Footer1 />
      <div className="text-[11px] text-[#2b2b2b] mt-[6px] ml-2 ">
        I do not want to grown my business or not interested otherwise.
      </div>
      <div className=" flex flex-col items-center justify-center">
        <div
          className="text-[#FF0202] font-semibold underline text-[14px] cursor-pointer"
          //   onClick={openModal1}
          onClick={() => handleButton1Click()}
        >
          Unsubscribe
        </div>
      </div>
      <ReactModal
        isOpen={isOpen1}
        onRequestClose={closeModal1}
        style={{
          content: {
            borderRadius: "10px",
            height: "180px",
            marginTop: "180px",
            // Set the desired height here
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity and color as needed
          },
        }}
      >
        <div className="flex flex-col">
          <div className="text-[#2b2b2b] flex justify-center text-center text-[20px] mt-2 font-bold">
            Confirmation !
          </div>
          <div className="text-[#2b2b2b] text-[14px] ml-2 mt-4 font-semibold">
            Are you sure you want to Unsubscribe Galleria Properties ?
          </div>
          <div className="flex flex-row justify-between">
            {/* <div className="flex items-center justify-center">OK</div> */}
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] w-[47%] hover:text-white mt-3 text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
              onClick={closeModal1}
            >
              Unsubscribe
            </button>
            {/* <div className="flex items-center justify-center">Cancel</div> */}
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white mt-3 w-[47%] text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
              onClick={closeModal1}
            >
              Cancel
            </button>
          </div>
        </div>
        <div></div>

        {/* </div> */}
        {/* <input type="button" value="Close modal" onClick={closeModal} /> */}
      </ReactModal>
    </div>
  );
};

export default PreFabricated;
