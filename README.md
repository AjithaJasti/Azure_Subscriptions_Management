# React single-page application built with MSAL React and Microsoft identity platform

This application demonstrates the Azure portal login, logout, conditionally render components to authenticated users, and acquire an access token for a protected resource such as Microsoft Graph. It also creates and lists the subscriptions available for the tenant.

## Features

This sample demonstrates the following MSAL React concepts:

* Configuration
* Login
* Logout
* Conditionally rendering components for authenticated or unauthenticated users
* Acquiring an access token and calling Microsoft Graph
* Viewing the subscriptions
* Creating the subscriptions and tags

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `src`             | Contains sample source files               |
| `styles`          | Contains styling for the sample            |
| `components`      | Contains ui components such as sign-in button, sign-out button and navbar |
| `public`          | Contains static content such as images and the base html   |
| `authConfig.js`   | Contains configuration parameters for the sample.      |
| `App.jsx`         | Contains MSAL React Components and main sample content |
| `graph.js`       | Provides a helper function for calling MS Graph API.   |                      |
| `index.js`        | Contains the root component and MsalProvider |
| `.gitignore`      | Define what to ignore at commit time.      |
| `package.json`    | Package manifest for npm.                  |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/) must be installed to run this sample.

### Setup

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [authorization code flow with PKCE](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow). This will require that you redirect URI configured in the portal is of type `SPA`.
1. Clone this repository `git clone https://github.com/AjithaJasti/Azure_Subscriptions.git`
1. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.

## Running the sample

1. To start the sample application, run `npm start`.
2. Finally, open a browser and navigate to [http://localhost:3000].
