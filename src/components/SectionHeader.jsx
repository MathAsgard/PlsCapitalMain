import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 md:mb-11">
      <h2 className="text-3xl sm:text-[48px] sm:leading-[58px] font-medium text-white text-center flex items-center gap-[38px]">
        <span
          className="sm:w-[40%] flex-grow h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(149, 6, 249, 0.05) 0%, rgba(178, 57, 250, 0.4) 26%, #DB39F8 49.5%, #3D44FF 75.5%, #01EAFF 100%)",
          }}
        ></span>
        <span className="sm:w-[30%]">{title}</span>
        <span
          className="sm:hidden flex-grow h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(149, 6, 249, 0.05) 0%, rgba(178, 57, 250, 0.4) 26%, #DB39F8 49.5%, #3D44FF 75.5%, #01EAFF 100%)",
          }}
        ></span>
        <div className="hidden items-center sm:flex gap-2 sm:w-[40%]">
          <span
            className="sm:w-[40%] flex-grow h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, #9506F9 0%, #B239FA 26%, #DB39F8 49.5%, rgba(61, 68, 255, 0.4) 75.5%, rgba(1, 234, 255, 0.05) 100%)",
            }}
          ></span>
          <div className="w-[60%] flex-shrink flex items-center gap-2">
            <span className="text-xl text-gray-500 font-semibold">
              Audited by
            </span>
            <img src="/img/auditor.svg" />
          </div>
        </div>
      </h2>
      <div className="text-white text-opacity-50 font-medium text-center">
        {subtitle}
      </div>
      <div className="sm:hidden justify-center flex items-center gap-2 mt-2">
        <span className="text-base text-gray-500 font-semibold">Audited by</span>
        <img src="/img/auditor.svg" className="w-[80px]" />
      </div>
    </div>
  );
};

export default SectionHeader;
