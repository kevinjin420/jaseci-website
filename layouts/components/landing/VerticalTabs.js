"use client";

import React, { useState } from "react";
import { Highlight} from "prism-react-renderer";
import "../../../lib/prism-jac";
import { CodeBlock } from "../CodeBlock";


import { jacTabsData, pythonTabsData, tabsData } from "@lib/data/verticalTabs";

const LearnMoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
  </svg>
);


const VerticalTabs = () => {
  const [activeVerticalTab, setActiveVerticalTab] = useState(0);
  const [activeLanguage, setActiveLanguage] = useState("jac");

  const handleVerticalTabClick = (index) => {
    setActiveVerticalTab(index);
    setActiveLanguage("jac"); // reset language on vertical tab change
  };

  const currentJacCode = jacTabsData[activeVerticalTab].code;
  const currentPythonCode = pythonTabsData[activeVerticalTab].code;

  return (
    <section className="py-10" id="what-is-jac">
      <h2 className="text-center text-4xl font-semibold mb-12 text-white">
        What is Jac?
      </h2>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto min-h-[520px] rounded-2xl overflow-hidden shadow-2xl bg-black/50">
        {/* Left: Vertical Tabs Navigation */}
        <div className="w-full lg:w-[270px] flex flex-row lg:flex-col justify-around gap-3 lg:gap-3 bg-black p-4 lg:py-8">
          {tabsData.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleVerticalTabClick(index)}
              className={`relative text-left text-lg font-medium p-3 lg:py-3 lg:px-8 transition-colors duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-orange-500
                ${activeVerticalTab === index ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              <span
                className={`absolute left-2 lg:left-5 top-1/2 -translate-y-1/2 w-1 h-3/5 rounded-r-sm transition-all duration-200 ease-in-out
                  ${activeVerticalTab === index ? "bg-orange-500 opacity-100" : "bg-gray-500 opacity-30"}`}
              ></span>
              <span className="flex-grow pl-2 lg:pl-0">{tab.title}</span>
              <a
                href={tab.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hidden lg:inline-block absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                aria-label="Learn more"
              >
                <LearnMoreIcon />
              </a>
            </button>
          ))}
        </div>

        {/* Right: Content Area */}
<div className="w-full max-w-full lg:max-w-[inherit] bg-[#2d2d2d] p-6 sm:p-8 lg:p-12 flex flex-col rounded-t-2xl lg:rounded-l-none lg:rounded-r-2xl overflow-x-auto">
  <div className="text-white text-lg font-medium min-h-[60px] leading-relaxed">
    {tabsData[activeVerticalTab].summary}
  </div>
  <div className="mt-4 flex-1 flex flex-col bg-[#282C34] rounded-xl shadow-lg overflow-hidden min-h-[350px]">
    {/* Language Tabs */}
    <div className="bg-[#3c4043] h-14 flex items-center justify-center px-4 relative">
      <div className="flex p-1.5 gap-2 rounded-lg">

                <button
                  onClick={() => setActiveLanguage("jac")}
                  className={`min-w-[90px] py-1.5 px-4 text-sm font-medium rounded-md transition-all duration-300
                    ${activeLanguage === "jac" ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md" : "bg-[#2b2f36] text-gray-300 hover:bg-[#343941]"}`}
                >
                  jac
                </button>
                <button
                  onClick={() => setActiveLanguage("python")}
                  className={`min-w-[90px] py-1.5 px-4 text-sm font-medium rounded-md transition-all duration-300
                    ${activeLanguage === "python" ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md" : "bg-[#2b2f36] text-gray-300 hover:bg-[#343941]"}`}
                >
                  python
                </button>
              </div>
            </div>

            {/* Code Blocks */}
            <div className="flex-1 overflow-auto p-4 text-xs max-h-[50vh]">
              {activeLanguage === "jac" ? (
                <CodeBlock code={currentJacCode.trim()} language="jac" />
              ) : (
                <CodeBlock code={currentPythonCode.trim()} language="python" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalTabs;
