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
        <div className="max-md:px-0   flex bg-purple-100 justify-between rounded-tr-lg rounded-tl-lg   items-center border-b right-0   h-24 sticky   px-2 top-0 max-sm:h-20 z-40 ">
          <div className="relative flex justify-start items-center  max-sm:px-0 ">
            <img
              src={logo}
              alt="logo_image"
              className="w-28 ml-5 max-sm:ml-1  inline  h-28 max-sm:h-auto object-contain"
            />
          </div>

          <div className="relative   w-28  rounded-lg  flex justify-center items-center  h-14 p-2 bg-gray-100 ">
            <div className="relative rounded-full flex justify-center items-center shadow-inner h-12 w-12  bg-gray-50 py-1 px-1">
              {" "}
              <p className="text-purple-800 rounded-full text-sm">
                {String(account.firstname).charAt(0).toUpperCase()}{" "}
                {String(account.lastname).charAt(0).toUpperCase()}
              </p>
            </div>
            <MenuLineHorizontal
              className="text-5xl px-1 hidden max-sm:block max-md:block text-purple-900"
              onClick={() => setMode(!viewMode)}
            /> 
          </div>

          {viewMode && (
            <div
              ref={navRef}
              className="side-bar absolute left-0 bg-gray-200  max-md:right-0  py-2 max-sm:py-1 flex-col  shadow-md  max-sm:w-3/4  max-sm:right-0 max-sm:top-20 z-50 top-0 h-[100dvh] overflow-y-scroll overflow-x-hidden   flex"
            >
              <div className="relative  flex px-3 h-auto  border-b border-gray-300 w-auto items-center gap-2  p-2 justify-start">
                <div className="relative  p-1 flex flex-col  gap-2">
                  <h6 className="font-extrabold text-purple-800">
                    {String(account.firstname).toUpperCase()} {account.lastname}
                  </h6>
                  <p className=" font-normal text-purple-600">{account.email}</p>
                </div>
                <div className="relative w-1/3  rounded-lg flex justify-center items-center h-14 ">
                  <LogoutOpen className="text-4xl text-purple-900 border-2 border-purple-400 rounded-lg" onClick={handleSignOut} />{" "}
                </div>
              </div>

              <div className="relative px-3  z-20">
                {sideMenu.map(({ title, children }) => (
                  <div className="relative  overflow-y-scroll" key={title}>
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
