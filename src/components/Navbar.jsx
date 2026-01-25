// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import { Dropdown } from "bootstrap";


// export default function Navbar() {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     if (dropdownRef.current) {
//       new Dropdown(dropdownRef.current);
//     }
//   }, []);


//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <nav className="navbar navbar-dark bg-dark sticky-top">
//       <div className="container-fluid">
//         {/* <a className="navbar-brand" href="/">
//           CATalyst
//         </a> */}
        
//         {isAuthenticated && user && (
//           <div className="dropdown ms-auto">
//             <button
//               // ref={dropdownRef}
//               className="btn btn-dark dropdown-toggle"
//               type="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//               onClick={() => console.log("User menu")}
//             >
//               {user.username || user.email}
//             </button>

//             <ul className="dropdown-menu dropdown-menu-end">
//               <li>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => navigate("/settings")}
//                 >
//                   Settings
//                 </button>
//               </li>
//               <li><hr className="dropdown-divider" /></li>
//               <li>
//                 <button
//                   className="dropdown-item text-danger"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // dropdown state

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" >
          CATalyst
        </a>

        {isAuthenticated && user && (
          <div className="dropdown ms-auto" style={{ position: "relative" }}>
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              onClick={() => setOpen(prev => !prev)}
            >
              {user.username || user.email}
            </button>

            {open && (
              <ul
                className="dropdown-menu dropdown-menu-end show"
                style={{ display: "block", position: "absolute", right: 0 }}
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/settings");
                      setOpen(false);
                    }}
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
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
