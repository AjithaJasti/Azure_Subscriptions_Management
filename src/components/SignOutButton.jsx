import React from "react";
import { useMsal } from "@azure/msal-react";
import "../styles/SignOutButton.css";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };
  return (
    <>
      <button
        variant="secondary"
        className="signoutbutton"
        onClick={() => handleLogout("redirect")}
      >
        Sign out
      </button>
    </>
  );
};
