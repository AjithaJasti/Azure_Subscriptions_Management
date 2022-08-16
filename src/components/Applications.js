import React from "react";
import "../styles/View.css";

export default function View(props) {
    console.log(props.sampleData)
        return (
            <>
            {/* <h1 className="subslisthead"> Subscriptions List </h1> */}
            <div id="profile-div" className="listingsubscriptions">
               
                <table className='viewtable'>
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Application Name</th>
                            <th> Domain</th>
                        </tr>
                    </thead>
                    <tbody>
                {props.sampleData.value.map((applications) => (
                  <tr key={applications.appId}>
                   <td>  {applications.appId} <br /> </td>
                   <td> {applications.displayName} </td>
                   <td> {applications.publisherDomain} </td>
                  </tr>
                ))}
    
    </tbody>
                </table>
    
            </div>
            </>
        );
    }