import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./components/authConfig";
import Main from "./Main";

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
const msalInstance = new PublicClientApplication(msalConfig);

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <Main />
        </MsalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
