// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
// import React, { useState } from "react";
// import { loginRequest } from "./components/authConfig";
// import { listSubscription } from "./graph";

// export default function View() {
//     const { instance, accounts } = useMsal();
//     const [sampleData, setSampleData] = useState(null);
//         // Silently acquires an access token which is then attached to a request for MS Graph data
//         instance.acquireTokenSilent({
//             ...loginRequest,
//             account: accounts[0]
//         }).then((response) => {
//             listSubscription(response.accessToken).then(response => setSampleData(response));
//         });
//         console.log("Login requested",loginRequest)


//         return (
//             <div>
//                 <table className='viewtable'>
//                     <thead>
//                         <tr>
//                             <th>Subscription ID</th>
//                             <th>Subscription Name</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                 {/* {sampleData.value.map((subscription) => (
//                   <tr key={subscription.id}>
//                    <td>  {subscription.id} <br /> </td>
//                    <td> {subscription.displayName} </td>
//                   </tr>
//                 ))} */}
    
//     </tbody>
//                 </table>
    
//             </div>
//         );
//     }