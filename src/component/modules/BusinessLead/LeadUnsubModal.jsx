import ReactModal from "react-modal";

function LeadUnsubModal({ isModalOpen = false, setIsModalOpen = () => {} }) {
  return (  
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={setIsModalOpen}
      style={{
        content: {
          borderRadius: "10px",
          height: "180px",
          marginTop: "180px",
          overflow: "none"
          // Set the desired height here
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity and color as needed
        },
      }}
    >
      <div className="flex flex-col">
        <div className="text-[#2b2b2b] flex justify-center text-center text-[20px] mt-2 font-bold">
          Confirmation !
        </div>
        <div className="text-[#2b2b2b] text-[14px] ml-2 mt-4 font-semibold">
          Are you sure you want to Unsubscribe One Call App ?
        </div>
        <div className="flex flex-row justify-between">
          {/* <div className="flex items-center justify-center">OK</div> */}
          <button
            type="submit"
            className="bg-[#f4f4f4] hover:bg-[#707070] w-[47%] hover:text-white mt-3 text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
            onClick={() => {
              setIsModalOpen()
            }}
          >
            Unsubscribe
          </button>
          {/* <div className="flex items-center justify-center">Cancel</div> */}
          <button
            type="submit"
            className="bg-[#f4f4f4] hover:bg-[#707070] hover:text-white mt-3 w-[47%] text-[#363636] text-[13px] border-[1px] border-[#707070] font-semibold py-[5px]  rounded-lg"
            onClick={() => {
              setIsModalOpen()
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div></div>

      {/* </div> */}
      {/* <input type="button" value="Close modal" onClick={closeModal} /> */}
    </ReactModal>
  );
}

export default LeadUnsubModal;