
// import { useState } from "react";
// import GapBuckets from "./gapComponents/GapBuckets";
// import GapSidebar from "./gapComponents/GapSidebar";

// export default function GapExtractorOutput() {
//   const [activeTab, setActiveTab] = useState("result");

//   // Sample gaps
//   const [gaps, setGaps] = useState([
//     { id: 1, title: "Data Integrity Concern", description: "Lack of validation for secondary user input fields." },
//     { id: 2, title: "API Latency Peaks", description: "High response times observed during peak traffic hours." },
//     { id: 3, title: "Documentation Gap", description: "No clear onboarding path for new internal CLI tools." },
//   ]);

//   // Sample buckets
//   const [buckets, setBuckets] = useState([
//     { id: 1, name: "Critical Technical Debt", gaps: [1, 2] },
//     { id: 2, name: "Process Inefficiencies", gaps: [] },
//   ]);

//   return (
//     <div className="card h-full flex flex-col">
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
//             className={`btn btn-link ${activeTab === "source" ? "fw-bold text-primary" : "text-muted"}`}
//             onClick={() => setActiveTab("source")}
//           >
//             Source Gaps
//           </button>
//         </div>
//         <div className="d-flex gap-2">
//           <button className="btn btn-light">Download JSON</button>
//           <button className="btn btn-light">Export PDF</button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="card-body flex-1 flex flex-row overflow-hidden gap-4 p-3 min-h-[400px]">
//         {/* Sidebar */}
//         <div className="w-[250px] min-w-[250px] border-end border-[#dbe0e6] dark:border-[#2d394a] overflow-y-auto">
//           <GapSidebar gaps={gaps} />
//         </div>

//         {/* Main content */}
//         <div className="flex-1 overflow-auto">
//           {activeTab === "result" ? (
//             <GapBuckets gaps={gaps} buckets={buckets} setBuckets={setBuckets} />
//           ) : (
//             <p className="text-muted">Source gaps view here (can customize)</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useGroup } from "../../../context/GroupContext";
import { getGapsByGroupAPI } from "../../../api/workflow.gap";
import { RiLoader4Line, RiQuestionLine } from "react-icons/ri";

export default function GapExtractorOutput({ result }) {
  const group_id = useGroup().groupId;

  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGaps() {
      if (!group_id) return;

      setLoading(true);
      try {
        const res = await getGapsByGroupAPI(group_id);
        const data = res.data || [];

        setItems(data);

        // Auto focus newly generated OR first
        if (result?.id) {
          setActiveId(result.id);
        } else if (data.length > 0) {
          setActiveId(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching gaps:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGaps();
  }, [group_id, result]);

  const activeItem = items.find((p) => p.id === activeId);

  return (
    <div className="card shadow-sm" style={{ height: "500px" }}>
      <div className="row g-0 h-100">

        {/* LEFT SIDEBAR — TITLES */}
        <div className="col-4 border-end d-flex flex-column bg-light">
          <div className="p-3 border-bottom">
            <p className="small fw-bold text-uppercase text-muted mb-0">
              Extracted Gap Sources ({items.length})
            </p>
          </div>

          <div className="flex-grow-1 overflow-auto">
            {loading ? (
              <div className="text-center p-4">
                <RiLoader4Line className="fs-1 text-primary animate-spin mb-2" />
                <p className="text-muted small">Loading gaps...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center p-4">
                <RiQuestionLine className="fs-1 text-secondary mb-2" />
                <p className="text-muted small">
                  No gaps extracted yet. Run the gap extractor.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`p-3 border-bottom ${
                    activeId === item.id ? "bg-primary bg-opacity-10" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="small text-muted mb-0 text-truncate">
                    {item.gap}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT PANEL — GAP */}
        <div className="col-8 p-4 overflow-auto">
          {activeItem ? (
            <>
              <h4 className="fw-bold mb-3">{activeItem.title}</h4>

              <div className="border rounded p-4 bg-white shadow-sm">
                <p className="mb-0">{activeItem.gap}</p>
              </div>
            </>
          ) : (
            <p className="text-muted">Select a source to view extracted gap.</p>
          )}
        </div>
      </div>
    </div>
  );
}
