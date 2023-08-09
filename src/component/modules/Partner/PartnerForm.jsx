import { useContext, useState } from "react";
import { AppImages } from "../../../Asset/images/image.js";
import { formatNumberAsReadable, isEmail } from "../../../utils/helpers.js";
import { useNavigate } from "react-router-dom";
import PartnerFormProvider, { PartnerFormContext } from "./PartnerFormProvider.jsx";
import axios from "axios";

function PartnerForm() {
  const partnerFormContext = useContext(PartnerFormContext)
  const fields = {...partnerFormContext.fields}
  
  const navigate = useNavigate()
  const [formFields, setFormFields] = useState(fields)
  const [formErrors, setFormErrors] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let revenue = ""
  let revenue1= 0;
  if(formFields?.customers) {
    let customers = parseInt(formFields.customers)
    const RATIO = 0.1
    customers = isNaN(customers) ? 0 : customers 
    revenue = (customers * 1950 ).toString()
    revenue = "PKR " + formatNumberAsReadable(revenue)
    revenue1 = customers * 1950;
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setFormErrors(null)

    const cleanData = {...formFields}
    const errors = {}
    if(!formFields.full_name) {
      errors.full_name = "This field is required"
    }
    if(!formFields.gender) {
      errors.gender = "This field is required"
    }
    if(!formFields.email) {
      errors.email = "This field is required"
    } else if(!isEmail(formFields.email)) {
      errors.email = "Invalid email address"
    }
    if(!formFields.phone) {
      errors.phone = "This field is required"
    } else {
      let phone = formFields.phone.toString().trim().replace(/[^0-9]/gi, "")
      phone = phone[0] === "0" ? phone.substring(1) : phone 
      if(phone.length < 10 || phone.length > 12) {
        errors.phone = "Invalid phone number"
      } else {
        cleanData.phone = phone
      }
    }
    if(!formFields.address) {
      errors.address = "This field is required"
    }
    if(!formFields.businessCat) {
      errors.businessCat = "This field is required"
    }
    if(!formFields.customers) {
      errors.customers = "This field is required"
    }
    if(!formFields.days) {
      errors.days = "This field is required"
    }

    if(Object.keys(errors).length) {
      setFormErrors(errors)
      setIsLoading(false)
      return
    }

    console.log(cleanData)
    Object.keys(cleanData).map(key => {
      partnerFormContext.updateField(key, cleanData[key])
    })
    // setIsLoading(false)
       const result = await axios.post(
        `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/customer/post?email=${formFields.email}&phone=${formFields.phone}
        &name=${formFields.full_name}&days=${formFields.days}&address=${formFields.address}&revenue=${revenue1}&category=${formFields.businessCat}
        &customers=${formFields.customers}&gender=${formFields.gender}`
      );
      console.log("Resulttt", result);
    // SetresData(result.data.data)
    if (result.data.status === 200) {
      setIsLoading(false);
    navigate('/acceptance', {
      state: {
        data: cleanData
      }
    })
  }
  }

  return (
    <div className="md:max-w-[750px] mx-auto my-4 p-2">
      <div className="my-4">
        <h1 className="text-[24px] text-center">Request for Market Partner</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <FieldWrapper>
              <Label
                text="Enter your first and last name"
                htmlFor="full_name"
              />
              <TextInputField
                id="full_name"
                value={formFields?.full_name ?? ""}
                placeholder="Name"
                onChange={(e) =>
                  setFormFields((old) => ({
                    ...old,
                    full_name: e.target.value,
                  }))
                }
              />
              {formErrors?.full_name && (
                <FieldError text={formErrors?.full_name} />
              )}
            </FieldWrapper>

            <FieldWrapper>
              <Label text="Gender" />
              <div className="flex items-center">
                <div
                  className={
                    "flex-1 border-[1px] border-slate-400 text-center rounded rounded-tr-none rounded-br-none py-1 cursor-pointer " +
                    (formFields.gender === "male"
                      ? "bg-gray-400 text-white"
                      : "")
                  }
                  onClick={() =>
                    setFormFields((old) => ({ ...old, gender: "male" }))
                  }
                >
                  <span>Male</span>
                </div>
                <div
                  onClick={() =>
                    setFormFields((old) => ({ ...old, gender: "female" }))
                  }
                  className={
                    "flex-1 border-[1px] border-l-0 border-r-0 border-slate-400 rounded-tr-none text-center py-1 cursor-pointer " +
                    (formFields.gender === "female"
                      ? "bg-gray-400 text-white"
                      : "")
                  }
                >
                  <span>Female</span>
                </div>
                <div
                  onClick={() =>
                    setFormFields((old) => ({ ...old, gender: "other" }))
                  }
                  className={
                    "flex-1 border-[1px] border-slate-400 text-center rounded rounded-tl-none rounded-bl-none py-1 cursor-pointer " +
                    (formFields.gender === "other"
                      ? "bg-gray-400 text-white"
                      : "")
                  }
                >
                  <span>Other</span>
                </div>
              </div>
              {formErrors?.gender && <FieldError text={formErrors?.gender} />}
            </FieldWrapper>

            <FieldWrapper>
              <Label text="Enter your email address" htmlFor={"email"} />
              <TextInputField
                id="email"
                placeholder="Email"
                value={formFields?.email ?? ""}
                onChange={(e) =>
                  setFormFields((old) => ({ ...old, email: e.target.value }))
                }
              />
              {formErrors?.email && <FieldError text={formErrors?.email} />}
            </FieldWrapper>

            <FieldWrapper>
              <Label text="Enter your phone number" htmlFor={"phone"} />
              <TextInputField
                id="phone"
                placeholder="PhoneNumber"
                value={formFields?.phone ?? ""}
                onChange={(e) =>
                  setFormFields((old) => ({ ...old, phone: e.target.value }))
                }
              />
              {formErrors?.phone && <FieldError text={formErrors?.phone} />}
            </FieldWrapper>

            <FieldWrapper>
              <Label text="Enter your address" htmlFor={"address"} />
              <TextInputField
                id="address"
                placeholder="Address"
                value={formFields.address ?? ""}
                onChange={(e) =>
                  setFormFields((old) => ({ ...old, address: e.target.value }))
                }
              />
              {formErrors?.address && <FieldError text={formErrors?.address} />}
            </FieldWrapper>

            <FieldWrapper>
              <Label
                text="Choose your business category"
                htmlFor={"business_cat"}
              />
              <select
                name="business_cat"
                id="business_cat"
                className="border-[1px] border-slate-400 rounded px-2 py-[7px] "
                value={formFields?.businessCat ?? ""}
                onChange={(e) =>
                  setFormFields((old) => ({
                    ...old,
                    businessCat: e.target.value,
                  }))
                }
              >
                <option value="">Choose one category..</option>
                {partnerFormContext.businessCategories.map((cat, index) => (
                  <option key={"business_cat_" + index} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {formErrors?.businessCat && (
                <FieldError text={formErrors?.businessCat} />
              )}
            </FieldWrapper>
          </div>

          <h2 className="text-[22px] font-bold p-2 text-gray-500">
            Estimated Commitment
          </h2>

          <div className="flex flex-1 flex-wrap">
            <Field2Wrapper>
              <Label text={"Customers"} htmlFor={"customer-count"} />
              <TextInputField
                id="customer-count"
                value={formFields?.customers ?? ""}
                type="number"
                placeholder="Customers"
                min="0"
                error={formErrors?.customers}
                onChange={(e) =>
                  setFormFields((old) => ({
                    ...old,
                    customers: parseInt(e.target.value),
                  }))
                }
              />
              {formErrors?.customers && (
                <FieldError text={formErrors?.customers} />
              )}
            </Field2Wrapper>

            <Field2Wrapper>
              <Label text={"Days"} htmlFor={"days"} />
              <TextInputField
                id="days"
                value={formFields?.days ?? ""}
                type="number"
                min="10"
                max="15"
                defaultValue="10"
                error={formErrors?.days}
                onChange={(e) =>
                  setFormFields((old) => ({
                    ...old,
                    days: parseInt(e.target.value),
                  }))
                }
              />
              {formErrors?.days && <FieldError text={formErrors?.days} />}
            </Field2Wrapper>

            <Field2Wrapper>
              <Label text={"Potential Revenue"} htmlFor={"revenue"} />
              <TextInputField
                id="revenue"
                readOnly
                placeholder="PotentialRevenue"
                value={revenue ?? ""}
              />
            </Field2Wrapper>
          </div>

          <div className="my-2 p-2 text-gray-500">
            <p>Note:</p>
            <p>
              You are required to register 10 businesses in the First 15 Days to
              qualify for the next phase of 15 Days. In which you have to
              register an additional 20 Businesses. Your Shared Structure is :
            </p>
            <ul>
              <li>
                <p>Revenue Shared : 10%</p>
              </li>
              <li>
                <p>1-10 Registered Businesses : 20%</p>
              </li>
              <li>
                <p>11-30 Registered Businesses : 25%</p>
              </li>
              <li>
                <p>Above30 Registered Businesses : 30%</p>
              </li>
            </ul>
          </div>

          <div className="flex justify-end items-center">
            <button
              className={
                "w-[100px] border-none bg-blue hover:bg-blueGray-500 text-white py-1 rounded " +
                (isLoading ? "bg-blueGray-500" : "")
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <img
                  src={AppImages.loading}
                  className="w-[20px] py-[2px] svg-white mx-auto"
                />
              ) : (
                <span>Next</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Label({ text, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="py-1">{text}</label>
  )
}

function TextInputField(props) {
  return (
    <input type={props?.type ?? "text"} id={props?.id} className={"box-border border-[1px] rounded px-2 py-1 " + (props?.error ? "border-red-500" : "border-slate-400") + (props?.readOnly ? " focus:outline-none" : "")} {...props} />
  )
}

function FieldWrapper({ children }) {
  return (
    <div className="flex flex-col flex-[1_1_50%] p-2">
      {children}
    </div>
  )
}

function Field2Wrapper({ children }) {
  return (
    <div className="flex flex-col justify-start flex-[1_1_30%] p-2">
      {children}
    </div>
  )
}

function FieldError({ text }) {
  return (
    <div>
      <p className="text-red-500 text-[12px] my-1">{text}</p>
    </div>
  )
}

export default PartnerForm;