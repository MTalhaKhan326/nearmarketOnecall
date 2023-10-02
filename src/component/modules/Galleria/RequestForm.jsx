import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppImages } from "../../../Asset/images/image.js";
import { PakistanCities } from "../../../utils/data/pk-cities.js";
import SimpleModal from "../../basic/SimpleModal.jsx";
import axios from "axios";
import GalleriaFavIcon from "./GalleriaFavIcon.jsx";
import GalleriaMSClarity from "./Analytics/GalleriaMSClarity.jsx";
import GalleriaGoogleAnalytics from "./Analytics/GalleriaGoogleAnalytics.jsx";
import { getBrowser, getOperatingSystem } from "../../../utils/helpers.js";
import GalleriaMetaPixel from "./Analytics/GalleriaMetaPixel.jsx";
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

function GalleriaRequestForm() {
  const [viewPurpose, setViewPurpose] = useState(null)
  const fields = {
    type: null,
    plotSize: null,
    service: null,
    location: null,
    name: null,
    phone: null,
    city: null,
    email: null,
  }
  const [formFields, setFormFields] = useState(fields)
  const [fieldErrors, setFieldErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fieldsStartRef = useRef(null)

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  function onSubmit(e) {
    e.preventDefault()
    setFieldErrors({})

    const errors = {}
    if(!formFields.type) {
      errors.type = "This field is required"
    }
    if(!formFields.plotSize) {
      errors.plotSize = "This field is required"
    }
    if(!formFields.service) {
      errors.service = "This field is required"
    }
    if(!formFields.location) {
      errors.location = "This field is required"
    }
    if(!formFields.name) {
      errors.name = "This field is required"
    }
    if(!formFields.phone) {
      errors.phone = "This field is required"
    } else {
      const ph = formFields.phone?.toString().replace(/[^0-9]/gi, "")
      if(ph.length < 10) {
        errors.phone = "Invalid phone number"
      }
    }
    if(!formFields.city) {
      errors.city = "This field is required"
    }
    if(formFields.email && !isValidEmail(formFields.email)) {
      errors.email = "Invalid email"
    }

    if(Object.keys(errors).length) {
      scrollToTop()
      setFieldErrors(errors)
      return;
    }

    setIsLoading(true)
    const apiUrl = "https://realestate.onecallapp.com/api/save-lead-queue"
    const payload = {
      name: formFields.name,
      phone: formFields.phone?.toString().replace(/[^0-9]/gi, ""),
      city: formFields.city,
      location: formFields.location,
      plot_size: formFields.plotSize,
      services: formFields.service,
      property_type: formFields.type,
      email: formFields.email
    }
    
    axios.post(apiUrl, payload).then(res => {
      setFormFields(fields)
      setFieldErrors({})
      setIsModalOpen(true)
      log("gd_req_api_response_save_lead", { success: true, apiUrl: apiUrl, apiPayload: payload, apiResponse: res?.data })
    }).catch(e => {
      log("gd_req_api_response_save_lead", { error: true, apiUrl: apiUrl, apiPayload: payload, error: e instanceof Error ? e.message : e })
    }).finally(() => {
      setIsLoading(false)
    })
  }

  async function getIP() {
    let ip = sessionStorage.getItem('ip')
    if(ip?.length) {
      return ip 
    }
    ip = await axios.get("https://api.ipify.org/?format=json").then(res => res?.data?.ip).catch(e => null)
    if(ip) {
      sessionStorage.setItem('ip', ip)
    }
    return ip 
  }

  function getUUID() {
    let uuid = localStorage.getItem("uuid")
    if(uuid) {
      return uuid
    }
    uuid = uuidv4()
    localStorage.setItem('uuid', uuid)
    return uuid 
  }

  async function log(tag, value) {
    value = {
      os: getOperatingSystem(window),
      browser: getBrowser(window),
      date: new Date(),
      url: window.location.href,
      uuid: getUUID(),
      ...value 
    }
    value = JSON.stringify(value)
    return axios.post(`https://realestate.onecallapp.com/api/gd-lead-log`, {tag, value}).catch(e => null)
  }

  function onViewProjects() {
    axios.post("https://realestate.onecallapp.com/api/project_view").catch(e => null)
    window.open("https://instagram.com/galleriadesigns.com.pk?igshid=OGQ5ZDc2ODk2ZA==", "_blank")
  }

  function scrollToTop() {
    fieldsStartRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const cityOptions = useMemo(() => PakistanCities.map(city => ({ value: city, label: city })))

  useEffect(() => {
    document.body.classList.add("bg-slate-200")
    const prevTitle = document.title 
    document.title = "Lead Generation"
    log('gd_req_page_view')
    return () => {
      document.title = prevTitle
    }
  }, [])

  return (  
    <>
      <GalleriaFavIcon />
      <GalleriaMSClarity />
      <GalleriaGoogleAnalytics />
      <GalleriaMetaPixel />

      <div className="block mx-auto mt-24 mb-16 px-4 bg-slate-200">
        <header className="border-2 rounded-lg bg-white shadow-md">
          <div className="relative">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-white">
              <img src={AppImages.galleriaDesignsLogo} className="object-cover object-center w-[150px] h-[150px] rounded-full border-[1px]" />
            </div>
          </div>
          <div className="mt-16 text-center p-4">
            <h1 className="text-gray-600 text-[24px] my-2">GALLERIA DESIGNS</h1>
            <h2 className="font-bold text-[18px] my-2">At Galleria Deisgns, We give Life to Your Dreams</h2>
            <p className="my-4">Galleria Designs is Full service Architectural, Construction, Interior Design, Furniture and landscaping firm.</p>
            <p className="text-[12px] text-slate-600">IF YOU HAVE CUSTOM REQUIEMENT FEEL FREE TO LEAVE YOUR CONTACT DETAILS AND OUR TEAM WILL GET IN TOUCH WITH YOU.</p>
          </div>
        </header>

        <main>
          <FieldWrapper>
            <button 
              className={ (viewPurpose === 'need-service' ? "bg-blue text-white" : "bg-slate-200") + " p-2 w-full text-center rounded-full cursor-pointer mx-auto block"}
              onClick={e => {
                setViewPurpose("need-service")
                log("gd_req_click_on_need_service")
                setTimeout(scrollToTop, 200)
              }}
            >
              Do you need any service?
            </button>
            <p className="text-center font-bold my-4 text-[14px]">OR</p>
            <button 
              className={ (viewPurpose === 'see-projects' ? "bg-blue text-white" : "bg-slate-200") + " p-2 w-full text-center rounded-full cursor-pointer mx-auto block"}
              onClick={e => {
                setViewPurpose("see-projects")
                log("gd_req_click_on_see_projects")
                onViewProjects()
              }}
            >
              Just want to view the projects?
            </button>
          </FieldWrapper>

          {viewPurpose === 'need-service' && <div ref={fieldsStartRef}>
            <FieldWrapper>
              <FieldLabel>Type <RequiredMark /></FieldLabel>
              <div className="my-2">
                <input type="radio" name="type" value="residential" id="type-res" onClick={e => setFormFields(old => ({...old, type: "residential"}))} />
                <label htmlFor="type-res" className="mx-2">Residential</label>
              </div>
              <div className="my-2">
                <input type="radio" name="type" value="commercial" id="type-comm" onClick={e => setFormFields(old => ({...old, type: "commercial"}))} />
                <label htmlFor="type-comm" className="mx-2">Commercial</label>
              </div>
              { fieldErrors?.type && <FieldError>{fieldErrors.type}</FieldError> }
            </FieldWrapper>

            <FieldWrapper>
              <div>
                <FieldLabel htmlFor={"plot-size"}>Plot Size <RequiredMark /></FieldLabel>
                <select name="plot-size" id="plot-size" className="border-2 border-slate-200 bg-slate-200 rounded-lg p-2 w-full my-2" onChange={e => setFormFields(old => ({...old, plotSize: e.target.value}))}>
                  <option value="">Choose plot size..</option>
                  {[
                    {label: '10 Marla', value: '10-marla'},
                    {label: '1 Kanal', value: '1-kanal'},
                    {label: '2 Kanal', value: '2-kanal'},
                    {label: '4 Kanal', value: '4-kanal'},
                    {label: '4 Kanal+', value: '4plus-kanal'},
                  ].map((item, index) => (
                    <option value={item.value} key={'plot-size-opt-' + index}>{item.label}</option>
                  ))}
                </select>
                { fieldErrors?.plotSize && <FieldError>{fieldErrors.plotSize}</FieldError> }
              </div>
              
            </FieldWrapper>

            <FieldWrapper>
                <FieldLabel htmlFor={"service"}>Service <RequiredMark /></FieldLabel>
                <select name="service" id="service" className="border-2 border-slate-200 bg-slate-200 rounded-lg p-2 w-full my-2" onChange={e => setFormFields(old => ({...old, service: e.target.value}))}>
                  <option value="">Choose service..</option>
                  {[
                    {"label":"ARHITECTURAL DESIGN SERVICES","value":"ARHITECTURAL DESIGN SERVICES"},{"label":"INTERIOR DESIGN SERVICES","value":"INTERIOR DESIGN SERVICES"},{"label":"CONSTRUCTION GREY","value":"CONSTRUCTION GREY"},{"label":"CONSTRUCTION FINISHES","value":"CONSTRUCTION FINISHES"},{"label":"PROJECT MANAGEMENT SERVICES","value":"PROJECT MANAGEMENT SERVICES"},{"label":"FURNITURE PRODUCTION","value":"FURNITURE PRODUCTION"}
                  ].map((item, index) => (
                    <option value={item.value} key={'plot-size-opt-' + index}>{item.label}</option>
                  ))}
                </select>
                { fieldErrors?.service && <FieldError>{fieldErrors.service}</FieldError> }
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel>Location <RequiredMark /></FieldLabel>
              <textarea
                id="location"
                className="block border-2 border-slate-200 rounded-lg w-full my-2 p-4"
                rows="3"
                placeholder="Enter your location.."
                onChange={e => setFormFields(old => ({...old, location: e.target.value}))}
              ></textarea>
              { fieldErrors?.location && <FieldError>{fieldErrors.location}</FieldError> }
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel>Contact Information</FieldLabel>
              <div>
                <div className="my-4">
                  <label htmlFor="user-name" className="text-[14px] text-slate-500">Full Name <RequiredMark /></label>
                  <input 
                    type="text" 
                    className="block w-full box-border rounded-lg border-2 p-2"
                    placeholder="i.e. John Doe"
                    onChange={e => setFormFields(old => ({...old, name: e.target.value}))}
                  />
                  { fieldErrors?.name && <FieldError>{fieldErrors.name}</FieldError> }
                </div>

                <div className="my-4">
                  <label htmlFor="user-contact" className="text-[14px] text-slate-500">Contact <RequiredMark /></label>
                  <input 
                    type="text" 
                    className="block w-full box-border rounded-lg border-2 p-2"
                    placeholder="i.e. 03360123456"
                    onChange={e => setFormFields(old => ({...old, phone: e.target.value}))}
                  />
                  { fieldErrors?.phone && <FieldError>{fieldErrors.phone}</FieldError> }
                </div>

                <div className="my-4">
                  <label htmlFor="user-email" className="text-[14px] text-slate-500">Email</label>
                  <input 
                    type="text" 
                    className="block w-full box-border rounded-lg border-2 p-2"
                    placeholder="i.e. johndoe@gmail.com"
                    onChange={e => setFormFields(old => ({...old, email: e.target.value}))}
                  />
                  { fieldErrors?.email && <FieldError>{fieldErrors.email}</FieldError> }
                </div>

                <div className="my-4">
                  <label htmlFor="user-city" className="text-[14px] text-slate-500">City <RequiredMark /></label>
                  <Select 
                    options={cityOptions}
                    styles={{
                      control: (baseStyle, state) => ({
                        ...baseStyle,
                        border: "2px solid #e5e7eb",
                        borderRadius: "0.5rem",
                        padding: "0.1rem"
                      })
                    }}
                    placeholder="Select city"
                    onChange={e => {
                      setFormFields(old => ({...old, city: e?.value}))
                    }}
                  />
                  {/* <select name="user-city" id="user-city" className="border-2 border-slate-200 bg-slate-200 rounded-lg p-2 w-full my-0" onChange={e => setFormFields(old => ({...old, city: e.target.value}))}>
                    <option value="">Choose city..</option>
                    {PakistanCities.map((item, index) => (
                      <option key={"pk-city-" + index} value={item}>{item}</option>
                    ))}
                  </select> */}
                  { fieldErrors?.city && <FieldError>{fieldErrors.city}</FieldError> }
                </div>
              </div>
            </FieldWrapper>

            <button 
              role="button" 
              className="w-full h-[40px] relative bg-blue disabled:bg-slate-500 hover:bg-blue-400 py-2 rounded-full text-white shadow-md my-2"
              disabled={isLoading}
              onClick={onSubmit}
            >
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {
                  isLoading ? 
                  <img src={AppImages.loading} className="w-[30px] svg-white" /> :
                  <span>Submit</span>
                }
              </div>
            </button>
          </div>}
        </main>
      </div>

      <SimpleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="w-[80vw] min-h-[20vh] text-center">
          <div>
            <img src={AppImages.checkmark} className="svg-green w-[50px] mx-auto my-2" />
          </div>
          <h1 className="font-semibold text-green-600">Submitted!</h1>
          <div className="py-4">Your request has been submitted successfully!</div>
          <button 
            className="bg-green-600 text-white cursor-pointer rounded-full py-1 min-w-[35vw]"
            onClick={e => {
              window.location.reload()
            }}
          >OK</button>
        </div>
      </SimpleModal>
    </>
  );
}

function FieldWrapper({ children }) {
  return <div className="bg-white my-6 px-4 py-4 rounded-xl shadow-md">{children}</div>
}

function FieldLabel({ children, htmlFor }) {
  return <label htmlFor={htmlFor} className="text-[#000]">{children}</label>
}

function RequiredMark() {
  return <span className="text-red-600 text-[17px]">*</span>
}

function FieldError({ children }) {
  return <div className="my-2 text-red-500 text-[14px]">{children}</div>
}

export default GalleriaRequestForm;