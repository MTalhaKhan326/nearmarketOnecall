import ReactModal from "react-modal";

function SimpleModal({ 
    isOpen = false,
    onClose = null,
    children
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
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity and color as needed
        },
    };
    return (  
        <ReactModal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={onClose}
        >
            { children }
        </ReactModal>
    );
}

export default SimpleModal;