export default function InputPanel() {
  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between">
        <div>
          <h5 className="fw-bold mb-0">Input</h5>
          <small className="text-muted">Upload documents and set instructions.</small>
        </div>
        <span className="material-symbols-outlined">input</span>
      </div>

      <div className="card-body d-flex flex-column gap-4">

        {/* Upload Area */}
        <div className="border border-2 border-primary rounded p-4 text-center">
          <span className="material-symbols-outlined text-primary fs-1">cloud_upload</span>
          <h6 className="fw-bold mt-2">Ready to process?</h6>
          <p className="text-muted small">Drop files or click to browse</p>
          <button className="btn btn-primary">Upload File</button>
        </div>

        {/* Instructions */}
        <div className="flex-grow-1 d-flex flex-column">
          <label className="fw-bold mb-2">Additional Instructions</label>
          <textarea className="form-control flex-grow-1" />
        </div>

        <div className="text-end">
          <button className="btn btn-primary">
            <span className="material-symbols-outlined me-1">play_arrow</span>
            Run Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
