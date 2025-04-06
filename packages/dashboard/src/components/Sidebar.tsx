// import { Link, useLocation } from "react-router-dom";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Leaderboard", path: "/leaderboard" },
//   { name: "Insights", path: "/insights" },
//   { name: "Community Admin", path: "/community-admin" },
//   { name: "Settings", path: "/settings" }
// ];
  

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <aside className="w-64 h-screen p-4 bg-gray-100 border-r">
//       <nav className="flex flex-col space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`p-2 rounded hover:bg-gray-200 ${
//               location.pathname === item.path ? "bg-gray-300 font-semibold" : ""
//             }`}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }


import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  Activity,
  Users,
  Settings
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Leaderboard", path: "/leaderboard", icon: <BarChart2 size={18} /> },
  { name: "Insights", path: "/insights", icon: <Activity size={18} /> },
  { name: "Community Admin", path: "/community-admin", icon: <Users size={18} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={18} /> }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 shadow-xl">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold shadow-md"
                  : "hover:bg-gray-800 hover:shadow-sm"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


