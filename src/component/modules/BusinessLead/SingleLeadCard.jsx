import { useState } from "react";
import { AppImages } from "../../../Asset/images/image.js";
import { convertMongoDateToReadable, convertMySqlDateToReadable } from "../../../utils/helpers.js";
import LeadViewModal from "./LeadViewModal.jsx";
import CallNowButton from "./CallNowButton.jsx";
import LeadUnsubModal from "./LeadUnsubModal.jsx";

function SingleLeadCard({ lead }) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  

  return ( 
    <>
      <div className="bg-[#f4f4f4] flex justify-between mx-2 my-2 rounded-lg px-2">
        <div className="flex flex-col my-4">
          <div className="text-[11px] mb-4 text-[#535353]">
            {lead.title ?? "New Lead"}
          </div>
          <div className="text-[10px] text-[#5C5C5C]">
            {convertMongoDateToReadable(lead.createdAt)  ?? "--"}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <button
              type="submit"
              className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white text-[#363636] text-[12px] border-[1.5px] border-[#707070] font-semibold rounded px-3"
              onClick={() => setIsViewModalOpen(true)}
            >
              View
            </button>
          </div>
          
          {lead.from && <div className="ml-2"><CallNowButton phone={lead.from} /></div>}
        </div>
      </div>
      <LeadViewModal 
        lead={lead}
        isModalOpen={isViewModalOpen} 
        setIsModalOpen={() => setIsViewModalOpen(false)}
      />
      
    </> 
  );
}

export default SingleLeadCard;