import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import Header from "./Header";

export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
                <Header />
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            {props.children}
        </>
    );
};
