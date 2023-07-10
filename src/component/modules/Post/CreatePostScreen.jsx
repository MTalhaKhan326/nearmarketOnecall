import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { AppImages } from "../../../Asset/images/image";
import Header from "../../Header";
import Footer from "../../Footer";
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { isValidLatitude, isValidLongitude } from "../../../utils/helpers";
import CategoryAdImageUploader from "./CategoryAdImageUploader.jsx";

export function Label({ text, subtitle = null, id, required = null, showOptionalText = true, optionalText = "(optional)" }) {
    return (
        <>
            <label htmlFor={id} className="text-[14px] font-medium">{text} {required ? <span className="text-red-300">*</span> : showOptionalText ? <span className="text-gray-200">{optionalText}</span> : ""}</label>
            { subtitle && <p className="text-[12px] text-gray-400">{subtitle}</p> }
        </>
    )
}

function FieldError({ text = null }) {
    return (
        text && <div className="text-red-500 inline text-[12px]">{text}</div>
    )
}

function SimpleInputField({ placeholder, name, id, label, type, pattern, required, style = {wrapper: null}, error, onChange }) {
    return (
        <>
            <div className={style.wrapper ?? "flex flex-col flex-[1_1_100%] md:flex-[0_1_50%] p-1 mb-4"}>
                <Label 
                    text={label}
                    id={id ?? name}
                    required={required}
                />
                <div>
                    <input type={type ?? "text"} name={name ?? id} id={id ?? name} className={(error ? "border-red-500 focus:outline-red-500" : "border-gray-200 focus:outline-blue") + " border-2 rounded bg-slate-100 px-2 py-2 w-full box-border"} placeholder={placeholder ?? label} pattern={pattern} required={required} onChange={onChange} />
                    {error && <div className="text-red-500 inline text-[12px]">{error}</div>}
                </div>
            </div>
        </>
    )
}

function BorderHeading({ text, showRight = true, showLeft = true  }) {
    return (
        <div className="flex items-center py-4">

            {/* <!-- The left line --> */}
            {showLeft && <div className="flex-grow h-px bg-gray-400"></div> }

            {/* <!-- Your text here --> */}
            <span className="flex-shrink text-[12px] text-gray-500 px-4 italic font-light">{text}</span>

            {/* <!-- The right line --> */}
            {showRight && <div className="flex-grow h-px bg-gray-400"></div>}
        </div>
    )
}


