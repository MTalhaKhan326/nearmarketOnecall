import { useState } from "react";
import ReactModal from "react-modal";
import { AppImages } from "../../../Asset/images/image.js";
import CallNowButton from "./CallNowButton.jsx";
import { convertMongoDateToReadable } from "../../../utils/helpers.js";

function LeadViewModal({ lead, isModalOpen = false, setIsModalOpen = () => {} }) {
  const options = {
    googlePlayAppUrl: "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
    baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro"
  }
  return (  
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={setIsModalOpen}
      style={{
        content: {
          borderRadius: "10px",
          height: "50vh",
          minWidth: "80vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: 'translate(-50%, -50%)'
          // maxHeight: "80vh",
          // marginTop: "130px",
          // Set the desired height here
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity and color as needed
        },
      }}
    >
      {lead.from && <div className="flex justify-end"><CallNowButton phone={lead.from} /></div>}
      <ul className="h-[60%] overflow-y-auto">
        { lead.query_messages?.length && lead.query_messages.map((query_message, index) => (
          <li key={"single-qm-" + index}>
            {query_message.type === 'text' && <div className="flex items-center justify-center">
              <div className=" w-full flex flex-row mx-1 my-2 rounded px-1">
                <div className="flex flex-col">
                  <div className="text-[11px] mb-4 text-[#535353]">
                    {query_message.content}
                  </div>
                  {/* <div className="text-[10px] text-[#5c5c5c] font-semibold">
                    {convertMongoDateToReadable(query_message.createdAt)}
                  </div> */}
                </div>
              </div>
            </div>}
          </li>
        )) }
      </ul>
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
                // onClick={onGooglePlayClick}
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
                // onClick={onAppStoreClick}
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
  );
}

export default LeadViewModal;