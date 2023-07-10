import { useEffect, useState } from "react";
import Chat from "../../Chat.jsx";
import Footer from "../../Footer.jsx";
import Header from "../../Header.jsx";
import { convertMySqlDateToReadable, titleCase } from "../../../utils/helpers.js";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Iframe from "../../basic/Iframe.jsx";
import SingleLeadCard from "./SingleLeadCard.jsx";
import Loading from "../../basic/Loading.jsx";
import LeadUnsubModal from "./LeadUnsubModal.jsx";

function BusinessLeadScreen() {
  const options = {
    googlePlayAppUrl: "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
    baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro"
  }
  const [searchParams] = useSearchParams()
  const queryId = searchParams.get('qid')
  const markerId = searchParams.get('mid')
  const [isFetchingLeads, setIsFetchingLeads] = useState(true)
  const [leads, setLeads] = useState(null)
  const [marker, setMarker] = useState(null)
  const [error, setError] = useState(null)
  const [isUnsubModalOpen, setIsUnsubModalOpen] = useState(false)
  async function getLeadsByMarkerId() {
    try {
      const url = new URL("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/leads-by-markerid-for-business-view")
      url.searchParams.set('query_id', queryId)
      url.searchParams.set('marker_id', markerId)
      url.searchParams.set('ref', 'oc92_business_leads_view')
      const res = await axios.get(url)
      if(res.data.status == 200) {
        return res.data.data 
      }
      throw res.data
    } catch(e) {
      console.log( e )
      return {
        error: true,
        message: typeof e === 'object' && !e.is_operational_error && e.message ? e.message : 'Something went wrong' 
      } 
    }
  }
  useEffect(() => {
    setIsFetchingLeads(true)
    getLeadsByMarkerId().then(res => {
      if(res.error) {
        setError(res.message ?? "Something went wrong")
        return;
      }
      console.log(res)
      if(res?.marker) {
        setMarker(res?.marker)
      }
      if(res?.leads) {
        setLeads(res?.leads)
      }
    }).finally(() => {
      setIsFetchingLeads(false)
    })
  }, [])
  return (  
    <>
      <Header />
      <main>
        <div>
          { isFetchingLeads ?  
            <div className="h-[60vh] relative">
              <Loading />
            </div>
            : error ? <div className="bg-red-100 rounded py-8 my-4 mx-4"><p className="text-center text-red-500">{error}</p></div> : <div>
                <div className="flex flex-row justify-between border-b-[1.5px] border-b-[#707070] px-4">
                  <div className="flex flex-col my-6 mt-2">
                    <div className="font-semibold text-[16px] text-[#2b2b2b]">
                      {marker?.name}
                    </div>
                    <div className="text-[10px]  text-[#555555]">{marker?.phone}</div>
                  </div>
                  <div className="flex flex-col mt-2">
                    {/* <div className=" text-[10px] text-[#919191] text-right">
                      Last 24 hours
                    </div> */}
                    <div className="text-right text-[15px] text-[#535353]">{titleCase( marker?.type )}</div>
                    <div className="text-right text-[11px] text-[#535353]">
                      Customers Request : {leads?.length ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="my-4 px-2">
                  <Iframe videoUrl={"https://www.youtube.com/embed/aoyl9JSoE2k"} />
                </div>
                <div className="flex flex-col border-b-[1.5px] border-b-[#707070] px-2 my-3 ">
                  <div className="font-semibold text-[16px] text-[#2b2b2b]">
                    Customer Requests ({leads?.length ?? "--"})
                  </div>
                  <div className="text-[10px] mb-2 text-[#919191]">
                    Download One Call app to view all requests{" "}
                  </div>
                </div>

                <div>
                  <ul className="">
                    { leads?.length && leads.map((lead, index) => (
                      <li key={"single-lead-" + index}>
                        <SingleLeadCard lead={lead} />
                      </li>
                    )) }
                  </ul>
                </div>
            </div>
          
          }
        </div>
        
      </main>
      <Footer />

      <div className=" flex flex-col items-center justify-center mb-4">
        <div className="text-[11px] text-[#2b2b2b] mt-[22px] ml-2 ">
          I do not want to grow my business or not interested otherwise.
        </div>
        <div
          className="text-[#FF0202] font-semibold underline text-[14px] cursor-pointer"
          onClick={() => {
            setIsUnsubModalOpen(true)
          }}
        >
          Unsubscribe
        </div>
      </div>

      <LeadUnsubModal
        isModalOpen={isUnsubModalOpen}
        setIsModalOpen={setIsUnsubModalOpen}
      />
    </>
  );
}

export default BusinessLeadScreen;