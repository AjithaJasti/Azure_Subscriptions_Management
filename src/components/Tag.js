import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import "../styles/Tag.css";
import { MainContent } from "../App";

const dept = ["IT", "Eng", "Sales"];
const env = ["Prod", "Dev"];

export const TagsCreation = (props) => {
  const location = useLocation();
  // const subscriptionId = props.dataprops
  const subscriptionId = location.state
  console.log(subscriptionId)
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
    console.log("sub",subscriptionId)

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
    await fetch(`https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Resources/tags/default?api-version=2021-04-01`,dataoptions)
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
      alert("Tags created Successfully!");
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
     {/* <Navbar bg="primary" variant="dark"> */}
      <Header/>
      {/* </Navbar> */}
      <div className="tagtitle">
        <h1>Enter details to create tags </h1>
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

export default function Tag(props) {
  const location = useLocation();
  return (
    <>
      {/* <Header /> */}
      <div>
        <TagsCreation dataprops = {location.state}/>
      </div>
    </>
  );
}