import { Route, Routes, Outlet } from "react-router-dom";
import Dashboard from "../UI/Interfaces/Pages/Dashboard/Dashboard";
import Landing from "../UI/Interfaces/Pages/Landing/Landing";

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
import AdminDashboard from "../UI/Interfaces/Pages/Admin/AdminDashboard";
import UserManagement from "../UI/Interfaces/Pages/Admin/UserManagement";
import UserSupport from "../UI/Interfaces/Pages/Support/UserSupport";

import Escrow from "../UI/Interfaces/Pages/Escrow/Escrow";
import Marketplace from "../UI/Interfaces/Pages/Marketplace/Marketplace";
import Listings from "../UI/Interfaces/Pages/Listing/Listings";
import Escrows from "../UI/Interfaces/Pages/Escrows/Escrows";
import { ToastContainer } from "react-toastify";
import Disputes from "../UI/Interfaces/Pages/Disputes/Disputes";
import PasswordReset from "../UI/Interfaces/Pages/PasswordReset/PasswordReset";
import VerificationCodePage from "../UI/Interfaces/Pages/PasswordReset/VerificationCodePage";
import NewPassword from "../UI/Interfaces/Pages/PasswordReset/NewPassword";
import Chat from "../UI/Tools/chat/Chat";
import Payment from "../UI/Interfaces/Pages/Dashboard/payment/Payment";
import InvoicePay from "../UI/Interfaces/Pages/Public/InvoicePay";
import PrivacyPolicy from "../UI/Interfaces/Pages/Legal/PrivacyPolicy";
import TermsOfService from "../UI/Interfaces/Pages/Legal/TermsOfService";
import HelpCenter from "../UI/Interfaces/Pages/Legal/HelpCenter";
import Layout from "../UI/Tools/Layout/Layout";

const LayoutWrapper = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

const _Routes = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public / Standalone Routes */}
        <Route path="/" element={<Landing />}></Route>
        <Route path="/subscription/payment" element={<Payment />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/create/new/account" element={<Signup />}></Route>
        <Route path="/new_password" element={<NewPassword />}></Route>
        <Route path="/reset_password" element={<PasswordReset />}></Route>
        <Route path="/verification_code" element={<VerificationCodePage />}></Route>
        <Route path="/invoice/pay/:id" element={<InvoicePay />}></Route>
        <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms" element={<TermsOfService />}></Route>
        <Route path="/help" element={<HelpCenter />}></Route>

        {/* Dashboard / Layout Wrapped Routes */}
        <Route element={<LayoutWrapper />}>
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route path="/admin/users" element={<UserManagement />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/account/invoice-received" element={<Inbox />}></Route>
            <Route path="/finance/escrows" element={<Escrows />}></Route>
            <Route path="/invoices" element={<Invoices />}></Route>
            <Route path="/finance/deal/disputes" element={<Disputes />}></Route>
            <Route path="/new/invoice" element={<Create />}></Route>
            <Route path="/clients" element={<ClientPage />}></Route>
            <Route path="/client/new" element={<AddClient />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/invoice/chat" element={<Chat />}></Route>
            <Route path="/deal/escrow/:id" element={<Escrow />}></Route>
            <Route path="/finance/marketplace" element={<Marketplace />}></Route>
            <Route path="/finance/user/listings" element={<Listings />}></Route>
            <Route path="/account/business/trust-trade" element={<Marketplace />}></Route>
            <Route path="/account/settings" element={<Settings />}></Route>
            <Route path="account/finance/overview" element={<Subscription />}></Route>
            <Route path="/invoice/update/:id" element={<Create />}></Route>
            <Route path="/support" element={<UserSupport />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default _Routes;
