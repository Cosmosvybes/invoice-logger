import { ToastContainer } from "react-toastify";
import "./App.css";
import Nav from "./Components/UI/Tools/Layout/Nav/Nav";

import _Routes from "./Components/Routes/_Routes";
function App() {
  return (
    <>
      <ToastContainer />
      <Nav />
      <_Routes />
    </>
  );
}

export default App;
