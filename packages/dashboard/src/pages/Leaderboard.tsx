import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts';

export default function Leaderboard() {
// Sample Data: Replace with your actual data or API calls
    const teams = [
        {
        name: "HR Team",
        members: [
            { name: "Alice", power: 8, carbon: 2.4 },
            { name: "Bob", power: 6, carbon: 1.8 },
            { name: "Charlie", power: 7.5, carbon: 2.25 },
        ]
        },
        {
        name: "ML Engineers",
        members: [
            { name: "David", power: 15, carbon: 4.5 },
            { name: "Eve", power: 14, carbon: 4.2 },
            { name: "Frank", power: 13.5, carbon: 4.05 },
        ]
        },
        {
        name: "Mobile Developers",
        members: [
            { name: "Grace", power: 10, carbon: 3 },
            { name: "Hannah", power: 9.5, carbon: 2.85 },
            { name: "Ivy", power: 11, carbon: 3.3 },
        ]
        }
    ];

    const TeamGraph = ({ data }: { data: any[] }) => (
        <div className="w-full h-64 mt-6">
            <ResponsiveContainer>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend
                    content={({ payload }) => {
                    if (!payload) return null; // Ensure payload is not undefined
                    return (
                        <div className="flex justify-center gap-6 text-white">
                        {payload.map((entry, index) => (
                            <div key={`legend-item-${index}`} className="flex items-center">
                            <div
                                style={{
                                backgroundColor: entry.color,
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                marginRight: "6px",
                                }}
                            />
                            <span>{entry.value}</span>
                            </div>
                        ))}
                        </div>
                    );
                    }}
                />
                <Bar dataKey="power" fill="#4ade80" />
                <Bar dataKey="carbon" fill="#f87171" />
            </BarChart>
            </ResponsiveContainer>
        </div>
        );


    const allMembers = teams.flatMap(team => team.members);
    const top3 = allMembers
    .sort((a, b) => b.power - a.power)
    .slice(0, 3);
    const medalColors = ["bg-yellow-400", "bg-gray-500", "bg-amber-700"];

    // Define the teamColors object with specific keys of TeamName type
    type TeamName = "ML Engineers" | "HR Team" | "Mobile Developers";

    const teamColors = {
        "ML Engineers": "bg-[#76aaff]",  // Solid Pastel Blue
        "HR Team": "bg-[#FF8A8A]",       // Solid Pastel Yellow (slightly darker)
        "Mobile Developers": "bg-[#F2C94C]",  // Solid Pastel Red
      };
      

    return (
        <div className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Employee Power & Carbon Usage Leaderboard</h1>

            <div className="flex justify-center gap-6 mb-12">
                {top3.map((user, i) => (
                <div key={i} className="flex flex-col items-center text-white">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold ${medalColors[i]} border-4 border-white shadow-lg`}>
                    {/* Icon for Medals */}
                    <span className="text-3xl font-semibold">{i + 1}</span>
                </div>
                <p className="mt-2 font-semibold">{user.name}</p>
                <p className="text-sm text-gray-300">{user.power} kWh</p>
                </div>
            ))}
            </div>         


            {teams.map((team, index) => (
            // <div key={index} className="mb-16">
                <div
                key={index}
                className={`mb-16 p-4 rounded-xl ${teamColors[team.name as keyof typeof teamColors]} !important`}
                >
                <h2 className="text-2xl font-semibold text-white mb-4">{team.name}</h2>
                <div className="mb-8">
                    <TeamGraph data={team.members.map((member: any) => ({ name: member.name, power: member.power, carbon: member.carbon }))} />
                </div>
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full table-auto bg-transparent border-collapse border-4 border-white text-white">
                        <thead className="bg-black/30">
                            <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold border border-white">Employee</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold border border-white">Power Used (kWh)</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold border border-white">Carbon Emissions (kgCO2)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {team.members.map((member, idx) => (
                            <tr key={idx}>
                                <td className="py-3 px-6 text-sm border border-white">{member.name}</td>
                                <td className="py-3 px-6 text-sm border border-white">{member.power}</td>
                                <td className="py-3 px-6 text-sm border border-white">{member.carbon}</td>                                
                            </tr>
                            ))}
                        </tbody>
                    </table>            
             </div>
            </div>
            ))}
        </div>
        </div>
    );
}
  