import React from 'react';
import WebHeader1 from './WebHeader1';
import Footer1 from './Footer1';
import { AppImages } from '../Asset/images/image';
import axios from 'axios';



const Mobileshop = () => {
    async function log(tag, value) {
     return axios.post(
       "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/log",
       {
         tag,
         value: JSON.stringify({
           ...value,
           localTime: new Date(),
           link: window.location.href,
         }),
         decodeJson: "true",
       }
     );
   }

  const redirectToWhatsApp = (message) => {
    const phoneNumber = '923095557566';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    log('oc_clicked_on_whatsapp_btn_mobileshop', {
      phone: phoneNumber,
      message,
      url
    })
    window.location.href = url;
  };
  
  return (
    <div className='mainn'>
      <WebHeader1 />
      <div className='border-[1px]'></div>

      <div className='px-[2%] mt[3%]'>
        <h1 className='text-[#2b2b2b] text-[16px] font-semibold mt-[5%]'>Starting from 3,000 Only</h1>

        <div className='flex flex-row justify-between h-[100px] mt-[3%] mb-[3%] w-full px-[10%] '>
          <img src={AppImages.ph1} className='' />
          <img src={AppImages.ph2} className='' />
          <img src={AppImages.ph3} className='' />
          <img src={AppImages.ph4} className='' />
        </div>

        <div className='flex justify-end color '>
      
          <div
            className='mt-[3%] bg-[#38bdf8] w-[40%] h-[40px] cursor-pointer py-[12px] text-[12px] text-white text-center rounded-md'
            onClick={()=>redirectToWhatsApp('Please send me best offers for mobile phone within 3,000 budget')}
          >
            Find me Best Offers
          </div>
        </div>

        <h1 className='text-[12px] mt-[2%] mb-[5%]'>
          Your request will be posted in the One Call app to find you the best possible offer
          from the businesses near you.
        </h1>
      </div>

      <div className='border-[1px]'></div>

      <div className='px-[2%] mt[3%]'>
        <h1 className='text-[#2b2b2b] text-[16px] font-semibold mt-[5%] '>Starting from 10,000 Only</h1>

        <div className='flex flex-row justify-between h-[100px] mt-[3%] mb-[3%] w-full px-[10%] '>
          <img src={AppImages.ph5} className='' />
          <img src={AppImages.ph6} className='' />
          <img src={AppImages.ph7} className='' />
          <img src={AppImages.ph8} className='' />
        </div>
        <div className='flex justify-end color '>
          {/* Add the onClick event to the button */}
          <div
            className='mt-[3%] bg-[#38bdf8] w-[40%] h-[40px] cursor-pointer py-[12px] text-[12px] text-white text-center rounded-md'
            onClick={()=>redirectToWhatsApp('Please send me best offers for mobile phone within 10,000 budget')}
          >
            Find me Best Offers
          </div>
        </div>
        <h1 className='text-[12px] mt-[2%] mb-[5%]'>
          Your request will be posted in the One Call app to find you the best possible offer
          from the businesses near you.
        </h1>
      </div>
      <div className='border-[1px]'></div>
      <div className='mt-[8%]'>
        <Footer1 />
      </div>
    </div>
  );
};

export default Mobileshop;