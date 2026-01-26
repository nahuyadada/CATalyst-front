// // import { IoDocumentText } from "react-icons/io5";

// export default function WorkflowTracker() {
//   return (
//     <div className="card p-4 mb-4">
//       <div className="d-flex justify-content-between align-items-center flex-wrap">

//         {/* One Step */}
//         <div className="text-center">
//           <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-2" style={{width:48,height:48}}>
//             <span className="material-symbols-outlined">description</span>
//           </div>
//           <div className="fw-bold small">Extractor</div>
//           <div className="text-muted" style={{fontSize:10}}>Text Pull-out</div>
//         </div>

//         <span className="material-symbols-outlined text-muted">double_arrow</span>

//         {/* Repeat for other steps ... */}

//       </div>
//     </div>
//   );
// }

// import { IoDocumentText } from "react-icons/io5";
// import { MdDoubleArrow } from "react-icons/md";

// export default function WorkflowTracker() {
//   return (
//     <div className="card p-4 mb-4">
//       <div className="d-flex justify-content-between align-items-center flex-wrap">

//         {/* One Step */}
//         <div className="text-center">
//           <div
//             className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-2"
//             style={{ width: 48, height: 48 }}
//           >
//             <IoDocumentText size={22} />
//           </div>

//           <div className="fw-bold small">Extractor</div>
        

//         </div>
//         <MdDoubleArrow size={22} className="text-muted" />

//       </div>
//     </div>
//   );
// }



import { IoDocumentText } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";

const steps = [
  { key: "extractor", label: "Extractor", icon: IoDocumentText },
  { key: "summarizer", label: "Summarizer", icon: IoDocumentText },
  { key: "gap", label: "Gap Extractor", icon: IoDocumentText },
  { key: "topic", label: "Topic Suggester", icon: IoDocumentText },
  { key: "search", label: "Searcher", icon: IoDocumentText },
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
