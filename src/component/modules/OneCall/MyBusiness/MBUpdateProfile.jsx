import { useContext, useEffect, useState} from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import MBUploadPhotos from "./MBUploadPhotos.jsx";
import { AppImages } from "../../../../Asset/images/image.js";
import { LAMBDA_API_BUSINESS_PORTAL_URL, MyBusinessContext } from "../contexts/MyBusinessContext.jsx";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { BiArrowFromRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { MdArrowRight } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import AppToastContainer from "../../../basic/AppToast.jsx";

function MBUpdateProfileScreen() {
  const ctx = useContext(MyBusinessContext)
  const navigate = useNavigate();
  const fields = {
    name: ctx.business?.name,
    address: ctx.business?.address,
    category: null,
    images: null,
    account_holder_name: null,
    bank_code: null,
    branch_code: null,
    account_number: null 
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
    // if(!formFields.phone) {
    //   errors.phone = "Please enter your phone number"
    // }
    if(!formFields.name) {
      errors.name = "Please enter name of your business"
    }
    if(!formFields.address) {
      errors.address = "Please enter address of your business"
    }
    // if(!formFields.category) {
    //   errors.category = "Please choose category your business belongs to."
    // }
    // if(!formFields.terms) {
    //   errors.terms = "This field is required"
    // }

    if(Object.keys(errors).length) {
      setFieldErrors(errors)
      setIsLoading(false)
      return;
    }

    axios.post(LAMBDA_API_BUSINESS_PORTAL_URL + "/app/my-business/update-business", {
      ...formFields,
      business_id: ctx.business?._id  
    }).then(res => {
      if(res?.data?.status === 200) {
        toast.success("Profile updated successfully")
        ctx.setBusiness({...res?.data?.data?.business, id: res?.data?.data?.business?._id})
      } else {
        throw res?.data 
      }
    }).catch(e => {
      toast.error(
        e?.error ? e?.isOperationalError ? "Something went wrong" : e?.message : "Something went wrong",
      )

    }).finally(() => {
      setIsLoading(false)
    })
  };

  useEffect(() => {
    if(ctx.business) {
      setFormFields({
        ...formFields,
        name: ctx.business.name,
        address: ctx.business.address,
        category: ctx.business.category,
        phone: ctx.business.phone 
      })
    }
  }, [ctx.business])
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
                  className="px-2 text-[13px] rounded-md w-full bg-gray-100 focus:outline-none disabled:bg-gray-300"
                  placeholder="Enter phone number"
                  onChange={(val) => setFormFields({...formFields, phone: val})}
                  defaultCountry="PK"
                  countries={["PK"]}
                  addInternationalOption={false}
                  smartCaret={false}
                  value={ctx.business?.phone}
                  disabled
                />
                {fieldErrors?.phone ? <TextFieldError text={fieldErrors?.phone} /> : <></>}
              </div>
              <TextField 
                label={"Business Name"}
                placeholder="Enter your business name"
                error={fieldErrors?.name}
                onChange={(e) => setFormFields({...formFields, name: e.target.value})}
                value={ctx.business?.name ?? ""}
              />
              <TextField 
                label={"Business Address"}
                placeholder="Enter your business address"
                error={fieldErrors?.address}
                onChange={(e) => setFormFields({...formFields, address: e.target.value})}
                value={ctx.business?.address ?? ""}
              />
              
              <div className="mt-4">
                <TextFieldLabel label={"Business Category"} />
                <select 
                  className="text-[13px] block w-full bg-gray-100 disabled:bg-gray-300 py-3 rounded-md px-3 focus:outline-[#2196F3]"
                  onChange={(e) => setFormFields({...formFields, category: e.target.value})}
                  value={ctx.business?.category}
                  disabled
                >
                  <option>Choose one..</option>
                  <option value={ctx.business?.category}>{ctx.business?.category}</option>
                </select>
                {fieldErrors?.category ? <TextFieldError text={fieldErrors?.category} /> : <></>}
              </div>

              <div className="mt-4">
                <TextFieldLabel label="Add Media (Optional)" />
                {fieldErrors?.images ? <TextFieldError text={fieldErrors?.images} /> : <></>}
                <MBUploadPhotos />
              </div>

              <div className="my-2">
                <Accordion allowZeroExpanded allowMultipleExpanded className="border-0 bg-slate-50">
                  <AccordionItem>
                      <AccordionItemHeading >
                        <AccordionItemButton className="text-[13px] bg-gray-100 px-3 py-2">
                          <div className="flex items-center">
                            <span><MdArrowRight size={"20px"} /></span>
                            <span className="text-[13px]">Bank</span>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="px-1">
                          <div>
                            <div>
                              <TextField placeholder="Account Holder Name" onChange={e => setFormFields({...formFields, account_holder_name: e.target.value})} />
                            </div>
                            <div className="flex items-center gap-1">
                              <TextField placeholder="Bank Code" onChange={e => setFormFields({...formFields, bank_code: e.target.value})} />
                              <TextField placeholder="Branch Code" onChange={e => setFormFields({...formFields, branch_code: e.target.value})} />
                            </div>
                            <div>
                              <TextField placeholder="Account Number" onChange={e => setFormFields({...formFields, account_number: e.target.value})} />
                            </div>
                          </div>
                      </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="">
            <button className="rounded-md py-2 mb-5 text-[15px] w-full bg-[#009bfb] hover:bg-lightBlue-600 text-white disabled:bg-slate-200" disabled={isLoading}>  
              {isLoading ? 
                <img src={AppImages.loading} className="w-[20px] mx-auto" /> :
                <span>Update</span>
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

function TextField({ value, label, id, placeholder = "", onChange, error = null }) {
  return (
    <div className="mt-4">
      <TextFieldLabel label={label} htmlFor={id} />
      <input
        id={id}
        type="text"
        placeholder={placeholder ?? label}
        className="bg-gray-100 px-3 py-3 border-[#5e5954] rounded-md focus:outline-[#2196F3] w-full text-[13px]"
        onChange={onChange}
        value={value}
      />
      {error ? <TextFieldError text={error} /> : <></>}
    </div>
  )
}

function TextFieldError({ text }) {
  return <div className="text-red-500 text-[13px] my-1">{text}</div>
}

export default MBUpdateProfileScreen;