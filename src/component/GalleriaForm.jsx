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

// import './GalleriaForm.css' // Import the CSS file with the custom styles

const GalleriaForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [posted, setPosted] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [searchParams] = useSearchParams();
  const marker_id = searchParams.get("marker_id");
  const phoneNumber = searchParams.get("phoneNumber");
  const [formFields, setFormFields] = useState({
    size: "",
    type: "",
    location:"",
    message:""
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
  const onSubmit = async (e) => {
    
    setPosted(1);
    e.preventDefault();
    if (
      formFields.type &&
      formFields.size &&
      formFields.location &&
      formFields.message
    ) {
      // All required fields are filled, proceed with form submission
      console.log({
        type: formFields.type,
        size: formFields.size,
        location: formFields.location,
        message: formFields.message,
      });    setIsSubmitted(true);
       const data = [
         {
           type: "text",
           content: "i am looking for construction of type: " + formFields.type,
           meta: {
             constructionType: formFields.type,
           },
         },
         {
           type: "text",
           content: 'i need constructor for ' + formFields.type + " in " + formFields.location,
           meta: {
             location: formFields.location,
           },
         },
         {
           type: "text",
           content: "Size: " + formFields.size,
           meta: {
             size: formFields.size,
           },
         },
         {
           type: "text",
           content: formFields.type,
           meta: {
             plan: formFields.type,
           },
         },
       ];
       const result = await axios.post(
         "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/create-post?key=oc.fc8ab25facba44eb959939ad6d3f8c6a",
         {
           lat: location.latitude,
           lng: location.longitude,
           category: "construction",
           from: phoneNumber.substr(-12).replace(/\+/gi, ""),
           post_status: "pending",
           messages: JSON.stringify(data),
           tel_country_code: "92",
           radius: 10,
         }
       );
       if (result.data.status === 200) {
         window.location.reload();
       }
       else{
        console.log('Its meeeeeee')
        setError1(result.data.message)
         setPosted('');
       }
       console.log("result", result);
       setError("");
    } else {
      // If any required field is missing, show an error message or prevent submission
      setError('Please fill all required fields.');
     
      setIsSubmitted(false);
    }
  };
    // return;
    // const result = await axios.post(
    //   `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/galleria/post?post=${formFields.post}&id=${formFields.type}`
    // );
    // console.log("Resulttt",result)
    // setError(result.data.message);
    // setSubmitted(result.data.status);
    // if (result.status === 200) {
      // navigate("/submitted")
      // navigate("/galleria/t");
    // }
    // console.log("Submitted", submitted);
    // console.log("Resulttt", result.data, data);
    // console.log("search", formFields , location.latitude , location.longitude );
  // };
   const [selectedOption, setSelectedOption] = useState("");
   const [selectedOption1, setSelectedOption1] = useState("");
  //  const handleChange = (event) => {
  //    setSelectedOption(event.target.getAttribute("value"));
  //  };
   const handleCancel = () => {
     console.log("cancelllll");
     window.location.reload();
     
   };
const handleChange = (e) => {
  setSelectedOption(e.target.getAttribute("value"));
  setFormFields(() => ({
    ...formFields,
    type: e.target.getAttribute("value"),
  }));
   setIsSubmitted(false);
};
const handleChangelocation = (e) => {
  setSelectedOption1(e.target.getAttribute("value"));
  setFormFields(() => ({
    ...formFields,
    location: e.target.getAttribute("value"),
  }));
   setIsSubmitted(false);
};

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
          <div className="flex flex-wrap w-full">
            <div className=" w-full md:mt-5 md:mb-[20px] mt-1">
              <div>
                <div className="text-[16px] text-[#242424]">
                  What type of construction you are looking for
                </div>
                <div
                  id="propertyType"
                  className="w-full flex flex-row mt-[14px] rounded-md text-[11px]"
                  required
                >
                  <div
                    className={`flex-1 text-center py-2 w-[105px] border-[1px] rounded-md ${
                      selectedOption === "grey construction"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    value="grey construction"
                    onClick={handleChange}
                  >
                    Grey Construction
                  </div>
                  <div
                    className={`flex-1 text-center py-2 w-[105px] mx-2 border-[1px] rounded-md ${
                      selectedOption === "complete finishing"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    value="complete finishing"
                    onClick={handleChange}
                  >
                    Complete finishing
                  </div>
                  <div
                    className={`flex-1 text-center w-[105px] py-2 border-[1px] rounded-md ${
                      selectedOption === "renovation work" ? "bg-gray-200" : ""
                    }`}
                    value="renovation work"
                    onClick={handleChange}
                  >
                    Renovation Work
                  </div>
                </div>
                <div className="border-[1px] border-[#b7b4b4] mt-[14px] "></div>
                <div className="mt-[14px] text-[16px] text-[#242424]">
                  Location of your Plot/House
                </div>
                <div
                  id="property"
                  className="w-full flex flex-row rounded-md text-[10px] mt-[14px]"
                >
                  <div
                    className={`flex-1 text-center py-2 w-[40%] border-[1px] rounded-md ${
                      selectedOption1 === "Islamabad/Rawalpindi"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    value="Islamabad/Rawalpindi"
                    onClick={handleChangelocation}
                  >
                    Islamabad/Rawalpindi
                  </div>
                  <div
                    className={`flex-1 text-center py-2 w-[30%] mx-2 border-[1px] rounded-md ${
                      selectedOption1 === "Lahore" ? "bg-gray-200" : ""
                    }`}
                    value="Lahore"
                    onClick={handleChangelocation}
                  >
                    Lahore
                  </div>
                  <div
                    className={`flex-1 text-center w-[30%] py-2 border-[1px] rounded-md ${
                      selectedOption1 === "Others" ? "bg-gray-200" : ""
                    }`}
                    value="Others"
                    onClick={handleChangelocation}
                  >
                    Others
                  </div>
                </div>
                <div className="border-[1px] border-[#b7b4b4] mt-[14px] "></div>
                <div className="mt-[14px] text-[16px] text-[#242424]">
                  Your Plot Size in marlas
                </div>
                <input
                  type="number"
                  placeholder="Plot size in Marlas"
                  required
                  className="form-input text-[12px] border px-3 py-2 mt-[14px]
                  border-[#5e5954]
                  rounded-full
                  focus:outline-none
                  w-full "
                  onChange={(e) => {
                    setFormFields(() => ({
                      ...formFields,
                      size: e.target.value,
                    }));
                  }}
                />
                <div className="border-[1px] border-[#b7b4b4] mt-[14px] "></div>
                <div className="mt-[14px] text-[16px] text-[#242424]">
                  Are you having site and development plan
                </div>
                <input
                  type="text"
                  placeholder="Write your Message"
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
        {setError1 === "" ? (
          <div></div>
        ) : (
          <div className="font-semibold text-red-700">{error1}</div>
        )}
        {setError === "" ? (
          <div></div>
        ) : (
          <div className="font-semibold text-red-700">{error}</div>
        )}

        {/* {submitted === 500 ? (
          <div className="font-semibold text-red-700">{error}</div>
        ) : null} */}
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

export default GalleriaForm;
