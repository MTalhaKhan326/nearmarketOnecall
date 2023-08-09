import { createContext, useState } from "react";

const fields = {
  full_name: null,
  gender: null,
  email: null,
  phone: null,
  address: null,
  businessCat: null,
  customers: null,
  // revenue: null,
  days: 10
}

const businessCategories = [
    {"value":"job","label":"Job"},
    {"value":"hr","label":"HR"},
    {"value":"property","label":"Property"},
    {"value":"food","label":"Food"},
    {"value":"mobilephone","label":"Mobile Shop"},
    {"value":"electrician","label":"Electrician"},
    {"value":"ac service","label":"AC Service"},
    {"value":"jobshr","label":"Jobs(HR)"},
    {"value":"mechanic","label":"Mechanic"},
    {"value":"IT services","label":"IT Services"},
    {"value":"pet care","label":"Pet Care"},
    {"value":"Producer","label":"Producer"},
    {"value":"Executive Producer","label":"Executive Producer"},
    {"value":"Storyboard Artist","label":"Storyboard Artist"},
    {"value":"Camera operators","label":"Camera operators"},
    {"value":"Set designer","label":"Set designer"},
    {"value":"Studio technician","label":"Studio technician"},
    {"value":"Writer","label":"Writer"},
    {"value":"Editor ","label":"Editor "},
    {"value":"Music mixer","label":"Music mixer"},
    {"value":"Social media manager","label":"Social media manager"},
    {"value":"Content creator","label":"Content creator"},
    {"value":"Physician","label":"Physician"},
    {"value":"Photographer","label":"Photographer"},
    {"value":"Actor","label":"Actor"},
    {"value":"Model","label":"Model"},
    {"value":"Extras Day Player","label":"Extras Day Player"},
    {"value":"Backstage Worker","label":"Backstage Worker"},
    {"value":"Makeup Artist","label":"Makeup Artist"},
    {"value":"Hair Artist ","label":"Hair Artist"},
    {"value":"Costume designer","label":"Costume designer"},
    {"value":"Caterer","label":"Caterer "},
    {"value":"Transportation Management","label":"Transportation Management"},
    {"value":"Security","label":"Security"}
]

export const PartnerFormContext = createContext({
  fields: fields,
  updateField: (fieldName, fieldValue) => {},
  hydrate: () => {},
  businessCategories
})

function PartnerFormProvider({ children }) {
  const [formFields, setFormFields] = useState(fields)
  const value = {
    fields: formFields,
    updateField: (fieldName, fieldValue) => {
      setFormFields(old => ({...old, [fieldName]: fieldValue}))
    },
    hydrate: () => {
      setFormFields(fields)
    },
    businessCategories,
  }
  return (  
    <PartnerFormContext.Provider value={value}>
      {children}
    </PartnerFormContext.Provider>
  );
}

export default PartnerFormProvider;