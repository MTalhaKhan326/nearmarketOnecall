import { useCallback, useEffect, useState } from "react";
// import Footer from "../Footer";
// import Header from "../Header";
import VideoSection from "../../VideoSection";
import ReactModal from "react-modal";
import Header from "../../Header";
import Footer from "../../Footer";
import { AppImages } from "../../../Asset/images/image";
import Plot  from "../../Plot";
import Rent from "../../Rent";
import GalleriaHeader from "../../GalleriaHeader";
import GalleriaFooter from "../../GalleriaFooter";
import axios from "axios";
// import Header1 from "../../Header1";
// import Footer1 from "../../Footer1";

function GalleriaProperties({ onAppStoreClick = null, onGooglePlayClick = null }) {
  useEffect(() => {
    document.title = "Near Market :: Info";
  }, []);
  console.log("Plot",Plot);
  const[data, setData]= useState(Plot);
  const [data1, setData1] = useState(Rent);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openModal1 = useCallback(() => setIsOpen1(true), []);
  const closeModal1 = useCallback(() => setIsOpen1(false), []);
  let phone = "0327 5059283";
  const handleButtonClick = async(phone , id) => {
    try {
        console.log("id",id);
    const response = await axios.post(
      "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
      {
        tag: "gp_clicked_on_call_now",
        value: JSON.stringify({
          localTime: new Date(),
          link: window.location.href,
          customQueryId: id,
        }),
        decodeJson: "true",

        // Add more key-value pairs as needed
      }
    );

    console.log(response.data); // Handle the response data as desired
  } catch (error) {
    console.error(error); // Handle any errors that occur during the request
  }

    console.log("phoneee", phone);
    window.location.href = `tel:${phone}`;
  };
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
  const options = {
    googlePlayAppUrl:
      "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
    baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro",
  };
  useEffect(() => {
    document.title("Galleria Properties");
    const postData = async () => {
      try {
        const response = await axios.post(
          "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
          {
            tag: "gp_page_load",
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

    postData();
  }, []);
  return (
    <>
      {/* <Header1 /> */}
      <GalleriaHeader />
      <div className="border-b-[1px] border-[#707070]">
        <div className="text-[16px] font-semibold my-[7px] ml-[10px] text-[#2B2B2B] ">
          URGENTLY REQUIRED
        </div>
      </div>
      <div className="text-[11px] mt-[8px] text-right mr-[22px] text-[#535353]">
        PLOTS & HOUSES
      </div>
      {data.map((item, index) => (
        <div className="flex items-center justify-center my-2 ">
          <div className="bg-[#f4f4f4] w-[100%] flex flex-row mx-[12px] rounded-lg pl-[16.5px]">
            <div className="flex flex-col w-[67%] ">
              <div className="text-[15px]  text-[#535353] text-opacity-100 mt-[22px]">
                {item.title}
              </div>
              <div className="text-[10px] mt-[25px] text-opacity-80 mb-[8px] text-[#5C5C5C] ">
                {item.time}
              </div>
            </div>
            <div className="flex flex-row justify-between w-[33%] my-4">
              <button
                type="submit"
                className="bg-[#6ACB00] hover:bg-[#77d711] hover:text-white text-white text-[10px] w-[56px] h-[25px] mt-[17px] mx-[27.6px] border-[1.5px] py-[1.5px] rounded"
                onClick={() => handleButtonClick(item.phone, item.id)}
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="text-[11px] mt-[18px] text-right mr-[22px] text-[#535353]">
        RENTAL PROPERTIES
      </div>
      {data1.map((item, index) => (
        <div className="flex items-center justify-center my-2 ">
          <div className="bg-[#f4f4f4] w-[100%] flex flex-row mx-[12px] rounded-lg pl-[16.5px]">
            <div className="flex flex-col w-[67%] ">
              <div className="text-[15px]  text-[#535353] text-opacity-100 mt-[22px]">
                {item.title}
              </div>
              <div className="text-[15px]  text-[#535353] text-opacity-100 mt-[2px]">
                {item.title1}
              </div>
              <div className="text-[10px] mt-[22px] text-opacity-80 mb-[8px] text-[#5C5C5C] ">
                {item.time}
              </div>
            </div>
            <div className="flex flex-row justify-between w-[33%] my-4">
              <button
                type="submit"
                className="bg-[#6ACB00] hover:bg-[#77d711] hover:text-white text-white text-[10px] w-[56px] h-[25px] mt-[17px] mx-[27.6px] border-[1.5px] py-[1.5px] rounded"
                onClick={() => handleButtonClick(item.phone, item.id)}
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* <Footer1 /> */}
      <GalleriaFooter />
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
    </>
  );
}

export default GalleriaProperties;
