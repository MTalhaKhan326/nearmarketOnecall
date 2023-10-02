import { useContext, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { BiShoppingBag } from "react-icons/bi";
import { BsBriefcase, BsTelephone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEdit, MdOutlinePhone } from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";
import { LAMBDA_API_BUSINESS_PORTAL_URL, MyBusinessContext } from "../contexts/MyBusinessContext.jsx";
import { useNavigate } from "react-router";
import Loading from "../../../basic/Loading.jsx";
import axios from "axios";
import FlutterInterface from "../../../../utils/flutter_interface.js";
import { toast } from "react-toastify";

function MBStatsScreen() {
  const ctx = useContext(MyBusinessContext)
  const navigate = useNavigate()
  const [leadsDay, setLeadsDay] = useState(7);
  const [offersDay, setOffersDay] = useState(7);
  const [audienceDay, setAudienceDay] = useState(7);
  const [isFetchingStats, setIsFetchingStats] = useState(false)
  const [audienceData, setAudienceData] = useState(null)
  const [offersData, setOffersData] = useState(null)
  const [leadsData, setLeadsData] = useState(null)
  
 const AudienceOptions = {
   series: {
    0: { color: "#24ACE3" }, // Change the color of the second line (Expenses) to red.
   },
 };
   const OffersOptions = {
    //  chart: {
    //    title: "Offers",
    //  },
     series: {
       0: { color: "#F78223" }, // Change the color of the second line (Expenses) to red.
     },
   };
    const LeadsOptions = {
      // chart: {
      //   title: "Leads",
      // },
      series: {
        0: { color: "#016738" }, // Change the color of the second line (Expenses) to red.
      },
    };
   

    const handleSelectChange = (e) => {
      let selectedDay = parseInt(e.target.value);
      selectedDay = isNaN(selectedDay) ? 7 : selectedDay
      setAudienceDay(selectedDay);
    };
   
    const handleSelectChangeOffers = (e) => {
      let selectedDay = parseInt(e.target.value);
      selectedDay = isNaN(selectedDay) ? 7 : selectedDay
      setOffersDay(selectedDay);
    };
    
    
    const handleSelectChangeLeads = (e) => {
      let selectedDay = parseInt(e.target.value);
      selectedDay = isNaN(selectedDay) ? 7 : selectedDay
      setLeadsDay(selectedDay);
    };
    
    const options = [
      { title: "Last 7 days", day: 7 },
    ];

  async function getStats() {
    try {
      let business_id = ctx.business?.id || ctx.env?.business_id
      if(!business_id) {
        business_id = await FlutterInterface.getBusinessId()
        if(business_id) {
          ctx.setEnv({...ctx.env, business_id})
        }
      }

      if(!business_id) {
        throw new Error('No business id')
      }

      let res = await axios.get(LAMBDA_API_BUSINESS_PORTAL_URL + "/app/my-business/stats?business_id=" + business_id)
      if(res.data?.status == 200 && res.data?.data) {
        return res.data?.data 
      }
      throw res?.data
    } catch(e) {
      console.log(e)
      return null 
    }
  }
  
  useEffect(() => {
    if(!ctx.businessStats) {
      setIsFetchingStats(true)
      getStats().then(res => {
        if(res) {
          if(res.audience) {
            setAudienceData(res.audience)
          }
          if(res.offers) {
            setOffersData(res.offers)
          }
          if(res.leads) {
            setLeadsData(res.leads)
          }
          ctx.setBusinessStats(res)
        }
      }).catch(e => {
        console.log(e)
        // toast.error('Something went wrong fetching stats')
      }).finally(() => {
        setIsFetchingStats(false)
      })
    }
  }, [])
  return (
    <div className="mx-3 md:mx-7 mt-7">
      <div>
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg">{ctx.business?.name}</div>
          <div className="bg-[#D6F3FFAA] rounded-full p-2" onClick={() => navigate("/app/my-business/profile/update")}>
            <MdOutlineEdit color="#000" />
          </div>
        </div>

        <div className="flex items-start my-1">
          <div className="flex-[0_0_10%]">
            <BsBriefcase />
          </div>
          <div>{ctx.business?.category ?? "--"}</div>
        </div>

        <div className="flex items-start my-1">
          <div className="flex-[0_0_10%]">
            <MdOutlinePhone />
          </div>
          <div>{ctx.business?.phone ?? "--"}</div>
        </div>

        <div className="flex items-start my-1">
          <div className="flex-[0_0_10%]">
            <RiMapPin2Line />
          </div>
          <div>{ctx.business?.address ?? "--"}</div>
        </div>
      </div>
      
      <div className="border-b-[1px] border-slate-200 my-4"></div>
      {isFetchingStats ? 
      <div>
        <Loading />
      </div> :
      
      <div>
        <div>
          <div className="flex flex-row justify-between my-1">
            <div className="text-[16px] text-[#333333] font-semibold md:text-[21px]">
              Audience
            </div>
            <div className="text-[14px]">
              <select onChange={handleSelectChange} defaultValue={"7"}>
                {options.map((option) => (
                  <option key={option.day} value={option.day}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {audienceData ? <Chart
            chartType="Line"
            width="100%"
            // height="300px"
            data={audienceData}
            options={AudienceOptions}
            className="h-[166px] md:h-[300px]"
          /> : <></>}
        </div>
        <div>
          <div className="flex flex-row justify-between my-1">
            <div className="text-[16px] text-[#333333] font-semibold md:text-[21px]">
              Offers
            </div>
            <div className="text-[14px]">
              <select onChange={handleSelectChangeOffers} value={offersDay || ""}>
                {/* <option value="">Select</option> */}
                {options.map((option) => (
                  <option key={option.day} value={option.day}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {offersData ?  <Chart
            chartType="Line"
            width="100%"
            className="h-[166px] md:h-[300px]"
            data={offersData}
            options={OffersOptions}
          /> : <></>}
        </div>
        <div>
          <div className="flex flex-row justify-between my-1">
            <div className="text-[16px] text-[#333333] font-semibold md:text-[21px]">
              Leads
            </div>
            <div className="text-[14px]">
              <select onChange={handleSelectChangeLeads} value={leadsDay || ""}>
                {/* <option value="">Select</option> */}
                {options.map((option) => (
                  <option key={option.day} value={option.day}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {leadsData ? <Chart
            chartType="Line"
            width="100%"
            className="h-[166px] md:h-[300px] mb-2"
            data={leadsData}
            options={LeadsOptions}
          /> : <></>}
        </div>
      </div>}
    </div>
  );
}

export default MBStatsScreen;