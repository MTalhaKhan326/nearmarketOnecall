import React from 'react';
import WebHeader1 from './WebHeader1';
import Footer1 from './Footer1';
import { AppImages } from '../Asset/images/image';

const Mobileshop = () => {
  const redirectToWhatsApp = () => {
    // Replace '1234567890' with the actual WhatsApp number you want to redirect to
    const phoneNumber = '03074084811';
    // You can also include a message, if needed
    const message = 'Hello, I am interested in the best offers.';
    // Generate the WhatsApp URL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Redirect the user to the WhatsApp URL
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
          {/* Add the onClick event to the button */}
          <div
            className='mt-[3%] bg-[#38bdf8] w-[40%] h-[40px] cursor-pointer py-[12px] text-[12px] text-white text-center rounded-md'
            onClick={redirectToWhatsApp}
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
            onClick={redirectToWhatsApp}
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