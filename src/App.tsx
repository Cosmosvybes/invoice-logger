import { ToastContainer } from "react-toastify";
import "./App.css";
import Main from "./Components/UI/Interfaces/Pages/Main_";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/UI/Interfaces/Pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
