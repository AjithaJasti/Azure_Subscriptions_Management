import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import { v4 as uuid } from "uuid";

const allowedtypes = ["User", "Application", '"User" , "Application'];
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
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      subId.forEach((element) => {
        objId.forEach((obj) => {
          saveFormData(element, obj);
        });
      });

      alert("Roles created Successfully!");
      setValues({
        roleName: "",
        allowedtypes: "",
        guid: "",
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
    //   console.log(values)
  };

  return (
    <>
      {/* <Navbar bg="primary" variant="dark"> */}
      <Header />
      {/* </Navbar> */}
      <div className="tagtitle">
        <h1>Enter details to create roles </h1>
      </div>

      <div className="tagform">
        <form onSubmit={onSubmit} className="forms">
          <label>Role Name</label>
          <input required value={values.roleName} onChange={set("roleName")} />

          {/* <label> Allowed Member Types </label>
            <select required value={values.allowedtypes} onChange={set("allowedtypes")}>
              <option value="">Select Environment </option>
              {allowedtypes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select> */}
          {/* 
            <label>GUID</label>
            <input value={values.guid} onChange={set("guid")} /> */}

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
};

export default RoleCreation;
