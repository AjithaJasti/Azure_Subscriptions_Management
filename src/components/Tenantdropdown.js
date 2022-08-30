import React from "react";
import { Component } from "react";
import "../styles/Tenantdropdown.css";
import { tenantoptions } from "../Config";

class Tenantdropdown extends Component {
  state = {
    clientId: "",
    tenantId: "",
  };

  handleTenantChange = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    localStorage.setItem("tenantId", event.target.value);
    localStorage.setItem(
      "clientId",
      tenantoptions.filter(
        (option) => option.tenantId === event.target.value
      )[0].clientId
    );
    this.setState({
      tenantId: event.target.value,
    });
  };

  render() {
    console.log("local storage", localStorage.getItem("clientId"));
    // console.log(this.state)

    return (
      <div className="tenantSelectionBox">
        <h1 className="tenantTitle"> Tenant Selection </h1>

        <div className="divDropdown">
          <select
            required
            value={this.state.tenantId}
            onChange={this.handleTenantChange}
          >
            {tenantoptions.map((option) => (
              <option key={option.tenantId} value={option.tenantId}>
                {option.tenantname}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Tenantdropdown;
