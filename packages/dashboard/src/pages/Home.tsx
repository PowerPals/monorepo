import { useState } from "react";
import laptop from "../images/generalLaptop.svg";

export default function HomePage() {
  const [leftBoxOpen, setLeftBoxOpen] = useState(false);
  const [rightBoxOpen, setRightBoxOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Buttons positioned over keyboard area */}

      {/* Left Box */}
      {leftBoxOpen && (
        <div className="left-0 top-1/2 -translate-y-1/2 w-60 h-60 bg-white border border-gray-300 shadow-xl p-4 rounded-xl z-10">
          <p className="text-base font-semibold">Total Energy and Carbon Use</p>
        </div>
      )}

      {/* Right Box */}
      {rightBoxOpen && (
        <div className="right-0 top-1/2 -translate-y-1/2 w-60 h-60 bg-white border border-gray-300 shadow-xl p-4 rounded-xl z-10">
          <p className="text-base font-semibold">Live Energy Use</p>
        </div>
      )}

      {/* Large centered laptop */}
      <div className="relative">
        <img src={laptop} alt="General Laptop" className="w-[500px]" />
        <div
          className="z-20 absolute space-x-4"
          style={{ top: "68%", left: "50%", transform: "translateX(-50%)" }}
        >
          <button
            onClick={() => setLeftBoxOpen(!leftBoxOpen)}
            className="bg-black-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Total energy use
          </button>
          <button
            onClick={() => setRightBoxOpen(!rightBoxOpen)}
            className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition"
          >
            Live usage
          </button>
        </div>
      </div>
    </div>
  );
}
