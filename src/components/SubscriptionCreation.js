import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Createsubscriptions.css";
import { v4 as uuid } from "uuid";

const dept = ["IT", "Eng", "Sales"];
const env = ["Prod", "Dev"];
let subsdata = {};
let objId = {};
let checkingsubscription = {};

export const Creation = (props) => {
  console.log(
    "enrollment acc",
    props.sampleData.value[0].properties.enrollmentAccounts[0].id
  );
  const [values, setValues] = useState({
    name: "",
    dept: "",
    env: "",
    cost: "",
    costcenter: "",
    glaccount: "",
  });

  const set = (names) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [names]: value }));
    };
  };

  //Wait time function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Getting "rubrik-cloud-health" object ID
  const applicationData = async () => {
    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerToken")}`;
    console.log(localStorage.getItem("BearerToken"));
    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel", "eventual");

    const appoptions = {
      method: "GET",
      headers: headers,
    };

    await fetch(
      'https://graph.microsoft.com/v1.0/servicePrincipals?$search="displayName:rubrik-cloudhealth-Oasis"',
      appoptions
    )
      .then((response) => response.json())
      .then((data) => {
        objId = data;
      })
      .catch((error) => console.log(error));
    console.log("ObjId", objId.value[0].id);
  };

  //Creating subscriptions, Tags, Roles
  const saveFormData = async () => {
    const headers = new Headers();
    const bearer = `Bearer ${localStorage.getItem("BearerMicrosoftToken")}`;
    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");

    //Creating Subscription
    const dataoptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        properties: {
          billingScope:
            props.sampleData.value[0].properties.enrollmentAccounts[0].id,
          DisplayName: values.name, //Subscription Display Name
          Workload: "Production",
        },
      }),
    };

    // await fetch('https://management.azure.com/providers/Microsoft.Subscription/aliases/tester_subscription?api-version=2020-09-01',dataoptions)
    await fetch(
      "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
        values.name +
        "?api-version=2020-09-01",
      dataoptions
    )
      .then((response) => response.json())
      .then((data) => {
        subsdata = data.properties.subscriptionId;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("subsdataaaa", subsdata);

    await delay(5000);

    //Checking if subscription created
    const checkoptions = {
      method: "GET",
      headers: headers,
    };

    while (checkingsubscription.status != 200) {
      console.log("checking before", checkingsubscription.status);
      // await fetch('https://management.azure.com/providers/Microsoft.Subscription/aliases/tester_subscription?api-version=2020-09-01',checkoptions)
      await fetch(
        "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
          values.name +
          "?api-version=2020-09-01",
        checkoptions
      )
        .then((response) => {
          checkingsubscription = response;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("checking subscription", checkingsubscription.status);
    }

    //Creating Tags

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        properties: {
          tags: {
            department: values.dept,
            environment: values.env,
            "Estimated Cost": values.cost,
            cost_center: values.costcenter,
            glaccount: values.glaccount,
          },
        },
      }),
    };

    await fetch(
      `https://management.azure.com/subscriptions/${subsdata}/providers/Microsoft.Resources/tags/default?api-version=2021-04-01`,
      options
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Creating Roles
    const roleoptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        properties: {
          roleDefinitionId:
            "/subscriptions/" +
            subsdata +
            "/providers/Microsoft.Authorization/roleDefinitions/acdd72a7-3385-48ef-bd42-f606fba81ae7",
          principalId: objId.value[0].id,
        },
      }),
    };

    await fetch(
      "https://management.azure.com/subscriptions/" +
        subsdata +
        "/providers/Microsoft.Authorization/roleAssignments/" +
        uuid() +
        "?api-version=2015-07-01",
      roleoptions
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("Tags and Roles created Successfully!");
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      applicationData();
      saveFormData();
      alert("Subscription created Successfully!");
      setValues({
        name: "",
        env: "",
        cost: "",
        costcenter: "",
        glaccount: "",
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
    console.log(values);
  };

  return (
    <>
      <div className="title">
        <h1>Enter details to create a subscription </h1>{" "}
      </div>
      <div className="divcreateform">
        <form onSubmit={onSubmit} className="createforms">
          <label>Subscription Name</label>
          <input
            required
            value={values.name}
            placeholder="Enter the subscription name"
            onChange={set("name")}
          />

          <label> Department </label>
          <select required value={values.dept} onChange={set("dept")}>
            <option value="">Select Department</option>
            {dept.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label> Environment </label>
          <select required value={values.env} onChange={set("env")}>
            <option value="">Select Environment </option>
            {env.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label>Monthly Estimated Cost*:</label>
          <input
            type="number"
            required
            min="1"
            value={values.cost}
            onChange={set("cost")}
          />

          <label>Cost center:</label>
          <input
            required
            value={values.costcenter}
            onChange={set("costcenter")}
          />

          <label>GL Account:</label>
          <input
            required
            value={values.glaccount}
            onChange={set("glaccount")}
          />

          <button required type="submit" className="buttoncreatesubmit">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default function SubscriptionCreation() {
  return (
    <>
      <Header />
      <div className="Subscriptions">
        <Creation />
      </div>
    </>
  );
}
