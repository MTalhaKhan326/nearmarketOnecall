import { AppImages } from "../../../Asset/images/image.js";

function CallNowButton({ phone }) {
  return (  
    <div
      className="rounded-full mt-1 bg-[#6acb00] w-9 h-9 cursor-pointer"
      onClick={() => {
        window.open(`tel:${phone}`)
      }}
    >
      <img
        src={AppImages.phone}
        alt=""
        srcset=""
        className="rounded-full w-[60%] ml-[6px]  pt-2 text-white"
        style={{ filter: "brightness(5) invert(1)" }}
      />
    </div>
  );
}

export default CallNowButton;