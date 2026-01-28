import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaPlay } from "react-icons/fa";

export default function SummarizerInput() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const [selectedInstructions, setSelectedInstructions] = useState([]);

  const instructionList = [
    {
      id: "1",
      title: "Extract Research Objectives",
      description: "Identify the main goals and research questions of the paper",
    },
    {
      id: "2",
      title: "Highlight Methodology",
      description: "Summarize methods, data sources, and experimental design",
    },
    {
      id: "3",
      title: "Summarize Key Findings",
      description: "Capture the most important results and discoveries",
    },
    {
      id: "4",
      title: "Identify Limitations",
      description: "Point out weaknesses, constraints, or missing aspects",
    },
    {
      id: "5",
      title: "Summarize Conclusion",
      description: "Provide a concise summary of the paper’s conclusion",
    },
  ];

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

        {/* Instructions */}
        {/* <div className="flex flex-col flex-1">
          <label className="fw-bold mb-1">Additional Instructions</label>
          <textarea
            className="form-control flex-1 resize-none"
            placeholder="Specify keywords, target length, or specific questions..."
          />
        </div> */}


          {/* Instruction Selection */}
        <div className="flex-grow-1 overflow-auto mb-3">
          <label className="fw-bold mb-2 d-block">Summarization Instructions</label>

          {instructionList.map((item) => (
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
          <button className="btn btn-primary">
            <FaPlay className="me-1" /> Run Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