function CreatePostScreen() {
    const [searchParams] = useSearchParams()
    const passedCategory = searchParams.get("cat")
    let passedLat = parseFloat( searchParams.get("lat")?.replace(/[^0-9-.]/gi, "") )
    passedLat = isValidLatitude(passedLat) ? passedLat : null 
    let passedLng = parseFloat( searchParams.get("lng")?.replace(/[^0-9-.]/gi, "") )
    passedLng = isValidLongitude(passedLng) ? passedLng : null 
    let passedReach = parseInt( searchParams.get('reach') )
    passedReach = !isNaN(passedReach) && passedReach > 0 ? passedReach : null
    let passedTag = searchParams.get('tag')
    let passedCountry = searchParams.get("c")?.toString().substring(0,2).toUpperCase()
    let passedRadius = parseInt(searchParams.get('radius'))
    passedRadius = !isNaN(passedRadius) && passedRadius > 0 && passedRadius <= 100 ? passedRadius : null

    const defaultCountry = passedCountry ?? "PK"
    let defaultTelCountryCode
    try {
        defaultTelCountryCode = getCountryCallingCode(defaultCountry)
    } catch(e) {
        defaultTelCountryCode = "92"
    }
    const initialFields = {
        full_name: null,
        email: null,
        phone: null,
        city: null,
        lat: null,
        lng: null,
        category: null,
        tel_country_code: defaultTelCountryCode,
        message: null,
        instructions: null,
        reach: null,
        tag: null 
    }
    
    const [formFields, setFormFields] = useState(initialFields)
    const [formErrors, setFormErrors] = useState(initialFields)
    const [isFetchingCurrentLocation, setIsFetchingCurrentLocation] = useState(false)
    const [locationError, setLocationError] = useState(null)
    const [isRequestInProgress, setIsRequestInProgress] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [modalError, setModalError] = useState(null)
    const [isCategorySuggestionsShown, setIsCategorySuggestionsShown] = useState(false)
    const [categories, setCategories] = useState([])
    const [activeCategorySuggestions, setActiveCategorySuggestions] = useState([])
    const [activeLocInputType, setActiveLocInputOption] = useState(null)
    const [instructions, setInstructions] = useState(null)
    const mediaInputRef = useRef(null)
    const [selectedMediaFile, setSelectedMediaFile] = useState(null)
    
    async function handleClickOnCurrentLocation(e) {
        e.preventDefault()
        try {
            setIsFetchingCurrentLocation(true)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setIsFetchingCurrentLocation(false)
                    setLocationError(null)
                    setFormFields({...formFields, lat: position.coords.latitude, lng: position.coords.longitude})
                }, 
                (error) => {
                    setIsFetchingCurrentLocation(false)
                    console.log(error)
                    if(error.PERMISSION_DENIED) {
                        setLocationError("You have denied current location!")
                    } else if (error.POSITION_UNAVAILABLE) {
                        setLocationError("Your current location is not available yet!")
                    } else {
                        setLocationError("Unable to get your current location!")
                    }
                },
                { enableHighAccuracy: true }
            )
        } catch(e) {
            console.log(e)
        }
    }

    const [postAdFiles, setPostAdFiles] = useState([])
    function check_post_ad_files(files) {
        setPostAdFiles(files)
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        let errors = initialFields
        if(!formFields.phone) {
            errors.phone = "Phone number is required"
        }
        if(formFields.phone?.length !== 12) {
            errors.phone = "Phone number is not correct"
        }
        if(!formFields.category) {
            errors.category = "Category is required"
        }
        if(formFields.category?.length < 3) {
            errors.category = "Invalid category name"
        }
        if(!formFields.message) {
            errors.message = "Message is required"
        }
        if(formFields.message?.split(" ").length < 5) {
            errors.message = "Please explain your message briefly"
        }
        if(!formFields.lat || !formFields.lng) {
            setLocationError("Location is required")
        }
        
        if(['category','message','phone'].filter(key => errors[key] !== null).length > 0 || locationError !== null) {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            setFormErrors(old => ({...old, ...errors}))
            return;
        }
        setIsRequestInProgress(true)
        setFormErrors(old => ({...initialFields}))

        const url = new URL("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/create-post")
        url.searchParams.set("key", "oc.fc8ab25facba44eb959939ad6d3f8c6a")
        const reach = parseInt(formFields.reach)
        const payload = {
            lat: formFields.lat,
            lng: formFields.lng,
            from: formFields.phone,
            email: formFields.email,
            category: formFields.category.trim().replace(/[^0-9a-zA-Z-_. ]/gi, ""),
            city: formFields.city?.trim().replace(/[^0-9a-zA-Z-_. ]/gi, ""),
            message: formFields.message?.trim().replace(/[^0-9a-zA-Z-_.,&?'() ]/gi, ""),
            instructions: formFields.instructions?.trim().replace(/[^0-9a-zA-Z-_.,&?'() ]/gi, ""),
            full_name: formFields.full_name?.trim().replace(/[^a-zA-Z-,. ]/gi, ""),
            reach: !isNaN(reach) ? reach : 10,
            radius: passedRadius ?? 20,
            post_ad_image_urls: postAdFiles.map(file => file.download_url) ?? []
        }
        payload.tag = (passedTag ? `${passedTag}` : "") + (passedTag && formFields.tag && formFields.tag !== passedTag ? "," : "") + (formFields.tag && formFields.tag !== passedTag ? formFields.tag.trim().replace(/[^a-zA-Z-,. ]/gi, "") : "")
        
        axios.post(url, payload).then(res => {
            const { data } = res 
            if(data.status !== 200) {
                const error = data.message 
                setModalError(data.status !== 500 && error ? error : 'Something went wrong')
                console.log(error)
                return;
            }
            if(data.status == 200 && data.data.isCreated) {
                setShowSuccessModal(true)
                return;
            }
        }).catch(e => {
            setModalError('Something went wrong')
        }).finally(() => {
            setIsRequestInProgress(false)
        })
    }

    useEffect(() => {
        if(!categories.length) {
            const url = new URL("https://b3i2xui1e5.execute-api.eu-west-1.amazonaws.com/categories")
            axios.get(url).then(res => {
                const { data } = res 
                if(data.status === 200 && data.data?.length > 0) {
                    let x = data.data?.map(item => item.name)
                    setCategories(x)
                }
            })
        }

        axios.get("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/post/form-initial-info").then(res => {
            const {data} = res 
            if(data.status === 200) {
                const response = data.data 
                setInstructions(response.instructions)
            }
        })

        if(passedCategory?.length) {
            document.title = passedCategory
        }
    }, [])

    useEffect(() => {
        setFormFields(old => ({
            ...old,
            lat: passedLat ?? null,
            lng: passedLng ?? null,
            category: passedCategory ?? null,
            reach: passedReach ?? null,
            tag: passedTag ?? null
        }))
    }, [searchParams])
    
    return ( 
        <>
            <Header /> 
            <main className="w-[100vw] md:w-[60vw] mx-auto my-4">
                <div className="text-center my-4">
                    <h1 className="font-medium text-[22px]">Create a Post</h1>
                </div>
                { instructions &&
                    <div className="p-4 border-2 border-dotted border-slate-200 rounded bg-slate-50">
                    <p className="text-[14px] font-medium">Instructions</p>
                    <div className="">
                        <ul className="list-disc">
                            { instructions?.map((item, index) => (
                                <li key={index} className="text-[12px]">{item}</li>
                            )) }
                        </ul>
                    </div>
                </div>}
                <div className="">
                    <form method="POST" className="" onSubmit={handleSubmit}>
                        <BorderHeading text={"User Information"} showLeft={false} />
                        <div className="flex items-center flex-wrap">
                            <SimpleInputField 
                                label={"Full Name"}
                                id="full_name"
                                placeholder="John Doe"
                                onChange={e => {  
                                    setFormFields(formFields => ({...formFields, full_name: e.target.value}))
                                }}
                            />

                            <SimpleInputField 
                                label={"Email"}
                                id="email"
                                type="email"
                                placeholder="johndoe@test.com"
                                onChange={e => {
                                    setFormFields(old => ({...old, email: e.target.value}))
                                }}
                            />

                            <div className="flex flex-col flex-[1_1_100%] md:flex-[0_1_50%] p-1 mb-4">
                                <Label 
                                    text={"Phone"}
                                    required={true}
                                />
                                <PhoneInput
                                    defaultCountry={defaultCountry}
                                    onChange={(v) => {
                                        let val = v?.replace(/[+]/gi, "")
                                        console.log(val)    
                                        setFormFields(old => ({...old, phone: val}))
                                    }}
                                    onCountryChange={country => {
                                        let code = getCountryCallingCode( country )
                                        setFormFields(old => ({...old, tel_country_code: code}))
                                    }}
                                    className={"post-phone-field " + (formErrors.phone ? "form-error" : "")}
                                />
                                {formErrors.phone && <div className="text-red-400 inline text-[12px] ml-10">{formErrors.phone}</div>}
                            </div> 

                            <SimpleInputField 
                                label={"City"}
                                id="city"
                                placeholder={"Lahore"}
                                onChange={e => {
                                    setFormFields(old => ({...old, city: e.target.value}))
                                }}
                                error={formErrors.city}
                            />
                        </div>

                        <BorderHeading text={"Post Detail"} showLeft={false} />
                        {(passedLat === null || passedLng === null) ? 
                        <div className="m-2">
                            <Label 
                                text={"Location"}
                                id="location"
                                required={true}
                            />
                            <div className="flex flex-col md:flex-row items-center flex-wrap justify-center">
                                <button type="button" className={(activeLocInputType === "curr" ? "bg-green-300" : "bg-slate-200") + " px-2 py-2 m-2 font-b-400 rounded text-[14px]"} onClick={e => {
                                    setActiveLocInputOption("curr")
                                    handleClickOnCurrentLocation(e)
                                }}>
                                    <span>Choose Current Location</span>
                                    {!isFetchingCurrentLocation && formFields.lat && formFields.lng && activeLocInputType === "curr" &&  <span><img src={AppImages.checkmark} className="w-[20px] inline svg-black ml-2" /></span>}
                                    {isFetchingCurrentLocation && <span><img src={AppImages.loading} className="w-[20px] inline" /></span>}
                                </button>
                                <h3 className="text-[12px] font-bold">OR</h3>
                                <button type="button" className={(activeLocInputType === "coords" ? "bg-green-300" : "bg-slate-200") + " px-2 py-2 m-2 font-b-400 rounded text-[14px]"} onClick={e => setActiveLocInputOption("coords")}>
                                    <span>Enter Location Coordinates</span>
                                </button>
                            </div>

                            {locationError && <FieldError text={locationError} />}

                            {activeLocInputType === 'coords' &&
                                <div className="flex items-center flex-wrap">
                                    <SimpleInputField 
                                        label={"Latitude"}
                                        id="lat"
                                        required={true}
                                        placeholder="i.e. 31.876213"
                                        onChange={e => {
                                            let val = parseFloat(e.target.value) 
                                            val = isNaN(val) ? null : val
                                            setFormFields(old => ({...old, lat: val}))
                                        }}
                                        error={formErrors.lat}
                                    />
                                    <SimpleInputField 
                                        label={"Longitude"}
                                        id="lng"
                                        required={true}
                                        placeholder="i.e. 74.1238990"
                                        onChange={e => {
                                            let val = parseFloat(e.target.value) 
                                            val = isNaN(val) ? null : val
                                            setFormFields(old => ({...old, lng: val}))
                                        }}
                                        error={formErrors.lng}
                                    />
                                </div>
                            }    
                        </div>
                        : <></>
                        }

                        <div className="flex flex-wrap md:flex-nowrap">
                            <div className={"flex flex-col relative flex-[1_1_100%] md:flex-[0_1_50%] px-1 pt-1 pb-0 mb-4"}>
                                <Label text="Category" id="category" required={true} />
                                <div>
                                    <input 
                                        type={"text"} 
                                        name="category" 
                                        id="category" 
                                        className={(passedCategory !== null ? "focus:outline-none text-gray-400" : formErrors.category ? "border-red-500 focus:outline-red-500" : "border-gray-200 focus:outline-blue") + " border-2 rounded bg-slate-100 px-2 py-2 w-full box-border"} 
                                        placeholder="i.e. ac service" 
                                        required={true} 
                                        onChange={e => {
                                            let val = e.target.value?.trim()
                                            setFormFields(old => ({...old, category: val}))
                                            if(!val) {
                                                setIsCategorySuggestionsShown(false)    
                                            } else {
                                                setIsCategorySuggestionsShown(true)
                                                setActiveCategorySuggestions(
                                                    categories.filter(cat => 
                                                        cat.toString().toLowerCase().startsWith(val.toLowerCase()) || 
                                                        cat.toString().toLowerCase().split(' ').some(word => word.startsWith(val.toLowerCase()))
                                                    )
                                                )
                                            }
                                        }}
                                        value={passedCategory ?? formFields.category}
                                        readOnly={passedCategory !== null}
                                    />
                                    {formErrors.category && <div className="text-red-500 inline text-[12px]">{formErrors.category}</div>}
                                </div>
                                {isCategorySuggestionsShown && 
                                    <div className="absolute top-[93%] w-[97%] max-h-[120px] mr-1 box-border  overflow-y-auto border-b-2 border-r-2 border-l-2 border-color-gray-400 rounded-b-lg z-10">
                                        <div className="bg-slate-100">
                                            <ul>
                                                {activeCategorySuggestions.map((item, index) => (
                                                    <li key={index}>
                                                        <div 
                                                            className="cursor-pointer hover:bg-[#3b82f6] hover:text-white px-2 py-1"
                                                            onClick={e => {
                                                                setIsCategorySuggestionsShown(false)
                                                                setFormFields(old => ({...old, category: item}))
                                                            }}
                                                        >
                                                            {item}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>

                            <SimpleInputField 
                                label="Tag"
                                id="category_tag"
                                placeholder="i.e. tag"
                                onChange={e => {
                                    setFormFields(old => ({...old, tag: e.target.value?.trim()}))
                                }}
                            />

                            { passedReach === null &&
                                <SimpleInputField 
                                label={"Reach"}
                                id="reach"
                                placeholder="i.e. 500"
                                type={"number"}
                                style={{
                                    wrapper: "flex flex-col relative flex-[1_1_100%] md:flex-[0_1_30%] px-1 pt-1 pb-0 mb-4"
                                }}
                                onChange={e => {
                                    let val = e.target.value?.trim()
                                    setFormFields(old => ({...old, reach: val}))
                                }}
                                // error={formErrors.category}
                            />}
                        </div>
                        <div className="flex flex-col m-2">
                            <Label 
                                text={"Message"}
                                id="message"
                                required={true}
                            />
                            <textarea 
                                name="message" 
                                id="message" 
                                rows="4" 
                                placeholder="Explain your post in detail here.." 
                                className={(formErrors.message ? "border-red-500" : "") +  " w-full bg-slate-100 p-2 rounded resize-none border-2 focus:outline-blue"}
                                onChange={e => {
                                    setFormFields(old => ({...old, message: e.target.value?.trim()}))
                                }}
                            ></textarea>
                            {formErrors.message && <div className="text-red-500 inline text-[12px]">{formErrors.message}</div>}
                        </div>

                        <CategoryAdImageUploader check_post_ad_files={check_post_ad_files} categoryName={passedCategory} />

                        {/* <div>
                            {selectedMediaFile && <div className="my-4 mx-2 inline-flex relative rounded">
                                <div>
                                    <audio 
                                        className="min-w-[200px]"
                                        controls={true}
                                        controlsList="nodownload noremoteplayback nofullscreen"
                                        onLoadedMetadata={e => {
                                            const maxDuration = 1200 
                                            if(e.currentTarget.duration > maxDuration) {
                                                setModalError("Max duration exceeded. The audio's duration should not be longer than " + maxDuration + " seconds")
                                                setSelectedMediaFile(null);
                                                return;
                                            }
                                        }}
                                        src={URL.createObjectURL(selectedMediaFile)}></audio>
                                    <p className="text-[12px] text-slate-500 mx-2 my-2">{selectedMediaFile.name}</p>
                                </div>
                                <div 
                                    className="absolute top-[-10px] right-[-10px] bg-slate-200 rounded-full p-[2px] cursor-pointer" title="Remove image"
                                    onClick={e => setSelectedMediaFile(null)}
                                >
                                    <img src={AppImages.close} alt="close" className="w-[15px]" />
                                </div>
                            </div>}
                        </div> */}

                        {/* <div 
                            className="px-4 py-2 bg-slate-200 inline-flex mx-2 rounded cursor-pointer hover:bg-gray-300 transition-all text-[13px]"
                            onClick={e => mediaInputRef?.current.click()}
                        >
                            <div className="flex items-center">
                                <span className="w-[20px] rounded-full mr-1 block"><img src={AppImages.upload} alt="upload" className="object-contain w-[15px] svg-blue" /></span>
                                <span>Upload Audio</span>
                            </div>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="audio/*"
                                ref={mediaInputRef} 
                                value=""
                                onChange={e => {
                                    if(e.target.files?.length) {
                                        const file = e.target.files[0]
                                        const MB = 1e+6
                                        const maxMB = 2
                                        const maxSize = maxMB * MB
                                        if(file.size > maxSize) {
                                            setModalError("Max file size exceeded. The file size should not be larger than " + maxMB + " MB")
                                            return;
                                        }
                                        setSelectedMediaFile(file)
                                    }
                                    e.target.value = ""
                                }}
                            />
                        </div> */}

                        <div className="flex items-end justify-end">
                            <button className="bg-blue hover:bg-[#3b82f6] hover:border-blue border-[1px] hover:border-[1px] px-6 py-2 rounded text-white m-2 w-full md:w-[20vw]">
                                <span>Create Post</span>
                                <span><img src={AppImages.send1} alt="send" className="svg-white inline w-[20px] ml-2" /></span>
                            </button>
                        </div>
                    </form>
                </div>

                {isRequestInProgress && <ReactModal
                    isOpen={true}
                    className="Modal"
                    overlayClassName="Modal-Overlay"
                >
                    <div className="flex items-center">
                        <div >
                            <img src={AppImages.loading} alt="Loading" className="w-[30px] inline mx-4" />
                        </div>
                        <div>
                            <p className="font-medium">Processing</p>
                        </div>
                    </div>
                </ReactModal>}

                {showSuccessModal && <ReactModal
                    isOpen={true}
                    className="Modal Success-Modal"
                    overlayClassName="Modal-Overlay"
                >
                    <div className="p-4">
                        <div className="flex items-center justify-center">
                            <img src={AppImages.checkmark} alt="checkmark" className="w-[60px] svg-green" />
                        </div>
                        <p className="text-center my-4 text-green-600 font-medium">Your post has been submitted successfully!</p>
                        <div className="text-center p-2 cursor-pointer" onClick={e => {
                            // setShowSuccessModal(false)
                            window.location.reload()
                        }}><p className=" font-bold text-[14px] text-green-600 border-dotted border-b-[1px] inline">OK, Post Another One!</p></div>
                    </div>
                </ReactModal>}

                {modalError && <ReactModal
                    isOpen={true}
                    className="Modal Error-Modal"
                    overlayClassName="Modal-Overlay"
                >
                    <div className="p-4">
                        <div className="flex items-center justify-center">
                            <img src={AppImages.warning} alt="warning" className="w-[60px] svg-red" />
                        </div>
                        <p className="text-center my-4 text-red-500 font-medium">{modalError}</p>
                        <div className="text-center p-2 cursor-pointer" onClick={e => {
                            setModalError(null)
                        }}><p className=" font-bold text-[14px] text-black border-dotted border-b-[1px] inline">OK</p></div>
                    </div>
                </ReactModal>}
            </main>
            <Footer />
        </>
        
    );
}

export default CreatePostScreen;