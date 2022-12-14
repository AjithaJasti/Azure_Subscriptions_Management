import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: localStorage.getItem("clientId"),
    authority:
      "https://login.microsoftonline.com/" + localStorage.getItem("tenantId"),
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Scopes
export const loginRequest = {
  scopes: ["https://management.azure.com/user_impersonation"],
};

export const readRequest = {
  scopes: ["User.Read"],
};
