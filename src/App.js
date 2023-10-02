import './App.css';
import LeadPage from './component/LeadPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfoPage from './component/pages/Info';
import UserRequestPage from './component/pages/UserRequestPage';
import HomePage from './component/HomePage';
import BusinessPage from './component/BusinessPage';
import InterviewForm from './component/InterviewForm';
import RadioButtons from './component/RadioButton';
import Form from './component/form';
import EmployerForm from './component/EmployerForm';
import SubmittedForm from './component/SubmittedForm';
import CreatePostScreen from './component/modules/Post/CreatePostScreen';
import ChatScreen from './component/modules/Chat/ChatScreen.jsx';
import PostListScreen from './component/modules/Post/PostListScreen.jsx';
import PostPublishScreen from './component/modules/Post/PostPublishScreen.jsx';
import HelpScreen from './component/modules/OneCall/Help/HelpScreen.jsx';
import ShortUrlScreen from './component/modules/ShortUrl/ShortUrlScreen.jsx';
import NoMatch from './component/pages/NoMatch.jsx';
import ReferralScreen from './component/modules/Referral/ReferralScreen.jsx';
import TestPage from './component/modules/Test/TestPage.jsx';
import BusinessRequest from './component/modules/DropDown/BusinessRequest.jsx';
import BankAccountDropdown from './component/modules/DropDown/BankAccountDropDown.jsx';
import BusinessLeadScreen from './component/modules/BusinessLead/BusinessLeadScreen.jsx';
import GalleriaProperties from './component/modules/DropDown/GalleriaProperties';
import GalleriaForm from './component/GalleriaForm';
import DPage from './component/DPage';
import PPage from './component/PPage';
import MPage from './component/MPage';
import GalleriaPropertyTable from './component/GalleriaPropertyTable';
import CPage from './component/CPage';
import CustomerForm from './component/CustomerForm';
import Acceptance from './component/Acceptance';
import GalleriaProperties1 from './component/modules/DropDown/GalleriaProperties1';
import ImageUploader from './component/ImageUploader';
import GalleriaLeadsListing from './component/modules/DropDown/GalleriaLeadsListing';
import ImageUploaderr from './ImageUploader';
import ExcelToJsonConverter from './ExcelToJsonConverter';
import PreFabricated from './component/PreFabricated';
import OnecallLeads from './component/modules/DropDown/OnecallLeads';
import PartnerForm from './component/modules/Partner/PartnerForm.jsx';
import ConfirmSubmission from './component/modules/Partner/ConfirmSubmission.jsx';
import PartnerFormProvider from './component/modules/Partner/PartnerFormProvider.jsx';
import Mobileshop from './component/Mobileshop';
import OnecallOffer from './component/modules/DropDown/OnecallOffer';
import OnecallYt from './component/modules/DropDown/OnecallYt';
import GalleriaRequestForm from './component/modules/Galleria/RequestForm.jsx';
import AppOnlyRoute from './component/modules/OneCall/AppOnlyRoute.jsx';
import MyBusinessContextProvider from './component/modules/OneCall/contexts/MyBusinessContext.jsx';
import MBWelcomeScreen from './component/modules/OneCall/MyBusiness/MBWelcomeScreen.jsx';
import MBLogin from './component/modules/OneCall/MyBusiness/MBLogin.jsx';
import MBSignup from './component/modules/OneCall/MyBusiness/MBSignup.jsx';
import SingleBusinessScreen from './component/modules/OneCall/SingleBusiness/SingleBusinessScreen.jsx';
import MBPrivateRouteWrapper from './component/modules/OneCall/MyBusiness/MBPrivateRouteWrapper.jsx';
import MBUpdateProfileScreen from './component/modules/OneCall/MyBusiness/MBUpdateProfile.jsx';
import MBHome from './component/modules/OneCall/MyBusiness/MBHome.jsx';
import MBStatsScreen from './component/modules/OneCall/MyBusiness/MBStatsScreen.jsx';
import NearByBusinesses from './component/modules/OneCall/NearbyBusinesses.jsx';
import PostOfferScreen from './component/modules/OneCall/Offer/PostOfferScreen.jsx';
import CreateOfferContextProvider from './component/modules/OneCall/Offer/CreateOfferContext.jsx';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/s/:id" element={<ShortUrlScreen />}></Route>
          <Route exact path="/q" element={<LeadPage />}></Route>
          <Route exact path="/q/info" element={<InfoPage />}></Route>
          <Route exact path="/u" element={<UserRequestPage />}></Route>
          <Route exact path="/search" element={<BusinessPage />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/submitted" element={<SubmittedForm />}></Route>
          <Route exact path="/button" element={<RadioButtons />}></Route>
          <Route exact path="/jobs" element={<InterviewForm />}></Route>
          <Route exact path="/employerForm" element={<EmployerForm />}></Route>
          <Route
            exact
            path="/converter"
            element={<ExcelToJsonConverter />}
          ></Route>
          <Route
            exact
            path="/become-partner"
            element={<CustomerForm />}
          ></Route>
          <Route
            exact
            path="/become-partner/confirm"
            element={<Acceptance />}
          ></Route>
          <Route
            exact
            path="/yt"
            element={<OnecallYt />}
          ></Route>
          <Route
            exact
            path="/post/create"
            element={<CreatePostScreen />}
          ></Route>
          <Route exact path="/chat/:chat_ref" element={<ChatScreen />}></Route>
          <Route
            exact
            path="/posts/:user_id"
            element={<PostListScreen />}
          ></Route>
          <Route exact path="/pd" element={<PostPublishScreen />}></Route>

          <Route
            exact
            path="/onecall/web/help"
            element={<HelpScreen />}
          ></Route>

          <Route
            exact
            path="/business-leads"
            element={<BusinessLeadScreen />}
          ></Route>

          {/* <Route exact path='/test' element={<TestPage />}></Route> */}

          <Route exact path="/d" element={<DPage />}></Route>
          <Route exact path="/p" element={<PPage />}></Route>
          <Route exact path="/m" element={<MPage />}></Route>
          <Route exact path="/c" element={<CPage />}></Route>
          {/* <Route exact path="/galleria/form" element={<GalleriaForm />}></Route> */}
          <Route exact path="/rf" element={<GalleriaForm />}></Route>
          <Route exact path="/pf" element={<PreFabricated />}></Route>
          <Route
            exact
            path="/galleria/t"
            element={<GalleriaPropertyTable />}
          ></Route>
          <Route exact path="/gp" element={<GalleriaProperties />}></Route>
          <Route
            exact
            path="/gp/lead"
            element={<GalleriaProperties1 />}
          ></Route>
          <Route exact path="/onecall/lead" element={<OnecallLeads />}></Route>
          <Route exact path="/onecall/offer" element={<OnecallOffer />}></Route>
          <Route
            exact
            path="/gp/leads/listing"
            element={<GalleriaLeadsListing />}
          ></Route>
          <Route exact path="/uploader" element={<ImageUploaderr />}></Route>
          <Route exact path="/image" element={<ImageUploader />}></Route>
          <Route exact path="/mobileshop" element={<Mobileshop />}></Route>
          <Route
            exact
            path="/businessRequest/:userId"
            element={<BusinessRequest />}
          ></Route>

          <Route
            exact
            path="/partner"
            element={
              <PartnerFormProvider>
                <PartnerForm />
              </PartnerFormProvider>
            }
          ></Route>
          <Route
            exact
            path="/acceptance"
            element={
              <PartnerFormProvider>
                <ConfirmSubmission />
              </PartnerFormProvider>
            }
          ></Route>
          <Route path="/galleria/request" element={<GalleriaRequestForm />}></Route>
          
          <Route element={<AppOnlyRoute />}>
            <Route element={<CreateOfferContextProvider />}>
                <Route path="/app/post-offer" element={<PostOfferScreen />}></Route>
            </Route>
            <Route element={<MyBusinessContextProvider />}>
              <Route element={<MBPrivateRouteWrapper />}>
                <Route path="/app/my-business/home" element={<MBHome />}></Route>
                <Route path="/app/my-business/stats" element={<MBStatsScreen />}></Route>
                <Route path="/app/my-business/profile/update" element={<MBUpdateProfileScreen />}></Route>
              </Route>
              <Route path="/app/my-business/welcome" element={<MBWelcomeScreen />}></Route>
              <Route path="/app/my-business/login" element={<MBLogin />}></Route>
              <Route path="/app/my-business/signup" element={<MBSignup />}></Route>
              
            </Route>
            <Route path="/app/single-business" element={<SingleBusinessScreen />}></Route>
            <Route path="/app/nearby" element={<NearByBusinesses />}></Route>
          </Route>

          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
