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

import { getMarketJobs } from "../../../../States/Slices/marketplace";
import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";

// import { useNavigate } from "react-router-dom";

const Layout = ({ children }: any) => {
  const { isAuthenticated } = useAppSelector((store) => store.userSlice);

  const icons = [
    <Invoice className="inline text-xl" />,
    <AddRectangle className="inline text-xl" />,
    <UsersDouble className="inline text-xl" />,
    <UserAdd className="inline text-xl" />,
    <ChartHistogram className="inline text-xl" />,
    <CardAdd className="inline text-xl" />,
    <Setting className="inline text-xl" />,
    <Logout className="inline text-xl" />,
    <Dashboard className="inline text-xl" />,
    <MailArrowDown className="inline text-xl" />,
    <MoneyBagDollar className="inline text-xl" />,
    <User className="inline text-xl" />,
    <ExchangeRectangle className="inline text-xl" />,
    <BriefcaseTriangularTwoLocks className="inline text-xl" />,
    <InformationRectangle className="inline text-xl" />,
    <BookAdd className="inline text-xl" />,
  ];
  const { sideMenu } = useLayoutController(icons);
  const dispatch = useAppDispatch();

  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getMarketJobs());
  }, [isAuthenticated]);

  return (
    <div className=" bg-purple-200   h-auto w-full rounded-tl-lg rounded-tr-lg gap-4 p-1 ">
         <Nav />
      <div className="relative justify-normal flex">
        <div className="relative w-1/4 h-[calc(100vh-36px)] overflow-y-scroll max-sm:hidden rounded-bl-lg border bg-purple-200">
          {sideMenu.map(({ title, children }) => (
            <div className="relative p-3" key={title}>
              <SideNav title={title} children={children!} setMode={() => ""} />
            </div>
          ))}
        </div>

        <div className="relative w-full rounded-br-lg  bg-purple-100 h-[calc(100vh-0px)] max-sm:h-auto max-sm:rounded-lg max-sm:w-full max-sm:rounded-tl-lg max-sm:rounded-tr-lg flex flex-col">
       
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
