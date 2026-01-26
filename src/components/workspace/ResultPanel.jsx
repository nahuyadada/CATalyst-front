// // components/workflow/ResultPanel.jsx
// import ResultTabs from "./result/ResultTabs";
// import PapersHistory from "./result/PapersHistory";

// export default function ResultPanel() {
//   return (
//     <div className="card h-100">
//       <div className="card-body d-flex flex-column">
//         <ResultTabs />
//         <PapersHistory />
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import ResultTabs from "./result/ResultTabs";
import PapersHistory from "./result/PapersHistory";
// import ExtractorResult from "./result/ExtractorResult";
import ExtractorOutput from "./output/ExtractorOutput";

export default function ResultPanel({ step }) {
  const [tab, setTab] = useState("result");

  function renderContent() {
    // When Papers tab
    if (tab === "papers") {
      return <PapersHistory />;
    }

    // When Result tab
    if (step === "extractor") {
      return <ExtractorOutput />;
    }

    // future steps
    return (
      <div className="text-muted">No result view for this step yet.</div>
    );
  }

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <ResultTabs activeTab={tab} onTabChange={setTab} />
        {renderContent()}
      </div>
    </div>
  );
}
