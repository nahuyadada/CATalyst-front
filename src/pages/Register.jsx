import PublicLayout from "../layouts/PublicLayout";

export default function Login() {
    console.log("Rendering Regisgeter Page");
  return (
    <PublicLayout>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4 text-center">Register</h3>

              <form>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" />
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
