// import { useState } from "react";

// export default function TopicSuggesterInput({ gaps, selectedGaps, setSelectedGaps, extraInput, setExtraInput, onRun }) {

//   const toggleGap = (id) => {
//     setSelectedGaps(prev =>
//       prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="flex flex-col bg-white dark:bg-[#1a2533] rounded-xl border border-[#dbe0e6] dark:border-[#2d394a] shadow-sm overflow-hidden h-full">
//       <div className="p-4 border-b border-[#dbe0e6] dark:border-[#2d394a] flex items-center justify-between">
//         <h2 className="text-lg font-bold">Input</h2>
//         <span className="material-symbols-outlined text-[#617589]">input</span>
//       </div>
//       <div className="p-4 flex-1 flex flex-col gap-4 overflow-hidden">
//         {/* Gap Selection */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
//           {gaps.map(gap => (
//             <label key={gap.id} className="flex items-start gap-3 p-3 bg-white dark:bg-[#1a2533] rounded-md border border-[#dbe0e6] dark:border-[#2d394a] cursor-pointer hover:border-primary/50 transition-colors">
//               <input
//                 type="checkbox"
//                 className="mt-1 rounded text-primary focus:ring-primary"
//                 checked={selectedGaps.includes(gap.id)}
//                 onChange={() => toggleGap(gap.id)}
//               />
//               <div className="flex-1">
//                 <p className="text-xs font-semibold">{gap.title}</p>
//                 <p className="text-[10px] text-[#617589] mt-0.5">{gap.description}</p>
//               </div>
//             </label>
//           ))}
//         </div>

//         {/* Extra Gap Input */}
//         <div className="space-y-2">
//           <label className="text-sm font-bold flex items-center gap-2">
//             <span className="material-symbols-outlined text-primary text-lg">notes</span>
//             Additional Gaps
//           </label>
//           <textarea
//             className="w-full h-24 bg-background-light dark:bg-[#101922] border border-[#dbe0e6] dark:border-[#2d394a] rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-primary outline-none"
//             placeholder="Add extra gaps here..."
//             value={extraInput}
//             onChange={(e) => setExtraInput(e.target.value)}
//           />
//         </div>

//         {/* Run Button */}
//         <div className="flex justify-end">
//           <button
//             className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform"
//             onClick={onRun}
//           >
//             <span className="material-symbols-outlined text-lg">play_arrow</span>
//             Run Workflow
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { IoPlay, IoDocumentText } from "react-icons/io5";

export default function TopicSuggesterInput({
  gaps = [],
  selectedGaps = [],
  setSelectedGaps = () => {},
  extraInput = "",
  setExtraInput = () => {},
  onRun = () => {},
}) {
  const demoGaps = [
    { id: 1, title: "Data Integrity Concern", description: "Legacy module validation issues" },
    { id: 2, title: "API Latency Peaks", description: "Observed during peak Q2 traffic" },
    { id: 3, title: "Documentation Gap", description: "Missing CLI onboarding path" },
    { id: 4, title: "Security Audit Missing", description: "No recent vulnerability scans" },
  ];

  const safeGaps = gaps.length > 0 ? gaps : demoGaps;

  const toggleGap = (id) => {
    setSelectedGaps((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="card shadow-sm h-100">
      {/* Header */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Input</h5>
        <IoDocumentText size={20} className="text-muted" />
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">

        {/* Gap Selection */}
        <div className="flex-grow-1 overflow-auto mb-3">
          {safeGaps.map((gap) => (
            <div
              key={gap.id}
              className="form-check border rounded p-3 mb-2"
              style={{ cursor: "pointer" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                id={`gap-${gap.id}`}
                checked={selectedGaps.includes(gap.id)}
                onChange={() => toggleGap(gap.id)}
              />
              <label
                className="form-check-label w-100 ms-2"
                htmlFor={`gap-${gap.id}`}
                style={{ cursor: "pointer" }}
              >
                <div className="fw-semibold small">{gap.title}</div>
                <div className="text-muted" style={{ fontSize: "12px" }}>
                  {gap.description}
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Extra Gap Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">Additional Gaps</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Add extra gaps here..."
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
          />
        </div>

        {/* Run Button */}
        <div className="text-end">
          <button className="btn btn-primary px-4" onClick={onRun}>
            <IoPlay className="me-2" />
            Run Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
