import ReactModal from "react-modal";

function SimpleModal({ 
    isOpen = false,
    onClose = null 
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
    };
    return (  
        <ReactModal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={onClose}
        >
            {/* <div className="flex flex-col">
            <div className="mx-4">
                <Popup />
            </div>
            </div> */}
        </ReactModal>
    );
}

export default SimpleModal;