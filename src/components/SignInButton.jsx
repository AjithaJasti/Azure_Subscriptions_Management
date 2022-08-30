import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Tenantdropdown from "./Tenantdropdown";
import "../styles/SignInButton.css";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    console.log(instance.Msal2Provider);
    instance.initialize();
    instance.config["auth"]["clientId"] = localStorage.getItem("clientId");
    instance.config["auth"]["authority"] =
      "https://login.microsoftonline.com/" + localStorage.getItem("tenantId");
    instance.browserStorage["clientId"] = localStorage.getItem("clientId");
    instance.performanceClient["clientId"] = localStorage.getItem("clientId");
    instance.performanceClient["authority"] =
      "https://login.microsoftonline.com/" + localStorage.getItem("tenantId");
    instance.tokenCache.config["auth"] = instance.config["auth"];
    instance.tokenCache.storage["clientId"] = localStorage.getItem("clientId");
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <>
      <Tenantdropdown />
      <button
        variant="secondary"
        className="signinbutton"
        onClick={() => handleLogin("redirect")}
      >
        {" "}
        Sign in{" "}
      </button>
    </>
  );
};
