import Card from "../components/Card";
export default function HomePage() {
  return (
    <div className="flex flex-wrap justify-around gap-6">
      <Card title="Welcome to Your Dashboard" description="Track your prower usage easily">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Explore</button>
      </Card>
      <Card title="Current Activity" description="Your live power usage">
        <button className="bg-green-500 text-white px-4 py-2 rounded">View Activity</button>
      </Card>
    </div>
  );
}
