# React single-page application built with MSAL React and Microsoft identity platform

This application demonstrates the Azure portal login, logout, conditionally render components to authenticated users, and acquire an access token for a protected resource such as Microsoft Graph. It creates and lists the subscriptions available in the tenant.

## Features

This sample demonstrates the following MSAL React concepts:

- Configuration
- Login
- Logout
- Acquiring an access token
- Creating the subscriptions, tags and assigning reader role to "rubrik-cloudhealth-Oasis" application
- Viewing the subscriptions
- Assigning roles to the multiple subscription applications.

## Contents

| File/folder          | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `src`                | Contains source files                                                           |
| `styles`             | Contains styling for the sample                                                 |
| `components`         | Contains ui components such as sign-in, sign-out, create, view and role buttons |
| `public`             | Contains static content such as images and the base html                        |
| `Config.js`          | Contains configuration parameters.                                              |
| `Buttons.js`         | Contains MSAL React Components and main sample content                          |
| `GraphManagement.js` | Provides a helper function for calling MS Graph and Mangement API.              |
| `index.js`           | Contains the root component and MsalProvider                                    |
| `Main.js`            | Contains the routes                                                             |
| `package.json`       | Package manifest for npm.                                                       |
| `README.md`          | This README file.                                                               |

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/) must be installed to run this sample.

### Setup

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [authorization code flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow). This will require that you redirect URI configured in the portal is of type `SPA`.
2. Make sure to assign the following "Delegated" API permissions to your application:
   a. user_impersonation
   b. Application.Read.All
   c. Application.ReadWrite.All
   d. Directory.Read.All
   e. User.Read
3. Atter assigning the permissions, makesure to give the clientId and tenantId in the tenantoptions of Config.js file.
4. Clone this repository `git clone https://github.com/AjithaJasti/Azure_Subscriptions_Management.git`
5. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.

## Running the sample

1. To start the sample application, run `npm start`.
2. Finally, open a browser and navigate to [http://localhost:3000].
