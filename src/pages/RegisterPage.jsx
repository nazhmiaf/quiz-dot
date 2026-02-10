import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import quizImage from "../assets/images/fill.svg";
import chooseImage from "../assets/images/choose.svg";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register(username, password); // tambahkan await
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex justify-center items-center gap-12 w-full max-w-6xl px-6">
        <div>
          <img src={quizImage} alt="quiz" className="w-96 mb-4" />
        </div>
        <form
          className="bg-background shadow-xl rounded  px-10 py-14  w-xl "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full transition-all focus:scale-105 px-3 focus:shadow-sm py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full transition-all focus:scale-105 px-3 focus:shadow-sm py-1 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full transition-all focus:scale-105 px-3 focus:shadow-sm py-1 border rounded"
              required
            />
          </div>

          <p className="py-3 text-gray-600">
            Already have accout?{" "}
            <span>
              <Link to="/login" className="hover:text-blue-500 transition-all">
                login
              </Link>
            </span>
          </p>

          <button
            type="submit"
            className="w-full bg-primary hover:shadow-md cursor-pointer hover:scale-105 text-white py-2 rounded hover:bg-primary/80 transition-all"
          >
            Register
          </button>
        </form>
        <div>
          <img src={chooseImage} alt="choose" className="w-96 mb-4" />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
