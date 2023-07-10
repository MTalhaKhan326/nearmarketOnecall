import { useContext } from "react";
import ReferralStepOne from "./ReferralStepOne.jsx";
import ReferralStepTwo from "./ReferralStepTwo.jsx";
import ReferralContext from "./ReferralContext.jsx";
import { AppImages } from "../../../Asset/images/image.js";
import ReferralStepThree from "./ReferralStepThree.jsx";

function ReferralScreenContent() {
  const referralContext = useContext(ReferralContext)
  function handleNext(e) {
    referralContext.setErrorText(null)
    switch(referralContext.activeStep) {
      case 1: return handleStepOne(e);
      case 2: return handleStepTwo(e)
    }
  }
  function handleStepOne(e) {
    const phone = referralContext.phone?.toString().replace(/[^0-9]/gi, "")   
    if(!phone || phone.length < 10 || phone.length > 12) {
      referralContext.setErrorText('Invalid phone number')
      return;
    }
    referralContext.setPhone(phone) 
    referralContext.goToNextStep()
  }
  function handleStepTwo(e) {
    referralContext.setIsUserVerified(true)
    referralContext.goToNextStep()
  }
  return (  
    <main>
      <div className="relative h-[100vh]">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="border-2 w-[90vw] lg:w-[30vw] md:w-[50vw] sm:w-[60vw] h-[30vh] md:h-[50vh] sm:h-[40vh] rounded bg-gray-50 ">
            
            <div className="h-full relative p-4">
              {referralContext.errorText !== null && <p className="bg-red-400 text-white p-2 mb-4 rounded">{referralContext.errorText}</p>}
              {referralContext.activeStep === 1 && <ReferralStepOne />}
              {referralContext.activeStep === 2 && <ReferralStepTwo />}
              {referralContext.activeStep === 3 && <ReferralStepThree />}
              
              <div className="absolute bottom-0 right-0 w-full p-4">
                <div className="flex items-center justify-between">
                  <button 
                    className={"block px-2 py-1 rounded bg-gray-400 disabled:bg-gray-300 hover:bg-blueGray-800 text-white mt-8 min-w-[100px] " + (referralContext.activeStep === 1 ? "invisible" : "")}
                    disabled={referralContext.activeStep === 1}
                    onClick={e => {
                      referralContext.goToPreviousStep()
                    }}
                  >
                    Previous
                  </button>
                  {
                  // !referralContext.stepsWithNoNextButton?.includes(referralContext.activeStep) && 
                  <button 
                    className="block px-2 py-1 rounded bg-black hover:bg-gray-600 text-white mt-8 min-w-[100px]"
                    onClick={handleNext}
                    disabled={referralContext.isLoading}
                  >
                    Next
                  </button>}
                </div>
              </div>
            </div>
              {referralContext.isLoading &&
                <div className="absolute top-0 bg-[#00000022] h-full w-full rounded">
                  <div className="relative h-full w-full">
                    <div className="absolute top-[50%] left-[45%] transalte-x-[-50%] translate-y-[-50%]">
                      <img src={AppImages.loading} alt="loading" className="w-[50px] " />
                    </div>
                  </div>
                </div>
              }
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReferralScreenContent;