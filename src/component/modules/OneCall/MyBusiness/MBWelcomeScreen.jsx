import { useNavigate } from "react-router-dom";
import { AppImages } from "../../../../Asset/images/image.js";

function MBWelcomeScreen() {
  const navigate = useNavigate()
  return (  
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="text-[22px] md:text-[37px] my-3 text-[#2B2B2B] font-semibold">
          Unlock Business Success
        </div>
        <img
          src={AppImages.businessImage}
          alt="Logo"
          className=" w-full md:w-[40%] md:mb-[16px] mb-[25px]"
        />
        <div className="px-3 text-[14px] md:text-[18px] text-[#333333]">
          <div className="text-center ">
            At OneCall, we offer a dynamic platform for service
          </div>
          <div className="text-center ">
            providers of all sizes. Whether you're a one-person
          </div>
          <div className="text-center ">
            operation or a large corporation, you can list your
          </div>
          <div className="text-center ">
            business, showcase your skills, and connect with
          </div>
          <div className="text-center ">
            potential clients. It's your chance to turn your
          </div>
          <div className="text-center ">
            expertise into earnings. Join us today!
          </div>
        </div>

        <button 
          className="w-[80vw] bg-[#2196F3] text-center py-2 mt-8 mb-2 text-white rounded-lg"
          onClick={() => {
            // navigate("/app/my-business/login")
            navigate("/app/my-business/signup")
          }}
        >
          Sign Up
        </button>

        {/* <div className="text-center text-[13px] md:text-[20px] text-[#2B2B2B] my-4">
          Don't have an account?{" "}
          <span
            className="text-[13px] md:text-[20px] text-[#24ACE3] hover:text-[#a0def6] cursor-pointer"
            onClick={(e) => {
              navigate("/app/my-business/signup")
            }}
          >
            Sign up
          </span>
        </div> */}
      </div>
    </>
  );
}

export default MBWelcomeScreen;