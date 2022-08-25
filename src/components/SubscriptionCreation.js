import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Createsubscriptions.css";
import { v4 as uuid } from "uuid";
import { LoadingSpinner } from "./LoadingSpinner";
import { WindowUtils } from "msal";

const department = ["IT", "Engineering", "Sales", "Support", "Infosec"];
const environment = ["Dev", "Non-Cogs", "Cogs"];
const deptcostcenter = [
  { dept1: "IT", costcenter: 1 },
  { dept1: "Engineering", costcenter: 2 },
];

// let cost_center1 = "";
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
  useEffect(
    () => {
      if (values.department != null) {
        if (values.department === "IT") {
          values.cost_center = "7820";
        } else if (values.department === "Engineering") {
          values.cost_center = "4923";
        } else if (values.department === "Sales") {
          values.cost_center = "8921";
        } else if (values.department === "Support") {
          values.cost_center = "2920";
        } else if (values.department === "InfoSec") {
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
    [values.department],
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

    // await fetch(
    //   "https://management.azure.com/providers/Microsoft.Subscription/aliases/substest2208?api-version=2020-09-01",
    //   dataoptions
    // )
    await fetch(
      "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
        aliasname +
        "?api-version=2020-09-01",
      dataoptions
    )
      .then((response) => response.json())
      .then((data) => {
        subsdata = data.properties.subscriptionId;
        alert(`Subscription created Successfully with ID \n ${subsdata}`);
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
      // await fetch(
      //   "https://management.azure.com/providers/Microsoft.Subscription/aliases/substest2208?api-version=2020-09-01",
      //   checkoptions
      // )
      await fetch(
        "https://management.azure.com/providers/Microsoft.Subscription/aliases/" +
          aliasname +
          "?api-version=2020-09-01",
        checkoptions
      )
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
          return alert("Tags Assigned Successfully");
        }
        throw new Error("Tags not assigned");
      })
      // .then((data) => {
      //   console.log("data", data);
      // })
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
          return alert("Roles Assigned Successfully");
        }
        throw new Error("Role Already Exists");
      })
      // .then((data) => {
      //   console.log("data", data);
      // })
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
    // const nameregex = /^[ A-Za-z0-9_-]*$/;
    // if (!nameregex.test(formvalues.name)) {
    //   errors.name =
    //     "Subscription name should contain only alphabets, numbers, - and _";
    // }

    return errors;
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="title">Enter details to create a subscription </h1>{" "}
          <div className="divcreateform">
            <form onSubmit={onSubmit} className="createforms">
              <label>Subscription Name</label>
              <input
                required
                value={values.name}
                placeholder="Ex: Devops_Subscription"
                onChange={set("name")}
              />
              <p className="formerror"> {formerrors.name}</p>

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

              <label>Cost center:</label>
              <input
                type="number"
                required
                min="1"
                value={values.cost_center}
                onChange={set("cost_center")}
              />

              <label>GL Account:</label>
              <input
                type="number"
                required
                min="1"
                value={values.gl_account}
                onChange={set("gl_account")}
              />

              <label>Owner Email</label>
              <input
                required
                value={values.owner_email}
                placeholder="Ex: tom@rubrik.com"
                onChange={set("owner_email")}
              />

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
                value={values.purpose}
                placeholder="Ex: Reason"
                onChange={set("purpose")}
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
