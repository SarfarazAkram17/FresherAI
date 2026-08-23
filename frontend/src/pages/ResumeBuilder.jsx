import { useState } from "react";
import ResumeForm from "../components/resume/ResumeForm";
import initialData from "../components/resume/initialData";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FiArrowLeft, FiArrowRight, FiEye } from "react-icons/fi";
import PreviewResume from "./PreviewResume";

const STEPS = [
  {
    step: 1,
    title: "Personal Information",
    subtitle: "Your basic contact details",
  },
  {
    step: 2,
    title: "Professional Summary",
    subtitle: "A quick intro about yourself",
  },
  { step: 3, title: "Skills", subtitle: "Your technical skills" },
  {
    step: 4,
    title: "Work Experience",
    subtitle: "Your past jobs & internships",
  },
  { step: 5, title: "Projects", subtitle: "Projects you have build" },
  { step: 6, title: "Education", subtitle: "Your academic background" },
];

const TOTAL_STEPS = STEPS.length;

const ResumeBuilder = ({ user, setUser }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const progressPct = (currentStep / TOTAL_STEPS) * 100;
  const activeStep = STEPS.find((s) => s.step === currentStep);
  const isLastStep = currentStep === STEPS.length;

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (showPreview) {
    return (
      <PreviewResume
        data={data}
        user={user}
        setUser={setUser}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] flex flex-col">
      {/* navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-20 border-b border-black/8 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-3 sm:px-5t">
          <div
            onClick={() => navigate("/dashboard")}
            className="flex cursor-pointer items-center gap-1.5"
          >
            <span className="text-sm font-extrabold sm:text-base text-[#0A0A0A]">
              FresherAI
            </span>
            <span className="hidden rounded bg-black/5 px-1.5 py-0.5 text-[10px] text-black/50 sm:block">
              Resume Builder
            </span>
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="flex h-8 items-center justify-center rounded-lg border border-black/15 text-black/60 transition px-2 hover:border-[#0A0A0A] hover:text-[#0A0A0A] cursor-pointer"
          >
            <FiEye size={13} />
          </button>
        </div>
      </motion.nav>

      {/* main container */}
      <div className="flex-1 px-3 py-4 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] text-black/40 font-medium">
                STEP {currentStep} OF {TOTAL_STEPS}
              </p>

              <p className="hidden text-[10px] text-black/40 sm:block">
                {Math.round(progressPct)}% completed
              </p>
            </div>

            <div className="w-full h-1 bg-black/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0A0A0A] rounded-l-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="mt-3">
              <h2 className="text-xl font-bold sm:text-2xl">
                {activeStep.title}
              </h2>
              <p className="text-xs mt-1 text-black/45 sm:text-sm">
                {activeStep.subtitle}
              </p>
            </div>
          </div>

          <div className="border-t border-black/8 mb-4" />

          <ResumeForm step={currentStep} data={data} setData={setData} />

          <div className="border-t border-black/8 mt-6 mb-4" />

          {/* navigation buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${currentStep === 1 ? "border-black/8 text-black/25 cursor-not-allowed" : "border-black/20 text-black/60 hover:border-black/40 hover:text-[#0A0A0A] cursor-pointer"}`}
            >
              <FiArrowLeft size={15} />
              <span className="hidden sm:block">Previous</span>
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`rounded-full transition-all cursor-pointer ${s.step === currentStep ? "w-4 h-1.5 bg-[#0A0A0A]" : s.step < currentStep ? "w-1.5 h-1.5 bg-black/35" : "w-1.5 h-1.5 bg-black/12"}`}
                />
              ))}
            </div>

            {isLastStep ? (
              <button
                onClick={() => setShowPreview(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#000000]/90 backdrop-blur-2xl border border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:border-white/20 transition-all cursor-pointer`}
              >
                <FiEye size={13} />
                <span className="hidden sm:block">Preview Resume</span>
              </button>
            ) : (
              <button
                onClick={goNext}
                disabled={currentStep === 6}
                className={`flex items-center gap-1.5 cursor-pointer px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#000000]/90 backdrop-blur-2xl border border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:border-white/20 transition-all`}
              >
                <span className="hidden sm:block">Next</span>
                <FiArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
