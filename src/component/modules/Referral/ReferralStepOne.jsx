import { useContext } from "react";
import ReferralContext from "./ReferralContext.jsx";

function ReferralStepOne() {
  const referralContext = useContext(ReferralContext)
  return (
    <div className="">
      <label htmlFor="phone" className="block text-[14px]">Phone Number:</label>
      <input 
        type="text" 
        name="phone" 
        id="phone" 
        className="bg-white box-border w-full p-2 rounded border-[1px]" 
        placeholder="Enter your phone number" 
        value={referralContext.phone ?? ""}
        onChange={e => referralContext.setPhone(e.target.value)} 
        readOnly={referralContext.isUserVerified}
      />
    </div>
  );
}

export default ReferralStepOne;