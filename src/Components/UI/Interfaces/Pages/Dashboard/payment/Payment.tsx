import PaystackPop from "@paystack/inline-js";
import withAuth from "../../../../Tools/_helper/Auth/withAuth";
import { ArrowRightCircle } from "react-huge-icons/solid";

const popup = new PaystackPop();
function Payment() {
  const handlePayment = async () => {
    try {
      const response = await fetch(
        `https://ether-bill-server-1.onrender.com/api/one/time/payment/?email=${"alfredchrisayo@gmail.com"}&amount=${
          29000 * 10
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
        }
      );
      const result = await response.json();
      const { access_code } = result;
      const data = popup.resumeTransaction(access_code);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col max-sm:gap-2 items-center h-[calc(100vh-10px)] ">
        <div className="w-1/2 max-sm:w-full p-2">
          <p className="text-center max-sm:text-sm text-neutral=600 text-xs">
            Start your subscription now! You'll be charged ₦2900 immediately and
            gain full access.
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="border-2 text-purple flex justify-center items-center gap-1  border-purple-500  font-bold p-2 rounded-md "
        >
          subscribe <ArrowRightCircle />
        </button>
      </div>
    </>
  );
}

export default withAuth(Payment);
