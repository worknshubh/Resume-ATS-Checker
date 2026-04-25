import React, { useState, useEffect } from "react";
import "../App.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function HeaderBar() {
  const [activeTab, setActiveTab] = useState("home");

  useGSAP(() => {
    gsap.fromTo(
      ".header",
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power1.inOut",
      },
    );
  }, []);

  // Smooth scroll to a section by id
  const handleClick = (tab) => {
    setActiveTab(tab);

    if (tab === "home") {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "tryout") {
      // Scroll to upload section
      const uploadSection = document.getElementById("upload-section");
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Auto-update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const uploadSection = document.getElementById("upload-section");
      if (!uploadSection) return;

      const sectionTop = uploadSection.getBoundingClientRect().top;

      // If upload section is near top of screen, switch to "tryout"
      if (sectionTop <= 150) {
        setActiveTab("tryout");
      } else {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center">
      <div className="flex flex-row justify-between border-[#12A6F0] border-2 p-4 items-center w-[55%] rounded-[60px] bg-white/30 px-8 shadow-lg backdrop-blur-md header">
        {/* Logo */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => handleClick("home")}
        >
          <h2 className="lato-bold text-4xl text-gray-800">
            A<span className="text-[#12A6F0]">T</span>S Scorer
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-row space-x-3 text-xl lato-regular">
          {/* Home Button */}
          <div
            onClick={() => handleClick("home")}
            className={`cursor-pointer px-8 py-2 rounded-3xl transition-all duration-500 ${
              activeTab === "home"
                ? "bg-[#99C1F1] text-gray-800 shadow-md scale-105"
                : "bg-transparent text-gray-600 hover:bg-white/40"
            }`}
          >
            <h2>Home</h2>
          </div>

          {/* Try Out Button */}
          <div
            onClick={() => handleClick("tryout")}
            className={`cursor-pointer px-8 py-2 rounded-3xl transition-all duration-500 ${
              activeTab === "tryout"
                ? "bg-[#99C1F1] text-gray-800 shadow-md scale-105"
                : "bg-transparent text-gray-600 hover:bg-white/40"
            }`}
          >
            <h2>Try Out</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
