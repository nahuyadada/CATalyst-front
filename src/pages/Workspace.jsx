// // pages/GroupWorkflow.jsx
import WorkflowLayout from "../layouts/WorkspaceLayout";
import InputPanel from "../components/workspace/InputPanel";
// import ResultPanel from "../components/workspace/ResultPanel";


// export default function GroupWorkflow() {
//   return (
    
//     <WorkflowLayout>
//       <div className="row g-4">
//         <div className="col-lg-6">
//           <InputPanel />
//         </div>
//         <div className="col-lg-6">
//           <ResultPanel />
//         </div>
//       </div>
//     </WorkflowLayout>
//   );
// }
import { useState } from "react";
import StepTabs from "../components/workspace/StepTabs";
import WorkflowTracker from "../components/workspace/WorkflowTracker";
import ResultPanel from "../components/workspace/ResultPanel";
export default function GroupWorkflow() {
  const [step, setStep] = useState("extractor");

  return (
    <WorkflowLayout>
      {/* <StepTabs current={step} onChange={setStep} /> */}
      <WorkflowTracker
        currentStep={step}
        onStepChange={setStep}
      />
      <div className="row g-4">
        <div className="col-lg-6">
          <InputPanel step={step} />
        </div>
        <div className="col-lg-6">
          <ResultPanel step={step} />
        </div>
      </div>
    </WorkflowLayout>
  );
}
