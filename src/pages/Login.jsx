import PublicLayout from "../layouts/PublicLayout";
import { useState } from "react";
import { login as loginAPI } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await loginAPI({ email, password });
    console.log(data);
    login(data.user, data.token);
    navigate("/groups");
  }



  return (
    <PublicLayout>
      <div className="container-fluid min-vh-100">
        {/* <div className="row min-vh-100"> */}
          <div className="row flex-grow-1" style={{minHeight: "100vh"}}>
          {/* LEFT SIDE (Marketing Panel) */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center bg-white border-end">
            <div className="p-5">

              <div className="mb-4 text-primary">
                <span className="material-symbols-outlined" style={{fontSize:"36px"}}>
                  CATalyst
                </span>
              </div>

              <h1 className="fw-bold mb-4">
                Join our community to streamline your research workflow
              </h1>

              <p className="text-muted mb-5">
                Experience an AI-powered platform that helps researchers discover
                literature insights, identify research gaps, and generate
                actionable thesis topics.
              </p>

              <div className="row g-4">

                <div className="col-md-6 d-flex">
                  <span className="material-symbols-outlined text-primary me-3">
                    {<FaCheckCircle size={24} />}
                  </span>
                  <div>
                    <strong>AI Gap Detection</strong>
                    <div className="text-muted small">
                      Automatically identify research gaps.
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex">
                  <span className="material-symbols-outlined text-primary me-3">
                    {<GrSecure size={24} />}
                  </span>
                  <div>
                    <strong>Secure Workspace</strong>
                    <div className="text-muted small">
                      Private and secure document processing.
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>


          {/* RIGHT SIDE (LOGIN FORM) */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">

            <div className="card shadow-sm border-0" style={{maxWidth:"420px", width:"100%"}}>
              <div className="card-body p-4">

                <h3 className="fw-bold mb-2">Welcome Back</h3>
                <p className="text-muted mb-4">
                  Sign in to continue using CATalyst
                </p>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="john@example.com"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-primary w-100 mb-3">
                    Login
                  </button>

                  <p className="text-center small">
                    Don't have an account?{" "}
                    <a href="/register">Register</a>
                  </p>

                </form>

              </div>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
