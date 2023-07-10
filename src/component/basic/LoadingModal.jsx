import ReactModal from "react-modal";
import { AppImages } from "../../Asset/images/image.js";

function LoadingModal({ title }) {
    return (  
        <ReactModal
            isOpen={true}
            className="Modal"
            overlayClassName="Modal-Overlay"
        >
            <div className="flex items-center">
                <div >
                    <img src={AppImages.loading} alt="Loading" className="w-[30px] inline mx-4" />
                </div>
                <div>
                    <p className="font-medium">{title ?? "Processing"}</p>
                </div>
            </div>
        </ReactModal>
    );
}

export default LoadingModal;