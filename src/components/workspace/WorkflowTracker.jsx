// // import { IoDocumentText } from "react-icons/io5";

// export default function WorkflowTracker() {
//   return (
//     <div className="card p-4 mb-4">
//       <div className="d-flex justify-content-between align-items-center flex-wrap">

//         {/* One Step */}
//         <div className="text-center">
//           <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-2" style={{width:48,height:48}}>
//             <span className="material-symbols-outlined">description</span>
//           </div>
//           <div className="fw-bold small">Extractor</div>
//           <div className="text-muted" style={{fontSize:10}}>Text Pull-out</div>
//         </div>

//         <span className="material-symbols-outlined text-muted">double_arrow</span>

//         {/* Repeat for other steps ... */}

//       </div>
//     </div>
//   );
// }

import { IoDocumentText } from "react-icons/io5";

export default function WorkflowTracker() {
  return (
    <div className="card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap">

        {/* One Step */}
        <div className="text-center">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-2"
            style={{ width: 48, height: 48 }}
          >
            <IoDocumentText size={22} />
          </div>

          <div className="fw-bold small">Extractor</div>
          <div className="text-muted" style={{ fontSize: 10 }}>
            Text Pull-out
          </div>

        </div>
        <span className="material-symbols-outlined text-muted">double_arrow</span>

      </div>
    </div>
  );
}
