import React from "react";

const Iframe = ({ videoUrl, props = {} }) => {
  return (
    <div className="pt-1">
      <iframe
        title="v"
        className="h-[214px] w-full "
        src={videoUrl}
        {...props}
      />
    </div>
  );
};

export default Iframe;
