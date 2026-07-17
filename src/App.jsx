import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Topbar from "./components/layouts/Topbar/Topbar";
import Sidebar from "./components/layouts/Sidebar/Sidebar";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import Tasks from "./pages/Tasks/Tasks";
import Notes from "./pages/Notes/Notes";
import Settings from "./pages/Settings/Settings";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Topbar
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="app-layout">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/notes"
            element={<Notes />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;