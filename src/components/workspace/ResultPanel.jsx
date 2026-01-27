
// import ResultTabs from "./result/ResultTabs";
// import PapersHistory from "./result/PapersHistory";
// import SummarizerResult from "./output/SummarizerResult";
// import ExtractorOutput from "./output/ExtractorOutput";
// import GapExtractorOutput from "./output/GapOutput";

// export default function ResultPanel({ step }) {

//   function renderContent() {
//     if (step === "extractor") return <ExtractorOutput />;
//     if (step === "summarizer") return <SummarizerResult />;
//     if (step === "gap_extractor") return <GapExtractorOutput />;
//     return <div className="text-muted">No result view for this step yet.</div>;
//   }

//   return (
//     <div className="card h-100">
//       <div className="card-body d-flex flex-column">
//         {/* Keep tabs for styling if needed, or remove if each step has its own */}
//         {renderContent()}
//       </div>
//     </div>
//   );
// }


// import ExtractorInput from "./input/ExtractorInput.jsx";
// import SummarizerInput from "./input/SummarizerInput.jsx";
// import GapInput from "./input/GapInput.jsx";

// import ResultTabs from "./result/ResultTabs";
// import PapersHistory from "./result/PapersHistory";
import SummarizerResult from "./output/SummarizerResult";
import ExtractorOutput from "./output/ExtractorOutput";
import GapExtractorOutput from "./output/GapOutput";
import TopicSuggesterOutput from "../workspace/output/TopicSuggesterOutput.jsx";
import SearcherOutput from "../workspace/output/SearcherOutput.jsx";
const STEP_INPUT_COMPONENTS = {
  extractor: ExtractorOutput,
  summarizer: SummarizerResult,
  gap: GapExtractorOutput,
  topic: TopicSuggesterOutput,
  search: SearcherOutput
};

export default function InputPanel({ step }) {
  const Component = STEP_INPUT_COMPONENTS[step];
  return <Component />;
}

