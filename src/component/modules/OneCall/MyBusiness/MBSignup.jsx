import { useContext, useMemo, useState} from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MBUploadPhotos from "./MBUploadPhotos.jsx";
import { AppImages } from "../../../../Asset/images/image.js";
import { LAMBDA_API_BUSINESS_PORTAL_URL, MyBusinessContext } from "../contexts/MyBusinessContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import AppToastContainer from "../../../basic/AppToast.jsx";
import FlutterInterface from "../../../../utils/flutter_interface.js";
import { isIOS } from "../../../../utils/helpers.js";

function MBSignup() {
  const ctx = useContext(MyBusinessContext)
  const navigate = useNavigate();
  console.log('isIos?', isIOS())
  const isApple = useMemo(() => isIOS())
  const fields = {
    phone: null,
    name: null,
    address: null,
    category: null,
    images: null,
    terms: null,
  }
  const [formFields, setFormFields] = useState(fields)
  const [fieldErrors, setFieldErrors] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors(null)
    console.log(formFields)
    setIsLoading(true)
    
    const errors = {} 
    if(!formFields.phone) {
      errors.phone = "Please enter your phone number"
    }
    if(!formFields.name) {
      errors.name = "Please enter name of your business"
    }
    if(!formFields.address) {
      errors.address = "Please enter address of your business"
    }
    if(!formFields.category) {
      errors.category = "Please choose category your business belongs to."
    }
    if(!formFields.terms) {
      errors.terms = "This field is required"
    }

    if(Object.keys(errors).length) {
      setFieldErrors(errors)
      setIsLoading(false)
      return;
    }
    // console.log('going to call interface func from js');
    // FlutterInterface.updateBusinessInsideApp("65153e6579f81605ef61baeb").then(res => {
    //   console.log('success in interface func call');
    //   console.log(res)
    // }).catch(e => {
    //   console.log('error inside interface func call');
    //   console.log(e)
    // }).finally(() => {
    //   setIsLoading(false)
    // })
    let lat = ctx.env?.lat 
    let lng = ctx.env?.lng 

    if(!lat || !lng) {
      const loc = await FlutterInterface.getLocation();
      if(loc?.lat && loc?.lng) {
        lat = loc?.lat 
        lng = loc?.lng 
        ctx.setEnv({...ctx.env, lat: lat, lng: lng})
      } else {
        toast.error("Please enable your location")
        return;
      }
    }

    let user_id = ctx.env?.user_id 
    if(!user_id) {
      user_id = await FlutterInterface.getUserId()
      if(user_id) {
        ctx.setEnv({...ctx.env, user_id: user_id})
      }
    }

    axios.post(LAMBDA_API_BUSINESS_PORTAL_URL + "/app/my-business/create-business", {
      user_id: user_id,
      name: formFields.name,
      phone: formFields.phone,
      address: formFields.address,
      category: formFields.category,
      lat: lat,
      lng: lng,
    }).then(async res => {
      console.log(res.data)
      if(res.data?.status != 200) {
        throw res.data 
      } else {
        await FlutterInterface.updateBusinessInsideApp(res.data?.data?.business?._id)
        toast.success("New Business Created", {
          position: toast.POSITION.TOP_RIGHT
        })
        ctx.setBusiness({...res.data?.data?.business, id: res.data?.data?.business?._id})
        navigate("/app/my-business/stats")
      }
    }).catch(e => {
      console.log(e)
      if(e?.error) {
        toast.error(
          e?.isOperationalError ? "Something went wrong" : e?.message,
          {
            position: toast.POSITION.TOP_RIGHT
          }
        )
      }
    }).finally(() => {
      setIsLoading(false)
    })
  };
  return (  
    <>
      <Helmet>
        <style>{`
          .PhoneInputInput {
            background-color: rgb(243 244 246 / var(--tw-bg-opacity));
            padding: 0.75rem;
            outline-color: #2196F3;
          }
          `}
        </style>
      </Helmet>
      <AppToastContainer />
      <div className="flex flex-col items-center w-[full]">
        <form
          onSubmit={onSubmit}
          className="text-[#2B2B2B]  mt-[25px] text-[20px] w-[80%] md:w-[60%] mx-auto"
        >
          <div className="">
            <div className=" ">
              <div>
                <div className="text-[13px] my-1">Mobile Number</div>
                <PhoneInput
                  className="px-2 text-[13px] rounded-md w-full bg-gray-100 focus:outline-none"
                  placeholder="Enter phone number"
                  onChange={(val) => setFormFields({...formFields, phone: val})}
                  defaultCountry="PK"
                  countries={["PK"]}
                  addInternationalOption={false}
                  smartCaret={false}
                />
                {fieldErrors?.phone ? <TextFieldError text={fieldErrors?.phone} /> : <></>}
              </div>
              <TextField 
                label={"Business Name"}
                placeholder="Enter your business name"
                error={fieldErrors?.name}
                onChange={(e) => setFormFields({...formFields, name: e.target.value})}
              />
              <TextField 
                label={"Business Address"}
                placeholder="Enter your business address"
                error={fieldErrors?.address}
                onChange={(e) => setFormFields({...formFields, address: e.target.value})}
              />
              
              <div className="mt-4">
                <TextFieldLabel label={"Business Category"} />
                <select 
                  className={"text-[13px] block w-full bg-gray-100 py-3 rounded-md px-3 focus:outline-[#2196F3]" + (isApple ? " appearance-none h-[42px]" : "")}
                  onChange={(e) => setFormFields({...formFields, category: e.target.value})}
                >
                  <option>Choose one..</option>
                  {ctx.categories?.map((item, index) => 
                    <option key={'business_cat_' + index} value={item.name}>{item.label}</option>
                  )}
                </select>
                {fieldErrors?.category ? <TextFieldError text={fieldErrors?.category} /> : <></>}
              </div>

              <div className="mt-4">
                <TextFieldLabel label="Add Media (Optional)" />
                {fieldErrors?.images ? <TextFieldError text={fieldErrors?.images} /> : <></>}
                <MBUploadPhotos />
              </div>

              <div className="mt-4 mb-4">
                <div className="flex items-start">
                  <input type="checkbox" className="mr-4 my-2" id="field-terms" onChange={e => setFormFields({...formFields, terms: e.target.checked})} />
                  <TextFieldLabel label={"By checking this box, you are agreeing to our terms of service."} htmlFor={"field-terms"} />
                </div>
                {fieldErrors?.terms ? <TextFieldError text={fieldErrors?.terms} /> : <></>}
              </div>
            </div>
          </div>

          <div className="">
            <button className="rounded-md py-2 mb-5 text-[15px] w-full bg-[#009bfb] hover:bg-lightBlue-600 text-white disabled:bg-slate-200" disabled={isLoading}>  
              {isLoading ? 
                <img src={AppImages.loading} className="w-[20px] mx-auto" /> :
                <span>Sign Up</span>
              }
            </button>
            <button className="text-center text-[#24ACE3] border-b-[1px] px-4 border-[#24ACE3] block mx-auto text-[14px]" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
        </form>
      </div>
    </>
  );
}

function TextFieldLabel({ label, htmlFor }) {
  return <label htmlFor={htmlFor} className="text-[13px] my-1">{label}</label>
}

function TextField({ label, id, placeholder = "", onChange, error = null }) {
  return (
    <div className="mt-4">
      <TextFieldLabel label={label} htmlFor={id} />
      <input
        id={id}
        type="text"
        placeholder={placeholder ?? label}
        className="bg-gray-100 px-3 py-3 border-[#5e5954] rounded-md focus:outline-[#2196F3] w-full text-[13px]"
        onChange={onChange}
      />
      {error ? <TextFieldError text={error} /> : <></>}
    </div>
  )
}

function TextFieldError({ text }) {
  return <div className="text-red-500 text-[13px] my-1">{text}</div>
}

export default MBSignup;