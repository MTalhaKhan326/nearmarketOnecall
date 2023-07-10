import { createContext, useState } from "react";

const ReferralContext = createContext({
  activeStep: 1,
  setActiveStep: step => {},
  phone: null,
  setPhone: phone => {},
  isLoading: false,
  setIsLoading: isLoading => {},
  errorText: null,
  setErrorText: errorText => {},
  goToNextStep: () => {},
  goToPreviousStep: () => {},
  isUserVerified: false,
  setIsUserVerified: (isVerified) => {},
  stepsWithNoNextButton: [3],
})

export function ReferralContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState(1)
  const [phone, setPhone] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState(null)
  const [isUserVerified, setIsUserVerified] = useState(false)
  function goToNextStep() {
    if(activeStep === 1) {
      if(isUserVerified) {
        setActiveStep(3)
      } else {
        setActiveStep(2)
      }
    } else if (activeStep == 2) {
      setActiveStep(3)
    }
  }
  function goToPreviousStep() {
    if(activeStep == 2) {
      setActiveStep(1)
    } else if (activeStep === 3) {
      if(isUserVerified) {
        setActiveStep(1)
      } else {
        setActiveStep(2)
      }
    }
  }
  return (  
    <ReferralContext.Provider value={{
      activeStep,
      setActiveStep,
      phone,
      setPhone,
      isLoading,
      setIsLoading,
      errorText, 
      setErrorText,
      goToNextStep,
      goToPreviousStep,
      isUserVerified,
      setIsUserVerified,
      stepsWithNoNextButton: [3],
    }}>
      {children}
    </ReferralContext.Provider>
  );
}

export default ReferralContext