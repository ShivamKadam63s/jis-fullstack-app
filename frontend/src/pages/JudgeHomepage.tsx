import '../index.css';
import React, { useState, useEffect } from "react";
import api from "../api/client.ts";
import { Case } from "../types";

export default function JudgeHomepage() {
  const [docket, setDocket] = useState<Case[]>([]);
  const [searchResults, setSearchResults] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocket = async () => {
      try {
        const response = await api.get('/api/cases/upcoming'); // Today's docket
        setDocket(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchDocket();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await api.get('/api/cases/search', { params: { keyword: searchQuery } });
      setSearchResults(response.data); // Free for judge
    } catch (error) {
      alert("Search failed");
    }
  };

  const saveNotes = () => {
    // Save private notes (local or API)
    alert("Notes saved");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen flex bg-gray-100 font-['Inter']">
      {/* Sidebar */}
      <aside className="w-56 bg-[#12355B] text-white flex flex-col py-6 px-3">
        <h2 className="text-lg font-semibold mb-6">JIS</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:underline">My Docket</a>
          <a href="#" className="block hover:underline" onClick={handleSearch}>Case Search</a>
          <a href="#" className="block hover:underline">Notes</a>
          <a href="#" className="block hover:underline">Settings</a>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-6 py-3 shadow">
          <h1 className="text-xl font-semibold text-gray-800">High Court of Example State</h1>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm text-gray-600">Img</span>
            </div>
          </div>
        </header>
        {/* Banner */}
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-2 text-sm text-blue-700">
          Judge access — no charges for case views
        </div>
        {/* Content layout */}
        <div className="flex-1 grid grid-cols-5 gap-6 px-6 py-6 overflow-y-auto">
          {/* Left column */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Today's Docket</h2>
              <ul className="space-y-3">
                {docket.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="text-md font-medium text-gray-900">{item.startDate}</p>
                      <p className="text-sm text-gray-700">{item.cin} — {item.defendantName}</p>
                      <p className="text-xs text-gray-500">Court 2</p>
                    </div>
                    <button className="bg-[#12355B] text-white text-xs px-3 py-1 rounded">
                      Open Case
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right column */}
          <div className="col-span-2 space-y-6">
            {/* Assigned Cases */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Assigned Cases</h2>
              <ul className="text-sm text-gray-700 space-y-2">
                {searchResults.slice(0, 3).map((c, i) => <li key={i}>{c.cin} — {c.defendantName}</li>)}
              </ul>
            </div>
            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
              <input
                type="text"
                placeholder="Search by keyword"
                className="w-full px-3 py-2 border rounded-md text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            {/* Private Notes */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Private Notes</h2>
              <textarea
                placeholder="Write your private notes here..."
                className="w-full h-32 border rounded-md p-2 text-sm mb-3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <button className="self-end bg-[#D4AF37] text-white text-sm px-4 py-2 rounded" onClick={saveNotes}>
                Save
              </button>
              <p className="text-xs text-gray-500 mt-1">These notes are private</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}