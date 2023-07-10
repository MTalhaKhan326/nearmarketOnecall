import { createContext, useEffect, useState } from "react";
import FlutterInterface from "../../../../utils/flutter_interface.js";

export const HelpContext = createContext({
  billingFormPackagePrice: null,
  setBillingFormPackagePrice: (price) => null,
  billingFormSelectedPackage: null,
  setBillingFormSelectedPackage: (pkg) => null,
  billingFormSelectedDuration: null,
  setBillingFormSelectedDuration: dur => null,
  businessCategory: null,
  setBusinessCategory: (cat) => null,
  userId: null
})

function HelpContextProvider({ children }) {
  const [billingFormPackagePrice, setBillingFormPackagePrice] = useState(null)
  const [billingFormSelectedPackage, setBillingFormSelectedPackage] = useState(null)
  const [billingFormSelectedDuration, setBillingFormSelectedDuration] = useState(null)
  const [userId, setUserId] = useState(null)
  const [businessCategory, setBusinessCategory] = useState(null)
  
  useEffect(() => {
    FlutterInterface.getUserId().then(res => {
      if(res) {
        setUserId(res)
      }
    })
  }, [])

  const value = {
    billingFormPackagePrice: billingFormPackagePrice,
    setBillingFormPackagePrice,
    userId,
    billingFormSelectedPackage,
    setBillingFormSelectedPackage,
    billingFormSelectedDuration,
    setBillingFormSelectedDuration,
    businessCategory,
    setBusinessCategory
  }
  return (  
    <HelpContext.Provider value={value}>
      {children}
    </HelpContext.Provider>
  );
}

export default HelpContextProvider;

