import React from 'react'
import VideoSection from './VideoSection';
import { AppImages } from '../Asset/images/image';
import axios from 'axios';
import { useEffect } from 'react';

const DPage = () => {
  useEffect(() => {
    document.title = "OneCall";
  }, []);
    useEffect(() => {
      // document.title("OneCall");
      const postData = async () => {
        try {
          const response = await axios.post(
            "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
            {
              tag: "gp_link_load",
              value: JSON.stringify({
                localTime: new Date(),
                link: window.location.href,
              }),
              decodeJson: "true",
            }
          );

          console.log(response.data); // Handle the response data as desired
        } catch (error) {
          console.error(error); // Handle any errors that occur during the request
        }
      };

      postData();
    }, []);
    const options = {
      googlePlayAppUrl:
        "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
      appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
      baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro",
    };
    const handleButtonAndroid = async () => {
      // onGooglePlayClick();
      try {
        //   console.log("id", id);
        const response = await axios.post(
          "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
          {
            tag: "gp_clicked_on_appstore_btn",
            value: JSON.stringify({
              localTime: new Date(),
              link: window.location.href,
              store: "androidclick",
            }),
            decodeJson: "true",
          }
        );

        console.log(response.data); // Handle the response data as desired
      } catch (error) {
        console.error(error); // Handle any errors that occur during the request
      }
    };
    const handleButtonIos = async () => {
      //  onAppStoreClick();
      try {
        //   console.log("id", id);
        const response = await axios.post(
          "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
          {
            tag: "gp_clicked_on_appstore_btn",
            value: JSON.stringify({
              localTime: new Date(),
              link: window.location.href,
              store: "iosclick",
            }),
            decodeJson: "true",
          }
        );

        console.log(response.data); // Handle the response data as desired
      } catch (error) {
        console.error(error); // Handle any errors that occur during the request
      }
    };
      const handleButtonClick = async (phone) => {
        try {
          //  console.log("id", id);
          const response = await axios.post(
            "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
            {
              tag: "gp_link_clicked_on_call_now",
              value: JSON.stringify({
                localTime: new Date(),
                link: window.location.href,
                //  customQueryId: id,
              }),
              decodeJson: "true",

              // Add more key-value pairs as needed
            }
          );

          console.log(response.data); // Handle the response data as desired
        } catch (error) {
          console.error(error); // Handle any errors that occur during the request
        }

        console.log("phoneee", phone);
        window.location.href = `tel:${phone}`;
      };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-[90%] md:w-[40%]">
        <div className="sm:text-[35px] text-[25px] my-2 text-[#0E1F58] text-center">
          Download One Call App
        </div>
        <div className="mb-4 md:mt-2 ">
          <VideoSection
            videoUrl={"https://www.youtube.com/embed/aoyl9JSoE2k"}
          />
        </div>
        <div className=" block md:flex justify-center items-center pb-[2px] font-medium text-[14px] text-center">
          <div className="flex justify-center">
            <div className="m-1">
              <a
                href={options.googlePlayAppUrl}
                rel="noreferrer"
                target="_blank"
                onClick={handleButtonAndroid}
              >
                <img
                  src={AppImages.googlePlay}
                  alt=""
                  className="sm:w-[100px] md:w-[280px]"
                />
              </a>
            </div>
            <div className="m-1">
              <a
                href={options.appStoreAppUrl}
                rel="noreferrer"
                target="_blank"
                onClick={handleButtonIos}
              >
                <img
                  src={AppImages.apple}
                  className="sm:w-[100px] md:w-[280px]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="text-[14px] md:text-[20px] text-[#0E1F58] my-2">
          Find all kind of products, services and assistance in your area. And
          promote your business online and within your community with One Call
          App. For more information visit www.onecallapp.com
        </div>
        <div className="flex justify-center">
          <button
            className="form-button rounded-md mb-5 items-center text-[17px] h-[35px] w-[100px] md:px-2 md:w-[175px] md:h-[50px] bg-[#009adb] hover:bg-lightBlue-600 text-white" onClick={() => handleButtonClick('0300 5510221')}
          >
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DPage