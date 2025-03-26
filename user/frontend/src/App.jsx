import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <MainContent />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const authRoutes = [
    "/login",
    "/register",
    "/resendotp",
    "/validateotp",
    "/resetpassword",
  ];
  return (
    <div className="flex h-screen">
      {!authRoutes.includes(location.pathname) && <Sidebar />}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
