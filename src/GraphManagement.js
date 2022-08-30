export async function listSubscription(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  console.log("Management token", accessToken);
  headers.append("Authorization", bearer);
  localStorage.setItem("BearerMicrosoftToken", accessToken);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    "https://management.azure.com/subscriptions/?api-version=2020-01-01",
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function billingAccounts(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  console.log("Management token", accessToken);
  headers.append("Authorization", bearer);
  localStorage.setItem("BearerMicrosoftToken", accessToken);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    "https://management.azure.com/providers/Microsoft.Billing/billingaccounts/?api-version=2020-05-01",
    options
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function tenantInfo(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  console.log(accessToken);

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch("https://graph.microsoft.com/v1.0/organization", options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function userInfo(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  console.log(accessToken);

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch("https://graph.microsoft.com/v1.0/me", options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
