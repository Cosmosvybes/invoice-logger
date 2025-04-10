import { useAppSelector } from "../../../../States/hoooks/hook";
import SignIn from "../../Interfaces/Pages/Onboard/signin/SignIn";
import useLayoutController from "./layout.controller";
import Nav from "./Nav/Nav";
import {
  AddRectangle,
  CardAdd,
  Dashboard,
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


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
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
  ];
  const { sideMenu } = useLayoutController(icons);
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <div className=" bg-purple-300 h-auto w-full p-2 gap-4 border">
      {isAuthenticated && <Nav />}
      <div className="relative justify-normal flex">
        <div className="relative w-1/4 h-[calc(100vh-0px)]  max-sm:hidden rounded-bl-lg border bg-purple-200">
          {sideMenu.map(({ title, children }) => (
            <div className="relative p-3" key={title}>
              <SideNav title={title} children={children!} setMode={() => ""} />
            </div>
          ))}
        </div>

        <div className="relative w-full rounded-br-lg  bg-gray-100 h-[calc(100vh-0px)] max-sm:h-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
