import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/View.css";

export const Applications = () => {
    const location = useLocation();
    console.log(location.state)

        return (
            <>
            {/* <h1 className="subslisthead"> Subscriptions List </h1> */}
            <div id="profile-div" className="listingsubscriptions">
               
                <table className='viewtable'>
                    <thead>
                        <tr>
                        <th>
              <input
                type="checkbox"
              />
            </th>
                            <th>Application ID</th>
                            <th>Application Name</th>
                            <th> Domain</th>
                        </tr>
                    </thead>
                    <tbody>
                {location.state.applicationsdata.value.map((applications) => (
                  <tr key={applications.id}>
                    <td> 
                  <input
                    type="checkbox"
                    value={applications.id}
                  />
                </td>
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