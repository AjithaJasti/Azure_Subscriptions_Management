import React from "react";
import { Link } from "react-router-dom";
import "../../styles/SelectSubscription.css";
import { useState } from "react";

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
      <h1 className="titleSelectSubscription">
        {" "}
        Step 1 of 3 - Select a Subscription to create a role{" "}
      </h1>

      <div id="profile-div" className="listingsubscriptions">
        <table className="SubscriptionTable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === subscriptionsdata.length}
                  onChange={handleSelectAllUsers}
                />
              </th>
              {/* <th>Subscription ID</th> */}
              <th>Subscription Name</th>
              <th> State</th>
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
                <td> {subscription.displayName} </td>
                <td> {subscription.state} </td>
              </tr>
            ))}
          </tbody>

          <Link to="/selectApplication">
            <button type="submit" className="selectSubscriptionsSubmit">
              Next
            </button>
          </Link>
        </table>
      </div>
    </>
  );
};

export default SelectSubscription;
