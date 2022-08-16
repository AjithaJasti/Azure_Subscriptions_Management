import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest, readRequest } from "./components/authConfig";
import { PageLayout } from "./components/PageLayout";
import { createSubscription, listSubscription, getApplications } from "./graph";
import "./styles/App.css";
import { Registration } from "./components/Createsubscriptions";
import View from "./components/View";
import {Applications} from './components/Applications'
import {SelectApplication} from './components/SelectApplication'


export const MainContent = () => {  
    const { instance, accounts } = useMsal();
    const [sampleData, setSampleData] = useState(null);
    const [createData, setCreateData] = useState(null);
    const [applicationsData, setApplicationsData] = useState(null);
    const [create, setCreate] = useState(false);
    const [view, setView] = useState(false);
    const [applications, setApplications] = useState(false);
    
    const getToken = (type) => {

        if (type === "create") {
                instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                }).then((response) => {
                    localStorage.setItem("BearerToken",response.accessToken);
                    createSubscription(response.accessToken).then(data => setCreateData(data));
                    console.log(createData)
                });
                setCreate(true);
                setView(false);
                setApplications(false);
          
         } else if(type === "view") {
            instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            }).then((response) => {
                listSubscription(response.accessToken).then(response => setSampleData(response));
                console.log(sampleData)
            });
          setCreate(false);
          setView(true);
          setApplications(false);
          
        }
        else if(type==="applications"){
            instance.acquireTokenSilent({
                ...readRequest,
                account: accounts[0]
              }).then((response) => {
                localStorage.setItem("BearerToken",response.accessToken);
                // getApplications(response.accessToken).then(response => setApplicationsData(response));
                // console.log(applicationsData)
            });
            setCreate(false);
            setView(false);
            setApplications(true);
        }
      };

    return (
        <div className="App">
            <AuthenticatedTemplate>
                <div className="subscriptionbuttons">
                <button className= "createsubscription" onClick={() => getToken("create")}>Create</button>
                <button className= "viewsubscription" onClick={() => getToken("view")}>View</button>
                <button className= "applicationssubscription" onClick={() => getToken("applications")}>Applications</button>
                </div>

                {createData && create &&  <Registration sampleData={createData} />}
                {sampleData && view && <View sampleData={sampleData}/>} 
                {/* {applicationsData && applications && <Applications sampleData={applicationsData}/>}  */}
                {applications && <SelectApplication/>}
            </AuthenticatedTemplate>

        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>       
    );
}
