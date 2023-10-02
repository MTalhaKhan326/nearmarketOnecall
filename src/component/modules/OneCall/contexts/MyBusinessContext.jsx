import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import FlutterInterface from "../../../../utils/flutter_interface.js";

export const LAMBDA_API_BASE_URL = "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws"
export const LAMBDA_API_BUSINESS_PORTAL_URL = "https://7b7xlap5jvkahyo5himfrzqy640qnadr.lambda-url.eu-west-1.on.aws"

export const MyBusinessContext = createContext({
  isLoggedIn: false,
  user: null,
  business: null,
  setBusiness: (business) => {},
  env: {
    device: null,
    os: null,
    appVersion: null,
    osVersion: null,
    lat: null,
    lng: null,
    user_id: null,
    business_id: null 
  },
  setEnv: (env) => {},
  login: () => {},
  categories: null,
  navigate: (to) => {},
  businessStats: null,
  setBusinessStats: (stats) => {}
});

function MyBusinessContextProvider({children}) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [env, setEnv] = useState({
    device: null,
    os: null,
    appVersion: null,
    osVersion: null,
    user_id: searchParams.get("user_id") ?? localStorage.getItem("user_id"),
    business_id: searchParams.get("business_id") ?? localStorage.getItem("business_id"),
    lat: searchParams.get("lat") ?? localStorage.getItem("lat"),
    lng: searchParams.get("lng") ?? localStorage.getItem("lng")
  })
  const [isLoggedIn, setIsLoggedIn] = useState(env.user_id ? true : false)
  const [user, setUser] = useState(null)
  const [business, setBusiness] = useState(null)
  const [isFetchingCategories, setIsFetchingCategories] = useState(false)
  const [categories, setCategories] = useState([])
  const [businessStats, setBusinessStats] = useState(null)

  useEffect(() => {
    const user_id = searchParams.get("user_id")
    if(user_id) {
      localStorage.setItem('user_id', user_id)
    }
    const business_id = searchParams.get('business_id')
    if(business_id) {
      localStorage.setItem('business_id', business_id)
    }
    const lat = searchParams.get('lat')
    if(lat) {
      localStorage.setItem('lat', lat)
    }
    const lng = searchParams.get('lng')
    if(lng) {
      localStorage.setItem('lng', lng)
    }

    console.log(env.business_id)
    setIsFetchingCategories(true)
    getCategories().then(res => {
      if(res?.length) {
        setCategories(res)
      }
    }).finally(() => {
      setIsFetchingCategories(false)
    })
    if(!env.business_id) {
    }

    const b = {}
    const business_name = searchParams.get('b_name')
    if(business_name) {
      b.name = business_name
    }
    const business_category = searchParams.get('b_category')
    if(business_category) {
      b.category = business_category
    }
    const business_phone = searchParams.get('b_phone')
    if(business_phone) {
      b.phone = business_phone
    }
    const business_address = searchParams.get('b_address')
    if(business_address) {
      b.address = business_address
    }
    if(Object.keys(b).length) {
      setBusiness(b)
    }

    if(env.business_id) {
      console.log('getting business')
      getBusiness(env.business_id).then(res => {
        console.log(res)
        if(res) {
          setBusiness({
            ...res,
            id: res._id,
          })
        }
      })
    }

    if(!env.lat || !env.lng) {
      FlutterInterface.getLocation().then(res => {
        if(res?.lat && res?.lng) {
          setEnv({...env, lat: res?.lat, lng: res?.lng})
        }
      })
    }

    if(!env.user_id) {
      FlutterInterface.getUserId().then(res => {
        if(res) {
          setEnv({...env, user_id: res})
        }
      })
    }
  }, [])

  async function getCategories() {
    try {
      let res = await axios.get(LAMBDA_API_BASE_URL + "/categories/for-business-form")
      if(res.data?.status == 200 && res.data?.data?.categories?.length) {
        return res.data?.data?.categories
      }
      return null 
    } catch(e) {
      return null;
    }
  }

  async function getBusiness(businessId) {
    try {
      let res = await axios.get(LAMBDA_API_BUSINESS_PORTAL_URL + "/app/my-business/get-business?business_id=" + businessId)
      if(res.data?.status === 200 && res.data?.data?.business) {
        return res.data?.data?.business 
      }
      return null 
    } catch(e) {
      return null
    }
  }
  
  const val = {
    isLoggedIn,
    user,
    business,
    setBusiness,
    login: () => {
      setIsLoggedIn(true)
    },
    env,
    setEnv,
    categories,
    navigate: (to) => {
      console.log(business)

      const p = new URLSearchParams({
        lat: env.lat,
        lng: env.lng,
        user_id: env.user_id,
        business_id: business?.id,
        b_name: business?.name,
        b_phone: business?.phone,
        b_category: business?.category,
        b_address: business?.address 
      }).toString()
      console.log(p)
      // navigate(to + "?" + p)
    },
    businessStats: businessStats,
    setBusinessStats: setBusinessStats
  }
  return (  
    <MyBusinessContext.Provider value={val}>
      <Outlet />
    </MyBusinessContext.Provider>
  );
}

export default MyBusinessContextProvider;