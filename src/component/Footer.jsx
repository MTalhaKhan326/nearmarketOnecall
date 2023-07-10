import { AppImages } from "../Asset/images/image";

function Footer({ onAppStoreClick = null, onGooglePlayClick = null }) {
    const options = {
        googlePlayAppUrl: "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
        appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
        baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro"
    }
    return (
      <>
        <div className="bg-slate-100 h-full flex flex-col items-center justify-center">
          <div className=" block md:flex justify-center items-center pb-[7px] font-medium text-[14px] text-center">
            <div className="p-[15px]">
              Download One Call App Now:
              {/* OneCallApp per ayein
              <br />
              Apna karobar barhayein! */}
            </div>
            <div className="flex justify-center">
              <div className="m-1">
                <a
                  href={options.googlePlayAppUrl}
                  rel="noreferrer"
                  target="_blank"
                  onClick={onGooglePlayClick}
                >
                  <img
                    src={AppImages.googlePlay}
                    alt=""
                    className="w-[130px]"
                  />
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
          <div className="text-center text-[12px] text-gray-400 py-4">One Call App ©{(new Date()).getFullYear()}</div>
        </div>
      </>
    );
}

export default Footer;