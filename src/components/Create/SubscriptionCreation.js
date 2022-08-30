import { useState, useEffect } from "react";
import "../../styles/SubscriptionCreation.css";
import { v4 as uuid } from "uuid";
import { LoadingSpinner } from "./LoadingSpinner";
import { department, environment, costcenter, glaccount } from "../../Config";

let flag = 0;
let subsdata = {};
let objId = {};
let checkingsubscription = {};
let aliasname = uuid();

export const Creation = (props) => {
  // console.log(
  //   "enrollment acc",
  //   props.sampleData.value[0].properties.enrollmentAccounts[0].id
  // );
  const [values, setValues] = useState({
    name: "",
    team: "",
    department: "",
    environment: "",
    cost_center: "",
    gl_account: "",
    owner_email: "",
    owner_name: "",
    purpose: "",
  });

  const [formerrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const set = (names) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [names]: value }));
    };
  };
  useEffect(() => {
    if (values.department != null) {
      if (values.department === "IT") {
        setValues((oldValues) => ({
          ...oldValues,
          cost_center: costcenter.IT,
        }));
      } else if (values.department === "Engineering") {
        setValues((oldValues) => ({
          ...oldValues,
          cost_center: costcenter.Engineering,
        }));
      } else if (values.department === "Sales") {
        setValues((oldValues) => ({
          ...oldValues,
          cost_center: costcenter.Sales,
        }));
      } else if (values.department === "Support") {
        setValues((oldValues) => ({
          ...oldValues,
          cost_center: costcenter.Support,
        }));
      } else if (values.department === "Infosec") {
        setValues((oldValues) => ({
          ...oldValues,
          cost_center: costcenter.Infosec,
        }));
      }
    }
  }, [values.department]);

  useEffect(() => {
    if (values.environment != null) {
      if (values.environment === "Non-Cogs") {
        setValues((oldValues) => ({
          ...oldValues,
          gl_account: glaccount.NonCogs,
        }));
      } else if (values.environment === "Cogs") {
        setValues((oldValues) => ({
          ...oldValues,
          gl_account: glaccount.Cogs,
        }));
      }
    }
  }, [values.environment]);

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
      "https://management.azure.com/providers/Microsoft.Subscription/aliases/sampleAlias?api-version=2020-09-01",
      dataoptions
    )
      // await fetch(
      //   "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
      //     aliasname +
      //     "?api-version=2020-09-01",
      //   dataoptions
      // )
      .then((response) => response.json())
      .then((data) => {
        subsdata = data.properties.subscriptionId;
        console.log(`Subscription created Successfully with ID \n ${subsdata}`);
      })
      .catch((err) => {
        alert(err);
      });
    console.log("subsdataaaa", subsdata);

    await delay(7000);

    //Checking if subscription created
    const checkoptions = {
      method: "GET",
      headers: headers,
    };

    while (checkingsubscription.status != 200 && flag <= 5) {
      console.log("checking before", checkingsubscription.status);
      await fetch(
        "https://management.azure.com/providers/Microsoft.Subscription/aliases/sampleAlias?api-version=2020-09-01",
        checkoptions
      )
        // await fetch(
        //   "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
        //     aliasname +
        //     "?api-version=2020-09-01",
        //   checkoptions
        // )
        .then((response) => {
          checkingsubscription = response;
        })
        .catch((err) => {
          console.log(err);
        });
      flag = flag + 1;
      console.log("flag value", flag);
      console.log("checking subscription", checkingsubscription.status);
    }

    //Creating Tags

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        properties: {
          tags: {
            Team: values.team,
            department: values.department,
            environment: values.environment,
            cost_center: values.cost_center,
            gl_account: values.gl_account,
            owner_email: values.owner_email,
            owner_name: values.owner_name,
            purpose: values.purpose,
          },
        },
      }),
    };

    await fetch(
      `https://management.azure.com/subscriptions/${subsdata}/providers/Microsoft.Resources/tags/default?api-version=2021-04-01`,
      options
    )
      .then((response) => {
        if (response.ok) {
          return console.log("Tags Assigned Successfully");
        }
        throw new Error("Something wrong! Tags not assigned");
      })
      .catch((error) => alert(error));

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
      .then((response) => {
        if (response.ok) {
          return alert(
            `Subscription, Tags and Roles Created Successfully \n Subscription Id is ${subsdata}`
          );
        }
        throw new Error("Something Wrong! Role Already Exists or not created");
      })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => alert(error));
    setLoading(false);
  };

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent default submission

    setFormErrors(validate(values));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      console.log(values);
      setLoading(true);
      try {
        applicationData();
        console.log("sample data", props.sampleData.value);
        if (props.sampleData.value.length != 0) {
          saveFormData();
          // alert("Working");
        } else {
          setLoading(false);
          alert("Creation Unsuccessful. Need creation access");
        }
        setValues({
          name: "",
          team: "",
          environment: "",
          department: "",
          cost_center: "",
          gl_account: "",
          ownermail: "",
          owner_name: "",
          purpose: "",
        });
        // alert("Subscription created Successfully!");
      } catch (e) {
        alert(`Registration failed! ${e.message}`);
      }
    }
  }, [formerrors]);

  const validate = (formvalues) => {
    const errors = {};
    const nameregex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    if (!nameregex.test(formvalues.owner_email)) {
      errors.name = "Owner Email is in incorrect format";
    }

    return errors;
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="createTitle">
            Enter details to create a subscription{" "}
          </h1>{" "}
          <div className="divCreateForm">
            <form onSubmit={onSubmit} className="createforms">
              <label>Subscription Name</label>
              <input
                required
                value={values.name}
                placeholder="Ex: Devops_Subscription"
                onChange={set("name")}
              />

              <label>Team</label>
              <input
                required
                value={values.team}
                placeholder="Ex: RCF"
                onChange={set("team")}
              />

              <label> Department </label>
              <select
                required
                value={values.department}
                onChange={set("department")}
              >
                <option value="">Select Department</option>
                {department.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label>Cost center:</label>
              <input
                type="number"
                required
                min="1"
                value={values.cost_center}
                onChange={set("cost_center")}
                readOnly
              />

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

              <label>GL Account:</label>
              <input
                type="number"
                required
                min="1"
                value={values.gl_account}
                onChange={set("gl_account")}
                readOnly
              />

              <label>Owner Email</label>
              <input
                required
                value={values.owner_email}
                placeholder="Ex: tom@rubrik.com"
                onChange={set("owner_email")}
              />
              <p className="formerror"> {formerrors.name}</p>

              <label>Owner Name</label>
              <input
                required
                value={values.owner_name}
                placeholder="Ex: Tom Parker"
                onChange={set("owner_name")}
              />

              <label>Purpose</label>
              <input
                required
                type="textarea"
                value={values.purpose}
                placeholder="Ex: Reason"
                onChange={set("purpose")}
              />

              <button required type="submit" className="buttoncreatesubmit">
                Create
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default function SubscriptionCreation() {
  return (
    <>
      <Creation />
    </>
  );
}
