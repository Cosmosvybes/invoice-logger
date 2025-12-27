import useLayoutController from "./layout.controller";
import Nav from "./Nav/Nav";
import {
  AddRectangle,
  BookAdd,
  BriefcaseTriangularTwoLocks,
  CardAdd,
  ChartHistogram,
  Dashboard,
  ExchangeRectangle,
  InformationRectangle,
  Invoice,
  Logout,
  MailArrowDown,
  MoneyBagDollar,
  Setting,
  User,
  UserAdd,
  UsersDouble,
} from "react-huge-icons/solid";
import SideNav from "./Nav/SideNav";
import { useAppDispatch } from "../../../../States/hoooks/hook";
import { logOut } from "../../../../States/Slices/ClientSlice/useAuth/user";
import { useNavigate } from "react-router-dom";
import SystemBanner from "./SystemBanner";

const Layout = ({ children }: any) => {
  const icons = [
    <Invoice className="inline text-xl" />,
    <AddRectangle className="inline text-xl" />,
    <UsersDouble className="inline text-xl" />,
    <UserAdd className="inline text-xl" />,
    <ChartHistogram className="inline text-xl" />,
    <CardAdd className="inline text-xl" />,
    <Setting className="inline text-xl" />,
    <Logout className="inline text-xl" />,
    <Dashboard className="inline text-xl" />,
    <MailArrowDown className="inline text-xl" />,
    <MoneyBagDollar className="inline text-xl" />,
    <User className="inline text-xl" />,
    <ExchangeRectangle className="inline text-xl" />,
    <BriefcaseTriangularTwoLocks className="inline text-xl" />,
    <InformationRectangle className="inline text-xl" />,
    <BookAdd className="inline text-xl" />,
  ];
  const { sideMenu } = useLayoutController(icons);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col bg-slate-50">
      <SystemBanner />
      <Nav />
      <div className="flex flex-1 overflow-hidden">
        {/* SideNav Container */}
        <aside className="w-72 hidden md:flex flex-col border-r border-slate-200/60 bg-white h-full shrink-0 z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {sideMenu.map(({ title, children }) => (
              <div className="first:mt-4" key={title}>
                <SideNav title={title} children={children!} setMode={() => ""} />
              </div>
            ))}
          </div>

          {/* Fixed Logout Button at Bottom */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/30">
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3.5 w-full px-5 py-3.5 text-sm font-black text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group active:scale-[0.98]"
            >
              <Logout className="text-xl text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="tracking-tight">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 relative flex flex-col h-full overflow-y-auto custom-scrollbar bg-slate-50">
          <main className="flex-1 w-full h-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
