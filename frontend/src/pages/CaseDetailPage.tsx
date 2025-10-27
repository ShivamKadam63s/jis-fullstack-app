import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";
import { Case } from "../types";

interface Hearing {
  date: string;
  time: string;
  status: string;
  summary: string;
}

export default function CaseDetailPage() {
  const { cin } = useParams<{ cin: string }>();
  const { user } = useAuth();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [tab, setTab] = useState("hearings");
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCase = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/cases/${cin}`);
        setCaseData(response.data);
        const hResponse = await api.get(`/hearings/${cin}`);
        setHearings(hResponse.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load case");
      }
      setLoading(false);
    };
    if (cin) fetchCase();
  }, [cin]);

  const handleSchedule = async () => {
    try {
      await api.post('/hearings', { cin, date: new Date(), time: new Date() });
      // Refresh hearings
      const hResponse = await api.get(`/hearings/${cin}`);
      setHearings(hResponse.data);
    } catch (error) {
      alert("Failed to schedule hearing");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!caseData) return <div className="flex justify-center items-center h-screen">Case not found</div>;

  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-900 font-inter p-8 overflow-y-auto">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">Cases &gt; {caseData.cin}</p>
          <h1 className="text-2xl font-bold mt-1">
            Case Detail: {caseData.crimeType} — {caseData.cin}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            {caseData.status}
          </span>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
            Export / Print
          </button>
        </div>
      </div>
      {/* Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Case Info */}
          <div className="bg-white rounded shadow p-6 space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <p className="font-semibold">CIN:</p>
              <p>{caseData.cin}</p>
              <p className="font-semibold">Defendant:</p>
              <p>{caseData.defendantName}</p>
              <p className="font-semibold">Address:</p>
              <p>{caseData.defendantAddress}</p>
              <p className="font-semibold">Crime:</p>
              <p>{caseData.crimeType} — {caseData.crimeDate} — Location: {caseData.crimeLocation}</p>
              <p className="font-semibold">Arresting Officer:</p>
              <p>{caseData.arrestingOfficer}</p>
              <p className="font-semibold">Arrest Date:</p>
              <p>{caseData.arrestDate}</p>
              <p className="font-semibold">Presiding Judge:</p>
              <p>{caseData.presidingJudge}</p>
            </div>
          </div>
          {/* Tabs */}
          <div>
            <div className="flex space-x-4 border-b">
              {["hearings", "proceedings", "judgment", "documents"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 text-sm font-medium ${
                    tab === t
                      ? "border-b-2 border-teal-600 text-teal-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-4">
              {tab === "hearings" && (
                <div className="bg-white rounded shadow p-4 space-y-3">
                  {hearings.map((h, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium">
                        {h.date} — {h.time} —{" "}
                        <span className="text-gray-600">{h.status}</span>
                      </p>
                      <p className="text-xs text-gray-600">{h.summary}</p>
                      <div className="border-t my-2" />
                    </div>
                  ))}
                </div>
              )}
              {tab === "proceedings" && (
                <div className="bg-white rounded shadow p-4 text-sm text-gray-700">
                  Detailed record of proceedings goes here. Includes witness statements, cross-examinations, and procedural notes.
                </div>
              )}
              {tab === "judgment" && (
                <div className="bg-white rounded shadow p-4 space-y-3 text-sm text-gray-700">
                  <p>
                    Final judgment text here. The presiding judge’s remarks and legal reasoning.
                  </p>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
                    Download Judgment PDF
                  </button>
                </div>
              )}
              {tab === "documents" && (
                <div className="bg-white rounded shadow p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <p>FIR Document</p>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300">
                      ⬇️ Download
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Evidence Photo</p>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300">
                      ⬇️ Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded shadow p-4 space-y-3 text-sm">
            {user?.role === 'REGISTRAR' && (
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
                ✏️ Edit Case
              </button>
            )}
            <div className="border-t my-2" />
            <p className="font-semibold mb-2">Quick Links</p>
            <div className="space-y-2">
              {user?.role === 'REGISTRAR' && (
                <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700" onClick={handleSchedule}>
                  Schedule Hearing
                </button>
              )}
              <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                Adjourn
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
                Export PDF
              </button>
            </div>
          </div>
          {/* Audit Trail */}
          <div className="bg-white rounded shadow p-4 text-sm space-y-2">
            <p className="font-semibold">Audit Trail</p>
            <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
              <li>2025-07-12 — Case updated by Registrar</li>
              <li>2025-07-08 — Document uploaded</li>
              <li>2025-07-05 — Hearing scheduled</li>
              <li>2025-07-02 — Case created</li>
            </ul>
          </div>
          {/* Attachments */}
          <div className="bg-white rounded shadow p-4 text-sm space-y-2">
            <p className="font-semibold">Attachments</p>
            <div className="flex justify-between items-center">
              <p>Charge Sheet</p>
              <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300">
                ⬇️
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p>Witness List</p>
              <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300">
                ⬇️
              </button>
            </div>
          </div>
          {/* View Count */}
          <div className="bg-white rounded shadow p-4 text-sm">
            <p className="font-semibold">Lawyer View Count</p>
            <p className="text-2xl font-bold text-teal-600">27</p>
          </div>
        </div>
      </div>
    </div>
  );
}