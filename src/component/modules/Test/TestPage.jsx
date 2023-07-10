import { useEffect, useState } from "react";
import { AppImages } from "../../../Asset/images/image.js";
import axios from "axios";

function TestPage() {
  const [price, setPrice] = useState({ amount: null, currency: 'PKR' })
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeDuration, setActiveDuration] = useState(null)
  const [activePackage, setActivePackage] = useState('base')
  const [currentPricing, setCurrentPricing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [packages, setPackages] = useState([])
  const [durations, setDurations] = useState([])
  
  async function getCategories() {
    let res = await axios.get(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/package/get-pricing-categories`)
    if(res.data.status === 200) {
      return res.data.data 
    }
    return null 
  }

  async function getPricingByCategory(category) {
    let res = await axios.get(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/package/get-pricing-by-category?category=${category}`)
    console.log(res.data)
    if(res.data.status === 200) {
      return res.data.data 
    }
    return null 
  }


  function handleChangeCategory(e) {
    console.log(e.target.value)
    if(currentPricing != null) {
      setCurrentPricing(null)
    }
    setActiveCategory(e.target.value)
    setActiveDuration("")
    getPricingByCategory(e.target.value).then(res => {
      if(res && res.pricing) {
        setCurrentPricing(res.pricing)
        const dur = []
        if(res.pricing[activePackage].m1) dur.push(1)
        if(res.pricing[activePackage].m3) dur.push(3)
        if(res.pricing[activePackage].m6) dur.push(6)
        if(res.pricing[activePackage].m12) dur.push(12)
        setDurations(dur)
      }
    })
  }

  function handleChangePackage(e) {
    setActivePackage(e.target.value)
    if(currentPricing != null) {
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
  }

  useEffect(() => {
    setIsLoading(true)
    getCategories().then(res => {
      if(res) {
        setCategories(res)
      }
    }).finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if(currentPricing && activeCategory && activeDuration && activePackage) {
      setPrice(currentPricing[activePackage][`m${activeDuration}`])
    } else {
      setPrice({ amount: null, currency: 'PKR' })
    }
  }, [activeCategory, activeDuration, activePackage, currentPricing])


  return (  
    <main className="mx-2">
      <div>
        <form action="" className={"relative h-full w-full " + (isLoading ? "opacity-[0.5]" : "")}>
          {isLoading && <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img src={AppImages.loading} alt="loading" className="w-[20px] h-[20px]" />
          </div>}
          <div>
            <label htmlFor="pkg_cat">Choose category:</label>
            <select name="pkg_cat" id="pkg_cat" className="border-2 border-slate-200 rounded w-full p-2 bg-slate-50" onChange={handleChangeCategory}>
              <option value="">-- Choose category --</option>
              {categories.map((cat, index) => (
                <option key={'pkg-cat-' + index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pkg_name">Choose Package:</label>
            <select name="pkg_name" id="pkg_name" className="border-2 border-slate-200 rounded w-full p-2 bg-slate-50" onChange={handleChangePackage}>
              <option value="">-- Package --</option>
              <option value="base">Listing</option>
              <option value="business">Business</option>
              <option value="active">Active</option>
            </select>
          </div>
          <div>
            <label htmlFor="pkg_dur">Duration:</label>
            <select name="pkg_dur" id="pkg_dur" className="border-2 border-slate-200 rounded w-full p-2 bg-slate-50" onChange={handleChangeDuration} value={activeDuration}>
              <option value="">-- Duration --</option>
              { durations.map((dur, index) => (
                <option key={'pkg-dur-opt-' + index} value={dur}>{dur} Month</option>
              )) }
              {/* <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option> */}
            </select>
          </div>
          <div className="flex items-center justify-center w-[100px]">
            {/* <div className={"text-center " + (isFetchingPrice ? "opacity-[0.5]" : "")}>Price:</div> */}
            <div className="mx-2">
              <span>{price.amount ? `${price.currency} ${price.amount}` : "--"}</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default TestPage;