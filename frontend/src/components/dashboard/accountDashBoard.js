import { useContext, useEffect } from "react";
import AccountList from "./accountList";

import { authContext } from "../context/authContext/AuthContext";

const AccountDashboard = () => {
  const { userProfile, profile, error } = useContext(authContext);

  // dispatch action
  useEffect(() => {
    userProfile();
  }, []);
  return (
    <>
      {error ? (
        <>
          <div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>{" "}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>
          <AccountList accounts={profile?.accounts} />
        </>
      )}
    </>
  );
};

export default AccountDashboard;
