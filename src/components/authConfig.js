import { LogLevel } from "@azure/msal-browser";

export const tenantoptions = [
  {
    tenantname: "Select a tenant",
    clientId: "-",
    tenantId: "Select",
  },
  {
    tenantname: "Rubrik Inc",
    clientId: "f983327d-7de4-4108-8960-36bb7135ac85",
    tenantId: "5faae3e0-6037-4c49-90de-c247566b3a65",
  },
  {
    tenantname: "Tenant2",
    clientId: "ba0c331d-a819-4556-8290-14f24c75ffb9",
    tenantId: "b8975b80-d2c5-4e2d-a2a3-7bcb41bf140d",
  },
  {
    tenantname: "Oasis Rubrik",
    clientId: "aca0a397-70bf-425e-8d26-9c89c0e1bc3e",
    tenantId: "bc0209a8-78f4-451d-bd6d-d1aa98ccf0b6",
  },
];

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

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["https://management.azure.com/user_impersonation"],
};
export const readRequest = {
  scopes: ["User.Read"],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
