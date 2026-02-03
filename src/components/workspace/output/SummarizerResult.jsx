// import { useState } from "react";

// export default function SummarizerResult() {
//   const [activeTab, setActiveTab] = useState("result");

//   return (
//     <div className="card h-full flex flex-col overflow-hidden">
//       {/* Tabs */}
//       <div className="card-header d-flex justify-content-between align-items-center">
//         <div className="d-flex gap-3">
//           <button
//             className={`btn btn-link ${activeTab === "result" ? "fw-bold text-primary" : "text-muted"}`}
//             onClick={() => setActiveTab("result")}
//           >
//             Result
//           </button>
//           <button
//             className={`btn btn-link ${activeTab === "papers" ? "fw-bold text-primary" : "text-muted"}`}
//             onClick={() => setActiveTab("papers")}
//           >
//             Papers
//           </button>
//         </div>
//         <div className="d-flex gap-2">
//           {/* <button className="btn btn-light">Copy</button>
//           <button className="btn btn-light">Download</button>
//           <button className="btn btn-light">Share</button> */}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="card-body flex-1 overflow-auto">
//         {activeTab === "result" && (
//           <div className="space-y-4">
//             <h3 className="fw-bold">Executive Summary</h3>
//             <p className="text-muted text-sm italic">Generated for: Strategic Plan Q3 2024.pdf</p>
//             <h4 className="fw-bold mt-3">Operational Overview</h4>
//             <p>The Q3 2024 Strategic Plan highlights a pivot toward <mark>hyper-automation</mark>...</p>
//             <h4 className="fw-bold mt-3">Key Strategic Pillars</h4>
//             <ul>
//               <li>Regional Hub Expansion: Finalizing mega-centers</li>
//               <li>Fleet Modernization: 30% vehicles to electric</li>
//               <li>AI-Driven Routing: Real-time traffic models</li>
//             </ul>
//             <h4 className="fw-bold mt-3">Financial Projections</h4>
//             <p>Initial capital expenditure peaks in July, ROI within 18 months...</p>
//           </div>
//         )}

//         {activeTab === "papers" && (
//           <div>
//             <p className="text-muted text-sm">Previously generated summaries</p>
//             <button className="card p-3 mb-2 text-start border-primary w-full">Strategic Plan Q3 2024.pdf</button>
//             <button className="card p-3 mb-2 text-start border-primary w-full">Market Analysis 2024.pdf</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useGroup } from "../../../context/GroupContext";
import { getSummaryByGroupAPI } from "../../../api/workflow.summarizer";
import { RiLoader4Line, RiQuestionLine } from "react-icons/ri";

export default function SummarizerResult({ result }) {
  const group_id = useGroup().groupId;

  const [activeTab, setActiveTab] = useState("papers"); // flipped
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch summaries whenever group_id or result changes (auto-update)
  useEffect(() => {
    async function fetchSummaries() {
      if (!group_id) return;
      setLoading(true);
      try {
        const extractedData = await getSummaryByGroupAPI(group_id);
        const data = extractedData.data || [];
        console.log("Summaries data:", data);

        // Sort newest first
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPapers(sorted);

        // Auto-select newly generated summary if result exists
        if (result) {
          setSelectedPaper(result);
          setActiveTab("result");
        } else if (sorted.length > 0 && !selectedPaper) {
          setSelectedPaper(sorted[0]);
        }
      } catch (err) {
        console.error("Error fetching summaries:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummaries();
  }, [group_id, result]);

  return (
    <div className="card h-full flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <button
            className={`btn btn-link ${
              activeTab === "papers" ? "fw-bold text-primary" : "text-muted"
            }`}
            onClick={() => setActiveTab("papers")}
          >
            Papers
          </button>
          <button
            className={`btn btn-link ${
              activeTab === "result" ? "fw-bold text-primary" : "text-muted"
            }`}
            disabled // result tab not clickable
          >
            Result
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="card-body flex-1 overflow-auto d-flex justify-content-center align-items-center">
        {loading ? (
          <div className="text-center">
            <RiLoader4Line className="fs-1 text-primary animate-spin mb-2" />
            <p className="text-muted small">Loading summaries...</p>
            {/* <img src="/path/to/loading.gif" alt="Loading..." /> */}
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center">
            <RiQuestionLine className="fs-1 text-secondary mb-2" />
            <p className="text-muted small">
              No summaries found. Run the summarizer to generate one.
            </p>
            {/* <img src="/path/to/question-mark.png" alt="No summaries" /> */}
          </div>
        ) : activeTab === "papers" ? (
          <div className="list-group w-100">
            {papers.map((paper) => (
              <button
                key={paper.id}
                className={`list-group-item list-group-item-action ${
                  selectedPaper?.id === paper.id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedPaper(paper);
                  setActiveTab("result");
                }}
              >
                {paper.title || "Untitled Summary"}
              </button>
            ))}
          </div>
        ) : activeTab === "result" && selectedPaper ? (
          <div className="space-y-4 w-100">
            {[
              "title",
              "introduction",
              "literature_review",
              "methodology",
              "results",
              "discussion",
              "conclusion",
            ].map((section) => (
              <div key={section} className="border rounded p-3">
                <h6 className="fw-bold text-capitalize">
                  {section.replace("_", " ")}
                </h6>
                <p className="text-muted small">
                  {selectedPaper[section] || "No content available."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted small">
            No summary selected. Go to the Papers tab to select one.
          </p>
        )}
      </div>
    </div>
  );
}
