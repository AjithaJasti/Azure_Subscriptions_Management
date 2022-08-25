import React from "react";
import "../styles/View.css";

export default function View(props) {
  console.log(props.sampleData);
  return (
    <>
      <h1 className="subslisthead"> Subscriptions Available in your Tenant </h1>

      <div id="profile-div" className="listingsubscriptions">
        <table className="viewtable">
          <thead>
            <tr>
              <th>Subscription ID</th>
              <th>Subscription Name</th>
              <th> Tenant Id</th>
              <th> State </th>
            </tr>
          </thead>
          <tbody>
            {props.sampleData.value.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  {" "}
                  {subscription.id} <br />{" "}
                </td>
                <td> {subscription.displayName} </td>
                <td> {subscription.tenantId} </td>
                <td>{subscription.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
