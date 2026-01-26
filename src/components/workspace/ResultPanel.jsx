// import { useState } from "react";
import ResultTabs from "./result/ResultTabs";
import PapersHistory from "./result/PapersHistory";
import SummarizerResult from "./output/SummarizerResult";
import ExtractorOutput from "./output/ExtractorOutput";

// export default function ResultPanel({ step }) {
//   const [tab, setTab] = useState("result");

//   function renderContent() {
//     // When Papers tab
//     if (tab === "papers") {
//       return <PapersHistory />;
//     }

//     // When Result tab
//     if (step === "extractor") {
//       return <ExtractorOutput />;
//     }

//     // future steps
//     if (step === "summarizer") {
//       return <SummarizerResult />;
//     }
//     return (
//       <div className="text-muted">No result view for this step yet.</div>
//     );
//   }

//   return (
//     <div className="card h-100">
//       <div className="card-body d-flex flex-column">
//         <ResultTabs activeTab={tab} onTabChange={setTab} />
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

export default function ResultPanel({ step }) {
  // const [tab, setTab] = useState("result");

  function renderContent() {
    if (step === "extractor") return <ExtractorOutput />;
    if (step === "summarizer") return <SummarizerResult />;
    return <div className="text-muted">No result view for this step yet.</div>;
  }

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        {/* Keep tabs for styling if needed, or remove if each step has its own */}
        {renderContent()}
      </div>
    </div>
  );
}
