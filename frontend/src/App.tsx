import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Log from "./Log";
import Login from "./views/Login";
import SavedLogs from "./components/SavedLogs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log/details/:entryId" element={<SavedLogs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
