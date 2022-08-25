import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/View.css";
import { useState } from "react";
import "../styles/Applications.css";
import Header from "./Header";
import { SignOutButton } from "./SignOutButton";

export const Applications = (props) => {
  console.log("Applications data", props.applicationsdata.value);
  const location = useLocation();
  const applicationsdata = props.applicationsdata.value;
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(applicationsdata);

  const handleSelectAllUsers = () => {
    if (selectedUsers.length < applicationsdata.length) {
      setSelectedUsers(applicationsdata.map(({ id }) => id));
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

  return (
    <>
      <div className="apptable">
        {/* <h1 className="subslisthead"> Subscriptions List </h1> */}
        {/* <div id="profile-div" className="listingsubscriptions"> */}

        <table className="applicationtable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === applicationsdata.length}
                  onChange={handleSelectAllUsers}
                />
              </th>
              <th>Application ID</th>
              <th>Application Name</th>
              <th> Object Id</th>
            </tr>
          </thead>
          <tbody>
            {applicationsdata.map((applications) => (
              <tr key={applications.id}>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    value={applications.id}
                    checked={selectedUsers.includes(applications.id)}
                    onChange={handleSelectUser}
                  />
                </td>
                <td>
                  {" "}
                  {applications.appId} <br />{" "}
                </td>
                <td> {applications.displayName} </td>
                <td> {applications.id} </td>
              </tr>
            ))}
          </tbody>
          <Link to="/roleCreation" state={selectedUsers} className="rolelink">
            <button type="submit" className="rolessubmit">
              Next
            </button>
          </Link>
        </table>

        {/* </div> */}
      </div>
    </>
  );
};
