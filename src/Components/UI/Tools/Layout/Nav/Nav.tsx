import NavLink from "./NavLink";
import { MenuLineHorizontal } from "react-huge-icons/outline";
import useNavMenu from "./links.menu";
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
} from "react-huge-icons/bulk";
import { useAppSelector } from "../../../../../States/hoooks/hook";

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
  ];
  const {
    active,
    handleActive,
    handleSignOut,
    links,
    sideMenu,
    viewMode,
    setMode,
    navRef,
  } = useNavMenu(icons);
  const { isLoggedIn, account } = useAppSelector((state) => state.userSlice);

  return (
    <>
      {isLoggedIn && (
        <div className="max-md:px-0 index-10  flex justify-between  items-center shadow-md shadow-gray-50 left-0  h-28 max-sm:h-16 ">
          <div className="relative flex  px-28 gap-4 justify-start w-1/4 max-sm:hidden">
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
          </div>

          <div className="relative  w-28 px-1 py-1 flex justify-center items-center rounded-sm h-12 bg-gray-100 mr-32 max-md:mr-2 max-sm:ml-2">
            <div className="relative rounded-full h-auto w-auto  bg-slate-200 py-1 px-1">
              {" "}
              <p className="text-gray-500 rounded-full text-2xl">
                {String(account.firstname).charAt(0).toUpperCase()}{" "}
                {String(account.lastname).charAt(0).toUpperCase()}
              </p>
            </div>
            <MenuLineHorizontal
              className="text-5xl text-black"
              onClick={() => setMode(!viewMode)}
            />
          </div>

          {viewMode && (
            <div
              ref={navRef}
              className="side-bar absolute right-28 z-20 max-md:right-0  py-2 max-sm:py-1 flex-col  shadow-md  bg-white max-sm:w-82 max-sm:left-0 max-sm:top-16  top-28 h-auto w-96  flex"
            >
              <div className="relative  flex px-3 h-20 border-b border-gray-300 w-full items-center gap-2  justify-start">
                <span className="bg-black text-white w-10 h-10 rounded-full text-center flex justify-center items-center font-normal">
                  {String(account.firstname).charAt(0).toUpperCase()}{" "}
                  {String(account.lastname).charAt(0).toUpperCase()}
                </span>
                <div className="relative block">
                  <h6 className="font-bold text-black">
                    {account.firstname} {account.lastname}
                  </h6>
                  <p className="text-black font-normal">{account.email}</p>
                </div>
              </div>

              <div className="relative px-3 z-20">
                {sideMenu.map(({ title, children }) => (
                  <div className="relative" key={title}>
                    <SideNav title={title} children={children!} />
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
