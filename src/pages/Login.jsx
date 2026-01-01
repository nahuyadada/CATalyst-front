import PublicLayout from "../layouts/PublicLayout";
import { useState } from "react";
import { login as loginAPI } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await loginAPI({ email, password });
    login(data.user, data.token);
    navigate("/dashboard");
  }



  return (
    <PublicLayout>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4 text-center">Login</h3>

              <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <a href="/register">Don't have an account? Register</a>
                </div>

                <button className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
