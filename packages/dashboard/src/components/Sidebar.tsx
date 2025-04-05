import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Insights", path: "/insights" },
  { name: "Community Admin", path: "/community-admin" },
  { name: "Settings", path: "/settings" }
];
  

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen p-4 bg-gray-100 border-r">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-2 rounded hover:bg-gray-200 ${
              location.pathname === item.path ? "bg-gray-300 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
