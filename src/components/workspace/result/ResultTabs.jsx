export default function ResultTabs() {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex gap-3">
          <button className="btn btn-link text-muted">Result</button>
          <button className="btn btn-link fw-bold text-primary">Papers</button>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light">Copy</button>
          <button className="btn btn-light">Download</button>
          <button className="btn btn-light">Share</button>
        </div>
      </div>

      <input className="form-control mb-3" placeholder="Search previous papers..." />
    </>
  );
}
