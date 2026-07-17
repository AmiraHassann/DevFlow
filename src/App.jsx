import { useState } from "react";

import Topbar from "./components/layouts/Topbar/Topbar";
import Sidebar from "./components/layouts/Sidebar/Sidebar";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Topbar setIsSidebarOpen={setIsSidebarOpen} />

      <div className="app-layout">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <DashboardPage />
      </div>
    </>
  );
}

export default App;