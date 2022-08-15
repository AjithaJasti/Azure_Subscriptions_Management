import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./components/authConfig";
import { PageLayout } from "./components/PageLayout";
import { createSubscription, listSubscription } from "./graph";
import "./styles/App.css";
import { Registration } from "./components/Createsubscriptions";
import View from "./components/View";


const MainContent = () => {  
    const { instance, accounts } = useMsal();
    const [sampleData, setSampleData] = useState(null);
    const [createData, setCreateData] = useState(null);
    const [create, setCreate] = useState(false);
    const [view, setView] = useState(false);
    
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
          
         } else {
            instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            }).then((response) => {
                setSampleData(null)
                listSubscription(response.accessToken).then(response => setSampleData(response));
                console.log(sampleData)
            });
          setCreate(false);
          setView(true);
          
        }
      };

    return (
        <div className="App">
            <AuthenticatedTemplate>
                <div className="subscriptionbuttons">
                <button className= "createsubscription" onClick={() => getToken("create")}>Create</button>
                <button className= "viewsubscription" onClick={() => getToken("view")}>View</button>
                </div>

                {createData && create &&  <Registration sampleData={createData} />}
                {sampleData && view && <View sampleData={sampleData}/>} 
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
