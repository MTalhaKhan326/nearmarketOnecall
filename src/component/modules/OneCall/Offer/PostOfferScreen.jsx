import { MdArrowBack, MdArrowBackIos, MdHdrPlus, MdImage, MdLocalOffer, MdMic, MdOutlineFilterFrames, MdWorkOutline } from "react-icons/md";
import { SingleAudioMessage, SingleImageMessage, SingleTextMessage } from "./MessageItems.jsx";
import { BiPen, BiPencil, BiPlus, BiSolidOffer, BiSolidPencil } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { BsPlus, BsPlusCircle } from "react-icons/bs";
import { RiPencilLine } from "react-icons/ri";
import { useContext } from "react";
import { CreateOfferContext, MessageTypes } from "./CreateOfferContext.jsx";

function PostOfferScreen() {
  const offerCtx = useContext(CreateOfferContext)

  const dateTime = new Date()
  return (  
    
    <div className="m-0 h-screen bg-slate-100">
      <div className="h-[70%] p-2">
        <div className="bg-white h-full p-2 box-border border-2 rounded-lg relative">
          <div className="absolute top-1 left-0 h-[88%]  w-full rounded-lg">
            {/* <div className="relative h-full w-full">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
                <div className="flex items-center justify-center">
                  <div className="bg-gray-50 p-6 rounded-full">
                    <BiSolidOffer size="50" color="#777" />
                  </div>
                </div>
                <p className="text-center text-gray-500 mx-4 mb-4 bg-gray-50 p-4 rounded-full">Create your offer here</p>
              </div>
            </div> */}
            <div className="flex flex-col items-end p-2 h-full overflow-y-auto  overflow-x-hidden">
              {offerCtx.messages?.map((msg) => {
                switch(msg.type) {
                  case MessageTypes.TEXT:
                    return <SingleTextMessage text={msg.content} date={msg.date} messageId={msg.id} dateTime={msg.date} onClick={() => offerCtx.removeMessage(msg.id)} />
                  
                  case MessageTypes.IMAGE:
                    return <SingleImageMessage imageUrl={msg.content} imageFile={msg.file} date={msg.date} messageId={msg.id} dateTime={msg.date} />
                  
                  default: 
                    return <></>
                }
              })}
              {/* <SingleTextMessage 
                text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ut?"}
                dateTime={'Sep 23, 2023'} 
              />
              <SingleImageMessage 
                imageUrl={"https://images.pexels.com/photos/18103235/pexels-photo-18103235/free-photo-of-a-bull-beside-a-road-sign.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"}
                dateTime={dateTime}
              />
              <SingleAudioMessage 
                audioUrl={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"}
              /> */}
            </div>
          </div>
          <div className="absolute bottom-1 left-0 h-[10%] w-full border-[1px] border-gray-100 rounded-full bg-slate-50">
            <div className="flex justify-between items-center h-full gap-2">
              {/* <div className="pl-2">
                <BsPlusCircle size="25" color="#444" className="" />
              </div> */}
              <div className="flex-[0_0_70%]">
                <input 
                  type="text"
                  className="w-full bg-transparent h-full box-border px-2 mx-2 outline-none"
                  placeholder="Type your message here"
                  onKeyDown={e => {
                    if(e.key === 'Enter' && e.target.value?.length) {
                      if(e.target.value?.trim().length) {
                        offerCtx.addTextMessage(e.target.value)
                      }
                      e.target.value = ""
                    } 
                  }}
                />
              </div>
              <div className="flex-[0_0_25%] flex gap-2">
                <div className="bg-gray-200 p-1 rounded-full">
                  <MdImage size="30" color="#444" />
                </div>
                <div className="bg-gray-200 p-1 rounded-full">
                  <MdMic size="30" color="#444" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-[25%] bg-yellow-200 p-2">
        <div className="border-2 h-full bg-white w-full rounded-lg">

        </div>
      </div> */}
      <div className="h-[20%] ">
        
      </div>
      <div className="h-[10%] bg-white p-2 border-t-2 border-slate-100">
        <div className="flex items-center justify-between h-full">
          <button className="px-6 py-2 focus:outline-none active:bg-none">Go Back</button>
          <button className="bg-blue text-white px-6 py-2 rounded-lg shadow-lg focus:outline-none active:bg-green-300">Post Offer</button>
        </div>
      </div>
    </div>
  );
}

export default PostOfferScreen;