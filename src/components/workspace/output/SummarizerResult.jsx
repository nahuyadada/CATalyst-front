import { useState } from "react";

export default function SummarizerResult() {
  const [activeTab, setActiveTab] = useState("result");

  return (
    <div className="card h-full flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <button
            className={`btn btn-link ${activeTab === "result" ? "fw-bold text-primary" : "text-muted"}`}
            onClick={() => setActiveTab("result")}
          >
            Result
          </button>
          <button
            className={`btn btn-link ${activeTab === "papers" ? "fw-bold text-primary" : "text-muted"}`}
            onClick={() => setActiveTab("papers")}
          >
            Papers
          </button>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light">Copy</button>
          <button className="btn btn-light">Download</button>
          <button className="btn btn-light">Share</button>
        </div>
      </div>

      {/* Content */}
      <div className="card-body flex-1 overflow-auto">
        {activeTab === "result" && (
          <div className="space-y-4">
            <h3 className="fw-bold">Executive Summary</h3>
            <p className="text-muted text-sm italic">Generated for: Strategic Plan Q3 2024.pdf</p>
            <h4 className="fw-bold mt-3">Operational Overview</h4>
            <p>The Q3 2024 Strategic Plan highlights a pivot toward <mark>hyper-automation</mark>...</p>
            <h4 className="fw-bold mt-3">Key Strategic Pillars</h4>
            <ul>
              <li>Regional Hub Expansion: Finalizing mega-centers</li>
              <li>Fleet Modernization: 30% vehicles to electric</li>
              <li>AI-Driven Routing: Real-time traffic models</li>
            </ul>
            <h4 className="fw-bold mt-3">Financial Projections</h4>
            <p>Initial capital expenditure peaks in July, ROI within 18 months...</p>
          </div>
        )}

        {activeTab === "papers" && (
          <div>
            <p className="text-muted text-sm">Previously generated summaries</p>
            <button className="card p-3 mb-2 text-start border-primary w-full">Strategic Plan Q3 2024.pdf</button>
            <button className="card p-3 mb-2 text-start border-primary w-full">Market Analysis 2024.pdf</button>
          </div>
        )}
      </div>
    </div>
  );
}
