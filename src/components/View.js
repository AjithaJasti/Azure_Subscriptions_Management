import React from "react";
import "./View.css";

export default function View(props) {
    console.log(props.sampleData)
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
    }