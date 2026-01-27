
import { useState } from "react";
import GapBuckets from "./gapComponents/GapBuckets";
import GapSidebar from "./gapComponents/GapSidebar";

export default function GapExtractorOutput() {
  const [activeTab, setActiveTab] = useState("result");

  // Sample gaps
  const [gaps, setGaps] = useState([
    { id: 1, title: "Data Integrity Concern", description: "Lack of validation for secondary user input fields." },
    { id: 2, title: "API Latency Peaks", description: "High response times observed during peak traffic hours." },
    { id: 3, title: "Documentation Gap", description: "No clear onboarding path for new internal CLI tools." },
  ]);

  // Sample buckets
  const [buckets, setBuckets] = useState([
    { id: 1, name: "Critical Technical Debt", gaps: [1, 2] },
    { id: 2, name: "Process Inefficiencies", gaps: [] },
  ]);

  return (
    <div className="card h-full flex flex-col">
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
            className={`btn btn-link ${activeTab === "source" ? "fw-bold text-primary" : "text-muted"}`}
            onClick={() => setActiveTab("source")}
          >
            Source Gaps
          </button>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light">Download JSON</button>
          <button className="btn btn-light">Export PDF</button>
        </div>
      </div>

      {/* Content */}
      <div className="card-body flex-1 flex flex-row overflow-hidden gap-4 p-3 min-h-[400px]">
        {/* Sidebar */}
        <div className="w-[250px] min-w-[250px] border-end border-[#dbe0e6] dark:border-[#2d394a] overflow-y-auto">
          <GapSidebar gaps={gaps} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {activeTab === "result" ? (
            <GapBuckets gaps={gaps} buckets={buckets} setBuckets={setBuckets} />
          ) : (
            <p className="text-muted">Source gaps view here (can customize)</p>
          )}
        </div>
      </div>
    </div>
  );
}
