// components/workflow/ResultPanel.jsx
import ResultTabs from "./result/ResultTabs";
import PapersHistory from "./result/PapersHistory";

export default function ResultPanel() {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <ResultTabs />
        <PapersHistory />
      </div>
    </div>
  );
}
