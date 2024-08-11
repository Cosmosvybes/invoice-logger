import { Link } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../States/hoooks/hook";
import { createInvoice } from "../../../../../States/Slices/invoice";
interface Main {
  title: string;
  children: { title: string; id: number; path: string; icon: any }[];
}
const SideNav = ({ title, children }: Main) => {
  const { staticForm } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();

  const handleCreateDefaultInvoice = () => {
    localStorage.setItem("id", String(Date.now()));
    dispatch(
      createInvoice({
        ...staticForm,
        itemList: [],
        TOTAL: 0,
        VAT: "",
        Discount: "",
      })
    );
  };

  return (
    <>
      <div className="relative flex flex-col py-2  gap-2" key={title}>
        <h6 className="font-bold text-gray-500 ml-1">{title}</h6>

        <div className="relative flex flex-col">
          {children.map(({ title, path, icon }) => (
            <Link
              onClick={() =>
                title == "New invoice" && handleCreateDefaultInvoice()
              }
              key={title}
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
