import React from "react";
import "../styles/View.css";
import { Link, useLocation } from "react-router-dom";
import "../styles/View.css";
import { useState } from "react";
import "../styles/Applications.css";
import Header from "./Header";

export const SelectSubscription = (props) => {
  const subscriptionsdata = props.sampleData.value;

  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(subscriptionsdata);

  const handleSelectAllUsers = () => {
    if (selectedUsers.length < subscriptionsdata.length) {
      setSelectedUsers(subscriptionsdata.map(({ id }) => id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (event) => {
    const userId = event.target.value;

    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(
        selectedUsers.filter((selectedUserId) => {
          return selectedUserId !== userId;
        })
      );
    }
  };

  console.log("selected", selectedUsers);
  localStorage.setItem("selectedusers", JSON.stringify(selectedUsers));

  return (
    <>
      {/* <Header /> */}
      <div className="subslisthead">
        <h1> Select a Subscription to create a role </h1>
      </div>

      <div id="profile-div" className="listingsubscriptions">
        <table className="viewtable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === subscriptionsdata.length}
                  onChange={handleSelectAllUsers}
                />
              </th>
              <th>Subscription ID</th>
              <th>Subscription Name</th>
              <th> Tenant Id</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionsdata.map((subscription) => (
              <tr key={subscription.id}>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    value={subscription.id}
                    checked={selectedUsers.includes(subscription.id)}
                    onChange={handleSelectUser}
                  />
                </td>
                <td>
                  {" "}
                  {subscription.id} <br />{" "}
                </td>
                <td> {subscription.displayName} </td>
                <td> {subscription.tenantId} </td>
              </tr>
            ))}
          </tbody>

          <Link to="/selectApplication" className="rolelink">
            <button type="submit" className="rolessubmit">
              Next
            </button>
          </Link>
        </table>
      </div>
    </>
  );
};

export default SelectSubscription;
