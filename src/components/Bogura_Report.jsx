import React, { useState } from 'react';
import BranchIcon from "../assets/branchIcon.webp";
export default function Bogura_Report() {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans text-gray-800">

            {/* Patient Notice & Caution Banner */}
            <div className="mb-8 p-4 sm:p-5 bg-green-50 border-l-4 border-[#00984a] rounded-r-xl shadow-sm flex items-start gap-3 sm:gap-4 transition-all">
                <svg
                    className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <div>
                    <h4 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wide">
                        Patient Notice & Caution
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-700 mt-1.5 leading-relaxed">
                        "Welcome, dear patients and visitors, to the Popular Diagnostic Centre Ltd., Bogura Branch reporting platform. To ensure absolute transparency in our diagnostic services and health metrics across Bogura, we have streamlined how you access your information. Our updated interface features an immediate Caution Advisory to help patients understand critical timing adjustments and prevent appointment confusion. Furthermore, utilizing our dedicated portal tabs linked for Before and After 31st October, you can effortlessly review pre- and post-deadline medical updates. We remain dedicated to providing precision healthcare with the care and clarity our Bogura community deserves."
                    </p>
                </div>
            </div>

            {/* Cards Section Container */}
            <div className="w-full py-6 sm:py-10 px-2 sm:px-6 bg-gray-50/80 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 border border-gray-100 shadow-inner">
                <a
                    href="http://reports.populardiagnostic.com:8877/ords/f?p=706:3:13078707145556:::::"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {/* Card 1: Before 31 October */}
                    <div className="w-full sm:w-64 max-w-xs p-6 bg-gradient-to-b from-[#e8f8f2] to-[#c2f0dd] rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-white/70 cursor-pointer group">
                        {/* Icon Container */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full bg-[#b8eccf] flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                            <img
                                src={BranchIcon}
                                alt="Hospital Icon"
                                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                            />
                        </div>

                        {/* Card Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#065f46] tracking-wide mb-1">
                            Before 31th October 2026
                        </h3>

                        {/* Location Tag */}
                        <p className="text-xs sm:text-sm font-semibold text-[#047857]">
                            Bogura
                        </p>

                    </div>
                </a>
                {/* Card 2: From November */}

                <a
                    href="https://report.populardiagnostic.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="w-full sm:w-64 max-w-xs p-6 bg-gradient-to-b  from-[#e8f8f2] to-[#c2f0dd] rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-white/70 cursor-pointer group">
                        {/* Icon Container */}


                        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full bg-[#b8eccf] flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                            <img
                                src={BranchIcon}
                                alt="Hospital Icon"
                                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                            />
                        </div>

                        {/* Card Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#065f46] tracking-wide mb-1">
                            From 1st November 2026
                        </h3>

                        {/* Location Tag */}
                        <p className="text-xs sm:text-sm font-semibold text-[#047857]">
                            Bogura
                        </p>

                    </div>
                </a>
            </div>

        </div>
    );
}