import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Createsubscriptions.css";
import { v4 as uuid } from "uuid";
import { LoadingSpinner } from "./LoadingSpinner";
import { WindowUtils } from "msal";

const dept = ["IT", "Engineering", "Sales", "Support", "Infosec"];
const environment = ["Dev", "Non-Cogs", "Cogs"];
const deptcostcenter = [
  { dept1: "IT", costcenter: 1 },
  { dept1: "Engineering", costcenter: 2 },
];

let cost_center1 = "";
let subsdata = {};
let objId = {};
let checkingsubscription = {};

export const Creation = (props) => {
  // console.log(
  //   "enrollment acc",
  //   props.sampleData.value[0].properties.enrollmentAccounts[0].id
  // );
  const [values, setValues] = useState({
    name: "",
    dept: "",
    environment: "",
    cost: "",
    cost_center: "",
    gl_account: "",
  });

  const [formerrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const set = (names) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [names]: value }));
    };
  };
  useEffect(
    () => {
      if (values.dept != null) {
        if (values.dept === "IT") {
          values.cost_center = "7820";
        } else if (values.dept === "Engineering") {
          values.cost_center = "4923";
        } else if (values.dept === "Sales") {
          values.cost_center = "8921";
        } else if (values.dept === "Support") {
          values.cost_center = "2920";
        } else if (values.dept === "InfoSec") {
          values.cost_center = "7830";
        }
      }
      if (values.environment != null) {
        if (values.environment == "Dev") {
          values.gl_account = "63350";
        } else if (values.environment == "Non-Cogs") {
          values.gl_account = "63350";
        } else if (values.environment == "Cogs") {
          values.gl_account = "55100";
        }
      }
    },
    [values.dept],
    [values.environment]
  );

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
    // console.log("ObjId", objId.value[0].id);
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

    await fetch(
      "https://management.azure.com/providers/Microsoft.Subscription/aliases/substest2208?api-version=2020-09-01",
      dataoptions
    )
      // await fetch(
      //   "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
      //     values.name +
      //     "?api-version=2020-09-01",
      //   dataoptions
      // )
      .then((response) => response.json())
      .then((data) => {
        subsdata = data.properties.subscriptionId;
      })
      .catch((err) => {
        alert(err);
      });
    console.log("subsdataaaa", subsdata);

    await delay(10000);

    //Checking if subscription created
    const checkoptions = {
      method: "GET",
      headers: headers,
    };

    while (checkingsubscription.status != 200) {
      console.log("checking before", checkingsubscription.status);
      await fetch(
        "https://management.azure.com/providers/Microsoft.Subscription/aliases/substest2208?api-version=2020-09-01",
        checkoptions
      )
        // await fetch(
        //   "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
        //     values.name +
        //     "?api-version=2020-09-01",
        //   checkoptions
        // )
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
            environment: values.environment,
            "Estimated Cost": values.cost,
            cost_center: values.cost_center,
            gl_account: values.gl_account,
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
    setLoading(false);
    alert("Subscriptions created Successfully!");
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default submission
    setLoading(true);
    setFormErrors(validate(values));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      console.log(values);
      try {
        applicationData();
        console.log("sample data", props.sampleData.value);
        if (props.sampleData.value.length != 0) {
          saveFormData();
          alert("Working");
        } else {
          setLoading(false);
          alert("Creation Unsuccessful. Need creation access");
        }
        setValues({
          name: "",
          environment: "",
          dept: "",
          cost: "",
          cost_center: "",
          gl_account: "",
        });
        // alert("Subscription created Successfully!");
      } catch (e) {
        alert(`Registration failed! ${e.message}`);
      }
    }
  }, [formerrors]);

  const validate = (formvalues) => {
    const errors = {};
    const nameregex = /^[ A-Za-z0-9_-]*$/;
    if (!nameregex.test(formvalues.name)) {
      errors.name =
        "Subscription name should contain only alphabets, numbers, - and _";
    }

    return errors;
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
              <p className="formerror"> {formerrors.name}</p>
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
              <select
                required
                value={values.environment}
                onChange={set("environment")}
              >
                <option value="">Select Environment </option>
                {environment.map((c) => (
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
                value={values.cost_center}
                onChange={set("cost_center")}
              />

              <label>GL Account:</label>
              <input
                required
                value={values.gl_account}
                onChange={set("gl_account")}
              />

              <button required type="submit" className="buttoncreatesubmit">
                Create
              </button>
            </form>
            {/* {isLoading && <LoadingSpinner />} */}
          </div>
        </>
      )}
    </>
  );
};

export default function SubscriptionCreation() {
  return (
    <>
      {/* <Header /> */}
      <div className="Subscriptions">
        <Creation />
      </div>
    </>
  );
}
