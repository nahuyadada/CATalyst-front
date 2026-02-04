// import { useState, useEffect } from "react";

// export default function TopicSuggesterOutput({ topics = [] }) {
//   const [activeTopicId, setActiveTopicId] = useState(null);

//   const demoTopics = [
//     {
//       id: 1,
//       title: "Infrastructure Resilience Initiative",
//       brief: "Mitigating latency and scalability bottlenecks.",
//       summary: "This topic focuses on improving system stability during peak load.",
//       points: [
//         "Introduce caching layer",
//         "Improve websocket handling",
//         "Add circuit breakers",
//       ],
//     },
//     {
//       id: 2,
//       title: "Legacy Data Modernization",
//       brief: "Updating validation logic for core modules.",
//       summary: "Modernizing legacy validation for better data integrity.",
//       points: [
//         "Refactor validation module",
//         "Add schema checks",
//         "Improve logging",
//       ],
//     },
//   ];

//   const safeTopics = topics.length > 0 ? topics : demoTopics;

//   useEffect(() => {
//     if (safeTopics.length > 0 && !activeTopicId) {
//       setActiveTopicId(safeTopics[0].id);
//     }
//   }, [safeTopics, activeTopicId]);

//   const activeTopic = safeTopics.find((t) => t.id === activeTopicId);

//   return (
//     <div className="card shadow-sm" style={{ height: "500px" }}>
//       <div className="row g-0 h-100">
        
//         {/* Left Column */}
//         <div className="col-4 border-end d-flex flex-column bg-light">
//           <div className="p-3 border-bottom">
//             <p className="small fw-bold text-uppercase text-muted mb-0">
//               Available Topics ({safeTopics.length})
//             </p>
//           </div>

//           <div className="flex-grow-1 overflow-auto">
//             {safeTopics.map((topic) => (
//               <div
//                 key={topic.id}
//                 onClick={() => setActiveTopicId(topic.id)}
//                 className={`p-3 border-bottom cursor-pointer ${
//                   activeTopicId === topic.id ? "bg-primary bg-opacity-10" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//               >
//                 <h6 className="fw-bold mb-1">{topic.title}</h6>
//                 <p className="small text-muted mb-0 text-truncate">
//                   {topic.brief}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="col-8 p-4 overflow-auto">
//           {activeTopic ? (
//             <>
//               <h3 className="fw-bold mb-3">{activeTopic.title}</h3>

//               <p className="text-muted">{activeTopic.summary}</p>

//               <ul className="mt-3">
//                 {activeTopic.points.map((pt, idx) => (
//                   <li key={idx} className="mb-2">
//                     {pt}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           ) : (
//             <p className="text-muted">Select a topic to see details</p>
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
import { getTopicsByGroupIdAPI } from "../../../api/workflow.topic";

export default function TopicSuggesterOutput({ result }) {
  const group_id = useGroup().groupId;

  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGaps() {
      if (!group_id) return;

      setLoading(true);
      try {
        const res = await getTopicsByGroupIdAPI(group_id);
        const data = res.data || [];
        console.log("res: ",res.data);

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
              Suggested Topics ({items.length})
            </p>
          </div>

          <div className="flex-grow-1 overflow-auto">
            {loading ? (
              <div className="text-center p-4">
                <RiLoader4Line className="fs-1 text-primary animate-spin mb-2" />
                <p className="text-muted small">Loading topics...</p>
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
                <p className="mb-0">{activeItem.rationale}</p>
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
