import { Route, Routes } from "react-router-dom";
import Dashboard from "../UI/Interfaces/Pages/Dashboard/Dashboard";
import Nav from "../UI/Tools/Layout/Nav/Nav";
import Create from "../UI/Interfaces/Pages/Dashboard/Create-F/Create";
import Invoices from "../UI/Interfaces/Pages/Dashboard/Invoices/Invoices";
import ClientPage from "../UI/Interfaces/Pages/Client/ClientPage";
import AddClient from "../UI/Interfaces/Pages/Client/AddClient";
import Profile from "../UI/Interfaces/Pages/Profile/Profile";
import SignIn from "../UI/Interfaces/Pages/Onboard/signin/SignIn";

const _Routes = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/invoices" element={<Invoices />}></Route>
        <Route path="/new/invoice" element={<Create />}></Route>
        <Route path="/clients" element={<ClientPage />}></Route>
        <Route path="/client/new" element={<AddClient />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/invoice/update/:id" element={<Create />}></Route>
      </Routes>
    </>
  );
};

export default _Routes;
