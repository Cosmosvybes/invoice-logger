import { MenuLineHorizontal } from "react-huge-icons/outline";
import useNavMenu from "./links.menu";
import useLayoutController from "../layout.controller";
import logo from "./../../../../../assets/logo.png";
import SideNav from "./SideNav";
import {
  AddRectangle,
  CardAdd,
  Invoice,
  Logout,
  Setting,
  User,
  UserAdd,
  UsersDouble,
  Dashboard,
  MailArrowDown,
  ExchangeRectangle,
  BriefcaseTriangularTwoLocks,
  InformationRectangle,
  BookAdd,
} from "react-huge-icons/bulk";
import { useAppSelector } from "../../../../../States/hoooks/hook";
import { LogoutOpen, MoneyBagDollar } from "react-huge-icons/solid";
// import useDashboardController from "../../../Interfaces/Pages/Dashboard";

const Nav = () => {
  const icons = [
    <Invoice className="inline text-3xl" />,
    <AddRectangle className="inline text-3xl" />,
    <UsersDouble className="inline text-3xl" />,
    <UserAdd className="inline text-3xl" />,
    <User className="inline text-3xl" />,
    <CardAdd className="inline text-3xl" />,
    <Setting className="inline text-3xl" />,
    <Logout className="inline text-3xl" />,
    <Dashboard className="inline text-3xl" />,
    <MailArrowDown className="inline text-3xl" />,
    <MoneyBagDollar className="inline text-3xl" />,
    <ExchangeRectangle className="inline text-3xl" />,
    <BriefcaseTriangularTwoLocks className="inline text-3xl" />,
    <InformationRectangle className="inline text-3xl" />,
    <BookAdd className="inline text-3xl" />,
  ];
  const { sideMenu } = useLayoutController(icons);
  const { handleSignOut, viewMode, setMode, navRef } =
    useNavMenu(icons);

  const { isAuthenticated, account } = useAppSelector(
    (state) => state.userSlice
  );

  return (
    <>
      {isAuthenticated && (
        <div className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 flex justify-between items-center px-4 md:px-8 h-16 shadow-sm">
          <div className="relative flex justify-start items-center">
            <img
              src={logo}
              alt="logo_image"
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="relative flex items-center gap-4">
             {/* User Profile Pill */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full py-1.5 px-3 pr-4 transition-all hover:bg-slate-100 cursor-pointer group">
               <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-violet-200 uppercase">
                  {account?.Firstname?.[0] || 'U'}
                  {account?.Lastname?.[0] || 'A'}
               </div>
                <div className="hidden md:flex flex-col items-start leading-none">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-violet-700 transition-colors">
                    {account?.Firstname || 'User'} {account?.Lastname?.[0] ? `${account.Lastname[0]}.` : 'Account'}
                  </span>
                </div>
            </div>

            <MenuLineHorizontal
              className="text-2xl text-slate-600 md:hidden cursor-pointer hover:text-slate-900 transition-colors"
              onClick={() => setMode(!viewMode)}
            />
          </div>

          {viewMode && (
            <div
              ref={navRef}
              className="fixed inset-y-0 right-0 w-80 max-w-[85%] bg-white/95 backdrop-blur-xl shadow-[-20px_0_80px_-20px_rgba(0,0,0,0.15)] z-50 flex flex-col animate-slide-in-right"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-xl shadow-violet-200 uppercase">
                        {account?.Firstname?.[0] || 'U'}
                        {account?.Lastname?.[0] || 'A'}
                    </div>
                    <div className="flex flex-col">
                        <h6 className="font-black text-slate-900 text-lg tracking-tight leading-none">
                            {account?.Firstname || 'User'} {account?.Lastname || 'Account'}
                        </h6>
                        <p className="text-slate-400 text-xs mt-1.5 font-medium truncate max-w-[150px]">
                            {account.email}
                        </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl cursor-pointer hover:bg-red-100 transition-all active:scale-95 group" onClick={handleSignOut}>
                     <LogoutOpen className="text-xl group-hover:rotate-12 transition-transform" />
                     <span className="text-sm font-black uppercase tracking-wider">Sign Out</span>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar pt-2">
                {sideMenu.map(({ title, children }) => (
                  <div className="mb-2" key={title}>
                    <SideNav
                      title={title}
                      children={children!}
                      setMode={setMode}
                      mode={viewMode}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Nav;
