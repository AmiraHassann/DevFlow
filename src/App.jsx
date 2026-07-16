import Topbar from "./components/layouts/Topbar/Topbar";
import Sidebar from "./components/layouts/Sidebar/Sidebar";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  return (
    <>
      <Topbar />

      <div className="app-layout">
        <Sidebar />
        <DashboardPage />
      </div>
    </>
  );
}

export default App;