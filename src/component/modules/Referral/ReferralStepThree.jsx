import { useContext } from "react";
import ReferralContext from "./ReferralContext.jsx";

function ReferralStepThree() {
  const referralContext = useContext(ReferralContext)
  return (  
    <div>
      <form action="">
        <div>
          <label htmlFor="ref-number">Enter your referral's number</label>
          <input 
            type="text" 
            className="bg-white box-border w-full p-2 rounded border-[1px]" 
            placeholder="i.e. 0300 0678901" 
          />
        </div>
      </form>
    </div>
  );
}

export default ReferralStepThree;