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
import { MoneyBagDollar } from "react-huge-icons/solid";
import useDashboardController from "../../../Interfaces/Pages/Dashboard";

const Nav = () => {
  const icons = [
    <Invoice className="inline text-xl" />,
    <AddRectangle className="inline text-xl" />,
    <UsersDouble className="inline text-xl" />,
    <UserAdd className="inline text-xl" />,
    <User className="inline text-xl" />,
    <CardAdd className="inline text-xl" />,
    <Setting className="inline text-xl" />,
    <Logout className="inline text-xl" />,
    <Dashboard className="inline text-xl" />,
    <MailArrowDown className="inline text-xl" />,
    <MoneyBagDollar className="inline text-xl" />,
    <ExchangeRectangle className="inline text-xl" />,
    <BriefcaseTriangularTwoLocks className="inline text-xl" />,
    <InformationRectangle className="inline text-xl" />,
    <BookAdd className="inline text-xl" />,
  ];
  const { handleSignOut, sideMenu, viewMode, setMode, navRef } =
    useNavMenu(icons);
  useDashboardController();
  const { isAuthenticated, account } = useAppSelector(
    (state) => state.userSlice
  );

  return (
    <>
      {isAuthenticated && (
        <div className="max-md:px-0  flex bg-purple-50 justify-between rounded-tr-lg rounded-tl-lg  items-center border-b right-0 z-40  h-24 sticky  px-2 top-0 max-sm:h-20 ">
          <div className="relative flex justify-start items-center  max-sm:px-0 ">
            <img
              src={logo}
              alt="logo_image"
              className="w-52 ml-5 max-sm:ml-1  inline  h-48 max-sm:h-auto object-contain"
            />
            {/* <div className="relative flex px-28   gap-4 justify-start  max-sm:hidden">
              {links.map((link) => (
                <NavLink
                  to={link.path}
                  key={link.id}
                  name={link.name}
                  active={active}
                  id={link.id}
                  activeCallback={() => handleActive(link.id)}
                />
              ))}
            </div> */}
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
              className="side-bar absolute right-0 bg-purple-100  max-md:right-0  py-2 max-sm:py-1 flex-col  shadow-md   max-sm:w-2/3  max-sm:right-0 max-sm:top-20  top-16 h-auto w-96  flex"
            >
              <div className="relative  flex px-3 h-16  border-b border-gray-300 w-auto items-center gap-2  justify-start">
                <div className="relative flex flex-col  gap-2">
                  <h6 className="font-bold text-purple-800">
                    {String(account.firstname).toUpperCase()} {account.lastname}
                  </h6>
                  <p className=" font-normal text-gray-400">{account.email}</p>
                </div>
              </div>

              <div className="relative px-3 z-20">
                {sideMenu.map(({ title, children }) => (
                  <div className="relative" key={title}>
                    <SideNav
                      title={title}
                      children={children!}
                      setMode={setMode}
                      mode={viewMode}
                    />
                  </div>
                ))}
                <button
                  onClick={handleSignOut}
                  className=" py-1 w-auto px-1 border bg-gray-100 flex justify-start items-center gap-2 mt-4  rounded-sm mb-4 text-gray-600"
                >
                  {" "}
                  <Logout className="text-black inline text-xl" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Nav;
