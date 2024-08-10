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
} from "react-huge-icons/bulk";

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
  ];
  const { active, handleActive, links, sideMenu, viewMode, setMode, navRef } =
    useNavMenu(icons);

  return (
    <>
      <div className="  index-10 flex justify-between  items-center shadow-md shadow-gray-50 left-0 border px-2  h-28 max-sm:h-16 ">
        <div className="relative flex  gap-4 justify-start w-1/4 max-sm:hidden">
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

        <div className="relative w-24 flex justify-center items-center rounded-md h-12 bg-gray-100 mr-32 max-sm:mr-2">
          <p className="text-gray-600 font-normal text-2xl">AA</p>
          <MenuLineHorizontal
            className="text-5xl text-gray-500"
            onClick={() => setMode(!viewMode)}
          />
        </div>

        {viewMode && (
          <div
            ref={navRef}
            className="side-bar absolute right-28  py-2 max-sm:py-1 flex-col  bg-white max-sm:w-82 max-sm:left-0 max-sm:top-16 z-20 top-28 h-1/2 w-auto  flex"
          >
            <div className="relative flex px-3 h-20 border-b border-gray-300 w-full items-center gap-2  justify-start">
              <span className="bg-black text-white w-10 h-10 rounded-full text-center flex justify-center items-center font-normal">
                {"AA"}
              </span>
              <div className="relative block">
                <h6 className="font-bold text-black">{"Alfred chris"}</h6>
                <p className="text-black font-normal">
                  {"alfredchrisayo@gmail.com"}
                </p>
              </div>
            </div>

            <div className="relative px-5 shadow-md">
              {sideMenu.map(({ title, children }) => (
                <div className="relative" key={title}>
                  <SideNav title={title} children={children} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
