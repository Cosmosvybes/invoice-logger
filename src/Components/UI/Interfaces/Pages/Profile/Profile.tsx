import { useState } from "react";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import user from "./../../../../../assets/User.svg";

const Profile = () => {
  const [userInfo] = useState({
    BusinessName: "Flicks Solutions & Investments",
    Address: "N0.52 Setback block, Tanke Road, Ilorin, Kwara State.",
    Person: "Ayomide",
    Lastname: "Chris",
    Email: "Alfredchris@gmil.com",
    Phone: "08140242751",
  });
  return (
    <>
      <div className="px-28 max-sm:px-0 max-md:px-2">
        <BreadCrumb title="Profile" useLink={false} linkTitle="" />
        <div className="relative py-0 max-sm:py-0 h-screen flex justify-between max-sm:flex-col  gap-5">
          <div className="relative w-1/3  max-sm:w-full h-auto flex px-5  py-2 max-sm:py-0 max-sm:px-5 flex-col">
            <div className="relative w-full h-auto  px-10 py-0 max-md:px-0 rounded-full">
              {" "}
              <img
                src={user}
                alt="profile"
                className="w-full h-full object-contain max-md:w-full max-md:h-auto"
              />
            </div>
          </div>
          <div className="relative w-full  max-sm:w-full h-auto px-5  max-sm:px-2 py-2">
            <h3 className="text-2xl ml-4 max-sm:ml-1 max-sm:text-sm text-slate-800">
              {" "}
              Account information
            </h3>
            <div className="grid grid-cols-1 gap-5 max-sm:gap-2 mt-5 max-sm:grid-cols-1">
              <div className="relative w-full px-5 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900">Firstname</h4>
                <p className="text-slate-800"> {userInfo.Person}</p>
              </div>
              <div className="relative w-full px-5 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900">Lastname</h4>
                <p className="text-slate-800"> {userInfo.Lastname} </p>
              </div>
              <div className="relative w-full px-5 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900">Email</h4>
                <p className="text-slate-800">{userInfo.Email}</p>
              </div>
              <div className="relative w-full px-5 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900">Phone</h4>
                <p className="text-slate-800"> {userInfo.Phone} </p>
              </div>
              <div className="relative w-full px-5 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900">Business name</h4>
                <p className="text-slate-800"> {userInfo.BusinessName} </p>
              </div>
              <div className="relative w-full px-5 max-sm:px-2 py-3 border-b  rounded block">
                <h4 className="text-slate-900"> Address</h4>
                <p className="text-slate-800"> {userInfo.Address} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
