import React from "react";
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
// export const ProfileData = (props) => {
//     console.log(props.graphData);

//     return (
//         <div id="profile-div">
//             <p><strong>First Name: </strong> {props.graphData.givenName}</p>
//             <p><strong>Last Name: </strong> {props.graphData.surname}</p>
//             <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
//             <p><strong>Id: </strong> {props.graphData.id}</p>
//         </div>
//     );
// };


export const SampleData = (props) => {
    console.log(props.sampleData);
    // this.setState({subscriptions : props.sampleData.value});

    return (
        <>
        {/* <h1 className="subslisthead"> Subscriptions List </h1> */}
        <div id="profile-div" className="listingsubscriptions">
           
            <table className='viewtable'>
                <thead>
                    <tr>
                        <th>Subscription ID</th>
                        <th>Subscription Name</th>
                        <th> Tenant Id</th>
                    </tr>
                </thead>
                <tbody>
            {props.sampleData.value.map((subscription) => (
              <tr key={subscription.id}>
               <td>  {subscription.id} <br /> </td>
               <td> {subscription.displayName} </td>
               <td> {subscription.tenantId} </td>
              </tr>
            ))}

</tbody>
            </table>

        </div>
        </>
    );
};


export const CreateSubsc = () => {

    return (
        <div className="title">
            <h1>Enter details to create a subscription </h1>{" "}
        </div>
    

    );

}