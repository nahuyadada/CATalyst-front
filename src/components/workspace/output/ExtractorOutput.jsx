export default function ExtractorOutput() {
  return (
    <div className="border rounded p-3 overflow-auto" style={{ maxHeight: 400 }}>
      <h6 className="fw-bold">Extracted Text</h6>
      <p className="text-muted small">
        The extracted content of the document will appear here after running the workflow...
      </p>
    </div>
  );
}
