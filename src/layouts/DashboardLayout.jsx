import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <Sidebar />
          </div>

          {/* <div className="col-md-9 col-lg-10 p-4"> */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
          
        </div>
      </div>
    </>
  );
}
