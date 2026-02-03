import { useEffect, useState } from "react";
import { useGroup } from "../../../context/GroupContext";
import { getExtractedFilesByGroupAPI } from "../../../api/workflow.extractor";
import { RiLoader4Line, RiQuestionLine } from "react-icons/ri";

export default function ExtractorOutput({ result }) {
  const group_id = useGroup().groupId;

  const [activeTab, setActiveTab] = useState("papers"); // flipped: papers left, result right
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch papers whenever group_id or result changes (auto-update)
  useEffect(() => {
    async function fetchPapers() {
      if (!group_id) return;
      setLoading(true);
      try {
        const extractedData = await getExtractedFilesByGroupAPI(group_id);
        const data = extractedData.data;
        console.log("this is data: ", data);
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPapers(sorted);

        if (result) {
          setSelectedPaper(result);
          setActiveTab("result");
        } else if (sorted.length > 0 && !selectedPaper) {
          setSelectedPaper(sorted[0]);
        }
      } catch (err) {
        console.error("Error fetching papers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPapers();
  }, [group_id, result]);

  return (
    <div className="card h-full flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3">
          <button
            className={`btn btn-link ${
              activeTab === "papers" ? "fw-bold text-primary" : "text-muted"
            }`}
            onClick={() => setActiveTab("papers")}
          >
            Papers
          </button>
          <button
            className={`btn btn-link ${
              activeTab === "result" ? "fw-bold text-primary" : "text-muted"
            }`}
            disabled // result tab is not clickable
          >
            Result
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="card-body flex-1 overflow-auto d-flex justify-content-center align-items-center">
        {loading ? (
          <div className="text-center">
            <RiLoader4Line className="fs-1 text-primary animate-spin mb-2" />
            <p className="text-muted small">Loading extracted papers...</p>
            {/* <img src="/path/to/loading.gif" alt="Loading..." /> */}
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center">
            <RiQuestionLine className="fs-1 text-secondary mb-2" />
            <p className="text-muted small">
              No extracted papers found. Upload a document to get started.
            </p>
            {/* <img src="/path/to/question-mark.png" alt="No papers" /> */}
          </div>
        ) : activeTab === "papers" ? (
          <div className="list-group w-100">
            {papers.map((paper) => (
              <button
                key={paper.id}
                className={`list-group-item list-group-item-action ${
                  selectedPaper?.id === paper.id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedPaper(paper);
                  setActiveTab("result");
                }}
              >
                {paper.title || "Untitled Paper"}
              </button>
            ))}
          </div>
        ) : activeTab === "result" && selectedPaper ? (
          <div className="space-y-4 w-100">
            {[
              "title",
              "abstract",
              "introduction",
              "methodology",
              "results",
              "discussion",
              "conclusion",
              "keywords",
              "literature_review",
            ].map((section) => (
              <div key={section} className="border rounded p-3">
                <h6 className="fw-bold text-capitalize">
                  {section.replace("_", " ")}
                </h6>
                <p className="text-muted small">
                  {selectedPaper[section] || "No content available."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted small">
            No paper selected. Go to the Papers tab to select a paper.
          </p>
        )}
      </div>
    </div>
  );
}
