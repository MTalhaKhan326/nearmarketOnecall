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

          <Route
            exact
            path="/profile/:userId"
            element={<BankAccountDropdown />}
          ></Route>
          <Route
            exact
            path="/gp"
            element={<GalleriaProperties />}
          ></Route>
          <Route
            exact
            path="/businessRequest/:userId"
            element={<BusinessRequest />}
          ></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
