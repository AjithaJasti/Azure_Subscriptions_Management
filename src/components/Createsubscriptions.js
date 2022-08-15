import Header from "./Header";
import "./Createsubscriptions.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import {useNavigate} from 'react-router-dom';

export const Registration = (props) => {
  // console.log(props.sampleData.value[0].properties.enrollmentAccounts[0].id);
  const [values, setValues] = useState({
    name: "",
  });
  const [responsedata, setResponsedata] = useState([]);
  const navigate = useNavigate();
  
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
      setResponsedata(data.value[0].properties.subscriptionId)
    })
    .catch((err) => {
      console.log(err);
    })

  };

  const onSubmit = event => {
    event.preventDefault(); // Prevent default submission
    try {
      // saveFormData();
      alert("Subscription created Successfully!");
      setValues({
        name: ""
      });
      navigate('/Tag', {state:"1dd3a96f-3b91-4776-bc69-60cc764a14c6"});
      
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
    console.log(values)
  };

//techops-admin-subscription

  return (
    <>
      <div className="title">
        <h1>Enter details to create a subscription </h1>{" "}
      </div>
      <div className="divcreateform">
        <form onSubmit={onSubmit} className="createforms">
          <label>Subscription Name</label>
          <input required value={values.name} placeholder= "Enter the subscription name" onChange={set("name")} />
          {/* <Link to= "/tag" state= "1dd3a96f-3b91-4776-bc69-60cc764a14c6" className="Links"> */}
          {/* <Link to= "/tag" state= {responsedata} className="Links"> */}
          <button type="submit" className="buttoncreatesubmit">Next</button>
          {/* </Link> */}

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
