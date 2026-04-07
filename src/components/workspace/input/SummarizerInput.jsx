import { useRef, useState, useEffect } from "react";
import { FaCloudUploadAlt, FaPlay } from "react-icons/fa";
import { MdInput } from "react-icons/md";

import { useGroup } from "../../../context/GroupContext.jsx";
import { getExtractedFilesByGroupAPI } from "../../../api/workflow.extractor.js";
import { summarizerAPI } from "../../../api/workflow.api.js";

export default function SummarizerInput({ setResult }) {
  const group_id = useGroup().groupId;

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const [extractedFiles, setExtractedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [selectedInstruction, setSelectedInstruction] = useState(null); // single selection

  function handleFile(selectedFiles) {
    const picked = selectedFiles[0];
    if (picked) setFile(picked);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files);
  }

  function openFilePicker() {
    fileInputRef.current.click();
  }

  const toggleInstruction = (id) => {
    // Only allow one selection
    setSelectedInstruction((prev) => (prev === id ? null : id));
  };

  const handleRunWorkflow = async () => {
    if (!selectedInstruction) {
      alert("Please select one extracted file.");
      return;
    }

    try {
      setRunning(true);
      const response = await summarizerAPI(selectedInstruction, group_id);

      setResult(response.data);
      alert("Summarizer workflow started successfully.");
    } catch (err) {
      console.error(err);
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (group_id) fetchExtractedFiles();
  }, [group_id]);

  return (
    <div
      className="h-100 rounded-4 p-3"
      style={{
        backgroundColor: "#1e1e2f",
        border: "1px solid #3a3a55",
        color: "#e4e4f0"
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h5 className="fw-bold mb-0 text-white">Input</h5>
          <small style={{ color: "#a1a1b5" }}>
            Upload document and select one extracted text
          </small>
        </div>
        <MdInput size={22} />
      </div>

      {/* BODY */}
      <div className="d-flex flex-column gap-4">

        {/* UPLOAD AREA */}
        {/* <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={openFilePicker}
          className="rounded-4 text-center p-4"
          style={{
            border: "2px dashed #5b5bd6",
            cursor: "pointer",
            backgroundColor: "#25253a"
          }}
        > */}
          {/* <FaCloudUploadAlt size={28} color="#a5b4fc" />
          <h6 className="fw-bold mt-3 text-white">Ready to summarize?</h6>
          <p style={{ color: "#a1a1b5" }}>Drop files or click to browse</p>
          <button
            className="btn mt-2"
            style={{ backgroundColor: "#5b5bd6", color: "#fff", border: "none" }}
            onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
          >
            Upload File
          </button>
          <input ref={fileInputRef} type="file" hidden onChange={(e) => handleFile(e.target.files)} />
        </div> */}

        {/* {file && (
          <div>
            <small style={{ color: "#a1a1b5" }}>File ready:</small>
            <div
              className="mt-2 p-2 rounded-3 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#25253a", border: "1px solid #3a3a55" }}
            >
              <span className="small text-white">{file.name}</span>
              <button
                className="btn btn-sm"
                style={{ border: "1px solid #ff6b6b", color: "#ff6b6b", background: "transparent" }}
                onClick={() => setFile(null)}
              >
                Remove
              </button>
            </div>
          </div>
        )} */}

        {/* EXTRACTED FILES */}
        <div>
          <small style={{ color: "#a1a1b5" }}>Extracted Texts</small>
          <div className="mt-2 d-flex flex-column gap-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {loading && <div style={{ color: "#a1a1b5" }}>Loading...</div>}
            {!loading && extractedFiles.length === 0 && (
              <div style={{ color: "#a1a1b5" }}>No extracted files found.</div>
            )}
            {!loading &&
              extractedFiles.map((item) => (
                <div
                  key={item.id}
                  className="p-2 rounded-3 d-flex align-items-start gap-2"
                  style={{
                    backgroundColor: "#25253a",
                    border: "1px solid #3a3a55",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleInstruction(item.id)}
                >
                  <input
                    type="radio"
                    checked={selectedInstruction === item.id}
                    readOnly
                    style={{ marginTop: "4px" }}
                  />
                  <div>
                    <div className="small text-white fw-semibold">{item.title}</div>
                    <div style={{ fontSize: "12px", color: "#a1a1b5" }}>{item.description}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* RUN BUTTON */}
        <div className="text-end">
          <button
            onClick={handleRunWorkflow}
            disabled={running}
            className="btn"
            style={{ backgroundColor: "#5b5bd6", color: "#fff", border: "none" }}
          >
            <FaPlay className="me-1" />
            {running ? "Running..." : "Run Workflow"}
          </button>
        </div>
      </div>
    </div>
  );
}