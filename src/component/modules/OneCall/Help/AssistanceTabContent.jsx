import { AppImages } from "../../../../Asset/images/image.js";
import Iframe from "../../../basic/Iframe.jsx";
// import BankAccountDetail from "./BankAccountDetail.jsx";

function AssistanceTabContent() {
    // const accounts = [
    //     {
    //       id: 1,
    //       title: "NODE0 COMPUTING",
    //       accNo: "02570104987755",
    //       bankName: "MEEZAN BANK",
    //       branchCode: "0257 DHA Phase 5",
    //       iban: "PK51MEZN0002570104987755",
    //     },
    //     {
    //       id: 2,
    //       title: "Gohar Sultan",
    //       accNo: "03008905577",
    //       sectionTitle: "JazzCash"
    //     },
    //     {
    //       id: 3,
    //       title: "Gohar Sultan",
    //       accNo: "03414151343",
    //       sectionTitle: "EasyPaisa"
    //     },
    //   ]
    
      const videos = [
        {
          id: 1,
          title: "How to use One Call App?",
          url: "https://www.youtube.com/embed/YuvbIygReY8"
        },
        {
          id: 2,
          title: "How to Create User Profile?",
          url: "https://www.youtube.com/embed/Sz_KE_3h6x4"
        },
        {
          id: 3,
          title: "How to Create Business Profile?",
          url: "https://www.youtube.com/embed/dZVvz_mX_Ro"
        },
        {
          id: 4,
          title: "How to Broadcast Your Query?",
          url: "https://www.youtube.com/embed/APZAlzlEwcU"
        },
        {
          id: 5,
          title: "How to find businesses near you?",
          url: "https://www.youtube.com/embed/nN490wia4v0"
        },
      ]
    
      return (
        <div>
          <div className="flex flex-col gap-4">
            {/* <Iframe videoUrl={"https://be.onecallapp.com/apps/onecall/tpl/help/assets/images/onecall.mp4"} /> */}
            <Iframe
              videoUrl="https://www.youtube.com/embed/VRndr9KrvEU" 
              props={{
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                // allowfullscreen: 'allowFullScreen'
              }}
            />
            <div className="flex flex-col px-10">
              <div className="flex flex-col">
                <span className="text-sm">For Assitance</span>
                <span className="text-[12px]">Contact your regional representative for further assistance</span>
              </div>
              <div className="flex gap-2 mx-auto pt-2">
                <div className="rounded-full border border-[#505050] w-[34px] h-[34px] items-center justify-center flex">
                  <img src={AppImages.phone2} alt="phone" />
                </div>
                <div className="flex flex-col ">
                  <span className="text-sm">One Call Official</span>
                  <span className="text-[13px]">+92 (304) 1110 201</span>
                </div>
              </div>
            </div>
            {/* <hr className="mx-5 bg-[#707070]" />
            {accounts.map((account, index, self) => (
              <div key={index}>
                <BankAccountDetail details={account} sectionTitle={account.sectionTitle ? account.sectionTitle : "Bank Account Details"} />
                {(index !== self.length - 1) && <hr className="mx-5 bg-[#707070]" />}
              </div>
            ))} */}
              <hr className="mx-5 bg-[#707070]" />
              {videos.map((video, index) => (
                <div key={index}>
                  <div>
                    <span className="px-5 text-[15px]">{video.title}</span>
                    <Iframe 
                      videoUrl={video.url} 
                      props={{
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        // allowfullscreen: 'allowFullScreen'
                      }}
                    />
                  </div>
                  <hr className="mx-5 bg-[#707070]" />
                </div>
              ))}
            </div>
        </div>
    );
}

export default AssistanceTabContent;