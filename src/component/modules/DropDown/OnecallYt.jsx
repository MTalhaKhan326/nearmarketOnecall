import { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { AppImages } from "../../../Asset/images/image";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import Loading from "../../basic/Loading.jsx";
import WebHeader1 from "../../WebHeader1";
import Footer1 from "../../Footer1";
import ModalImage from "react-modal-image";
import Iframe from "../../basic/Iframe";

function OnecallYt() {
  const isDevEnv = false;
  const [searchParams] = useSearchParams();
  const marker_id = searchParams.get("marker_id");
  const query_id = searchParams.get("query_id");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errorFetchingData, setErrorFetchingData] = useState(null);
  const [showUnsubBtn, setShowUnsubBtn] = useState(true);
  const [isUnsubRequestInProgress, setIsUnsubRequestInProgress] =
    useState(false);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.title = "OneCall";
  }, []);
 
 useEffect(() => {
   log("oc_offer_page_load_youtubeVideoes");
 }, []);
 
  async function handleClickOnUnsubscribe(e) {
    setIsUnsubRequestInProgress(true);
    
    setTimeout(() => {
      setShowUnsubBtn(false);
      setIsUnsubRequestInProgress(false);
      closeModal();
    }, 2000);
  }
  async function log(tag, value) {
    return axios.post(
      "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
      {
        tag,
        value: JSON.stringify({
          ...value,
          localTime: new Date(),
          link: window.location.href,
        }),
        decodeJson: "true",
      }
    );
  }
 const redirectToWhatsApp = (message) => {
   const phoneNumber = "923095557566";
   const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
     message
   )}`;
   log("oc_clicked_on_whatsapp_btn_youtubeVideoes", {
     phone: phoneNumber,
     url,
     message,
   });
   window.location.href = url;
 };
 
const videos = [
  {
    id: 1,
    title: "How to use One Call App?",
    url: "https://www.youtube.com/embed/Hy6mY8eQEKk",
  },
  {
    id: 2,
    title: "No More Interview for USA VISA?",
    url: "https://www.youtube.com/embed/k0lvm8h5IAo",
  },
  {
    id: 3,
    title: "How to Plan your trip?",
    url: "https://www.youtube.com/embed/UbPols2QCnw",
  },
  {
    id: 4,
    title: "B1/B2 USA VISA?",
    url: "https://www.youtube.com/embed/1JDp1kLF5R8",
  },
  {
    id: 5,
    title: "USA VISA Interview?",
    url: "https://www.youtube.com/embed/Oex6SryukWw",
  },
  {
    id: 6,
    title: "USA VISA Fee Increase?",
    url: "https://www.youtube.com/embed/vDA68d6OGFg",
  },
];
  return (
    <>
      <WebHeader1 />
      <main>
        {videos.map((video, index) => (
          <div key={index}>
            <div>
              {/* <span className="px-5 text-[15px]">{video.title}</span> */}
              <Iframe
                videoUrl={video.url}
                props={{
                  allow:
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  // allowfullscreen: 'allowFullScreen'
                }}
              />
            </div>
            <div className="flex justify-end color ">
              {/*onClick*/}
              <div
                className="mt-[3%] bg-[#59e759] hover:bg-[#3e873e] flex flex-row w-[35%] h-[40px] mx-3 cursor-pointer py-[12px] text-white text-center rounded-md"
                onClick={() => redirectToWhatsApp("")}
              >
                <div className="w-[30%] pl-1">
                  <img
                    src={AppImages.whatsappIcon}
                    className="pl-2 h-full flex justify-center"
                    alt=""
                    srcset=""
                  />
                </div>

                <div className="w-[70%] text-left font-bold text-[12px] pr-2">
                  Contact NOW
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <Footer1 />
      {/* {data?.query && data?.marker && showUnsubBtn && ( */}
      <div>
        <div className="text-[11px] text-[#2b2b2b] mt-[6px] ml-2 ">
          I do not want to grown my business or not interested otherwise.
        </div>
        <div
          className="text-center text-[#FF0202] font-semibold underline text-[14px] cursor-pointer"
          onClick={(e) => openModal()}
        >
          Unsubscribe
        </div>
      </div>
      {/* )} */}

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            borderRadius: "10px",
            height: "180px",
            marginTop: "180px",
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
            Are you sure you want to Unsubscribe OneCall App ?
          </div>
          <div className="flex flex-row justify-between">
            {/* <div className="flex items-center justify-center">OK</div> */}
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] w-[47%] hover:text-white mt-3 text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
              onClick={handleClickOnUnsubscribe}
              disabled={isUnsubRequestInProgress}
            >
              {isUnsubRequestInProgress ? (
                <img src={AppImages.loading} className="w-[20px] mx-auto" />
              ) : (
                <span>Unsubscribe</span>
              )}
            </button>
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white mt-3 w-[47%] text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
              onClick={(e) => closeModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

function Error({ message }) {
  return (
    <div className="relative h-[200px]">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <span className="text-red-600 font-bold">Error: </span>
        <span className="text-red-400">{message}</span>
      </div>
    </div>
  );
}

function SingleQueryMessage({ message, date }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  let content = "";
  switch (message.type) {
    case "text":
      content = (
        <div className="text-[15px] text-[#535353] text-opacity-100">
          {message.content}
        </div>
      );
      break;
    case "image":
      content = (
        <div>
          <ModalImage
            className="h-[100px]"
            small={message.content}
            large={message.content}
            onClose={handleModalClose}
            isOpen={isModalOpen}
            hideDownload={true}
          />
        </div>
      );
      break;
    case "audio":
      content = (
        <div>
          <audio src={message.content} controls></audio>
        </div>
      );
      break;
    case "video":
      content = (
        <div>
          <video src={message.content}></video>
        </div>
      );
      break;
    default:
      content = <></>;
  }

  return (
    <div className="bg-[#f4f4f4] rounded-lg mb-2 mx-4 py-4 px-2">
      {content}

      <div className="text-[10px] mt-[25px] text-opacity-80 mb-[8px] text-[#5C5C5C] ">
        {moment(date).format("MMMM D, YYYY h:mm A")}
      </div>
    </div>
  );
}

export default OnecallYt;
