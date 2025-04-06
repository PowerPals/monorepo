import { useState } from "react";
import laptop from "../images/generalLaptop.svg";
import logo from "../images/wattLogo.svg";
import happyDuck from "../images/happyDuck.svg";
import LiveEnergy from "../components/LiveEnergy";
import TotalEnergy from "../components/TotalEnergy";

export default function HomePage() {
	const [leftBoxOpen, setLeftBoxOpen] = useState(false);
	const [rightBoxOpen, setRightBoxOpen] = useState(false);

	return (
		<div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-500 to-indigo-600">
			{/* Logo */}
			<div className="w-full flex justify-center">
				<img
					src={logo}
					alt="Site Logo"
					className="w-[500px] object-scale-down"
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
						className="absolute top-1/2 -translate-y-1/2 w-60 h-60 bg-red-500 text-white border shadow-xl p-4 rounded-xl z-10"
						style={{ left: "-260px" }}
					>
						<p className="text-base font-semibold">
							Total Energy and Carbon Use
						</p>
						<TotalEnergy />
					</div>
				)}
				{rightBoxOpen && (
					<div
						className="absolute top-1/2 -translate-y-1/2 w-60 h-60 bg-red-500 text-white border shadow-xl p-4 rounded-xl z-10"
						style={{ right: "-260px" }}
					>
						<p className="text-base font-semibold">Live Energy Use</p>
						<LiveEnergy />
					</div>
				)}
			</div>
		</div>
	);
}
