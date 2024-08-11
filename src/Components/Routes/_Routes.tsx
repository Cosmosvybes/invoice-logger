import { Route, Routes } from "react-router-dom";
import Dashboard from "../UI/Interfaces/Pages/Dashboard/Dashboard";
import Nav from "../UI/Tools/Layout/Nav/Nav";
import Create from "../UI/Interfaces/Pages/Create";
import Invoices from "../UI/Interfaces/Pages/Dashboard/Invoices/Invoices";

const _Routes = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/invoices" element={<Invoices />}></Route>
        <Route path="/new/invoice" element={<Create />}></Route>
        <Route path="/invoice/update/:id" element={<Create />}></Route>
      </Routes>
    </>
  );
};

export default _Routes;
