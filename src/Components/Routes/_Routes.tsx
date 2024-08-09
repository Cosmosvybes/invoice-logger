import { Route, Routes } from "react-router-dom";
import Dashboard from "../UI/Interfaces/Pages/Dashboard/Dashboard";
import Main from "../UI/Interfaces/Pages/InvoicePage";

const _Routes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/invoice" element={<Main />}></Route>
        <Route path="/invoice/update/:id" element={<Main />}></Route>
      </Routes>
    </>
  );
};

export default _Routes;
