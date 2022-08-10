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

export const Registration = (props) => {
  console.log(props.sampleData.value[0].properties.enrollmentAccounts[0].id);
  const [values, setValues] = useState({
    name: "",
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

  // const saveFormData = async () => {
  //   const response = fetch("/successful", {
  //     method: "POST",
  //     body: JSON.stringify(values)
  //   });
  //   if (response.status !== 200) {
  //     throw new Error(`Request failed: ${response.status}`);
  //   }
  // };

  
  const saveFormData = async () => {

    
    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerToken")}`;
    headers.append("Authorization", bearer);

    const dataoptions={

      method: "PUT",
        headers: headers,
        body: JSON.stringify({
        properties: {
            "billingScope": props.sampleData.value[0].properties.enrollmentAccounts[0].id ,
            "DisplayName": values.name, //Subscription Display Name
            "Workload": "Production"
        }
    })
  };
    await fetch('https://management.azure.com/providers/Microsoft.Subscription/aliases/sampleAlias?api-version=2020-09-01',dataoptions)
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
      alert("Your registration was successfully submitted!", `${dept}`);
      setValues({
        name: "",
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

//techops-admin-subscription

  return (
    <>
      <div className="title">
        {/* <h1>Enter details to create a subscription </h1>{" "} */}
      </div>
      <div>
        <form onSubmit={onSubmit} className="forms">
          <label>Subscription Name</label>
          <input required value={values.name} onChange={set("name")} />

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

export default function Createsubscriptions() {
  return (
    <>
      <Header />
      <div className="Subscriptions">
        <Registration />
      </div>
    </>
  );
}

// export default Createsubscriptions;
