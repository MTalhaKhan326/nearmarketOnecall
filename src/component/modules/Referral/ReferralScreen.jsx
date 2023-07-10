import { ReferralContextProvider } from "./ReferralContext.jsx";
import ReferralScreenContent from "./ReferralScreenContent.jsx";

function ReferralScreen() {
  
  return (  
    <ReferralContextProvider>
      <ReferralScreenContent />
    </ReferralContextProvider>
  );
}

export default ReferralScreen;