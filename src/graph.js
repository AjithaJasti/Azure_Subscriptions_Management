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



export async function getApplications(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    console.log(accessToken)
    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel","eventual")

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch('https://graph.microsoft.com/v1.0/applications?$search="displayName:app-rubrik"', options)
        .then(response => response.json())
        .catch(error => console.log(error));
}





