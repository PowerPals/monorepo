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

    return (
        <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Employee Power & Carbon Usage Leaderboard</h1>
            
            {teams.map((team, index) => (
            <div key={index} className="mb-16">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{team.name}</h2>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Employee</th>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Power Used (kWh)</th>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">Carbon Emissions (kgCO2)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {team.members.map((member, idx) => (
                        <tr key={idx} className="border-t border-gray-200">
                        <td className="py-3 px-6 text-sm text-gray-800">{member.name}</td>
                        <td className="py-3 px-6 text-sm text-gray-800">{member.power}</td>
                        <td className="py-3 px-6 text-sm text-gray-800">{member.carbon}</td>
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
  