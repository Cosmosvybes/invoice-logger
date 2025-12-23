import { MenuLineHorizontal } from "react-huge-icons/outline";
import useNavMenu from "./links.menu";
import logo from "./../../../../../assets/HatchfulExport-All(1) (2)/logo_transparent.png";
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
  const { handleSignOut, sideMenu, viewMode, setMode, navRef } =
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
              className="w-24 h-auto object-contain"
            />
          </div>

          <div className="relative flex items-center gap-4">
             {/* User Profile Pill */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full py-1.5 px-3 pr-4 transition-all hover:bg-slate-100 cursor-pointer group">
               <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-violet-200">
                  {String(account.firstname).charAt(0).toUpperCase()}
                  {String(account.lastname).charAt(0).toUpperCase()}
               </div>
               <div className="hidden md:flex flex-col items-start leading-none">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-violet-700 transition-colors">
                    {String(account.firstname)} {String(account.lastname).charAt(0)}.
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
              className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-violet-200">
                        {String(account.firstname).charAt(0).toUpperCase()}
                        {String(account.lastname).charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h6 className="font-bold text-slate-900 text-lg">
                            {String(account.firstname)} {String(account.lastname)}
                        </h6>
                        <p className="text-slate-500 text-xs truncate max-w-[150px]">
                            {account.email}
                        </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer transition-colors" onClick={handleSignOut}>
                     <LogoutOpen className="text-xl" />
                     <span className="text-sm font-medium">Sign Out</span>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {sideMenu.map(({ title, children }) => (
                  <div className="mb-6" key={title}>
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
