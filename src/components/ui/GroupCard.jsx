import { useNavigate } from "react-router-dom";
import { useGroup } from "../../context/GroupContext.jsx";
import { useState } from "react";

export default function GroupCard({ name, group_id, color, description }) {
  const navigate = useNavigate();
  const { enterGroup } = useGroup();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleEnter() {
    enterGroup({ id: group_id, name, color });
    navigate(`/workspace/${group_id}`);
  }

  const headerGradient = `linear-gradient(135deg, ${color}cc, ${color}99)`;

  return (
    <div
      className="card border-0 rounded-4 shadow-sm overflow-hidden h-100"
      style={{ backgroundColor: "#1e1e2f" }}
    >
      {/* Header */}
      <div
        className="position-relative"
        style={{
          height: 120,
          background: headerGradient,
        }}
      >
        {/* Settings Dropdown */}
        <div className="position-absolute top-0 end-0 m-3">
          <button
            className="btn btn-sm text-light"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          {dropdownOpen && (
            <div
              className="position-absolute end-0 mt-2 p-2 rounded-3"
              style={{
                backgroundColor: "#2a2a3d",
                border: "1px solid #3a3a55",
                zIndex: 10,
                minWidth: 120,
              }}
            >
              <div
                className="d-flex align-items-center p-1 hover-bg"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                <span className="material-symbols-outlined me-2 fs-6">edit</span>
                Edit
              </div>
              <div
                className="d-flex align-items-center p-1 hover-bg mt-1"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                <span className="material-symbols-outlined me-2 fs-6">delete</span>
                Delete
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column" style={{ color: "#e4e4f0" }}>
        <h5 className="fw-bold">{name}</h5>

        <div
          className="mb-3"
          style={{
            color: "#a1a1b5",
            maxHeight: 60,
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {description || "No description"}
        </div>

        <button
          onClick={handleEnter}
          className="btn w-100 fw-bold mt-auto"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #5b5bd6",
            color: "#a5b4fc",
          }}
        >
          Enter Group
        </button>
      </div>
    </div>
  );
}