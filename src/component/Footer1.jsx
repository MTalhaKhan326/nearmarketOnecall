import { AppImages } from "../Asset/images/image";

function Footer1({ onAppStoreClick = null, onGooglePlayClick = null }) {
  const options = {
    googlePlayAppUrl:
      "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
    baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro",
  };
  return (
    <>
      <div className="text-[#2b2b2b] text-[16px] ml-2 font-semibold">
        {" "}
        Download Now
      </div>
      <div className=" flex flex-col items-center justify-center my-[22px]">
        <div className=" block md:flex justify-center items-center pb-[7px] font-medium text-[14px] text-center">
          <div className="flex justify-center">
            <div className="m-1">
              <a
                href={options.googlePlayAppUrl}
                rel="noreferrer"
                target="_blank"
                onClick={onGooglePlayClick}
              >
                <img src={AppImages.googlePlay} alt="" className="w-[130px]" />
              </a>
            </div>
            <div className="m-1">
              <a
                href={options.appStoreAppUrl}
                rel="noreferrer"
                target="_blank"
                onClick={onAppStoreClick}
              >
                <img src={AppImages.apple} className="w-[125px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-[#2b2b2b] ml-2 ">
        By accepting this lead you also agree with One Call{" "}
        <span className="text-[#0000ff]">user acceptance policy</span> and{" "}
        <span className="text-[#0000ff]">terms & conditions</span>
      </div>
    </>
  );
}

export default Footer1;
