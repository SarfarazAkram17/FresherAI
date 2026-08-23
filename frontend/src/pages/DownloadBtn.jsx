import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useCoins } from "../apis/user.api";

const DownloadBtn = ({ docRef, setUser }) => {
  const handlePdf = useReactToPrint({
    contentRef: docRef,
    documentTitle: "FresherAIPDF",
  });

  const handleDownload = async () => {
    try {
      await handlePdf();

      const coinRes = await useCoins({ coins: 10, action: "resume-builder" });
      setUser((prev) => ({ ...prev, interviewCoin: coinRes?.interviewCoin }));
    } catch (error) {
      if (error.response?.status === 403) {
        return alert("Not enough Interview Coins.");
      }

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs text-white cursor-pointer"
    >
      <FiDownload />
      Download PDF
    </button>
  );
};

export default DownloadBtn;
