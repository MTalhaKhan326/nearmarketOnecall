import { useContext, useEffect, useState } from "react"
import { AppImages } from "../../../../Asset/images/image.js"
import axios from "axios"
import { HelpContext } from "../contexts/HelpContext.jsx"
import { formatNumberAsReadable, titleCase } from "../../../../utils/helpers.js"

function PackageSelectionField() {
  const [price, setPrice] = useState({ amount: null, currency: 'PKR' })
  const [activeCategory, setActiveCategory] = useState("")
  const [activeDuration, setActiveDuration] = useState("")
  const [activePackage, setActivePackage] = useState('base')
  const [currentPricing, setCurrentPricing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [durations, setDurations] = useState([])
  const helpContext = useContext(HelpContext)

  async function getPricingByUserId(userId) {
    let res = await axios.get(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/package/get-pricing-by-userid?user_id=${userId}`)
    if(res.data.status === 200) {
      return res.data.data 
    }
    return null 
  }

  function handleChangePackage(e) {
    setActivePackage(e.target.value)
    helpContext.setBillingFormSelectedPackage(e.target.value)
    if(currentPricing != null && currentPricing[e.target.value]) {
      const dur = []
      if(currentPricing[e.target.value].m1) dur.push(1)
      if(currentPricing[e.target.value].m3) dur.push(3)
      if(currentPricing[e.target.value].m6) dur.push(6)
      if(currentPricing[e.target.value].m12) dur.push(12)
      setDurations(dur)
    }
  }

  function handleChangeDuration(e) {
    setActiveDuration(e.target.value)
    helpContext.setBillingFormSelectedDuration(e.target.value)
  }

  useEffect(() => {
    if(helpContext.userId) {
      setIsLoading(true)
      getPricingByUserId(helpContext.userId).then(res => {
        if(res && res.pricing) {
          setCurrentPricing(res.pricing)
          const dur = []
          if(res.pricing[activePackage].m1) dur.push(1)
          if(res.pricing[activePackage].m3) dur.push(3)
          if(res.pricing[activePackage].m6) dur.push(6)
          if(res.pricing[activePackage].m12) dur.push(12)
          setDurations(dur)
        }
        if(res && res.category) {
          helpContext.setBusinessCategory(res.category)
        }
      }).finally(() => setIsLoading(false))
    }  
  }, [helpContext.userId])

  useEffect(() => {
    if(currentPricing && activeDuration && activePackage) {
      setPrice(currentPricing[activePackage][`m${activeDuration}`])
    } else {
      setPrice({ amount: null, currency: 'PKR' })
    }
  }, [activeDuration, activePackage, currentPricing])

  return (  
    <div className="disable-text-selection">
      <form action="" className={"relative h-full w-full " + (isLoading ? "opacity-[0.5]" : "")}>
        {isLoading && <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <img src={AppImages.loading} alt="loading" className="w-[20px] h-[20px]" />
        </div>}
        {/* <div>
          <label htmlFor="pkg_cat">Choose category:</label>
          <select name="pkg_cat" id="pkg_cat" className="border-2 border-slate-200 rounded w-full p-2 bg-slate-50" onChange={handleChangeCategory}>
            <option value="">-- Choose category --</option>
            {categories.map((cat, index) => (
              <option key={'pkg-cat-' + index} value={cat}>{cat}</option>
            ))}
          </select>
        </div> */}
        <div className="my-4 flex justify-between items-center">
          <label htmlFor="business_cat" className="flex-1">Business Category</label>
          <input type="text" readOnly className="flex-1 text-right rounded p-2 bg-slate-50 disabled:bg-slate-100 w-full" value={helpContext.businessCategory ? titleCase(helpContext.businessCategory) : "--"} />
        </div>
        <div className="my-4 flex justify-between items-center">
          <label htmlFor="pkg_name" className="flex-1">Package</label>
          <select name="pkg_name" id="pkg_name" className="flex-1 border-2 border-slate-200 rounded p-2 bg-slate-50" onChange={handleChangePackage}>
            <option value="">-- Choose --</option>
            <option value="base">Listing</option>
            <option value="business">Business</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div className="my-4 flex justify-between items-center">
          <label htmlFor="pkg_dur" className="flex-1">Duration</label>
          <select name="pkg_dur" id="pkg_dur" className="flex-1 border-2 border-slate-200 rounded p-2 bg-slate-50" onChange={handleChangeDuration} value={activeDuration}>
            <option value="">-- Choose --</option>
            { durations.map((dur, index) => (
              <option key={'pkg-dur-opt-' + index} value={dur}>{dur} Month</option>
            )) }
          </select>
        </div>
        <div className="my-4"> 
          <div className="text-center flex justify-between">
            <div>Price<sup className="text-red-300">*</sup></div>
            <div className="text-right">
              <div>
                {price.amount ? `${price.currency} ${formatNumberAsReadable( price.amount )}` : "--"}
              </div>
              <div className="text-[10px] italic">
                {activeDuration > 1 ? `${price.currency} ${activePackage === 'base' ? 1950 : activePackage === 'business' ? 9500 : activePackage === 'active' ? 21500 : '--'}/month` : ""}
              </div>
            </div>
          </div>
          <i className="text-[12px] text-gray-500"><sup className="text-red-400">*</sup>Prices are specific to your business category {helpContext.businessCategory ? `(i.e. ${titleCase( helpContext.businessCategory )})` : ""}</i>
        </div>
      </form>
    </div>
  );
}

export default PackageSelectionField;