import { useEffect, useState, useRef } from "react";
import { FaPlay,FaCloudUploadAlt } from "react-icons/fa";
import { useGroup } from "../../../context/GroupContext.jsx";
import { getSummaryByGroupAPI } from "../../../api/workflow.summarizer.js";
import { GapAPI } from "../../../api/workflow.api.js";

export default function GapInput() {
  const group_id = useGroup().groupId;
  console.log("group: ",group_id)
  
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const [summaries, setSummaries] = useState([]);
  const [selectedSummaries, setSelectedSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);


  

  const handleFile = (files) => {
    const picked = files[0];
    if (picked) setFile(picked);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();
  const openFilePicker = () => fileInputRef.current.click();
  const handleFileChange = (e) => handleFile(e.target.files);
  useEffect(() => {
    async function fetchSummaries() {
      try {
        setLoading(true);
        const res = await getSummaryByGroupAPI(group_id);
        console.log("this is res: ",res)
        setSummaries(res.data || []);
      } catch (err) {
        console.error("Failed to fetch summaries:", err);
      } finally {
        setLoading(false);
      }
    }

    if (group_id) fetchSummaries();
  }, [group_id]);

  const toggleSummary = (id) => {
    setSelectedSummaries((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleRunWorkflow = async () => {
    if (selectedSummaries.length === 0) {
      alert("Select at least one summary.");
      return;
    }

    try {
      setRunning(true);

      const res = await GapAPI({
        group_id,
        summary_ids: selectedSummaries,
      });
      console.log("res: ",res)

      alert("Gap workflow started.");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to run workflow");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Input</h5>
          <small className="text-muted">Select summaries for gap analysis</small>
        </div>
        <span className="material-symbols-outlined">input</span>
      </div>

      <div className="card-body flex-1 flex flex-col gap-4 p-4">


<div
          className="border-2 border-dashed border-primary rounded-xl p-6 text-center cursor-pointer hover:bg-primary/10 transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={openFilePicker}
        >
          <FaCloudUploadAlt size={28} className="text-primary mb-3" />
          <h6 className="fw-bold">Ready to process?</h6>
          <p className="text-muted text-sm">Drop files (PDF, DOCX, TXT) or click to browse.</p>

          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
          >
            Upload File
          </button>
          <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />
        </div>

        {file && (
          <div className="mt-2">
            <small className="text-muted">File ready:</small>
            <div className="list-group mt-2">
              <div className="list-group-item py-1 d-flex justify-content-between align-items-center">
                {file.name}
                <button className="btn btn-sm btn-outline-danger" onClick={() => setFile(null)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}





        <div className="flex-grow-1 overflow-auto mb-3">
          <label className="fw-bold mb-2 d-block">Available Summaries</label>

          {loading && (
            <div className="text-muted small">Loading summaries...</div>
          )}

          {!loading && summaries.length === 0 && (
            <div className="text-muted small">
              No summaries found for this group.
            </div>
          )}

          {!loading &&
            summaries.map((item) => (
              <div
                key={item.id}
                className="form-check border rounded p-3 mb-2"
                style={{ cursor: "pointer" }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`sum-${item.id}`}
                  checked={selectedSummaries.includes(item.id)}
                  onChange={() => toggleSummary(item.id)}
                />

                <label
                  className="form-check-label w-100 ms-2"
                  htmlFor={`sum-${item.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="fw-semibold small">
                    {item.title || "Untitled Summary"}
                  </div>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    {item.filename}
                  </div>
                </label>
              </div>
            ))}
        </div>

        <div className="text-end">
          <button
            className="btn btn-primary"
            onClick={handleRunWorkflow}
            disabled={running}
          >
            <FaPlay className="me-1" />
            {running ? "Running..." : "Run Workflow"}
          </button>
        </div>
      </div>
    </div>
  );
}
