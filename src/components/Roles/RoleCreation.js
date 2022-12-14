import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header";
import { v4 as uuid } from "uuid";
import { SignOutButton } from "../SignOutButton";
import "../../styles/RoleCreation.css";

export const RoleCreation = () => {
  const location = useLocation();
  const objId = location.state;
  console.log("location", location.state);
  console.log(localStorage.getItem("selectedusers"));
  const subId = JSON.parse(localStorage.getItem("selectedusers"));
  const [values, setValues] = useState({
    roleName: "",
    allowedtypes: "",
    guid: "",
  });
  const [success, setSuccess] = useState(false);

  const set = (names) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [names]: value }));
    };
  };

  const saveFormData = (element, obj) => {
    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerMicrosoftToken")}`;
    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");

    const dataoptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        properties: {
          roleDefinitionId:
            element +
            "/providers/Microsoft.Authorization/roleDefinitions/" +
            values.roleName,
          principalId: obj,
        },
      }),
    };
    fetch(
      "https://management.azure.com/" +
        element +
        "/providers/Microsoft.Authorization/roleAssignments/" +
        uuid() +
        "?api-version=2015-07-01",
      dataoptions
    )
      .then((response) => {
        if (response.ok) {
          // return alert("Role Assigned Successfully");
          return setSuccess(true);
        }
        throw new Error(
          " Role already exists or Role Id is incorrect or Insufficient Permissions"
        );
      })
      // .then((data) => {
      //   console.log("data", data);
      // })
      .catch((error) => alert(error));
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      subId.forEach((element) => {
        objId.forEach((obj) => {
          saveFormData(element, obj);
        });
      });

      setValues({
        roleName: "",
        allowedtypes: "",
        guid: "",
      });
    } catch (e) {
      alert(`Role creation failed! ${e.message}`);
    }
    console.log(success);
  };

  useEffect(() => {
    if (success === true) {
      alert(`Role Assigned Successfully`);
    }
  });

  return (
    <>
      <a href="/" className="home">
        <img src="./images/Home.png" alt="Home" />
      </a>
      <Header />
      <SignOutButton />
      <h1 className="roleTitle">
        Step 3 of 3 - Enter Role ID to create the role{" "}
      </h1>
      <p className="Azureroles">
        {" "}
        Click{" "}
        <a
          href="https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles"
          target="_blank"
        >
          {" "}
          Azure Builtin roles{" "}
        </a>{" "}
        to get the role id
      </p>
      <div className="divRoleForm">
        <form onSubmit={onSubmit} className="roleForms">
          <label>Role Id</label>
          <input
            placeholder="Reader roleId Ex: acdd72a7-3385-48ef-bd42-f606fba81ae7"
            required
            value={values.roleName}
            onChange={set("roleName")}
          />

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
};

export default RoleCreation;
