import NavLink from "./NavLink";
import { MenuLineHorizontal } from "react-huge-icons/outline";
import useNavMenu from "./links.menu";

const Nav = () => {
  const { active, handleActive, links } = useNavMenu();
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

        <div className="relative w-24 flex justify-center items-center rounded-xl h-12 bg-gray-100 mr-32 max-sm:mr-2">
          <p className="text-gray-600 font-normal text-2xl">AA</p>
          <MenuLineHorizontal className="text-5xl text-gray-500" />
        </div>
      </div>
    </>
  );
};

export default Nav;
