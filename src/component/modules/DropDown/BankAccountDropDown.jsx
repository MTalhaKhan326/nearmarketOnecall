import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
const BankAccountDropdown = () => {
    const { userId } = useParams();
    let uid = 1;
    console.log("UserId",userId);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false); 
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };
  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
  };

  return (
    <div>
      <Header />
      <div className="text-[18px] ml-6">
        {" "}
        Hi! We would like to inform you that you have been successfully enrolled
        in the One Call app. If you wish to expand your opportunities, you can
        now subscribe to our package. Thank you!
      </div>
      <button
        onClick={toggleDropdown}
        className="bg-slate-200 mt-2 w-full border-[1px] border-b-black hover:bg-gray-300 h-[48px] text-[22px] font-semibold"
      >
        Bank Account Details
      </button>
      {isOpen && (
        <div className="ml-6 my-[40px]">
          <p className="text-[14px]">Account Title</p>
          <p className="text-[18px]">NODEO COMPUTING</p>
          <p className="text-[14px]">Account No</p>
          <p className="text-[18px]">02570104987755</p>
          <p className="text-[14px]">Bank Name</p>
          <p className="text-[18px]">MEEZAN BANK</p>
          <p className="text-[14px]">Branch Code</p>
          <p className="text-[18px]">0257 DHA Phase 5</p>
          <p className="text-[14px]">IBAN</p>
          <p className="text-[18px]">PK51MEZN0002570104987755</p>
        </div>
      )}
      <button
        onClick={toggleDropdown1}
        className="bg-slate-200 w-full border-[1px] border-b-black hover:bg-gray-300 h-[48px] text-[22px] font-semibold"
      >
        EasyPaisa
      </button>
      {isOpen1 && (
        <div className="ml-6 my-[40px]">
          <p className="text-[14px]">Account Title</p>
          <p className="text-[18px]">Gohar Sultan</p>
          <p className="text-[14px]">Account No</p>
          <p className="text-[18px]">03414151343</p>
        </div>
      )}
      <button
        onClick={toggleDropdown2}
        className="bg-slate-200 w-full mb-[40px] border-[1px] border-b-black hover:bg-gray-300 h-[48px] text-[22px] font-semibold"
      >
        JazzCash
      </button>
      {isOpen2 && (
        <div className="ml-6 mb-[50px]">
          <p className="text-[14px]">Account Title</p>
          <p className="text-[18px]">Gohar Sultan</p>
          <p className="text-[14px]">Account No</p>
          <p className="text-[18px]">03249565957</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BankAccountDropdown;
