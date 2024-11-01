import React, { useState } from 'react';
import { BsThreeDotsVertical, BsPerson, BsBell, BsSearch } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const chartData = Array.from({ length: 20 }, (_, i) => ({
  date: i + 1,
  value: Math.floor(Math.random() * 40) + 60
}));

const ProgressBar = ({ value, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="h-2 rounded-full transition-all duration-300"
      style={{
        width: `${value}%`,
        backgroundColor: color
      }}
    />
  </div>
);

const MetricRow = ({ icon, title, value, status, color }) => (
  <div className="flex items-center justify-between mb-6 p-4 transition-transform transform hover:scale-105 rounded-lg shadow-md bg-white hover:shadow-lg">
    <div className="flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-gray-900 font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{status}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="font-semibold">{value}%</span>
      <BsThreeDotsVertical className="text-gray-400 cursor-pointer hover:text-gray-600" />
    </div>
  </div>
);

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    "New health tip available!",
    "You have a doctor's appointment tomorrow.",
    "Your fitness goal has been updated.",
  ]);

  const metrics = [
    {
      title: 'Physical Fitness',
      value: 89,
      status: 'Excellent',
      color: '#3498db'
    },
    {
      title: 'Mental Wellness',
      value: 70,
      status: 'Good',
      color: '#9b59b6'
    },
    {
      title: 'Diet',
      value: 87,
      status: 'Excellent',
      color: '#e67e22'
    },
    {
      title: 'Daily Routine',
      value: 30,
      status: 'Need to Improve',
      color: '#2ecc71'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex flex-col fixed h-full"
           style={{
             background: 'linear-gradient(180deg, #3498db 0%, #2ecc71 100%)'
           }}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s"
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                4
              </div>
            </div>
            <div>
              <h2 className="text-white font-semibold">Samantha</h2>
              <p className="text-white/70 text-sm">samantha@email.com</p>
            </div>
          </div>
          
          <nav className="space-y-4">
            {['Dashboard', 'Section', 'Score Card', 'Summary', 'Accounts', 'Settings'].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`block px-4 py-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors ${
                  i === 0 ? 'bg-white/10' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
              <BsSearch />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Home
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Health Assessment
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              History
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200">
              Leaderboard
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200">
              About Us
            </button>

            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)}>
                <BsBell className="text-gray-600 text-lg" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{notifications.length}</span>
                )}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <div className="p-2">
                    {notifications.length > 0 ? (
                      notifications.map((note, index) => (
                        <div key={index} className="p-2 border-b hover:bg-gray-100 cursor-pointer">
                          {note}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIEd2zxEc_4IQ1jHyniHLECu15zRjkHTBJzA&s"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <div className="p-2">
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">Settings</div>
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">Logout</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report</h1>
              <p className="text-gray-500">01 - 27 October, 2024</p>
            </div>

            {/* Profile Images */}
            <div className="flex -space-x-2">
              {[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_NR09b1Z8k0rMj2Phr5LpSQuxEaI8vGKDSQ&s",
                "https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds",
                
              ].map((src, index) => (
                <img key={index} src={src} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {metrics.map((metric, i) => (
              <MetricRow
                key={i}
                icon={<BsPerson className="text-lg" />}
                title={metric.title}
                value={metric.value}
                status={metric.status}
                color={metric.color}
              />
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-gray-900 font-semibold mb-4">Health Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="value" stroke="#3498db" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Footer Section */}
<footer className="bg-black text-white p-4 flex justify-between items-center">
  <div>
    <h2 className="text-xl font-semibold">Consult A Doctor</h2>
    <p>Save your money by consulting with doctors, and for more tips, see below</p>
  </div>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
    View Tips
  </button>
</footer>


        </main>
      </div>
    </div>
  );
};

export default Dashboard;
