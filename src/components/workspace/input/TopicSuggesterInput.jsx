import { useEffect, useState } from "react";
import { IoPlay, IoDocumentText } from "react-icons/io5";
import { useGroup } from "../../../context/GroupContext.jsx";
import { getGapsByGroupAPI } from "../../../api/workflow.gap.js";
import { TopicSuggesterAPI } from "../../../api/workflow.api.js";
export default function TopicSuggesterInput() {
  const { groupId: group_id } = useGroup();

  const [gaps, setGaps] = useState([]);
  const [selectedGaps, setSelectedGaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    async function fetchGaps() {
      try {
        setLoading(true);
        const res = await getGapsByGroupAPI(group_id);
        setGaps(res.data || []);
      } catch (err) {
        console.error("Failed to fetch gaps:", err);
      } finally {
        setLoading(false);
      }
    }

    if (group_id) fetchGaps();
  }, [group_id]);

  const toggleGap = (id) => {
    setSelectedGaps((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id]
    );
  };

  // const handleRunWorkflow = async () => {
  //   if (selectedGaps.length === 0) {
  //     alert("Select at least one gap.");
  //     return;
  //   }

  //   try {
  //     setRunning(true);

  //     const res = await TopicSuggesterAPI({
  //       group_id,
  //       gap_ids: selectedGaps,
  //     });

  //     alert("Topic suggestion workflow started.");
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message || "Failed to run workflow");
  //   } finally {
  //     setRunning(false);
  //   }
  // };

  const handleRunWorkflow = async () => {
  if (selectedGaps.length === 0) {
    alert("Select at least one gap.");
    return;
  }

  try {
    setRunning(true);

    // Map selected IDs to their corresponding gap texts
    const selectedGapTexts = gaps
      .filter((g) => selectedGaps.includes(g.id))
      .map((g) => g.gap);

    const res = await TopicSuggesterAPI({
      group_id,
      gaps: selectedGapTexts, // send texts instead of IDs
    });

    alert("Topic suggestion workflow started.");
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to run workflow");
  } finally {
    setRunning(false);
  }
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

        {/* Gap Selection (Scrollable) */}
        <div
          className="flex-grow-1 overflow-auto mb-3"
          style={{ maxHeight: "350px" }}
        >
          <label className="fw-bold mb-2 d-block">Available Gaps</label>

          {loading && (
            <div className="text-muted small">Loading gaps...</div>
          )}

          {!loading && gaps.length === 0 && (
            <div className="text-muted small">
              No gaps found for this group.
            </div>
          )}

          {!loading &&
            gaps.map((gap) => (
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
                    {gap.gap}
                  </div>
                </label>
              </div>
            ))}
        </div>

        {/* Extra Gap Input (kept for future use) */}
        {/*
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
        */}

        {/* Run Button */}
        <div className="text-end">
          <button
            className="btn btn-primary px-4"
            onClick={handleRunWorkflow}
            disabled={running}
          >
            <IoPlay className="me-2" />
            {running ? "Running..." : "Run Workflow"}
          </button>
        </div>
      </div>
    </div>
  );
}
