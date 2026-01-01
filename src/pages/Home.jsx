import PublicLayout from "../layouts/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="mb-3">CATalyst</h1>
        <p className="lead text-muted">
          An AI-assisted research gap discovery tool for thesis writing.
        </p>
      </div>

      {/* FEATURES */}
      <div className="row mb-5">
        <div className="col-md-4">
          <h5>Problem Discovery</h5>
          <p className="text-muted">
            Analyze multiple papers and identify research gaps automatically.
          </p>
        </div>

        <div className="col-md-4">
          <h5>Gap Analysis</h5>
          <p className="text-muted">
            Compare overlapping research areas and visualize missing links.
          </p>
        </div>

        <div className="col-md-4">
          <h5>Thesis Support</h5>
          <p className="text-muted">
            Refine problem statements with AI-guided suggestions.
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <a href="/login" className="btn btn-primary btn-lg">
          Get Started
        </a>
      </div>
    </PublicLayout>
  );
}
