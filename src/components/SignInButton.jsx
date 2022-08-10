import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Tenantdropdown from "./Tenantdropdown";

export const SignInButton = () => {
    const { instance } = useMsal();
    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);

            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }

    }
    return (
        <>
        <Tenantdropdown />
{/* 
        <DropdownButton  variant="secondary" className="signbutton" drop="left" title="Sign In">
            <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>Sign in using Popup</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item>
        </DropdownButton> */}

        <button variant="secondary" className="signinbutton" onClick={() => handleLogin("redirect")}> Sign in </button>

        </>
    )
}