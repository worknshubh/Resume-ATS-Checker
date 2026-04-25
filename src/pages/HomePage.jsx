import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState } from "react";
import { ScrollTrigger } from "gsap/all";
import {
  Target,
  FileText,
  PenLine,
  AlertCircle,
  Upload,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [missingSkills, setMissingSkills] = useState([]);
  const [verbImprovements, setVerbImprovements] = useState([]);
  const [missingSections, setMissingSections] = useState([]);
  const [lowScores, setLowScores] = useState([]);
  const [userRole, setUserRole] = useState("");

  useGSAP(() => {
    gsap.fromTo(".heroimg", { y: 400 }, { y: 0, ease: "power1.inOut" });
    gsap.fromTo(
      ".bulb",
      { y: -600, opacity: 0 },
      { y: 0, opacity: 1, ease: "power1.inOut", delay: 0.5 },
    );
    gsap.fromTo(
      ".ai",
      { y: -600, opacity: 0 },
      { y: 0, opacity: 1, ease: "power1.inOut", delay: 0.5 },
    );
    gsap.fromTo(
      ".percent",
      { y: 600, opacity: 0 },
      { y: 0, opacity: 1, ease: "power1.inOut", delay: 0.5 },
    );
    gsap.fromTo(
      ".docs",
      { y: 600, opacity: 0 },
      { y: 0, opacity: 1, ease: "power1.inOut", delay: 0.5 },
    );
    gsap.fromTo(
      ".enhance",
      { opacity: 0 },
      { opacity: 1, ease: "power1.inOut", delay: 0.8 },
    );
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".bulb",
      { y: 0 },
      {
        y: 500,
        scrollTrigger: {
          trigger: ".heroimg",
          start: "top 40%",
          end: "+=1200",
          scrub: 1,
        },
      },
    );
    gsap.fromTo(
      ".enhance",
      { y: 0 },
      {
        y: 500,
        scrollTrigger: {
          trigger: ".heroimg",
          start: "top 40%",
          end: "+=400",
          scrub: 1,
        },
      },
    );
    gsap.fromTo(
      ".ai",
      { y: 0 },
      {
        y: 500,
        scrollTrigger: {
          trigger: ".heroimg",
          start: "top 40%",
          end: "+=1200",
          scrub: 1,
        },
      },
    );
    gsap.fromTo(
      ".percent",
      { y: 0 },
      {
        y: -200,
        scrollTrigger: {
          trigger: ".heroimg",
          start: "top 40%",
          end: "+=1200",
          scrub: 1,
        },
      },
    );
    gsap.fromTo(
      ".docs",
      { y: 0 },
      {
        y: -200,
        scrollTrigger: {
          trigger: ".heroimg",
          start: "top 40%",
          end: "+=1200",
          scrub: 1,
        },
      },
    );
  }, []);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setError("");
    setScore(0);
    setMissingSkills([]);
    setVerbImprovements([]);
    setMissingSections([]);
    setLowScores([]);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch(
        "https://ats-scorer-backend.onrender.com/check-resume",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Server error. Please try again.");
      }

      const data = await response.json();
      console.log("Backend response:", data);

      setScore(data.total_score);
      setUserRole(data.role || "");
      setMissingSkills(data.missing_skills || []);
      setVerbImprovements(data.verb_improvements || []);
      setMissingSections(data.missing_sections || []);
      setLowScores(data.low_scores || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const totalImprovements =
    missingSkills.length +
    verbImprovements.length +
    missingSections.length +
    lowScores.length;

  return (
    <>
      <div className="h-235 flex items-end justify-center bg-[#d9d9d9]/10 relative">
        <img
          src="images/heroimg.png"
          alt="Hero Img"
          className="w-[55%] heroimg"
          draggable={false}
        />
        <div className="absolute -z-10 top-28 enhance">
          <h2 className="text-[200px] lato-bold">
            EN<span className="text-[#12A6F0]">HAN</span>CE
          </h2>
        </div>
        <div className="absolute left-20 top-50 hover:scale-110 transition-all duration-300 ease-in-out">
          <img
            src="images/bulb.png"
            alt="bulb"
            className="w-70 -rotate-24 bulb"
            draggable={false}
          />
        </div>
        <div className="absolute left-80 hover:scale-110 transition-all duration-300 ease-in-out">
          <img
            src="images/percent.png"
            alt="percent"
            className="w-70 percent"
            draggable={false}
          />
        </div>
        <div className="absolute right-40 top-20 hover:scale-110 transition-all duration-300 ease-in-out">
          <img
            src="images/ai.png"
            alt="ai"
            className="w-70 rotate-12 ai"
            draggable={false}
          />
        </div>
        <div className="absolute right-80 top-120 hover:scale-110 transition-all duration-300 ease-in-out">
          <img
            src="images/docs.png"
            alt="docs"
            className="w-70 docs"
            draggable={false}
          />
        </div>
      </div>

      <div id="upload-section" className="min-h-screen px-20 py-20 bg-white">
        <h2 className="text-5xl font-semibold text-center mb-16 text-gray-800">
          Your resume is about to get a{" "}
          <span className="text-[#12A6F0]">powerful upgrade</span>
        </h2>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-gray-50 hover:border-[#12A6F0] transition-all duration-300 min-h-[400px]">
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
            >
              <div className="w-20 h-20 bg-[#12A6F0]/10 rounded-full flex items-center justify-center mb-6">
                <Upload
                  className="h-10 w-10 text-[#12A6F0]"
                  strokeWidth={1.8}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {loading
                  ? "Analyzing..."
                  : file
                    ? file.name
                    : "Upload your resume"}
              </h3>
              <p className="text-gray-500 mb-6 text-center">
                {loading
                  ? "Please wait, this may take 20-30 seconds"
                  : file
                    ? "Click to change file"
                    : "Drag and drop or click to browse"}
              </p>
              <span className="px-6 py-3 bg-[#12A6F0] text-white rounded-lg font-medium hover:bg-[#0d8ed0] transition-colors">
                {loading ? "Processing..." : "Choose File"}
              </span>
              <p className="text-sm text-gray-400 mt-4">Supports PDF only</p>
              {error && (
                <p className="text-sm text-red-500 mt-4 font-medium">{error}</p>
              )}
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </div>

          <div className="border border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-gray-50 min-h-[400px]">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Your Resume Score
            </h3>
            {userRole && (
              <p className="text-sm text-gray-500 mb-6">
                Detected role:{" "}
                <span className="font-semibold capitalize text-[#12A6F0]">
                  {userRole}
                </span>
              </p>
            )}
            <div className="relative">
              <svg width="220" height="220" className="transform -rotate-90">
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  stroke="#12A6F0"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-gray-800">
                  {loading ? "..." : score}
                </span>
                <span className="text-gray-500 text-sm mt-1">out of 100</span>
              </div>
            </div>
            <p className="text-gray-500 mt-6 text-center">
              {loading
                ? "Analyzing your resume..."
                : score === 0
                  ? "Upload your resume to see your score"
                  : score >= 80
                    ? "Excellent! Your resume is in great shape"
                    : score >= 60
                      ? "Good, but there's room for improvement"
                      : "Your resume needs significant improvements"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="border border-gray-200 rounded-2xl p-10 bg-gray-50 text-center">
              <p className="text-gray-500">
                Analyzing your resume, please wait...
              </p>
            </div>
          )}

          {!loading && totalImprovements === 0 && file && (
            <div className="border border-gray-200 rounded-2xl p-10 bg-gray-50 text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="h-12 w-12 text-[#12A6F0]" />
              <p className="text-gray-800 text-xl font-semibold">
                Great job! No major improvements needed.
              </p>
            </div>
          )}

          {!loading && !file && (
            <div className="border border-gray-200 rounded-2xl p-10 bg-gray-50 text-center">
              <p className="text-gray-500">
                Upload your resume to see personalized improvement suggestions
              </p>
            </div>
          )}

          {missingSkills.length > 0 && (
            <div className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#12A6F0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target
                    className="h-6 w-6 text-[#12A6F0]"
                    strokeWidth={1.8}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Missing Skills
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Add these skills to match your target role
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#12A6F0]/5 border border-[#12A6F0]/20 text-[#12A6F0] rounded-full font-medium text-sm hover:bg-[#12A6F0]/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {missingSections.length > 0 && (
            <div className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#12A6F0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText
                    className="h-6 w-6 text-[#12A6F0]"
                    strokeWidth={1.8}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Missing Sections & Info
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Add these to make your resume complete
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {missingSections.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ArrowRight
                      className="h-5 w-5 text-[#12A6F0] mt-0.5 flex-shrink-0"
                      strokeWidth={2}
                    />
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {verbImprovements.length > 0 && (
            <div className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#12A6F0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PenLine
                    className="h-6 w-6 text-[#12A6F0]"
                    strokeWidth={1.8}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Use Stronger Action Verbs
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Replace weak verbs with powerful ones
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {verbImprovements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-md line-through font-medium text-sm min-w-[120px] text-center">
                      {item.weak}
                    </span>
                    <ArrowRight
                      className="h-5 w-5 text-gray-400"
                      strokeWidth={2}
                    />
                    <span className="px-4 py-1.5 bg-[#12A6F0]/10 text-[#12A6F0] rounded-md font-semibold text-sm min-w-[120px] text-center">
                      {item.strong}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lowScores.length > 0 && (
            <div className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#12A6F0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle
                    className="h-6 w-6 text-[#12A6F0]"
                    strokeWidth={1.8}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Points Cut From Your Score
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    These issues lowered your overall score
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {lowScores.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-2 h-2 bg-[#12A6F0] rounded-full mt-2.5 flex-shrink-0"></span>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
