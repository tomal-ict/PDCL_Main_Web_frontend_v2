import React from "react";
import "@fontsource/ubuntu";
import video from "../../assets/heroVideo.mp4";
import { SearchBoxBranch } from "../../components";
import { branch } from "../../constants/branches";

const Chattogram = () => {
  const branchInfo = branch.find((b) => b.heading === "Chattogram");
  const branchName = branchInfo.heading;
  const branchId = branchInfo.branchID;
  const branchForDoctor = 16;

  return (
    <section className="relative py-32 lg:py-36 bg-white">
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12 pb-20">
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
          <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-[#00984a] blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
          <span className="absolute right-4 top-96 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
        </div>
        <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-[#00984a] absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
        <div
          className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
          <h1
            className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-[#00664a]">
            Popular Diagnostic Centre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00664a]  from-20% via-[#00984a] via-30% to-blue-600">
              {branchName}{" "}
            </span>
            Branch.
          </h1>
          <div className="mt-10  w-full flex max-w-md mx-auto lg:mx-0"></div>
        </div>
        <div className="flex flex-1 relative mx-auto ">
          <video
            className="lg:absolute lg:w-full rounded-3xl object-cover shadow-2xl "
            alt="Hero Video"
            src={video}
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
      <div className="relative md:mt-[250px] mb-[100px]">
        <SearchBoxBranch
          branchId={branchId}
          branchForDoctor={branchForDoctor}
        />
      </div>
      <div className="relative">
        <div className="bg-gradient-to-bl from-white from-10% via-white via-30% to-[#00984a]/20 mt-12 mx-auto lg:max-w-7xl w-full flex flex-col lg:flex-row justify-evenly rounded-3xl items-start border border-[#00664a]/10 shadow-xl backdrop-blur-sm">
          <img
            src={branchInfo.braManImg}
            alt="Mr. Farid Mohammad Shamim"
            className="relative mx-auto h-full w-auto border-[6px] border-[#00984a] rounded-3xl"
          />
          <div className="flex lg:item-start">
            <h1 className="text-gray-500/30 text-end absolute font-bold text-[96px] -mt-10 ml-5 lg:-mt-20 lg:-ml-48 overflow-hidden">
              Branch{" "}
              <h1 className="text-gray-500/20 ml-10 -mt-16 lg:-mt-14 text-[72px] lg:ml-48">
                Manager
              </h1>
            </h1>
            <div className="relative mt-24 p-5">
              <h1 className="text-gray-600 font-bold text-[36px]">
                {branchInfo.braManName}
              </h1>
              <h1 className="text-gray-500 font-bold text-[18px]">
                {branchInfo.braManDesignation}
              </h1>
              <p className="text-lg font-semibold text-center text-green-700 mb-4">
                চট্টগ্রামবাসির সুস্বাস্থ্যে ২৫% ডিসকাউন্ট সকল প্রকার টেস্টে!
              </p>

              <p className="mb-4">
                আন্তর্জাতিক মানসম্পন্ন ল্যাব, অত্যাধুনিক প্রযুক্তির বিশেষায়িত
                মেশিন ও ১৬০+ ঢাকা ও চট্টগ্রামের বিশেষজ্ঞ ডাক্তারদের সেবার
                মেলবন্ধনে ঢাকার পপুলার এখন চট্টগ্রামে। আপনার প্রয়োজনীয় সব
                স্বাস্থ্য পরীক্ষা এখন একই ছাদের নিচে, আরও সাশ্রয়ী মূল্যে ও
                নির্ভরতায়।
              </p>

              <p className="font-semibold mb-2">আমাদের সেবা সমূহ:</p>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>
                  চট্টগ্রামে প্রথম ১২৮ চ্যানেলের বায়োমেট্রিক্স প্রযুক্তির 3
                  Tesla - Siemens, Germany এর MRI মেশিন ও ৫১২ Slice Dual এনার্জি
                  সম্পন্ন CT Scan মেশিন।
                </li>
                <li>
                  লিভার সিরোসিস ও ফ্যাটি লিভার রোগ নির্ণয়ে{" "}
                  <strong>FibroScan</strong> টেস্ট।
                </li>
                <li>
                  হাড় ক্ষয়ের নির্ভরযোগ্য পরীক্ষার জন্য <strong>BMD</strong>{" "}
                  টেস্ট।
                </li>
                <li>
                  ব্রেস্ট ক্যান্সার সহ স্তনের সব রোগ নির্ণয়ের জন্য{" "}
                  <strong>Mammography</strong> টেস্ট।
                </li>
                <li>
                  সর্বাধুনিক <strong>Ultrasound (Voluson E10, GE, USA)</strong>{" "}
                  মেশিনে চট্টগ্রামের স্বনামধন্য Radiologist ও Sonologist এর
                  মাধ্যমে আল্ট্রাসনোগ্রাম।
                </li>
                <li>
                  হৃদরোগ নির্ণয়ে <strong>GE VIVID-9</strong> মেশিনের মাধ্যমে{" "}
                  <strong>Echo / Colour Doppler</strong> পরীক্ষা।
                </li>
                <li>
                  চট্টগ্রামের স্বনামধন্য{" "}
                  <strong>Gastroenterology / Hepatology</strong> চিকিৎসকদের
                  মাধ্যমে <strong>Endoscopy / Colonoscopy</strong>।
                </li>
                <li>
                  দাঁতের সমস্যা নির্ণয়ে <strong>OPG</strong>।
                </li>
                <li>
                  কানের শ্রবণশক্তি নির্ণয়ে <strong>Hearing Test</strong>।
                </li>
                <li>
                  বিভিন্ন বয়স ও রোগ অনুযায়ী <strong>হেলথ চেকআপ প্যাকেজ</strong>{" "}
                  এবং <strong>বিশেষজ্ঞ ডাক্তারের পরামর্শ</strong>।
                </li>
                <li>
                  <strong>বাসা থেকে Blood এবং Urine Sample</strong> কালেকশনের
                  সুবিধা।
                </li>
                <li>
                  <strong>অফিস বা বাসা থেকে রিপোর্ট ডাউনলোড</strong> করার
                  সুবিধা।
                </li>
              </ul>

              <p className="mt-6 font-medium">
                <strong>আপনার সুস্বাস্থ্যই আমাদের অঙ্গীকার।</strong> আধুনিক
                প্রযুক্তি, নির্ভুল রিপোর্ট, সাশ্রয়ী মূল্য – সব সুবিধা একসাথে!
              </p>

              <p className="mt-4">
                আজই যোগাযোগ করুন এবং সুস্থ জীবনযাত্রার প্রথম পদক্ষেপ নিন
                <strong> পপুলার ডায়াগনস্টিক সেন্টার, চট্টগ্রাম শাখা</strong> এর
                মাধ্যমে।
              </p>

              <p className="mt-2 font-semibold text-end text-green-700">
                📞 হটলাইন: 09666787810
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chattogram;
