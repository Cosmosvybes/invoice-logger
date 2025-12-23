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
    <div className="w-full h-screen overflow-hidden flex flex-col bg-slate-50">
      <Nav />
      <div className="flex flex-1 overflow-hidden">
        {/* SideNav Container */}
        <div className="w-64 hidden md:flex flex-col border-r border-slate-200 bg-white h-full overflow-y-auto shrink-0 z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
          {sideMenu.map(({ title, children }) => (
            <div className="border-b border-slate-100 last:border-0 pb-2" key={title}>
              <SideNav title={title} children={children!} setMode={() => ""} />
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative flex flex-col h-full overflow-y-auto custom-scrollbar bg-slate-50">
          <main className="flex-1 w-full h-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
