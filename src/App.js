import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./components/authConfig";
import { PageLayout } from "./components/PageLayout";
import { SampleData } from "./components/ProfileData";
import { createSubscription, listSubscription } from "./graph";
import Button from "react-bootstrap/Button";
import "./styles/App.css";
import { Link } from "react-router-dom";
import { Registration } from "./components/Createsubscriptions";

const Creation = () => {
    const { instance, accounts } = useMsal();
    const [sampleData, setSampleData] = useState(null);

    function RequestCreateData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            localStorage.setItem("BearerToken",response.accessToken);
            createSubscription(response.accessToken).then(response => setSampleData(response));
        });
    }

    return (
        <> 
        {sampleData ? 
            <>
            <Button className= "createsubscription" onClick={RequestCreateData}>Create </Button>
                <Registration sampleData={sampleData} />
                </>
                : 
                <div>
                {/* <Link to="/createsubscriptions" className="Links"> */}
                <Button className= "createsubscription" onClick={RequestCreateData}>Create </Button>
                {/* </Link> */}
                </div>
}
        </>
    );
}
 
 const SubscriptionContent = () => {
    const { instance, accounts } = useMsal();
    const [sampleData, setSampleData] = useState(null);

    function RequestSubsData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            listSubscription(response.accessToken).then(response => setSampleData(response));
        });
        console.log("Login requested",loginRequest)
    }
    return (
        <>
            {sampleData ? 
            <>
            <Button className= "viewsubscription" onClick={RequestSubsData}> View </Button>
                <SampleData sampleData={sampleData} />
                </>
                : 
                <div className="buttons">
                {/* <Link to="/view" className="Links"> */}
                <Button className= "viewsubscription" onClick={RequestSubsData}> View </Button>
                {/* </Link> */}
                </div>

            }
        </>
    );
};

const Tags = () => {
    
    return (
        <>
           
                <div className="buttons">
                <Link to="/tag" className="Links">
                <Button className= "tags"> Tags </Button>
                </Link>
                </div>
        </>
    );
};



/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>

                <Creation />
                <SubscriptionContent />
                <Tags />

            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>     
            </UnauthenticatedTemplate>
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
