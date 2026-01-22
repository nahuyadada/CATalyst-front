import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Navbar - isAuthenticated:", isAuthenticated, "user:", user);
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          CATalyst
        </a>
        
        {isAuthenticated && user && (
          <div className="dropdown ms-auto">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => console.log("User menu clicked")}
            >
              {user.username || user.email}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
