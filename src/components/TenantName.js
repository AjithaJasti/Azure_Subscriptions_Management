import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../graph";
import { readRequest } from "./authConfig";

export const TenantName = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  //   console.log(graphData);
  useEffect(() => {
    function RequestProfileData() {
      //   const { instance, accounts } = useMsal();
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
        .acquireTokenSilent({
          ...readRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
    }
    RequestProfileData();
  }, []);

  return (
    <>
      {/* <p> techops</p> */}

      {/* {RequestProfileData()} */}
      {graphData ? (
        <h1 className="TenantName"> {graphData.value[0].displayName} Tenant</h1>
      ) : (
        <h1 className="TenantName"> Unavailable</h1>
      )}
    </>
  );
};
