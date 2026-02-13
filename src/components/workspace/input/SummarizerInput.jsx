import { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt, FaPlay } from "react-icons/fa";
import { useGroup } from "../../../context/GroupContext.jsx";
import { getExtractedFilesByGroupAPI } from "../../../api/workflow.extractor.js";
import { summarizerAPI } from "../../../api/workflow.api.js";
export default function SummarizerInput() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const group_id = useGroup().groupId;

  const [extractedFiles, setExtractedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const handleRunWorkflow = async () => {
    if (selectedInstructions.length === 0) {
      alert("Please select at least one extracted file.");
      return;
    }

    try {
      setRunning(true);
      const res = await summarizerAPI(selectedInstructions[0],group_id);
      alert("Summarizer workflow started successfully.");
    } catch (err) {
      console.error("Failed to run summarizer:", err);
      alert(err.message || "Failed to run workflow");
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    async function fetchExtractedFiles() {
      try {
        setLoading(true);
        const data = await getExtractedFilesByGroupAPI(group_id);
        setExtractedFiles(data.data || []);
      } catch (error) {
        console.error("Error fetching extracted files:", error);
      } finally {
        setLoading(false);
      }
    }

    if (group_id) {
      fetchExtractedFiles();
    }
  }, [group_id]);
  const [selectedInstructions, setSelectedInstructions] = useState([]);


  const toggleInstruction = (id) => {
    setSelectedInstructions((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };


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

  return (
    <div className="card h-full flex flex-col">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Input</h5>
          <small className="text-muted">Upload document and set instructions</small>
        </div>
        <span className="material-symbols-outlined">input</span>
      </div>

      <div className="card-body flex-1 flex flex-col gap-4 p-4">
        {/* Upload Area */}
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
  <label className="fw-bold mb-2 d-block">Extracted Texts</label>

  {loading && (
    <div className="text-muted small">Loading instructions...</div>
  )}

  {!loading && extractedFiles.length === 0 && (
    <div className="text-muted small">
      No instructions configured for this group.
    </div>
  )}

  {!loading &&
    extractedFiles.map((item) => (
      <div
        key={item.id}
        className="form-check border rounded p-3 mb-2"
        style={{ cursor: "pointer" }}
      >
        <input
          className="form-check-input"
          type="checkbox"
          id={`inst-${item.id}`}
          checked={selectedInstructions.includes(item.id)}
          onChange={() => toggleInstruction(item.id)}
        />

        <label
          className="form-check-label w-100 ms-2"
          htmlFor={`inst-${item.id}`}
          style={{ cursor: "pointer" }}
        >
          <div className="fw-semibold small">{item.title}</div>
          <div className="text-muted" style={{ fontSize: "12px" }}>
            {item.description}
          </div>
        </label>
      </div>
    ))}
</div>

        {/* Run Button */}
        <div className="text-end">
          {/* <button className="btn btn-primary">
            <FaPlay className="me-1" /> Run Workflow
          </button> */}
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
