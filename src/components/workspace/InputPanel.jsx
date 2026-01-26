// import { FaCloudUploadAlt } from "react-icons/fa";
// import { FaPlay } from "react-icons/fa";
// import { MdInput } from "react-icons/md";

// import { useRef, useState} from "react";
// export default function InputPanel() {

//   const [file, setFile] = useState(null);
//   const fileInputRef = useRef(null);

//   function handleFile(selectedFiles) {
//     const picked = selectedFiles[0];
//     if (picked) setFile(picked);
//   }
//   function handleDrop(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     handleFile(e.dataTransfer.files);
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

//   function openFilePicker() {
//     fileInputRef.current.click();
//   }

//   function handleFileChange(e) {
//     handleFile(e.target.files);
//   }


//   return (
//     <div className="card h-100">
//       <div className="card-header d-flex justify-content-between">
//         <div>
//           <h5 className="fw-bold mb-0">Input</h5>
//           <small className="text-muted">Upload document or paste text.</small>
//         </div>
//           <MdInput size={22} />

//       </div>

//       <div className="card-body d-flex flex-column gap-4">

//         {/* Upload Area */}

//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onClick={openFilePicker}
//           className="border border-2 border-primary rounded p-4 text-center"
//           style={{ cursor: "pointer" }}
//         >
//           <FaCloudUploadAlt size={22} />

//           <h6 className="fw-bold mt-2">Ready to extract?</h6>
//           <p className="text-muted small">Drop files or click to browse</p>

//           <button
//             type="button"
//             className="btn btn-primary mt-2"
//             onClick={(e) => {
//               e.stopPropagation();
//               openFilePicker();
//             }}
//           >
//             Upload File
//           </button>

//           <input
//             ref={fileInputRef}
//             type="file"
//             hidden
//             onChange={handleFileChange}
//           />
//         </div>

//         {file && (
//           <div className="mt-3">
//             <small className="text-muted">File ready:</small>
//             <div className="list-group mt-2">
//               <div className="list-group-item py-1 small d-flex justify-content-between align-items-center">
//                 {file.name}
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={() => setFile(null)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}


//         {/* Instructions */}
//         {/* <div className="flex-grow-1 d-flex flex-column">
//           <label className="fw-bold mb-2">Paste Text</label>
//           <textarea className="form-control flex-grow-1" />
//         </div> */}

//         <div className="text-end">
//           <button className="btn btn-primary">
//             <FaPlay className="me-1" />
//             Run Workflow
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
;

import ExtractorInput from "./input/ExtractorInput.jsx";
import SummarizerInput from "./input/SummarizerInput.jsx";
// import SummarizerInput from "./input/SummarizerInput.jsx";
// import GapInput from "./input/GapInput.jsx";

const STEP_INPUT_COMPONENTS = {
  extractor: ExtractorInput,
  summarizer: SummarizerInput,
  // gap: GapInput,
};

export default function InputPanel({ step }) {
  const Component = STEP_INPUT_COMPONENTS[step];
  return <Component />;
}

