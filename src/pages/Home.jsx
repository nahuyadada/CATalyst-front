import PublicLayout from "../layouts/PublicLayout";
import "../styles/landing.css";
export default function Home() {
  return (
    <PublicLayout>

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 mb-5">
              <h1 className="hero-title">
                Discover research gaps <span className="hero-highlight">effortlessly.</span>
              </h1>

              <p className="lead text-muted mt-3">
                CATalyst helps researchers analyze research papers, identify gaps,
                and guide in topic formulation using AI-driven workflows.
              </p>

              <div className="mt-4 d-flex gap-3 flex-wrap">
                <a href="/login" className="btn btn-primary btn-lg">
                  Get Started
                </a>

                <button className="btn btn-outline-secondary btn-lg">
                  Watch Demo
                </button>
              </div>

              <p className="text-muted mt-4">
                Join researchers already discovering better research directions.
              </p>
            </div>

            {/* Illustration Carousel */}
            <div className="col-lg-6">
              <div
                id="uiCarousel"
                className="carousel slide shadow-sm rounded"
                data-bs-ride="carousel"
              >

                {/* Dots */}
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#uiCarousel" data-bs-slide-to="0" className="active"></button>
                  <button type="button" data-bs-target="#uiCarousel" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#uiCarousel" data-bs-slide-to="2"></button>
                  <button type="button" data-bs-target="#uiCarousel" data-bs-slide-to="3"></button>
                </div>

                {/* Images */}
                <div className="carousel-inner rounded">

                  <div className="carousel-item active">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                      className="d-block w-100"
                      alt="Dashboard UI"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
                      className="d-block w-100"
                      alt="Analytics UI"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
                      className="d-block w-100"
                      alt="Analytics UI"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1559028012-481c04fa702d"
                      className="d-block w-100"
                      alt="Research UI"
                    />
                  </div>

                </div>

                {/* Arrows */}
                <button className="carousel-control-prev" type="button" data-bs-target="#uiCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#uiCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5 bg-white">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">
              Designed for modern research workflows
            </h2>
            <p className="text-muted">
              Core features that help students move from literature review to thesis topic faster.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon-box">
                  <span className="material-symbols-outlined">search</span>
                </div>

                <h5 className="fw-bold">Summarize Papers</h5>

                <p className="text-muted">
                  Lessen cognitive load by summarizing key sections of research papers
                  for quick understanding and efficiency
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon-box">
                  <span className="material-symbols-outlined">insights</span>
                </div>

                <h5 className="fw-bold">Problem Discovery</h5>

                <p className="text-muted">
                  Analyze research papers to visualize underexplored opportunities to 
                  guide you for potential thesis development.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card h-100">
                <div className="icon-box">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>

                <h5 className="fw-bold">Thesis Support</h5>

                <p className="text-muted">
                  Refine research topics and problem statements using AI-guided
                  suggestions from literature evidence.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="container my-5">
        <div className="cta-section text-center">

          <h2 className="fw-bold mb-3">
            Ready to find your thesis topic?
          </h2>

          <p className="mb-4">
            Use CATalyst to analyze literature and discover research gaps faster.
          </p>

          <a href="/login" className="btn btn-light btn-lg">
            Start Exploring
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-top mt-5 py-5">
        <div className="container">

          <div className="row g-4">

            {/* Brand */}
            <div className="col-md-3">
              <div className="d-flex align-items-center mb-2">
                <span className="material-symbols-outlined me-2">
                  hub
                </span>
                <strong>CATalyst</strong>
              </div>

              <p className="text-muted small">
                AI-powered research gap discovery for thesis and research writing.
              </p>
            </div>

            {/* Product */}
            <div className="col-md-3">
              <h6 className="fw-bold">Product</h6>
              <a href="#" className="d-block text-muted small mb-1">Overview</a>
              <a href="#" className="d-block text-muted small mb-1">Features</a>
              <a href="#" className="d-block text-muted small">Security</a>
            </div>

            {/* Company */}
            <div className="col-md-3">
              <h6 className="fw-bold">Company</h6>
              <a href="#" className="d-block text-muted small mb-1">About</a>
              <a href="#" className="d-block text-muted small mb-1">Privacy</a>
              <a href="#" className="d-block text-muted small">Terms</a>
            </div>

            {/* Connect */}
            <div className="col-md-3">
              <h6 className="fw-bold">Connect</h6>

              <div className="d-flex gap-3 mt-2 text-muted">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
                <span className="material-symbols-outlined">
                  hub
                </span>
                <span className="material-symbols-outlined">
                  code
                </span>
              </div>
            </div>

          </div>

          <hr className="my-4" />

          <div className="text-center text-muted small">
            © 2026 CATalyst. All rights reserved.
          </div>

        </div>
      </footer>

    </PublicLayout>
  );
}