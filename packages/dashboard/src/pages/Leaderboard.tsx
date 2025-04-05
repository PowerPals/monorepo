/**
export default function Leaderboard() {
    return <p className="text-2xl text-red-500">
      Leaderboard 
    </p>
  }
*/


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

    const allMembers = teams.flatMap(team => team.members);
    const top3 = allMembers
    .sort((a, b) => b.power - a.power)
    .slice(0, 3);

    return (
        // <div className="py-12 bg-gray-100">
        <div className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Employee Power & Carbon Usage Leaderboard</h1>
            
            <div className="flex justify-center gap-6 mb-12">
            {top3.map((user, i) => (
                <div className="flex flex-col items-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {i + 1}
                </div>
                <p className="mt-2 font-semibold">{user.name}</p>
                <p className="text-sm text-gray-300">{user.power} kWh</p>
                </div>
            ))}
            </div>

            {teams.map((team, index) => (
            <div key={index} className="mb-16">
                <h2 className="text-2xl font-semibold text-white mb-4">{team.name}</h2>

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
  