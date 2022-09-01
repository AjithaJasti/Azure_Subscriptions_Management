import React, { useState } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { PageLayout } from "./components/PageLayout";
import { loginRequest, readRequest } from "./components/authConfig";
import { billingAccounts, listSubscription } from "./GraphManagement";
import View from "./components/View/View";
import { SelectSubscription } from "./components/Roles/SelectSubscription";
import { Creation } from "./components/Create/SubscriptionCreation";
import { TenantName } from "./components/ProfileTenantName";
import "./styles/Buttons.css";

export const MainContent = () => {
  const { instance, accounts } = useMsal();
  const [sampleData, setSampleData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [applicationsData, setApplicationsData] = useState(null);
  const [create, setCreate] = useState(false);
  const [view, setView] = useState(false);
  const [applications, setApplications] = useState(false);

  //Acquiring graph Token
  const graphtoken = () => {
    instance
      .acquireTokenSilent({
        ...readRequest,
        account: accounts[0],
      })
      .then((response) => {
        localStorage.setItem("BearerToken", response.accessToken);
        console.log("GraphToken", localStorage.getItem("BearerToken"));
      })
      .catch((error) => alert("Insufficient permissions"));
  };
  const home = () => {
    window.location.reload();
  };

  const getToken = (type) => {
    if (type === "create") {
      //   managementtoken();
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          billingAccounts(response.accessToken).then((data) =>
            setCreateData(data)
          );
        });

      graphtoken();

      // getApplications(response.accessToken).then(response => setApplicationsData(response));

      setCreate(true);
      setView(false);
      setApplications(false);
    } else if (type === "view") {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          listSubscription(response.accessToken).then((response) =>
            setSampleData(response)
          );
          // console.log(sampleData);
        })
        .catch((error) => alert("Insufficient permissions"));

      setCreate(false);
      setView(true);
      setApplications(false);
    } else if (type === "roles") {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          listSubscription(response.accessToken).then((response) =>
            setApplicationsData(response)
          );
          console.log(applicationsData);
        })
        .catch((error) => alert("Insufficient permissions"));

      graphtoken();
      // getApplications(response.accessToken).then(response => setApplicationsData(response));

      setCreate(false);
      setView(false);
      setApplications(true);
    }
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <div className="divButtons">
          <button className="homeButton" onClick={home}>
            Home
          </button>
          <button className="createButton" onClick={() => getToken("create")}>
            Create
          </button>
          <button className="viewButton" onClick={() => getToken("view")}>
            View
          </button>
          <button className="rolesButton" onClick={() => getToken("roles")}>
            Roles
          </button>
          <TenantName />
        </div>

        {createData && create && <Creation sampleData={createData} />}
        {sampleData && view && <View sampleData={sampleData} />}
        {applicationsData && applications && (
          <SelectSubscription sampleData={applicationsData} />
        )}
      </AuthenticatedTemplate>
    </div>
  );
};

export default function Buttons() {
  return (
    <PageLayout>
      <MainContent />
    </PageLayout>
  );
}
