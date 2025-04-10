import { Route, Routes } from "react-router-dom";
import Dashboard from "../UI/Interfaces/Pages/Dashboard/Dashboard";
import Nav from "../UI/Tools/Layout/Nav/Nav";
import Create from "../UI/Interfaces/Pages/Dashboard/Create-F/Create";
import Invoices from "../UI/Interfaces/Pages/Dashboard/Invoices/Invoices";
import ClientPage from "../UI/Interfaces/Pages/Client/ClientPage";
import AddClient from "../UI/Interfaces/Pages/Client/AddClient";
import Profile from "../UI/Interfaces/Pages/Profile/Profile";
import SignIn from "../UI/Interfaces/Pages/Onboard/signin/SignIn";
import Settings from "../UI/Interfaces/Pages/Settings/Settings";
import Inbox from "../UI/Interfaces/Pages/Inbox/Inbox";
import Subscription from "../UI/Interfaces/Pages/Subscription/Subscription";
import Signup from "../UI/Interfaces/Pages/Onboard/signup/Signup";
import TrustTradePage from "../UI/Interfaces/Pages/TrustTrade/TrustTradePage";

const _Routes = () => {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/create/new/account" element={<Signup />}></Route>
        <Route path="/account/invoice-received" element={<Inbox />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/invoices" element={<Invoices />}></Route>
        <Route path="/new/invoice" element={<Create />}></Route>
        <Route path="/clients" element={<ClientPage />}></Route>
        <Route path="/client/new" element={<AddClient />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/account/business/trust-trade"
          element={<TrustTradePage />}
        ></Route>
        <Route path="/account/settings" element={<Settings />}></Route>
        <Route
          path="account/finance/overview"
          element={<Subscription />}
        ></Route>
        <Route path="/invoice/update/:id" element={<Create />}></Route>
      </Routes>
    </>
  );
};

export default _Routes;
