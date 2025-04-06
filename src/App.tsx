import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import _Routes from "./Components/Routes/_Routes";

//
function App() {
  return (
    <>
      <ToastContainer />
      <_Routes />
    </>
  );
}

export default App;
