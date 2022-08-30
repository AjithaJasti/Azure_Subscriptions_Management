import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { tenantInfo, userInfo } from "../GraphManagement";
import { readRequest } from "./authConfig";
import "../styles/ProfileTenantName.css";

export const TenantName = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
        .acquireTokenSilent({
          ...readRequest,
          account: accounts[0],
        })
        .then((response) => {
          tenantInfo(response.accessToken).then((response) =>
            setGraphData(response)
          );
          userInfo(response.accessToken).then((response) =>
            setUserData(response)
          );
        })
        .catch((e) =>
          alert(
            "Insufficient App registration permissions to display Tenant Name and User name "
          )
        );
    }
    RequestProfileData();
  }, []);

  return (
    <>
      {userData && graphData ? (
        <div className="TenantUserName">
          <h1 className="TenantName">
            {" "}
            {graphData.value[0].displayName} Tenant
          </h1>
          <h1 className="UserName"> {userData.userPrincipalName}</h1>
        </div>
      ) : (
        <h1 className="Unavailable"> Unavailable</h1>
      )}
    </>
  );
};
