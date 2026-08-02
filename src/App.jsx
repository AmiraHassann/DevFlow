import { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Topbar from "./components/layouts/Topbar/Topbar";
import Sidebar from "./components/layouts/Sidebar/Sidebar";

import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import Tasks from "./pages/Tasks/Tasks";
import Notes from "./pages/Notes/Notes";
import Settings from "./pages/Settings/Settings";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const startPage =
    localStorage.getItem("startPage") ||
    "dashboard";

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      "light";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  return (
    <>
      {!isAuthPage && (
        <>
          <Topbar
            setIsSidebarOpen={
              setIsSidebarOpen
            }
          />

          <div className="app-layout">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={
                setIsSidebarOpen
              }
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Navigate
                    to={`/${startPage}`}
                    replace
                  />
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <Notes />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <ScrollToTopButton />

          </div>
        </>
      )}

      {isAuthPage && (
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;