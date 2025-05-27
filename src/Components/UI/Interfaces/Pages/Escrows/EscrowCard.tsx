import { Link } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../States/hoooks/hook";
import { openEscrow } from "../../../../../States/Slices/escrow";
import { ArrowRight, CheckCircle, SmartLock } from "react-huge-icons/solid";
import escrowReReady from "../../../Tools/_helper/Auth/EscrowHOC/EHOC";

const EscrowCard = ({
  escrowID,
  isCompleted,
}: {
  escrowID: number;
  isCompleted: boolean;
}) => {
  const { escrows } = useAppSelector((store) => store.escrowSlice);
  const dispatch = useAppDispatch();
  const handleOpenEscrow = () => {
    const escrow =
      escrows[escrows.findIndex((escrow) => escrow.escrowID == escrowID)];
    dispatch(openEscrow(escrow));
  };

  return (
    <div className="w-2/5 max-sm:w-full  text-white  bg-purple-400 border-l-8 border-b-8 border-purple-900 h-24 rounded-lg flex gap-3 flex-col justify-between relative p-2">
      <div className="relative flex justify-between items-center">
        <span className="flex justify-start items-center gap-2">
          <SmartLock className="text-2xl text-purple-900" />{" "}
          <h1 className="text-white">Escrow ID #{escrowID}</h1>
        </span>
        {
          <CheckCircle
            className={` ${
              isCompleted ? "text-green-600" : "text-gray-600"
            }  text-2xl`}
          />
        }
      </div>
      <div className="relative flex justify-end items-center">
        <Link
          to={`/deal/escrow/${escrowID}`}
          onClick={handleOpenEscrow}
          className="cursor-pointer text-white flex justify-start items-center"
        >
          <p>Open now </p> <ArrowRight className="text-2xl text-white" />
        </Link>
      </div>
    </div>
  );
};

export default escrowReReady(EscrowCard);
