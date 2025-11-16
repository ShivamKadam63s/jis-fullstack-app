import '../index.css';
import React, { useState, useEffect } from "react";
import { Search, Bell, FileText, HelpCircle, Users, Settings, Calendar, CreditCard, Folder, Home } from "lucide-react";
import api from "../api/client.ts";
import { Case } from "../types";

interface Stats {
  todaysHearings: number;
  pendingCases: number;
  adjourned: number;
  outstandingBills: number;
}

export default function RegistrarDashboard() {
  const [stats, setStats] = useState<Stats>({ todaysHearings: 0, pendingCases: 0, adjourned: 0, outstandingBills: 0 });
  const [pendingCases, setPendingCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, pendingRes] = await Promise.all([
          api.get('/api/stats'),
          api.post('/api/reports/pending')
        ]);
        setStats(statsRes.data);
        setPendingCases(pendingRes.data.cases || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const createCase = async () => {
    try {
      await api.post('/api/cases', { title: "New Case" }); // Example payload
      alert("Case created");
    } catch (error) {
      alert("Failed to create case");
    }
  };

  const scheduleHearing = async () => {
    try {
      await api.post('/api/hearings', { cin: "example" });
      alert("Hearing scheduled");
    } catch (error) {
      alert("Failed to schedule");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen w-screen font-inter bg-[#F6F7F9] text-gray-800">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0B3A66] text-white flex flex-col p-4 space-y-4">
        <div className="text-xl font-bold mb-6">JIS</div>
        <nav className="flex-1 space-y-3">
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <Home size={18}/> <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <Folder size={18}/> <span>Cases</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <Calendar size={18}/> <span>Hearings</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <Search size={18}/> <span>Search</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <Users size={18}/> <span>Users</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <CreditCard size={18}/> <span>Billing</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <FileText size={18}/> <span>Reports</span>
            <span className="ml-auto bg-red-600 text-white rounded-full text-xs px-2">3</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:bg-[#0D447A] p-2 rounded">
            <Settings size={18}/> <span>Settings</span>
          </a>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm flex justify-between items-center p-4">
          <div className="flex items-center bg-gray-100 rounded px-3 py-1 w-1/3">
            <Search size={16} className="text-gray-500 mr-2"/>
            <input type="text" placeholder="Quick Search" className="bg-transparent flex-1 outline-none text-sm"/>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600"/>
            <img src="/avatar.png" alt="user" className="h-8 w-8 rounded-full"/>
          </div>
        </header>
        {/* Content grid */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {title:"Today's Hearings",value:stats.todaysHearings},
              {title:"Pending Cases",value:stats.pendingCases},
              {title:"Adjourned",value:stats.adjourned},
              {title:"Outstanding Bills",value:`₹${stats.outstandingBills}`}
            ].map((card,i)=>(
              <div key={i} className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="text-2xl font-semibold text-[#0B3A66]">{card.value}</h2>
              </div>
            ))}
          </div>
          {/* Middle grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="col-span-2 bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Weekly Hearings</h3>
                <HelpCircle size={16} className="text-gray-400"/>
              </div>
              <div className="h-72 bg-gray-50 flex items-center justify-center text-gray-400">
                [Calendar Week View Placeholder]
              </div>
            </div>
            {/* Right panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <ul className="text-sm space-y-1">
                  <li>Case #CIN123 updated by Registrar</li>
                  <li>Hearing scheduled with Judge AK</li>
                  <li>Bill generated for Case #CIN456</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-[#0B3A66] text-white py-2 rounded-md" onClick={createCase}>Create New Case</button>
                  <button className="w-full bg-[#0B66CC] text-white py-2 rounded-md" onClick={scheduleHearing}>Schedule Hearing</button>
                  <button className="w-full bg-[#F6C344] text-white py-2 rounded-md flex items-center justify-center space-x-2">
                    <FileText size={16}/> <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Pending Cases</h3>
              <button className="flex items-center space-x-1 text-sm text-[#0B3A66] border px-2 py-1 rounded">
                <FileText size={14}/> <span>Export PDF</span>
              </button>
            </div>
            <table className="w-full text-sm text-left border-t">
              <thead className="text-gray-600">
                <tr>
                  <th className="py-2">CIN</th>
                  <th>Defendant</th>
                  <th>Start Date</th>
                  <th>Judge</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pendingCases.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2">{r.cin}</td>
                    <td>{r.defendantName}</td>
                    <td>{r.startDate}</td>
                    <td>{r.presidingJudge}</td>
                    <td><span className="text-yellow-600">Pending</span></td>
                    <td className="space-x-2">
                      <button className="text-[#0B66CC]">View</button>
                      <button className="text-[#F6C344]">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}