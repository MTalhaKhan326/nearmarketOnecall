
import BankAccountDetail from "./BankAccountDetail.jsx";
import BillingUpload from "./BillingUpload.jsx";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';

function BillingTabContent() {
    const details = {
        id: 1,
        title: "NODE0 COMPUTING",
        accNo: "02570104987755",
        bankName: "MEEZAN BANK",
        branchCode: "0257 DHA Phase 5",
        iban: "PK51MEZN0002570104987755",
    }
    return (  
        <div className="flex flex-col gap-4 py-5 mx-4">
            <Accordion allowZeroExpanded allowMultipleExpanded preExpanded={['receipt-uploader']}>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Bank Account
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <BankAccountDetail details={{
                            id: 2,
                            title: "ONE CALL",
                            bankName: "Sonehri Bank",
                            branchCode: "DHA Phase 5",
                            iban: "PK81SONE002522011678794",
                        }} />         
                        <h2 className="mt-4 mb-2 border-b-[1px] font-semibold">Other Authorized Bank Account:</h2>
                        <BankAccountDetail details={details} />         
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            EasyPaisa
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <BankAccountDetail 
                            details={{
                                id: 3,
                                title: "Gohar Sultan",
                                accNo: "03414151343",
                            }}
                        />      
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            JazzCash
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                    <BankAccountDetail 
                        details={{
                            id: 2,
                            title: "Gohar Sultan",
                            accNo: "03249565957",
                        }}    
                    />    
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid={"receipt-uploader"}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Upload your receipt
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <BillingUpload />
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
        // <div className="flex flex-col gap-4 py-5">
        //     <BankAccountDetail details={details} sectionTitle={"Bank Account Details"} />
        //     <hr className="mx-5 bg-[#707070]" />
        //     
        //     <hr className="mx-5 bg-[#707070]" />
        
        //     <hr className="mx-5 bg-[#707070]" />
        //     <BillingUpload />
        // </div>
    );
}

export default BillingTabContent;