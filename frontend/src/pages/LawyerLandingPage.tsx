import '../index.css';
import React, { useState, useEffect } from "react";
import api from "../api/client.ts";
import { Case } from "../types";

interface Bill {
  id: string;
  amount: number;
  status: string;
}

export default function LawyerLandingPage() {
  const [recentCases, setRecentCases] = useState<Case[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesRes, billsRes] = await Promise.all([
          api.get('/api/cases/my-access'),
          api.get('/api/bills')
        ]);
        setRecentCases(casesRes.data);
        setBills(billsRes.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const payNow = async () => {
    try {
      await api.post('/api/bills/pay', { billId: bills[0]?.id }); // Example
      alert("Payment successful");
    } catch (error) {
      alert("Payment failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-900 font-inter">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white px-6 py-3 shadow">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs">⚖️</span>
          </div>
          <h1 className="text-lg font-semibold">
            Judiciary Information System
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium">Adv. John Doe</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span>👤</span>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span>💼</span>
          </div>
        </div>
      </div>
      {/* Layout */}
      <div className="flex h-[calc(100%-56px)]">
        {/* Sidebar */}
        <div className="w-56 bg-[#0B3A66] text-white flex flex-col py-6 space-y-4">
          {["Search", "My Access", "Invoices", "Support"].map((item) => (
            <button
              key={item}
              className="px-6 py-2 text-left hover:bg-[#0d4b88] transition"
            >
              {item}
            </button>
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by CIN, defendant, keyword"
              className="w-full p-3 text-base border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Two Column Content */}
          <div className="grid grid-cols-2 gap-8">
            {/* Recently Accessed Cases */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Recently Accessed Cases
              </h2>
              <div className="space-y-4">
                {recentCases.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded shadow hover:shadow-md transition"
                  >
                    <div className="p-4">
                      <p className="font-medium">CIN: {c.cin}</p>
                      <p className="text-sm text-gray-600">
                        {c.defendantName} — Short Summary of the case.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Viewed: Today</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Billing Summary */} 
            // hmm it was here
            <div>
              <h2 className="text-lg font-semibold mb-4">Billing Summary</h2>
              <div className="bg-white rounded">
                <div className="p-4 space-y-4">
                  <p className="font-medium text-lg">Current Balance: ₹2,500</p>
                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Recent Invoices
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {bills.map((b, i) => <li key={i}>{b.id} — ₹{b.amount} — {b.status}</li>)}
                    </ul>
                  </div>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white rounded px-4 py-2 transition" onClick={payNow}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}