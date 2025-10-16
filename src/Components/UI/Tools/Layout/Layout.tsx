import { useAppDispatch } from "../../../../States/hoooks/hook";

import useLayoutController from "./layout.controller";
import Nav from "./Nav/Nav";
import {
  AddRectangle,
  ArrowDownRectangle,
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
import { createContext, useEffect } from "react";
import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";
// import { getUser } from "../../../../States/Slices/invoice";

// import { getUser } from "../../../../States/Slices/ClientSlice/useAuth/user";

const AuthContext = createContext({});
const Layout = ({ children }: any) => {
  // const { isAuthenticated } = useAppSelector((store) => store.userSlice);

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
  }, []);

  // if (!isAuthenticated) return <SignIn />;
  return (
    <AuthContext.Provider value={{}}>
      <div className=" bg-purple-200    h-auto w-full rounded-tl-lg rounded-tr-lg gap-4 p-2 ">
        <Nav />
        <div className="relative justify-normal flex">
          <div className="relative w-1/4 overflow-y-scroll  max-sm:hidden rounded-bl-lg bg-purple-200">
            <div className="fixed h-auto w-10 left-100 p-1 rounded-md bottom-10  bg-[rgba(0,0,0,0.18)] flex justify-center items-center">
              <ArrowDownRectangle className="text-2xl text-purple-500" />
            </div>

            {sideMenu.map(({ title, children }) => (
              <div className="relative p-3" key={title}>
                <SideNav
                  title={title}
                  children={children!}
                  setMode={() => ""}
                />
              </div>
            ))}
          </div>

          <div
            className="relative  w-full rounded-br-lg bg-purple-100 max-sm:h-auto
            max-sm:rounded-lg max-sm:w-full max-sm:rounded-tl-lg
            max-sm:rounded-tr-lg flex flex-col"
          >
            {children}
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default Layout;
