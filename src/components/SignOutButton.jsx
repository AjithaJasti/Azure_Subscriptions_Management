import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph";
import { readRequest } from "./authConfig";

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
      {/* <p> techops</p> */}

      {/* {RequestProfileData()} */}

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
