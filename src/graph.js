import { graphConfig } from "./components/authConfig";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
// export async function callMsGraph(accessToken) {
//     const headers = new Headers();
//     const bearer = `Bearer ${accessToken}`;
//     console.log(accessToken)
//     headers.append("Authorization", bearer);

//     const options = {
//         method: "GET",
//         headers: headers
//     };

//     return fetch(graphConfig.graphMeEndpoint, options)
//         .then(response => response.json())
//         .catch(error => console.log(error));
// }

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
 export async function listSubscription(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    console.log(accessToken)
    headers.append("Authorization", bearer);
    localStorage.setItem("BearerToken",accessToken)

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://management.azure.com/subscriptions/?api-version=2020-01-01", options)
        .then(response => response.json())
        .catch(error => console.log(error));
};


export async function createSubscription(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    console.log(accessToken)
    headers.append("Authorization", bearer);
    localStorage.setItem("BearerToken",accessToken)

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://management.azure.com/providers/Microsoft.Billing/billingaccounts/?api-version=2020-05-01", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}






