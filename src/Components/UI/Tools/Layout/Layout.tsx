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

const Layout = ({ children }: any) => {
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
  // const dispatch = useAppDispatch();

  // const navigate = useNavigate();

  // if (!isAuthenticated) return <SignIn />;
  return (
    <div className=" bg-purple-200 border w-full rounded-tl-lg rounded-tr-lg gap-4 ">
      <Nav />
      <div className="relative justify-normal  h-screen max-sm:h-auto flex">
        <div className="relative w-1/4 overflow-y-scroll  max-sm:hidden rounded-bl-lg bg-purple-200">
          <div className="fixed h-auto w-10 left-100 p-1 rounded-md bottom-10  bg-[rgba(0,0,0,0.18)] flex justify-center items-center">
            <ArrowDownRectangle className="text-2xl text-purple-500" />
          </div>

          {sideMenu.map(({ title, children }) => (
            <div className="relative p-3 border " key={title}>
              <SideNav title={title} children={children!} setMode={() => ""} />
            </div>
          ))}
        </div>

        <div
          className="relative  w-full rounded-br-lg bg-purple-100 max-sm:h-auto
            max-sm:rounded-lg max-sm:w-full max-sm:rounded-tl-lg
            max-sm:rounded-tr-lg flex flex-col pb-2"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
