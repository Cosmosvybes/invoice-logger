import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import _Routes from "./Components/Routes/_Routes";
import { Web3Provider } from "./Components/Web3/Provider/Web3Provider";

//
function App() {
  return (
    <>
      <ToastContainer />
      <Web3Provider>
        <_Routes />
        {/* <ConnectKitButton /> */}
      </Web3Provider>
    </>
  );
}

export default App;
