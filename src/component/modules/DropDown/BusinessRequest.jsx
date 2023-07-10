import { useCallback, useEffect, useState } from "react";
// import Footer from "../Footer";
// import Header from "../Header";
import VideoSection from "../../VideoSection";
import ReactModal from "react-modal";
import Header from "../../Header";
import Footer from "../../Footer";
import { AppImages } from "../../../Asset/images/image";
// import Header1 from "../../Header1";
// import Footer1 from "../../Footer1";


function BusinessRequest({ onAppStoreClick = null, onGooglePlayClick = null }) {
  useEffect(() => {
    document.title = "Near Market :: Info";
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openModal1 = useCallback(() => setIsOpen1(true), []);
  const closeModal1 = useCallback(() => setIsOpen1(false), []);
  let phone = '0327 5059283'
   const handleButtonClick = (phone) => {
     console.log("phoneee", phone);
     window.location.href = `tel:${phone}`;
   };
  const options = {
    googlePlayAppUrl:
      "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
    baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro",
  };
  return (
    <>
      {/* <Header1 /> */}
      <Header />
      <div className="flex flex-row justify-between border-b-[1.5px] border-b-[#707070] px-4">
        <div className="flex flex-col mb-6 mt-2">
          <div className="font-semibold text-[16px] text-[#2b2b2b]">
            ABC AC Services
          </div>
          <div className="text-[10px]  text-[#555555]">+44 1234 2342 234</div>
        </div>
        <div className="flex flex-col mt-2">
          <div className=" text-[10px] text-[#919191] text-right">
            Last 24 hours
          </div>
          <div className=" text-[15px] text-[#535353]">AC Services</div>
          <div className=" text-[11px] text-[#535353]">
            Customers Request : 18
          </div>
        </div>
      </div>
      <div className="my-4 px-2">
        <VideoSection videoUrl={"https://www.youtube.com/embed/aoyl9JSoE2k"} />
      </div>
      <div className="flex flex-col border-b-[1.5px] border-b-[#707070] px-2 my-3 ">
        <div className="font-semibold text-[16px] text-[#2b2b2b]">
          Customer Requests (18){" "}
        </div>
        <div className="text-[10px] mb-2 text-[#919191]">
          {" "}
          Download One Call app to view all requests{" "}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-[#f4f4f4] w-[100%] flex flex-row mx-2 my-2 rounded-lg px-2">
          <div className="flex flex-col w-[67%] my-4">
            <div className="text-[11px] mb-4 text-[#535353]">
              Gas Refill ka charges kitna hain ?
            </div>
            <div className="text-[10px] text-[#5C5C5C]">
              3:22 PM 19 June, 2023
            </div>
          </div>
          <div className="flex flex-row justify-between w-[33%] my-4">
            <div>
              <button
                type="submit"
                className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white mt-3 text-[#363636] text-[12px] border-[1.5px] border-[#707070] font-semibold py-[1px] px-4 rounded"
                onClick={openModal}
              >
                View
              </button>
            </div>
            <div>
              <div
                className="rounded-full bg-[#6acb00] ml-2 w-9 h-9 mt-1 cursor-pointer"
                // onClick={openModal}
                onClick={() => handleButtonClick(phone)}
              >
                <img
                  src={AppImages.phone}
                  alt=""
                  srcset=""
                  className="rounded-full w-[60%] ml-[6px]  pt-2 text-[#f4f4f4]"
                  style={{ filter: "brightness(5) invert(1)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-[#f4f4f4] w-[100%] flex flex-row mx-2 my-2 rounded-lg px-2">
          <div className="flex flex-col w-[67%] my-4">
            <div className="text-[11px]  mb-4 text-[#535353]">
              Gas Refill ka charges kitna hain ?
            </div>
            <div className="text-[10px] text-[#5C5C5C]">
              3:22 PM 19 June, 2023
            </div>
          </div>
          <div className="flex flex-row justify-between w-[33%] my-4">
            <div>
              <button
                type="submit"
                className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white mt-3 text-[#363636] text-[12px] border-[1.5px] border-[#707070] font-semibold py-[1px] px-4 rounded"
                onClick={openModal}
              >
                View
              </button>
            </div>
            <div>
              <div
                className="rounded-full bg-[#6acb00] ml-2 w-9 h-9 mt-1 cursor-pointer"
                // onClick={openModal}
                onClick={() => handleButtonClick(phone)}
              >
                <img
                  src={AppImages.phone}
                  alt=""
                  srcset=""
                  className="rounded-full w-[60%] ml-[6px]  pt-2 text-[#f4f4f4]"
                  style={{ filter: "brightness(5) invert(1)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer1 /> */}
      <Footer />
      <div className=" flex flex-col items-center justify-center">
        <div className="text-[11px] text-[#2b2b2b] mt-[22px] ml-2 ">
          I do not want to grown my business or not interested otherwise.
        </div>
        <div
          className="text-[#FF0202] font-semibold underline text-[14px] cursor-pointer"
          onClick={openModal1}
        >
          Unsubscribe
        </div>
      </div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            borderRadius: "10px",
            height: "300px",
            marginTop: "130px",
            // Set the desired height here
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity and color as needed
          },
        }}
      >
        <div className="flex items-center justify-center">
          <div className=" w-full flex flex-row mx-1 my-2 rounded px-1">
            <div className="flex flex-col w-[85%] mt-5 mb-[22px]">
              <div className="text-[11px] mb-4 text-[#535353]">
                Gas Refill ka charges kitna hain ?
              </div>
              <div className="text-[10px] text-[#5c5c5c] font-semibold">
                3:22 PM 19 June, 2023
              </div>
            </div>
            <div className="flex flex-row justify-between w-[15%] my-4">
              {/* <div>
                <button
                  type="submit"
                  className="bg-gray-200 hover:bg-[#9c9a9a] hover:text-white mt-1 text-[black] text-[14px] border-[2px] border-[#9c9a9a] font-semibold py-[1px] px-4 rounded"
                >
                  View
                </button>
              </div> */}
              <div>
                <div
                  className="rounded-full mt-1 bg-[#6acb00] w-9 h-9 cursor-pointer"
                  onClick={() => handleButtonClick(phone)}
                >
                  <img
                    src={AppImages.phone}
                    alt=""
                    srcset=""
                    className="rounded-full w-[60%] ml-[6px]  pt-2 text-white"
                    style={{ filter: "brightness(5) invert(1)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" flex flex-col items-center justify-center"> */}
        <div className="text-[#2b2b2b] text-[14px] ml-2 font-semibold">
          {" "}
          Download Now
        </div>
        <div className=" flex flex-col items-center justify-center my-[22px]">
          <div className=" block md:flex justify-center items-center pb-[7px] font-medium text-[14px] text-center">
            <div className="flex justify-center">
              <div className="m-1">
                <a
                  href={options.googlePlayAppUrl}
                  rel="noreferrer"
                  target="_blank"
                  onClick={onGooglePlayClick}
                >
                  <img
                    src={AppImages.googlePlay}
                    alt=""
                    className="w-[130px]"
                  />
                </a>
              </div>
              <div className="m-1">
                <a
                  href={options.appStoreAppUrl}
                  rel="noreferrer"
                  target="_blank"
                  onClick={onAppStoreClick}
                >
                  <img src={AppImages.apple} className="w-[125px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-[#2b2b2b] ml-2 font-semibold">
          By accepting this lead you also agree with One Call{" "}
          <span className="text-[#0000ff]">user acceptance policy</span> and{" "}
          <span className="text-[#0000ff]">terms & conditions</span>
        </div>
        {/* </div> */}
        {/* <input type="button" value="Close modal" onClick={closeModal} /> */}
      </ReactModal>
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
            Are you sure you want to Unsubscribe One Call App ?
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

export default BusinessRequest;
