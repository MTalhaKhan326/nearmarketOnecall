import { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { AppImages } from "../../../Asset/images/image";
import GalleriaHeader from "../../GalleriaHeader";
import GalleriaFooter from "../../GalleriaFooter";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import Loading from "../../basic/Loading.jsx";

function GalleriaProperties1() {
  const isDevEnv = false 
  const [searchParams] = useSearchParams()
  const marker_id = searchParams.get('marker_id')
  const query_id = searchParams.get('query_id')
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [errorFetchingData, setErrorFetchingData] = useState(null)
  const [showUnsubBtn, setShowUnsubBtn] = useState(true)
  const [isUnsubRequestInProgress, setIsUnsubRequestInProgress] = useState(false)
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  
   useEffect(() => {
    if(!marker_id && !query_id) {
      setErrorFetchingData({ message: 'Invalid url' })
    } else if(marker_id && query_id && !data) {
      setIsFetchingData(true)
      axios.get(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/oc92/get-query-details?query_id=${query_id}&marker_id=${marker_id}`).then(res => {
        if(res.data.status === 200) {
          setData(res.data.data)
          markLeadAsRead()
        } else {
          if(res.data.isOperationalError) {
            setErrorFetchingData({ message: 'Something went wrong' })
          } else {
            setErrorFetchingData({ message: res.data.message ?? 'Something went wrong' })
          }
        }
      }).finally(() => {
        setIsFetchingData(false)
      })
    }

    log('gp_page_load')
   }, [])
  
  
  const handleClickOnCallNow = (e) => {
    if(!data.query?.from) {
      return;
    }
    window.location.href = `tel:${data.query.from}`;
    log('gp_clicked_on_call_now', { phone: data?.query?.from })
  };
  async function handleClickOnUnsubscribe(e) {
    setIsUnsubRequestInProgress(true)
    log('gp_clicked_on_unsub_btn')
    setTimeout(() => {
      setShowUnsubBtn(false)
      setIsUnsubRequestInProgress(false)
      closeModal()
    }, 2000)
  }

  async function log(tag, value) {
    if(isDevEnv) return null 
    return axios.post("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log", {
      tag,
      value: JSON.stringify({
        ...value,
        localTime: new Date(),
        link: window.location.href,
        ref: 'gp-lead',
        marker_id,
        query_id 
      }),
      decodeJson: "true",
    })
  }

  async function markLeadAsRead() {
    return axios.post("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/mark-lead-as-read", {
      marker_id,
      query_id,
    })
  }

  return (
    <>
      <GalleriaHeader /> 
      <main>
        { 
          isFetchingData ? 
            <Loading /> : 
            errorFetchingData || !data ? 
            <Error message={errorFetchingData?.message ?? 'Something went wrong'} /> :
            <>
              <div className="flex flex-row justify-end w-full my-2">
                <button
                  className="bg-[#6ACB00] hover:bg-[#77d711] hover:text-white  text-white text-[10px] w-[56px] h-[25px] mt-[17px] mx-[27.6px] border-[1.5px] py-[1.5px] rounded"
                  onClick={handleClickOnCallNow}
                >
                  Call Now
                </button>
              </div>

              {/* messages wrapper */}
              {data.query.query_messages.map((message, index) => (
                <div key={'qm-' + index}>
                  <SingleQueryMessage message={message} date={data.query.createdAt} />
                </div>
              ))}


            </>
        }
      </main>
      <GalleriaFooter /> 
      { data?.query && data?.marker && showUnsubBtn &&
        <div>
          <div className="text-[11px] text-[#2b2b2b] mt-[6px] ml-2 ">I do not want to grown my business or not interested otherwise.</div>
          <div 
            className="text-center text-[#FF0202] font-semibold underline text-[14px] cursor-pointer"
            onClick={e => openModal()}
          >Unsubscribe</div>
        </div>
      }

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
            Are you sure you want to Unsubscribe Galleria Properties ?
          </div>
          <div className="flex flex-row justify-between">
            {/* <div className="flex items-center justify-center">OK</div> */}
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] w-[47%] hover:text-white mt-3 text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
              onClick={handleClickOnUnsubscribe}
              disabled={isUnsubRequestInProgress}
            >
              { isUnsubRequestInProgress ? <img src={AppImages.loading} className="w-[20px] mx-auto" /> : <span>Unsubscribe</span> }
            </button>
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white mt-3 w-[47%] text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
              onClick={e => closeModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  )
}

function Error({ message }) {
  return (
    <div className="relative h-[200px]">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <span className="text-red-600 font-bold">Error: </span>
        <span className="text-red-400">{message}</span>
      </div>
    </div>
  )
}

function SingleQueryMessage({ message, date }) {
  let content = ""
  switch(message.type) {
    case "text":
      content = <div className="text-[15px] text-[#535353] text-opacity-100">{message.content}</div>
    break;
    case "image":
      content = <div><img src={message.content} alt="lead image" className="max-h-[100px]" /></div>
    break;
    case "audio":
      content = <div>
        <audio src={message.content} controls></audio>
      </div>
    break;
    case "video":
      content = <div>
        <video src={message.content}></video>
      </div>
    break;
    default: 
      content = <></>
  }

  return (
    <div className="bg-[#f4f4f4] rounded-lg mb-2 mx-4 py-4 px-2">
      {content}
      
      <div className="text-[10px] mt-[25px] text-opacity-80 mb-[8px] text-[#5C5C5C] ">
        {moment(date).format("MMMM D, YYYY h:mm A")}
      </div>
    </div>
  )
}

export default GalleriaProperties1;
