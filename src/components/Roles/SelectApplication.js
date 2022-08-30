import React from "react";
import { useState } from "react";
import "../../styles/SelectApplication.css";
import { useNavigate } from "react-router-dom";
import { Applications } from "./Applications";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import { SignOutButton } from "../SignOutButton";

export const SelectApplication = () => {
  console.log("Entered");
  const location = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    appname: "",
  });
  const [applicationsdata, setApplicationsdata] = useState(null);

  const set = (names) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [names]: value }));
    };
  };

  const saveFormData = async () => {
    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerToken")}`;
    console.log(localStorage.getItem("BearerToken"));
    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel", "eventual");

    const dataoptions = {
      method: "GET",
      headers: headers,
    };
    return fetch(
      'https://graph.microsoft.com/v1.0/servicePrincipals?$search="displayName:' +
        values.appname +
        '"',
      dataoptions
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      // setValues({
      //   appname: "",
      // });
      saveFormData().then((response) => setApplicationsdata(response));
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
    console.log(values);
  };

  return (
    <>
      <a href="/" className="home">
        <img src="./images/Home.png" alt="Home" />
      </a>
      <Header />
      <SignOutButton />
      <h1 className="roleTitle">
        Step 2 of 3 - Search for Application to create role{" "}
      </h1>{" "}
      <div className="divAppForm">
        <form onSubmit={onSubmit} className="appforms">
          <input
            placeholder="Search for Application"
            value={values.appname}
            onChange={set("appname")}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {applicationsdata && <Applications applicationsdata={applicationsdata} />}
      {/* )} */}
    </>
  );
};
