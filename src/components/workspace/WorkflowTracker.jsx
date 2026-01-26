import { IoDocumentText } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoExtensionPuzzle } from "react-icons/io5";
import { PiHeadCircuitBold } from "react-icons/pi";
import { IoGlobeOutline } from "react-icons/io5";
const steps = [
  { key: "extractor", label: "Extractor", icon: IoDocumentText },
  { key: "summarizer", label: "Summarizer", icon: HiOutlineDocumentSearch },
  { key: "gap", label: "Gap Extractor", icon: IoExtensionPuzzle },
  { key: "topic", label: "Topic Suggester", icon: PiHeadCircuitBold },
  { key: "search", label: "Searcher", icon: IoGlobeOutline },
];

export default function WorkflowTracker({ currentStep, onStepChange }) {
  return (
    <div className="card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap">

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.key;

          return (
            <div key={step.key} className="d-flex align-items-center">
              <div
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => onStepChange(step.key)}
              >
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center mb-2
                    ${isActive ? "bg-primary text-white" : "bg-light text-muted border"}
                  `}
                  style={{ width: 48, height: 48 }}
                >
                  <Icon size={22} />
                </div>

                <div
                  className={`fw-bold small ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                >
                  {step.label}
                </div>
              </div>

              {index !== steps.length - 1 && (
                <MdDoubleArrow size={22} className="mx-3 text-muted" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
