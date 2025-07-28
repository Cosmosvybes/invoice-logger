import { useAppDispatch, useAppSelector } from "../../../../States/hoooks/hook";

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
import { useEffect } from "react";

import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";

// import { useNavigate } from "react-router-dom";

const Layout = ({ children }: any) => {
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);

  const icons = [
    <Invoice className="inline text-3xl" />,
    <AddRectangle className="inline text-3xl" />,
    <UsersDouble className="inline text-3xl" />,
    <UserAdd className="inline text-3xl" />,
    <ChartHistogram className="inline text-3xl" />,
    <CardAdd className="inline text-3xl" />,
    <Setting className="inline text-3xl" />,
    <Logout className="inline text-3xl" />,
    <Dashboard className="inline text-3xl" />,
    <MailArrowDown className="inline text-3xl" />,
    <MoneyBagDollar className="inline text-3xl" />,
    <User className="inline text-3xl" />,
    <ExchangeRectangle className="inline text-3xl" />,
    <BriefcaseTriangularTwoLocks className="inline text-3xl" />,
    <InformationRectangle className="inline text-3xl" />,
    <BookAdd className="inline text-3xl" />,
  ];
  const { sideMenu } = useLayoutController(icons);
  const dispatch = useAppDispatch();

  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [isAuthenticated]);

  return (
    <div className=" bg-purple-200    h-auto w-full rounded-tl-lg rounded-tr-lg gap-4 p-2 ">
      <Nav />
      <div className="relative justify-normal flex">
        <div className="relative w-1/4 h-[calc(100vh-0px)] overflow-y-scroll border-r-4 border-purple-700 max-sm:hidden rounded-bl-lg border bg-purple-200">
          {sideMenu.map(({ title, children }) => (
            <div className="relative p-3" key={title}>
              <SideNav title={title} children={children!} setMode={() => ""} />
            </div>
          ))}
        </div>

        <div className="relative w-full rounded-br-lg  bg-purple-100  max-sm:h-auto max-sm:rounded-lg max-sm:w-full max-sm:rounded-tl-lg max-sm:rounded-tr-lg flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
