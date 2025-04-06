// export default function CommunityAdmin() {
//     return <p className="text-2xl text-red-500">
//       Community Admin 
//     </p>
//   }

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for users' power consumption and carbon emissions
const usersData = [
{ name: "User 1", powerUsage: 320, carbonEmissions: 90 },
{ name: "User 2", powerUsage: 150, carbonEmissions: 45 },
{ name: "User 3", powerUsage: 500, carbonEmissions: 150 },
{ name: "User 4", powerUsage: 200, carbonEmissions: 60 },
{ name: "User 5", powerUsage: 350, carbonEmissions: 105 },
{ name: "User 6", powerUsage: 600, carbonEmissions: 180 },
{ name: "User 7", powerUsage: 180, carbonEmissions: 54 },
];

// Threshold for high power consumption
const HIGH_POWER_THRESHOLD = 400;

export default function CommunityAdmin() {
// State for identifying high-power users
const [highPowerUsers, setHighPowerUsers] = useState<any[]>([]);
const [averagePower, setAveragePower] = useState<number>(0);
const [averageCarbon, setAverageCarbon] = useState<number>(0);

useEffect(() => {
    // Filter high power users
    const highPower = usersData.filter((user) => user.powerUsage >= HIGH_POWER_THRESHOLD);
    setHighPowerUsers(highPower);

    // Calculate averages
    const totalPower = usersData.reduce((acc, user) => acc + user.powerUsage, 0);
    const totalCarbon = usersData.reduce((acc, user) => acc + user.carbonEmissions, 0);
    setAveragePower(totalPower / usersData.length);
    setAverageCarbon(totalCarbon / usersData.length);
}, []);

return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-start p-8">
    {/* Page Title */}
    <h1 className="text-4xl font-bold text-white text-center mb-12">
        Community Admin Dashboard
    </h1>

    {/* High Power Consuming Users */}
    <div className="bg-white/10 w-full max-w-4xl p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">High Power Consuming Users</h2>
        <div className="space-y-4">
        {highPowerUsers.length > 0 ? (
            highPowerUsers.map((user) => (
            <div key={user.name} className="flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                <div className="text-5xl animate-pulse">⚡️</div>
                <span>{user.name}</span>
                </div>
                <span>{user.powerUsage} W</span>
            </div>
            ))
        ) : (
            <p className="text-white">No users exceeding the high power threshold.</p>
        )}
        </div>
    </div>

    {/* Office Power and Carbon Trends */}
    <div className="bg-white/10 w-full max-w-4xl p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Office Power & Carbon Trends</h2>

        {/* Average Power & Carbon */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-white">
        <div className="bg-white/20 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Average Power Usage</h3>
            <p className="text-3xl font-bold">{averagePower.toFixed(0)} W</p>
        </div>
        <div className="bg-white/20 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">Average Carbon Emissions</h3>
            <p className="text-3xl font-bold">{averageCarbon.toFixed(0)} kgCO2</p>
        </div>
        </div>

        {/* Power and Carbon Bar Graph */}
        <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usersData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="powerUsage" fill="#4ade80" />
            <Bar dataKey="carbonEmissions" fill="#f87171" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
    </div>
);
}
  