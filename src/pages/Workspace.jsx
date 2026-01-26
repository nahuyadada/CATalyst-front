// pages/GroupWorkflow.jsx
import WorkflowLayout from "../layouts/WorkspaceLayout";
import InputPanel from "../components/workspace/InputPanel";
import ResultPanel from "../components/workspace/ResultPanel";


export default function GroupWorkflow() {
  return (
    
    <WorkflowLayout>
      <div className="row g-4">
        <div className="col-lg-6">
          <InputPanel />
        </div>
        <div className="col-lg-6">
          <ResultPanel />
        </div>
      </div>
    </WorkflowLayout>
  );
}
