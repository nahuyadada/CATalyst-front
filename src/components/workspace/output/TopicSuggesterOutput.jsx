// import { useState } from "react";

// export default function TopicSuggesterOutput({ topics }) {
//   const [activeTopicId, setActiveTopicId] = useState(topics[0]?.id || null);

//   const activeTopic = topics.find(t => t.id === activeTopicId);

//   return (
//     <div className="flex-1 flex overflow-hidden rounded-xl border border-[#dbe0e6] dark:border-[#2d394a] shadow-sm">
//       {/* Left Column: Topics */}
//       <div className="w-1/3 border-r border-[#dbe0e6] dark:border-[#2d394a] bg-background-light dark:bg-[#141d28]/50 flex flex-col">
//         <div className="p-4 border-b border-[#dbe0e6] dark:border-[#2d394a]">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-[#617589]">Available Topics ({topics.length})</p>
//         </div>
//         <div className="flex-1 overflow-y-auto custom-scrollbar">
//           {topics.map(topic => (
//             <div
//               key={topic.id}
//               onClick={() => setActiveTopicId(topic.id)}
//               className={`p-4 border-b border-[#dbe0e6] dark:border-[#2d394a] cursor-pointer hover:bg-primary/5 transition-colors ${
//                 activeTopicId === topic.id ? "topic-item-active" : ""
//               }`}
//             >
//               <h4 className="text-sm font-bold mb-1">{topic.title}</h4>
//               <p className="text-xs text-[#617589] line-clamp-1">{topic.brief}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Column: Detailed View */}
//       <div className="flex-1 bg-white dark:bg-[#1a2533] overflow-y-auto custom-scrollbar p-6">
//         {activeTopic ? (
//           <div className="space-y-6">
//             <h2 className="text-3xl font-extrabold leading-tight text-[#111418] dark:text-white">{activeTopic.title}</h2>
//             <div className="text-sm text-[#3a444f] dark:text-[#cbd5e1] space-y-3">
//               <p>{activeTopic.summary}</p>
//               <ul className="list-disc pl-5 space-y-2 marker:text-primary">
//                 {activeTopic.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <p className="text-[#617589] dark:text-[#94a3b8]">Select a topic to see details</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function TopicSuggesterOutput({ topics = [] }) {
  const [activeTopicId, setActiveTopicId] = useState(null);

  const demoTopics = [
    {
      id: 1,
      title: "Infrastructure Resilience Initiative",
      brief: "Mitigating latency and scalability bottlenecks.",
      summary: "This topic focuses on improving system stability during peak load.",
      points: [
        "Introduce caching layer",
        "Improve websocket handling",
        "Add circuit breakers",
      ],
    },
    {
      id: 2,
      title: "Legacy Data Modernization",
      brief: "Updating validation logic for core modules.",
      summary: "Modernizing legacy validation for better data integrity.",
      points: [
        "Refactor validation module",
        "Add schema checks",
        "Improve logging",
      ],
    },
  ];

  const safeTopics = topics.length > 0 ? topics : demoTopics;

  useEffect(() => {
    if (safeTopics.length > 0 && !activeTopicId) {
      setActiveTopicId(safeTopics[0].id);
    }
  }, [safeTopics, activeTopicId]);

  const activeTopic = safeTopics.find((t) => t.id === activeTopicId);

  return (
    <div className="card shadow-sm" style={{ height: "500px" }}>
      <div className="row g-0 h-100">
        
        {/* Left Column */}
        <div className="col-4 border-end d-flex flex-column bg-light">
          <div className="p-3 border-bottom">
            <p className="small fw-bold text-uppercase text-muted mb-0">
              Available Topics ({safeTopics.length})
            </p>
          </div>

          <div className="flex-grow-1 overflow-auto">
            {safeTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`p-3 border-bottom cursor-pointer ${
                  activeTopicId === topic.id ? "bg-primary bg-opacity-10" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                <h6 className="fw-bold mb-1">{topic.title}</h6>
                <p className="small text-muted mb-0 text-truncate">
                  {topic.brief}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-8 p-4 overflow-auto">
          {activeTopic ? (
            <>
              <h3 className="fw-bold mb-3">{activeTopic.title}</h3>

              <p className="text-muted">{activeTopic.summary}</p>

              <ul className="mt-3">
                {activeTopic.points.map((pt, idx) => (
                  <li key={idx} className="mb-2">
                    {pt}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted">Select a topic to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}
