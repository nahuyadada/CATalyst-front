import { useState } from "react";
// import PapersHistory from "../result/PapersHistory";

export default function ExtractorOutput() {
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
          {/* <button className="btn btn-light">Copy</button>
          <button className="btn btn-light">Download</button>
          <button className="btn btn-light">Share</button> */}
        </div>
      </div>

      {/* Content */}
      <div className="card-body flex-1 overflow-auto">
        {activeTab === "result" && (
          <div className="space-y-4">
            <div className="border rounded p-3">
              <h6 className="fw-bold">Extracted Text</h6>
              <p className="text-muted small">
                The extracted content of the document will appear here after running the workflow...
              </p>
            </div>
          </div>
        )}

        {activeTab === "papers" && (
          <div className="space-y-2">
            <p className="text-muted text-sm">Previously processed papers</p>
            {/* <PapersHistory /> */}
          </div>
        )}
      </div>
    </div>
  );
}
