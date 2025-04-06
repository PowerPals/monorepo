import { useState, useEffect } from "react";
import laptop from "../images/generalLaptop.svg";
import logo from "../images/wattLogo.svg";
import happyDuck from "../images/happyDuck.svg";
import LiveEnergy from "../components/LiveEnergy";
import TotalEnergy from "../components/TotalEnergy";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function HomePage() {
	const [leftBoxOpen, setLeftBoxOpen] = useState(false);
	const [rightBoxOpen, setRightBoxOpen] = useState(false);
  const mockData = [
    { name: "Mon", power: 120, carbon: 40 },
    { name: "Tue", power: 150, carbon: 45 },
    { name: "Wed", power: 130, carbon: 42 },
    { name: "Thu", power: 160, carbon: 50 },
    { name: "Fri", power: 170, carbon: 55 },
  ];

  const [liveEnergy, setLiveEnergy] = useState(320);

  useEffect(() => {
    const interval = setInterval(() => {
      // fluctuate by ±10
      const fluctuation = Math.floor(Math.random() * 21) - 10;
      setLiveEnergy((prev) => Math.max(100, prev + fluctuation));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  

	return (
		<div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-500 to-indigo-600">
			{/* Logo */}
			<div className="w-full flex justify-center items-center my-20">
				<img
					src={logo}
					alt="Site Logo"
					className="w-[700px] max-w-[90vw] object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
				/>
			</div>

			{/* Laptop + Duck */}
			<div className="relative">
				{/* Laptop */}
				<img src={laptop} alt="General Laptop" className="w-[500px]" />

				{/* Happy Duck (positioned over the laptop screen) */}
				<img
					src={happyDuck}
					alt="Happy Duck"
					className="absolute w-[500px]"
					style={{ top: "10%", left: "75%", transform: "translateX(-50%)" }}
				/>

				{/* Buttons on keyboard */}
				<div
					className="z-20 absolute flex flex-col items-center space-y-2"
					style={{ top: "63%", left: "50%", transform: "translateX(-50%)" }}
				>
					<button
						type="button"
						onClick={() => setLeftBoxOpen(!leftBoxOpen)}
						className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-700 transition transform rotate-[350deg]"
					>
						Total energy use
					</button>
					<button
						type="button"
						onClick={() => setRightBoxOpen(!rightBoxOpen)}
						className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-700 transition transform rotate-[350deg]"
					>
						Live usage
					</button>
				</div>

				{/* Side Boxes */}
        {leftBoxOpen && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-72 h-72 bg-red-500 text-white border shadow-xl p-4 rounded-xl z-10"
            style={{ left: "-300px" }}
          >
            <p className="text-base font-semibold mb-2">Total Energy and Carbon Use</p>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="power" stroke="#4ade80" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="carbon" stroke="#0099ff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      {rightBoxOpen && (
      <div
        className="absolute top-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400 text-white border shadow-xl p-4 rounded-xl z-10 flex flex-col justify-center items-center"
        style={{ right: "-300px" }}
      >
        <p className="text-base font-semibold mb-4 text-center">
          Live Energy Use
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="text-5xl animate-pulse">⚡️</div>

          {/* Fluctuating energy number */}
          <div className="text-5xl font-bold tracking-wide">
            {liveEnergy} W
          </div>
        </div>

        <p className="mt-4 text-sm text-white/80">Updating every second</p>
      </div>
      )}

			</div>
		</div>
	);
}
