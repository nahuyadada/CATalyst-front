export default function GroupCard({ name, members, status = "Active" }) {
  return (
    <div className="card border-0 rounded-4 shadow-sm overflow-hidden h-100">
      
      {/* Header */}
      <div
        className="position-relative"
        style={{
          height: 120,
          background:
            "linear-gradient(135deg, #4f46e5, #6366f1)",
        }}
      >
        <span
          className="badge bg-light text-dark position-absolute top-0 end-0 m-3 px-3 py-2"
          style={{ fontSize: 10 }}
        >
          <span className="text-success me-1">●</span>
          {status}
        </span>
      </div>

      {/* Body */}
      <div className="card-body">
        <h5 className="fw-bold">{name}</h5>

        <div className="d-flex align-items-center text-muted small mb-3">
          <span className="material-symbols-outlined me-1 fs-6">
            group
          </span>
          {members} Members
        </div>

        <button className="btn btn-outline-primary w-100 fw-bold">
          Enter Group
        </button>
      </div>
    </div>
  );
}
