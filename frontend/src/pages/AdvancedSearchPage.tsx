import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { Case } from "../types";

export default function AdvancedSearchPage() {
  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
    crimeType: '',
    judge: '',
    prosecutor: '',
    status: '',
    keyword: '',
    courtroom: '',
    attachment: false
  });
  const [results, setResults] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get('/cases/search', { 
        params: { keyword: filters.keyword, page: currentPage },
        data: filters 
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    }
    setLoading(false);
  };

  const handleViewCase = (cin: string) => {
    navigate(`/case/${cin}`);
  };

  const handleReset = () => {
    setFilters({
      dateStart: '',
      dateEnd: '',
      crimeType: '',
      judge: '',
      prosecutor: '',
      status: '',
      keyword: '',
      courtroom: '',
      attachment: false
    });
    setResults([]);
  };

  const pages = [1, 2, 3, "...", 100]; // Placeholder pagination

  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-900 font-inter p-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by CIN, Defendant, or Keyword..."
          className="w-full p-4 text-lg border rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({...filters, keyword: e.target.value})}
        />
      </div>
      {/* Advanced Filters */}
      <div className="mb-8 bg-white rounded shadow border">
        <div className="p-6">
          <h2 className="font-semibold text-lg mb-4">Advanced Filters</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Date Range Start</label>
              <input type="date" className="w-full border rounded p-2" value={filters.dateStart} onChange={(e) => setFilters({...filters, dateStart: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1">Date Range End</label>
              <input type="date" className="w-full border rounded p-2" value={filters.dateEnd} onChange={(e) => setFilters({...filters, dateEnd: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1">Crime Type</label>
              <select className="w-full border rounded p-2" value={filters.crimeType} onChange={(e) => setFilters({...filters, crimeType: e.target.value})}>
                <option value="">All</option>
                <option value="Theft">Theft</option>
                <option value="Fraud">Fraud</option>
                <option value="Assault">Assault</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Presiding Judge</label>
              <input type="text" placeholder="Search Judge" className="w-full border rounded p-2" value={filters.judge} onChange={(e) => setFilters({...filters, judge: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1">Prosecutor</label>
              <input type="text" placeholder="Search Prosecutor" className="w-full border rounded p-2" value={filters.prosecutor} onChange={(e) => setFilters({...filters, prosecutor: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select className="w-full border rounded p-2" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Keyword</label>
              <input type="text" placeholder="Enter keyword" className="w-full border rounded p-2" value={filters.keyword} onChange={(e) => setFilters({...filters, keyword: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm mb-1">Courtroom</label>
              <input type="text" placeholder="Courtroom number" className="w-full border rounded p-2" value={filters.courtroom} onChange={(e) => setFilters({...filters, courtroom: e.target.value})} />
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <input type="checkbox" id="attachment" className="h-4 w-4" checked={filters.attachment} onChange={(e) => setFilters({...filters, attachment: e.target.checked})} />
              <label htmlFor="attachment" className="text-sm">Attachment Present</label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={handleReset}>Reset</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>
      {/* Results Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">Showing 1–{results.length} of {results.length} results</p>
        <div className="space-x-2">
          <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">Export CSV</button>
          <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">Export PDF</button>
        </div>
      </div>
      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["CIN", "Defendant", "Start Date", "Crime Type", "Judge", "Snippet", "Action"].map((header) => (
                <th key={header} className="px-4 py-2 border text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.cin} className="bg-gray-50">
                <td className="px-4 py-2 border">{row.cin}</td>
                <td className="px-4 py-2 border">{row.defendantName}</td>
                <td className="px-4 py-2 border">{row.startDate}</td>
                <td className="px-4 py-2 border">{row.crimeType}</td>
                <td className="px-4 py-2 border">{row.presidingJudge}</td>
                <td className="px-4 py-2 border">
                  Case involves <mark className="bg-yellow-300">{row.summary}</mark>.
                </td>
                <td className="px-4 py-2 border">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700" onClick={() => handleViewCase(row.cin)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
        {pages.map((p, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${p === currentPage ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
            onClick={() => setCurrentPage(Number(p))}
          >
            {p}
          </button>
        ))}
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
      </div>
      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-100 border rounded text-sm text-gray-700">
        <p>
          <strong>Legend:</strong> Highlighted text indicates keyword matches. Results are ordered by relevance ranking considering keyword frequency, date, and case importance.
        </p>
      </div>
    </div>
  );
}