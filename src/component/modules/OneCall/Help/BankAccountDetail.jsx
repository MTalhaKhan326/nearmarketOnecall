import React from "react";

const SingleRow = ({ heading, value }) => {
  return (
    <div className="mb-2">
      <div className="text-slate-600 text-[14px]">{heading}</div>
      <div className="">{value}</div>
    </div>
  )
}

const BankAccountDetail = ({ details, sectionTitle = null }) => {
  return (
    <div className="flex flex-col px-2">
      {sectionTitle && <span className="text-sm mb-1">{sectionTitle}</span>}
      <div className="text-primaryText">
        <SingleRow heading={'Account Title'} value={details.title} />
        {details.accNo && <SingleRow heading={'Account No'} value={details.accNo} />}
        {details.bankName && <SingleRow heading={'Bank Name'} value={details.bankName} /> }
        {details.branchCode && <SingleRow heading={'Branch Code'} value={details.branchCode} /> }
        {details.iban && <SingleRow heading={'IBAN'} value={details.iban} /> }
      </div>
    </div>
  );
};

export default BankAccountDetail;
