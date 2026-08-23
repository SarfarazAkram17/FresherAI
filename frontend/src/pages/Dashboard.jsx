import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { motion } from "motion/react";
import { FiSidebar } from "react-icons/fi";
import { getAllInterviews } from "../apis/interview.api";
import Statbox from "../components/Statbox";
import InterviewGraph from "../components/InterviewGraph";

const Dashboard = ({ user, setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    totalQuestions: 0,
    completed: 0,
    averageScore: 0,
  });
  const [technicalData, setTechnicalData] = useState([]);
  const [hrData, setHrData] = useState([]);
  const [technicalCount, setTechnicalCount] = useState(0);
  const [hrCount, setHrCount] = useState(0);

  useEffect(() => {
    const fetchInterviews = async () => {
      const res = await getAllInterviews();
      setStats(res.stats);
      setTechnicalData(res.technicalData);
      setHrData(res.hrData);
      setTechnicalCount(res.technicalCount);
      setHrCount(res.hrCount);
    };

    fetchInterviews();
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await api.get("/api/auth/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#0A0A0A] font-sans flex">
      <Sidebar
        user={user}
        onNewInterview={() => navigate("/interview")}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <motion.main
        className={`flex-1 min-h-screen px-3 sm:px-4 md:px-6 py-4 md:py-6 transition-all duration-300 ${sidebarOpen ? "md:ml-65" : "md:ml-18"}`}
      >
        {/* top area */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-black/40 hover:text-[#0A0A0A] transition-colors"
            >
              <FiSidebar size={17} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-black/40 text-[11px] md:text-xs font-medium mb-0.5">
                Overview
              </p>
              <h2 className="text-lg md:text-left font-bold text-[#0A0A0A]">
                Hello, {user?.name?.split(" ")[0]} 👋
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="h-px bg-black/8 mb-5 md:mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 md:gap-3">
          <Statbox
            label="Total Interviews"
            value={stats?.totalInterviews}
            subHighlight="All Time"
            sub="Interviews Created"
            index={0}
          />
          <Statbox
            label="Questions Solved"
            value={stats?.totalQuestions}
            subHighlight="Answered"
            sub="Across All Interviews"
            index={1}
          />
          <Statbox
            label="Completed"
            value={stats?.completed}
            subHighlight={`${stats?.totalInterviews || 0} Total`}
            sub="Interviews Finished"
            index={2}
          />
          <Statbox
            label="Average Score"
            value={stats?.averageScore}
            subHighlight={`${Math.round(stats?.averageScore || 0)}/100`}
            sub="Completed Only"
            index={3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-3 md:mb-4"
        >
          <p className="text-black/40 text-[10px] font-semibold uppercase tracking-widest mt-2.5 mb-1">
            Performance
          </p>
          <h3 className="text-[#0A0A0A] font-bold text-sm md:text-base mb-3 md:mb-4">
            Interview History
          </h3>
        </motion.div>

        <InterviewGraph
          technicalData={technicalData}
          hrData={hrData}
          technicalCount={technicalCount}
          hrCount={hrCount}
        />
      </motion.main>
    </div>
  );
};

export default Dashboard;
