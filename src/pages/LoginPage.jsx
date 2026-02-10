import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import quizImage from "../assets/images/fill.svg";
import chooseImage from "../assets/images/choose.svg";
import { toast } from "sonner";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // mulai loading
    try {
      
      await login(username, password);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex justify-center items-center gap-12 w-full max-w-6xl px-6">
        <div>
          <img
            src={chooseImage}
            alt="choose"
            className={`w-96 mb-4 transition-opacity duration-500 ${loading ? "opacity-50" : "opacity-100"}`}
            loading="lazy"
          />
        </div>
        <form
          className="bg-background shadow-xl rounded px-10 py-14 w-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <div className="mb-4">
            <label className="block mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full transition-all px-3 focus:scale-105 focus:shadow-sm py-1 border rounded"
              required
              disabled={loading} 
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full transition-all px-3 focus:scale-105 focus:shadow-sm py-1 border rounded"
              required
              disabled={loading} 
            />
          </div>

          <p className="py-3 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="hover:text-blue-500 transition-all">
              Register
            </Link>
          </p>

          <button
            type="submit"
            className={`w-full bg-primary hover:shadow-md cursor-pointer hover:scale-105 text-white py-2 rounded transition-all flex justify-center items-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/80"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div>
          <img
            src={quizImage}
            alt="quiz"
            className={`w-96 mb-4 transition-opacity duration-500 ${loading ? "opacity-50" : "opacity-100"}`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
