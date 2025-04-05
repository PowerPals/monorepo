// export default function SettingsPage() {
//     return <p className="text-2xl text-red-500">
//       Settings
//     </p>
//   }


import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Settings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Settings */}
          <div className="p-6 bg-[#F2C94C] rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Account</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full p-3 rounded-md bg-[#F1F8E9] text-[#263238] border-2 border-[#F2C94C]"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 rounded-md bg-[#F1F8E9] text-[#263238] border-2 border-[#F2C94C]"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F2C94C] text-white py-2 rounded-lg hover:bg-[#F9F3A3] transition"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Display Settings */}
          <div className="p-6 bg-[#FF8A8A] rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Display</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="theme" className="block text-white text-sm font-medium mb-2">
                  Theme
                </label>
                <select
                  id="theme"
                  className="w-full p-3 rounded-md bg-[#F1F8E9] text-[#263238] border-2 border-[#FF8A8A]"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="language" className="block text-white text-sm font-medium mb-2">
                  Language
                </label>
                <select
                  id="language"
                  className="w-full p-3 rounded-md bg-[#F1F8E9] text-[#263238] border-2 border-[#FF8A8A]"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF8A8A] text-white py-2 rounded-lg hover:bg-[#FFB3B3] transition"
              >
                Save Display Settings
              </button>
            </form>
          </div>

          {/* Notifications Settings */}
          <div className="p-6 bg-[#4CAF50] rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Notifications</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email-notifications" className="block text-white text-sm font-medium mb-2">
                  Email Notifications
                </label>
                <input
                  id="email-notifications"
                  type="checkbox"
                  className="h-6 w-6 border-2 border-[#D0F5D2] bg-[#F1F8E9] rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="push-notifications" className="block text-white text-sm font-medium mb-2">
                  Push Notifications
                </label>
                <input
                  id="push-notifications"
                  type="checkbox"
                  className="h-6 w-6 border-2 border-[#D0F5D2] bg-[#F1F8E9] rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4CAF50] text-white py-2 rounded-lg hover:bg-[#81C784] transition"
              >
                Save Notification Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
