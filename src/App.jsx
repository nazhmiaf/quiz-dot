import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Quiz from "./pages/Quiz.jsx";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      
    </>
  );
};

export default App;
