import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Review from "./pages/Review";
import History from "./pages/History";
import ReviewDetails from "./pages/ReviewDetails";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
    return (
      <>
        <Toaster position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  {" "}
                  <Login />{" "}
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  {" "}
                  <Register />{" "}
                </PublicRoute>
              }
            />

            <Route
              element={
                <ProtectedRoute>
                  {" "}
                  <DashboardLayout />{" "}
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/projects" element={<Projects />} />

              <Route path="/review" element={<Review />} />

              <Route path="/reviews" element={<History />} />

              <Route path="/reviews/:id" element={<ReviewDetails />} />

              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;