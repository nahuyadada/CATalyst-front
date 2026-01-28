import { IoPlay, IoDocumentText } from "react-icons/io5";

export default function TopicSuggesterInput({
  gaps = [],
  selectedGaps = [],
  setSelectedGaps = () => {},
  extraInput = "",
  setExtraInput = () => {},
  onRun = () => {},
}) {
  const demoGaps = [
    { id: 1, title: "Data Integrity Concern", description: "Legacy module validation issues" },
    { id: 2, title: "API Latency Peaks", description: "Observed during peak Q2 traffic" },
    { id: 3, title: "Documentation Gap", description: "Missing CLI onboarding path" },
    { id: 4, title: "Security Audit Missing", description: "No recent vulnerability scans" },
  ];

  const safeGaps = gaps.length > 0 ? gaps : demoGaps;

  const toggleGap = (id) => {
    setSelectedGaps((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="card shadow-sm h-100">
      {/* Header */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Input</h5>
        <IoDocumentText size={20} className="text-muted" />
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">

        {/* Gap Selection */}
        <div className="flex-grow-1 overflow-auto mb-3">
          {safeGaps.map((gap) => (
            <div
              key={gap.id}
              className="form-check border rounded p-3 mb-2"
              style={{ cursor: "pointer" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                id={`gap-${gap.id}`}
                checked={selectedGaps.includes(gap.id)}
                onChange={() => toggleGap(gap.id)}
              />
              <label
                className="form-check-label w-100 ms-2"
                htmlFor={`gap-${gap.id}`}
                style={{ cursor: "pointer" }}
              >
                <div className="fw-semibold small">{gap.title}</div>
                <div className="text-muted" style={{ fontSize: "12px" }}>
                  {gap.description}
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Extra Gap Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">Additional Gaps</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Add extra gaps here..."
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
          />
        </div>

        {/* Run Button */}
        <div className="text-end">
          <button className="btn btn-primary px-4" onClick={onRun}>
            <IoPlay className="me-2" />
            Run Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
