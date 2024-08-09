import { Link } from "react-router-dom";

interface Main {
  title: string;
  children: { title: string; id: number; path: string; icon: any }[];
}
const SideNav = ({ title, children }: Main) => {
  return (
    <>
      <div className="relative flex flex-col py-2 gap-2" key={title}>
        <h6 className="font-bold text-gray-600">{title}</h6>

        <div className="relative flex flex-col">
          {children.map(({ title, path, icon }) => (
            <Link
              key={icon}
              to={`/${path}`}
              className="text-gray-900 font-normal gap-2 flex justify-start items-center"
            >
              {icon} {title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
