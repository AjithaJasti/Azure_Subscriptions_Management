export async function listSubscription(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    // console.log(accessToken)
    headers.append("Authorization", bearer);
    // localStorage.setItem("BearerMicrosoftToken",accessToken)

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
    // console.log(accessToken)
    headers.append("Authorization", bearer);
    // localStorage.setItem("BearerMicrosoftToken",accessToken)

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("https://management.azure.com/providers/Microsoft.Billing/billingaccounts/?api-version=2020-05-01", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}



export async function getApplications() {
    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerToken")}`;
    // console.log(localStorage.getItem("BearerToken"))
    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel","eventual")

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch('https://graph.microsoft.com/v1.0/servicePrincipals?$search="displayName:' + localStorage.getItem("appname") + '"', options)
        .then(response => response.json())
        .catch(error => console.log(error));
}





