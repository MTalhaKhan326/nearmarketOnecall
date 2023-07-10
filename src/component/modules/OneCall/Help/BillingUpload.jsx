import React, { useContext, useRef, useState } from "react";
import { AppImages } from "../../../../Asset/images/image.js";
import firebase_service from "../../../../utils/firebase_service.js";
import { getDownloadURL, ref as firebase_ref, uploadBytesResumable } from "firebase/storage";
import ReactModal from "react-modal";
import axios from "axios";
import FlutterInterface from "../../../../utils/flutter_interface.js";
import { useSearchParams } from "react-router-dom";
import PackageSelectionField from "./PackageSelectionField.jsx";
import { HelpContext } from "../contexts/HelpContext.jsx";
const BillingUpload = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState({ message: null })
  const [isSubmitBtnEnabled, enableSubmitBtn] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const fileRef = useRef(null)
  const [searchParams] = useSearchParams()
  const helpContext = useContext(HelpContext)

  const handleSubmit = (e) => {
    if(searchParams.has('dev_test')) {
      FlutterInterface.askCameraPermission().then(isAllowed => {
        console.log('isCameraAllowed', isAllowed)
      })
    }
    if(!selectedItem) {
      setError({ message: "Please upload an image" })
      return
    }

    if(!helpContext.billingFormSelectedPackage) {
      setError({ message: 'Please choose a package' })
      return;
    }
    if(!helpContext.billingFormSelectedDuration) {
      setError({ message: 'Please choose duration' })
      return;
    }
    if(!helpContext.businessCategory) {
      setError({ message: 'Please choose business category in business profile' })
      return;
    }

    enableSubmitBtn(false)

    uploadOnFirebase({
      onProgress: progress => {
        setSelectedItem({
          ...selectedItem,
          status: 'uploading',
          progress: progress
        })
      },
      onSuccess: url => {
        submitReceipt({url}).then(res => {
          if(res.status === 200 && res.isSubscribed) { 
            setShowSuccessModal(true)
          } else {
            setSelectedItem(null)
            if(fileRef?.current) {
              fileRef.current.value = ""
            }
            setError({message: res.subscriptionError ?? res.error ?? "Something went wrong"})  
          }
        }).finally(() => {
          setSelectedItem(null)
          if(fileRef?.current) {
            fileRef.current.value = ""
          }
        })
      }
    })
  };

  async function submitReceipt(args = {url: null}) {
    try {
      if(!args.url) {
        return {
          status: 400,
          error: 'Image did not upload successfully'
        }
      }
      const user_id = await FlutterInterface.getUserId()
      console.log('user_id', user_id)
      if(!user_id) {
        return {
          status: 400,
          error: 'You need to login first'
        }
      }
      if(!helpContext.billingFormSelectedPackage) {
        return {
          status: 400,
          error: "Please choose package"
        }
      }
      if(!helpContext.billingFormSelectedDuration) {
        return {
          status: 400,
          error: "Please choose duration"
        }
      }
      if(!helpContext.businessCategory) {
        return {
          status: 400,
          error: "Please choose business category in business profile"
        }
      }
      const location = await FlutterInterface.getLocation().catch(e => null)
      const payload = {
        image_url: args.url,
        user_id: user_id,
        lat: location?.lat,
        lng: location?.lng,
        package: helpContext.billingFormSelectedPackage,
        duration: helpContext.billingFormSelectedDuration,
        category: helpContext.businessCategory
      }
      let res = await axios.post(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/onecall/web/help/submit-receipt`, payload)
      if(res?.data.status === 200) {
        return {
          status: 200,
          success: true,
          isSubscribed: Boolean( res.data.data?.is_subscribed ),
          subscriptionError: res.data.data?.subscription_error,
          subscriptionMessage: res.data.data?.subscription_message  
        }
      }
      throw res.data 
    } catch(e) {
      let errorMessage = ""
      // console.log('API ERROR::');
      // if(typeof e == 'object') {
      //   console.log(JSON.stringify(e))
      // } else if (e instanceof Error) {
      //   console.log(e.message)
      // } else {
      //   console.log(e)
      // }
      if(e instanceof Error) {
        errorMessage = e.message
      } else if (typeof e == 'object' && e.message) {
        errorMessage = e.message 
      } else {
        errorMessage = 'Error: Something went wrong. Please try again'
      }
      
      return {
        status: 500,
        error: errorMessage
      }
    }
  }

  function uploadOnFirebase(args = {onProgress: null, onSuccess: null}) {
    if(selectedItem == null) return;

    const _ref = firebase_ref(firebase_service.storage, `/billing-upload-files/${Date.now() + "-" + selectedItem.file.name}`)
    const uploadTask = uploadBytesResumable(_ref, selectedItem.file)
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
          const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if(typeof args.onProgress === 'function') {
              args.onProgress(progress)
          }
      },
      (error) => {
          console.log('error uploading')
          console.log(error)
      },
      async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          console.log(url)
          if(typeof args.onSuccess === 'function') {
              args.onSuccess(url)
          }
      }
    )
  }

  function handleOnInput(e) {
    if(!e.target.files || !e.target.files[0]) {
      setError({ message: "Please upload an image" })
      return null;
    }
    const file = e.target.files[0]
    const isImage = file.type.split('/')[0] === 'image'
    if(!isImage) {
      setError({message: "File is not an image"})
      setSelectedItem(null)
      e.target.value = ""
      return
    }

    if(file.size > 2e+6) { // max size: 2mb
      setError({message: "File size exceeded"})
      setSelectedItem(null)
      e.target.value = ""
      return;
    }

    setError({ message: null })
    const item = {
      type: 'image',
      file: file,
      time: new Date(),
      status: 'pending'
    }
    setSelectedItem(item)
    enableSubmitBtn(true)
  }

  function handleClickOnCrossButton(e) {
    setSelectedItem(null)
    if(fileRef?.current) {
      fileRef.current.value = ""
    }
    enableSubmitBtn(false)
  }

  return (
    <div className="flex flex-col px-2 gap-6">
      <PackageSelectionField />
      <div>
        <p className="text-sm">Please Upload the Image of your receipt:</p>
        <ul className="text-[12px] list-disc text-slate-500">
          <li>File types allowed: jpg, jpeg, png</li>
          <li>Maximum file size allowed: 2 MB</li>
        </ul>
      </div>
      <div className="flex justify-center items-center">
        <div 
          className="w-[150px] h-[150px] mx-auto my-2 border-2 border-dashed rounded border-gray-300 relative bg-slate-100 cursor-pointer"
          onClick={e => {
            if(!helpContext.billingFormSelectedPackage) {
              setError({ message: 'Please choose a package' })
              return;
            }
            if(!helpContext.billingFormSelectedDuration) {
              setError({ message: 'Please choose duration' })
              return;
            }
            fileRef?.current?.click()
          }}
        >
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[12px] text-gray-400 text-center">Choose Image</div>
        </div>
        {selectedItem && <div className="relative w-[150px] border-2 border-gray-200">
        <div>
          <img 
            src={URL.createObjectURL(selectedItem.file)} 
            className="w-[150px] h-[150px] mx-auto my-0 inline object-cover object-center"
            alt="receipt"
          />
          {selectedItem.status === 'pending' && 
            <span 
              onClick={handleClickOnCrossButton}
              className="absolute top-[-10px] right-[-10px] bg-white rounded-full border-[1px] border-red-400 px-[5px] cursor-pointer"
              title="Delete"
            >
              <img src={AppImages.close} alt="close" className="w-[15px] inline svg-red" />
            </span>
          }
          {selectedItem.status === 'uploading' && 
            <span className="absolute top-0 w-[150px] h-[150px] bg-[#000000aa] opacity-[0.9] block">
              <img src={AppImages.loading} alt="loading" className="w-[25px] h-[25px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] svg-white" />
              <span className="text-[10px] text-white absolute top-[65%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                {Math.ceil(selectedItem.progress) ?? 100} %
                </span>
            </span>
          }
        </div>
        <div >
        </div>
      </div>}

      </div>
      {error.message && <div className="text-red-500 my-2 p-2 bg-red-100 border-l-4 border-red-700 flex justify-between items-center"><span>{error.message}</span><span onClick={e => setError({ message: null })}><img src={AppImages.close} alt="close" className="w-[20px] svg-red" /></span></div>}
      <input 
        type="file" 
        onChange={handleOnInput}
        accept="image/jpg,image/jpeg,image/png"
        ref={fileRef}
        className="hidden"
      />
      <button
        disabled={!isSubmitBtnEnabled}
        className={`rounded-full px-6 py-2 ${isSubmitBtnEnabled ? "bg-gray-700 text-white" : "bg-gray-200 text-white"}`}
        onClick={handleSubmit}
      >
        Submit
      </button>

      {showSuccessModal && <ReactModal
          isOpen={true}
          className="Modal Success-Modal"
          overlayClassName="Modal-Overlay"
      >
          <div className="p-4">
              <div className="flex items-center justify-center">
                  <img src={AppImages.checkmark} alt="checkmark" className="w-[60px] svg-green" />
              </div>
              <p className="text-center my-4 text-green-600 font-medium">Your receipt has been submitted successfully and you have subscribed to "Listing Plan"</p>
              <div className="text-center p-2 cursor-pointer" onClick={e => {
                  setShowSuccessModal(false)
              }}><p className=" font-bold text-[14px] text-green-600 border-dotted border-b-[1px] inline">DONE</p></div>
          </div>
      </ReactModal>}
    </div>
  );
};

export default BillingUpload;