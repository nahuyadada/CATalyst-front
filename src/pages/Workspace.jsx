import WorkflowLayout from "../layouts/WorkspaceLayout";
import InputPanel from "../components/workspace/InputPanel";
import { useState } from "react";
import WorkflowTracker from "../components/workspace/WorkflowTracker";
import ResultPanel from "../components/workspace/ResultPanel";
import { useGroup } from "../context/GroupContext";
export default function GroupWorkflow() {
  const [step, setStep] = useState("topic"); // change to focus
  const group_id = useGroup().groupId;
  console.log("Current Group ID in Workspace:", group_id);

  return (
    <WorkflowLayout>
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
