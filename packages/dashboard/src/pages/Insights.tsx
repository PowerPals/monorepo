// export default function Insights() {
//     return <p className="text-2xl text-red-500">
//       Insights 
//     </p>
//   }

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Insights() {
  // Sample data for power usage and carbon emissions
  const userStats = {
    powerUsage: 450, // kWh
    carbonEmissions: 120, // kgCO2
    powerUsageLastWeek: 310, // kWh
    carbonEmissionsLastWeek: 90, // kgCO2
  };

  // Calculate the equivalent emissions to cars driven (approx. 0.411 kgCO2 per mile)
  const equivalentCarMiles = userStats.carbonEmissions / 0.411;

  // The best time of day to run extensive code based on national grid data
  const bestTimeToRunCode = "2:00 AM - 4:00 AM"; // This would be dynamic in real use based on national grid data

  const TeamGraph = ({ data }: { data: any[] }) => (
    <div className="w-full h-64 mt-6">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend
            content={({ payload }) => {
              if (!payload) return null;
              return (
                <div className="flex justify-center gap-6 text-white">
                  {payload.map((entry, index) => (
                    <div key={`legend-item-${index}`} className="flex items-center">
                      <div
                        style={{
                          backgroundColor: entry.color,
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          marginRight: '6px',
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

  return (
    <div className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Your Power Usage & Carbon Emissions Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
            <div className="bg-white/10 p-6 rounded-lg shadow-lg mb-4">
              <p className="text-xl">Power Usage: {userStats.powerUsage} kWh</p>
              <p className="text-xl">Carbon Emissions: {userStats.carbonEmissions} kgCO2</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg shadow-lg mb-8">
              <p className="text-lg">This Week vs Last Week:</p>
              <p className="text-lg">Power Usage: {userStats.powerUsageLastWeek} kWh</p>
              <p className="text-lg">Carbon Emissions: {userStats.carbonEmissionsLastWeek} kgCO2</p>
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-4">Best Time to Run Intensive Code</h2>
            <div className="bg-white/10 p-6 rounded-lg shadow-lg">
              <p className="text-lg">
                According to national grid data, the best time to run intensive tasks to minimize carbon footprint is:
              </p>
              <p className="text-2xl font-bold mt-4">{bestTimeToRunCode}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#f87171] to-[#4ade80] p-8 rounded-lg mb-8 text-center shadow-xl">
          <h3 className="text-3xl font-semibold text-white mb-4">Fun Fact</h3>
          <p className="text-xl text-white">
            Your current carbon emissions are equivalent to driving{' '}
            <span className="text-4xl font-extrabold">{Math.round(equivalentCarMiles)} miles</span> in a car. 
            That's a huge impact on our environment!
          </p>
        </div>

        <div className="mb-12">
          <TeamGraph
            data={[
              { name: 'This Week', power: userStats.powerUsage, carbon: userStats.carbonEmissions },
              { name: 'Last Week', power: userStats.powerUsageLastWeek, carbon: userStats.carbonEmissionsLastWeek },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

