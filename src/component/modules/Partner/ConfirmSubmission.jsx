import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PartnerFormContext } from "./PartnerFormProvider.jsx";
import { formatNumberAsReadable, titleCase } from "../../../utils/helpers.js";
import { AppImages } from "../../../Asset/images/image.js";
import SimpleModal from "../../basic/SimpleModal.jsx";

function ConfirmSubmission() {
  const partnerFormContext = useContext(PartnerFormContext)
  const data = partnerFormContext.fields
  const [isLoading, setIsLoading] = useState(false)
  const [modalSettings, setModalSettings] = useState({ isOpen: false, mode: 'success' })
  const navigate = useNavigate()

  if(!data) {
    return <Navigate to="/become-partner" />
  }

  const fields = [
    { label: 'Name', value: data.full_name },
    { label: 'Gender', value: titleCase( data.gender ) },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Address', value: data.address },
    { label: 'Business Category', value: partnerFormContext.businessCategories.find(i => i.value === data.businessCat )?.label ?? "--"},
    { label: 'Customers', value: data.customers },
    { label: 'Days', value: data.days },
  ]

  const PACKAGE_PRICE = 1950
  const RATIO = 0.1
  const REVENUE = data.customers * PACKAGE_PRICE * RATIO

  const cToDratio = data.customers / data.days 

  const d1 = data.days 
  const d2 = 30
  const d3 = 60
  const d4 = 90 
  const d5 = 120 

  const c1 = Math.ceil( cToDratio * d1 )
  const c2 = Math.ceil( cToDratio * d2 )
  const c3 = Math.ceil( cToDratio * d3 )
  const c4 = Math.ceil( cToDratio * d4 )
  const c5 = Math.ceil( cToDratio * d5 )

  const cToRratio = REVENUE / data.customers
  const r1 = Math.ceil(cToRratio * c1)
  const r2 = Math.ceil(cToRratio * c2)
  const r3 = Math.ceil(cToRratio * c3)
  const r4 = Math.ceil(cToRratio * c4)
  const r5 = Math.ceil(cToRratio * c5)

  const tableData = [
    { customers: c1, days: d1, revenue: r1 },
    { customers: c2, days: d2, revenue: r2 },
    { customers: c3, days: d3, revenue: r3 },
    { customers: c4, days: d4, revenue: r4 },
    { customers: c5, days: d5, revenue: r5 }
  ]

  const TOTAL_REVENUE = tableData.map(i => i.revenue).reduce((prev, curr) => prev + curr, 0)

  function daysToMonths(days) {
    const daysInMonth = 30; // Assuming each month has 30 days
    const months = Math.floor(days / daysInMonth)
    const remDays = Math.ceil(days % daysInMonth)
    let res = ""
    if(remDays === 0) {
      res = months
    } else {
      res = months + 1 
    }
    return res + " month" + (res === 1 ? "" : "s")
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setModalSettings(old => ({...old, isOpen: true}))
      // partnerFormContext.hydrate()
      // navigate('/become-partner')
    }, 3000)
  }
  
  return (  
    <div className="md:max-w-[750px] mx-auto my-4 p-2">
      <div className="my-4">
        <h1 className="text-[24px] text-center">Request for Market Partner</h1>
      </div>
      
      <div className="flex flex-wrap">
        {fields.map((field, index) => (
          <div key={'field-' + index} className="my-2 flex-[1_1_50%]">
            <p className="text-[12px] text-slate-600">{field.label}</p>
            <p>{field.value ?? "--"}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="my-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="font-normal py-2 px-2 text-left">Customers</th>
              <th className="font-normal py-2 px-2 text-left">Days</th>
              <th className="font-normal py-2 px-2 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr className="border-b-[1px] border-gray-300" key={'table-row-' + index}>
                <td className="px-2 py-2">{row.customers}</td>
                <td className="px-2 py-2">
                  {/* {row.days} */}
                  {row.days < 30 ? row.days : <>{daysToMonths(row.days)}</>}
                </td>
                <td className="px-2 py-2"><span className="text-[12px]">PKR</span> {row.revenue ? formatNumberAsReadable(row.revenue) : "--"}</td>
              </tr>
            ))}
            <tr className="border-b-[1px] border-gray-300">
              <td className="px-2 py-2"></td>
              <td className="px-2 py-2">Total</td>
              <td className="px-2 py-2" ><span className="text-[12px]">PKR</span> {formatNumberAsReadable( TOTAL_REVENUE )}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-4 flex justify-between items-center">
        <button
          className={"bg-blueGray-500 w-[100px] rounded py-1 text-white "}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button 
          className={"bg-blue hover:bg-blueGray-500 w-[100px] rounded py-1 text-white " + (isLoading ? "bg-blueGray-500" : "")}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {
            isLoading ? 
            <img src={AppImages.loading} className="w-[20px] py-[2px] svg-white mx-auto" /> :
            <span>Submit</span>
          }
        </button>
      </div>
      <SimpleModal 
        isOpen={modalSettings.isOpen}
        onClose={() => setModalSettings(old => ({...old, isOpen: false}))}
      >

      </SimpleModal>
    </div>
  );
}

export default ConfirmSubmission;