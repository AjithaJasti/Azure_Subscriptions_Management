import Header from "./Header";
import { Redirect } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import "./Createsubscriptions.css";
import { loginRequest } from "./authConfig";
import { useState } from "react";
import axios from "axios";
import { createSubscription } from "../graph";
const dept = ["IT", "Eng", "Sales"];
const env = ["Prod", "Dev"];

export const TagsCreation = () => {
  const [values, setValues] = useState({
    dept: "",
    env: "",
    cost: "",
    costcenter: "",
    glaccount: ""
  });
  
  const set = (names) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [names]: value }));
    };
  };

  const saveFormData = async () => {


    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerToken")}`;
    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");


    const dataoptions={

      method: "PUT",
        headers: headers,
        body: JSON.stringify({
            "properties": {
                "tags": {
                "department" : values.dept,
                "environment": values.env,
                "Estimated Cost" : values.cost,
                "cost_center": values.costcenter,
                "glaccount" : values.glaccount,
                }
              }
        })
  };
    await fetch('https://management.azure.com/subscriptions/1dd3a96f-3b91-4776-bc69-60cc764a14c6/providers/Microsoft.Resources/tags/default?api-version=2021-04-01',dataoptions)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })

  };

  const onSubmit = event => {
    event.preventDefault(); // Prevent default submission
    try {
     saveFormData();
      alert("Subscription created Successfully!");
      setValues({
        dept: "",
        env: "",
        cost: "",
        costcenter: "",
        glaccount: ""
      });
      
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
    console.log(values)
  };

return (
    <>
      <div className="title">
        {/* <h1>Enter details to create a subscription </h1>{" "} */}
      </div>
      <div className="tagform">
        <form onSubmit={onSubmit} className="forms">

          <label> Department </label>
          <select required value={values.dept} onChange={set("dept")}>
            <option value="">Select Department</option>
            {dept.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label> Environment </label>
          <select required value={values.env} onChange={set("env")}>
            <option value="">Select Environment </option>
            {env.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>Monthly Estimated Cost*:</label>
          <input
            type="number"
            // required
            min="1"
            value={values.cost}
            onChange={set("cost")}
          />

          <label>Cost center:</label>
          <input value={values.costcenter} onChange={set("costcenter")} />

          <label>GL Account:</label>
          <input value={values.glaccount} onChange={set("glaccount")} />

          
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default function Tag() {
  return (
    <>
      {/* <Header /> */}
      <div>
        <TagsCreation />
      </div>
    </>
  );
}