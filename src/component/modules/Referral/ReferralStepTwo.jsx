import { ref } from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import ReferralContext from "./ReferralContext.jsx";

function ReferralStepTwo() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const referralContext = useContext(ReferralContext)
  
  useEffect(() => {
    if(ref1.current != null) {
      ref1.current.focus()
    }
  }, [])
  return (  
    <form action="">
      <div>Enter the 4-digit code we sent on number: {referralContext.phone ?? ""}</div>
      <div className="flex items-center justify-center my-6">
        <div className="mr-4">
          <input 
            type="text" 
            ref={ref1}
            className="w-[40px] border-b-2 border-black bg-transparent text-center focus:outline-none text-[24px]" 
            onChange={e => {
              if(e.target.value?.length >= 1) {
                ref2.current?.focus()
              }
            }}
          />
        </div>

        <div className="mr-4">
          <input 
            type="text" 
            ref={ref2}
            className="w-[40px] border-b-2 border-black bg-transparent text-center focus:outline-none text-[24px]" 
            onKeyDown={e => {
              if(e.key === 'Backspace' && e.target.value?.length === 0) {
                e.target.value = ""
                ref1.current.focus()
              }
            }}
            onChange={e => {
              if (e.target.value?.length >= 1) {
                ref3.current.focus()
              }
            }}
          />
        </div>

        <div className="mr-4">
          <input 
            type="text" 
            ref={ref3}
            className="w-[40px] border-b-2 border-black bg-transparent text-center focus:outline-none text-[24px]" 
            onKeyDown={e => {
              if(e.key === 'Backspace' && e.target.value?.length === 0) {
                e.target.value = ""
                ref2.current.focus()
              } 
            }}
            onChange={e => {
              if (e.target.value?.length >= 1) {
                ref4.current.focus()
              }
            }}
          />
        </div>

        <div>
          <input 
            type="text" 
            ref={ref4}
            className="w-[40px] border-b-2 border-black bg-transparent text-center focus:outline-none text-[24px]" 
            onKeyDown={e => {
              if(e.key === 'Backspace' && e.target.value?.length === 0) {
                e.target.value = ""
                ref3.current.focus()
              } 
            }}
          />
        </div>

      </div>
    </form>
  );
}

export default ReferralStepTwo;