import React from 'react'
import Footer from './Footer';
import { AppImages } from '../Asset/images/image';
import Header from './Header';
import WebHeader1 from './WebHeader1';

const SubmittedForm = () => {
    const options = {
      googlePlayAppUrl:
        "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
      appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
      baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro",
    };
  return (
    <>
      <div className="block md:hidden">
        <Header />
      </div>
      <div className="hidden md:block">
        <WebHeader1 />
      </div>
      <div className="flex justify-center">
        <div className="flex-col">
          <div className="flex-col">
            <div className="mt-9 text-[24px] md:text-[30px] font-semibold text-center text-[#282d32]">
              Your Application is succesfully Submitted
            </div>
            <div className="mt-[40px] text-[24px] md:text-[30px] font-semibold text-center text-[#282d32]">
              Get <span className="font-extrabold"> FREE </span>Job Alerts
            </div>
            <div className="mt-[40px] text-[27px] md:text-[40px] font-bold text-center text-[#75747c]">
              DOWNLOAD NOW
            </div>
          </div>
          <div className="flex  justify-center">
            <div className="flex flex-row mt-[40px] justify-around">
              <div className="w-[50%] px-[4%]">
                <a
                  href={options.googlePlayAppUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={AppImages.googlePlay} alt="" />
                </a>
              </div>
              <div className="w-[50%] px-[4%]">
                <a
                  href={options.appStoreAppUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={AppImages.apple} alt="" className="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmittedForm