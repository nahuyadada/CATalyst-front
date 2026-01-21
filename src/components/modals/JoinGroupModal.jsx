import { useState } from "react";


export default function JoinGroupModal({ onSubmit }) {
  const [joinCode, setJoinCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // onSubmit({ joinCode });
    console.log({ joinCode});
  }

  return (
    <div
      className="modal fade"
      id="joinGroupModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 overflow-hidden">

          {/* Modal Header (Navbar-like) */}
          <div
            className="px-4 py-3 text-white"
            style={{ backgroundColor: "#7a1e1e" }}
          >
            <h5 className="mb-0 fw-bold">Join Group</h5>
          </div>

          {/* Modal Body */}
          <div
            className="p-4"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.15)",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-bold">Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              {/* <div className="mb-4">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div> */}

              {/* Color Picker */}
              {/* <div className="mb-4">
                <label className="form-label fw-bold">Group Color</label>
                <div className="d-flex gap-3 flex-wrap">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className="border-0 rounded-circle"
                      style={{
                        width: 36,
                        height: 36,
                        backgroundColor: c,
                        outline:
                          color === c
                            ? "3px solid #000"
                            : "2px solid rgba(0,0,0,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div> */}

              {/* Actions */}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#7a1e1e" }}
                >
                  Join Group
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
