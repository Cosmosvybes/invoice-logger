import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import _Routes from "./Components/Routes/_Routes";
import { useAppSelector } from "./States/hoooks/hook";
import SignIn from "./Components/UI/Interfaces/Pages/Onboard/signin/SignIn";
// import Layout from "./Components/UI/Tools/Layout/Layout";
//

function App() {
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);
  if (!isAuthenticated) {
    return <SignIn />;
  }
  return (
    <>
      <_Routes />
    </>
  );
}

export default App;
