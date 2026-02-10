import { useAuth } from "../context/AuthContext";
import Navbar from "../components/ui/Navbar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <Navbar/>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
