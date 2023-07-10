import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ShareMyNumber from "../../components/BroadcastConfirmationModel/ShareMyNumber"
import MenuButton from "../../components/Messages/MenuButton"
import QueryHeaderBackButton from "../../components/Messages/QueryHeaderBackButton"
import { formatDatetime, ucFirst } from "../../helpers/basicHelpers"
import MessageBox from "../../components/MessageBox"
import { broadcastThunks, DRAFT_QUERY_STATUS, openProgressModal, setDraftQueryStatus, setIsProgressCompleted } from "../../reducers/broadcastSlice"
import BroadcastSliderModal from "../../components/BroadcastSlider/BroadcastSliderModal"
import { setRequests } from "../../reducers/messagesSlice"

function DraftRequestPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const { isProgressModalEnabled, isProgressCompleted, draftQueryStatus } = useSelector(state => state.broadcast)
  const location = useLocation()
  const [request, setRequest] = useState(location.state?.request ?? null)
  const [progressInterval, setProgressInterval] = useState(250)
  

  const [messageItems, setMessageItems] = useState(request && request.queryMessages ? request.queryMessages : [])
  
  const handleClickOnSubmitBtn = e => {
    dispatch(broadcastThunks.broadcastDraftQuery({queryId: request.id, messageItems: messageItems}))
  }

  useEffect(() => {
    if(draftQueryStatus === DRAFT_QUERY_STATUS.PROCESSING) {
      dispatch(openProgressModal())
    }

    if(draftQueryStatus === DRAFT_QUERY_STATUS.SUCCESS) {
      setProgressInterval(10)
    }

    if(draftQueryStatus === DRAFT_QUERY_STATUS.SUCCESS || draftQueryStatus === DRAFT_QUERY_STATUS.ERROR) {
      dispatch(setDraftQueryStatus(DRAFT_QUERY_STATUS.IDLE))
    }
  }, [draftQueryStatus])

  

  useEffect(() => {
    if(isProgressCompleted) {
      navigate("/messages/Requests/All")
      dispatch(setIsProgressCompleted(false))
      dispatch(setRequests([]))
    }
  }, [isProgressCompleted])

  return (
    <>
      <div className="relative">
        
      

        <div className="p-4">
          <div className="semi-bold-font my-1">Me</div>
          <div className="mb-[145px]">
            {messageItems && messageItems.map(item => (
              <div key={item.id} className="my-3">
                {((item.type.toLowerCase() === 'text') && (
                  <div>{item.content}</div>
                )) 
                ||
                (item.type.toLowerCase() === "image" && (
                  <div>
                    <img
                      src={item.content}
                      alt="Image"
                      className=" rounded-md object-cover mb-2"
                    />
                  </div>
                )) 
                ||
                (item.type.toLowerCase() === "audio" && (
                  <div className="mb-2">
                    <audio controls className="w-full">
                      <source src={item.content} type="audio/mpeg" />
                    </audio>
                  </div>
                )) 
                ||
                (item.type.toLowerCase() === "video" && (
                  <div>
                    <video
                      controls
                      className="mb-2 rounded-md w-full h-[150px]"
                    >
                      <source src={item.content} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div id="footer" className="min-h-[55px] w-[100%] fixed bottom-0 left-0 p-4 bg-white">
          <div className="flex justify-end">
            <button 
              className="border border-gray-600 bg-gray-500 px-4 py-2 text-center text-sm rounded text-white mt-2 mb-4 noSelect"
              onClick={handleClickOnSubmitBtn}
            >
              I have completed my request
            </button>
          </div>
          <MessageBox
            onTextSend={message => {
              message && message.length > 0 && setMessageItems(items => [...items, { id: messageItems.length + 1, content: message, queryId: request.id, type: 'text' }])
            }}
            onImageChange={file => {
              file && setMessageItems(items => [...items, { id: messageItems.length + 1, content: URL.createObjectURL(file), queryId: request.id, type: 'image' }])
            }}
            onAudioMessage={url => {
              url && setMessageItems(items => [...items, { id: messageItems.length + 1, content: url, queryId: request.id, type: 'audio' }])
            }}
          />
        </div>
      </div>
      {isProgressModalEnabled && <BroadcastSliderModal progressInterval={progressInterval} />}
    </>
  )
}

export default DraftRequestPage