import ReactModal from "react-modal";

function RejectModal({
    isOpen = false,
    onClose = null,
    onReject = null 
}) {
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0, 0.5)'
        }
    };
    return (  
        <ReactModal
            isOpen={isOpen}
            style={{
            content: {
                ...customStyles.content,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                maxWidth: "90vw"
            },
            overlay: {
                ...customStyles.overlay
            }
            }}
        >
            <div className="flex flex-col">
                <div className="mx-4">
                    <div className='sm:mx-[5px]'>
                        <div className="flex justify-center mb-2 text-[16px]">Reject Lead</div>
                        <hr />
                        <div>
                            <div>
                                <div className='flex justify-center mt-3 py-6 text-[14px]'>Are you sure you want to reject this lead?</div>
                            
                                <div className='flex  justify-between mt-5'>
                                    <div className='flex-1 border-r-2 text-center py-2 text-blue cursor-pointer' onClick={onClose}>
                                        <span>Close</span>
                                    </div>
                                    <div className='flex-1 text-center py-2 text-blue cursor-pointer' onClick={onReject}>
                                        <span>Reject</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}

export default RejectModal;