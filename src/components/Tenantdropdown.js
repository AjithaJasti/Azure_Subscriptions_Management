import React from 'react'
import { Component } from "react";
import "./Tenantdropdown.css"
import { msalConfig } from "./authConfig";

const tenantoptions = [
  {
    tenantname: "Select a tenant",
    clientId: "-",
    tenantId: "Select"
  },
  {
    tenantname: "Rubrik_Inc",
    clientId: "f983327d-7de4-4108-8960-36bb7135ac85",
    tenantId: "5faae3e0-6037-4c49-90de-c247566b3a65"
  },
  {
    tenantname: "Tenant2",
    clientId: "ba0c331d-a819-4556-8290-14f24c75ffb9",
    tenantId: "b8975b80-d2c5-4e2d-a2a3-7bcb41bf140d"
  },
  {
    tenantname: "Tenant3",
    clientId: "aca0a397-70bf-425e-8d26-9c89c0e1bc3e",
    tenantId: "bc0209a8-78f4-451d-bd6d-d1aa98ccf0b6"
  }

]



class Tenantdropdown extends Component {
    state = {
      clientId : "", 
      tenantId : "",

    }    
    handleTenantChange =  event => {
      event.preventDefault();
        this.setState({          
          tenantId: event.target.value,
          clientId: tenantoptions.filter(option => option.tenantId === event.target.value)[0].clientId 
        });
        localStorage.setItem('tenantId',event.target.value)
        localStorage.setItem('clientId',tenantoptions.filter(option => option.tenantId === event.target.value)[0].clientId)
        

    }

      render() {
        console.log("local storage",localStorage.getItem('tenantId'))
        console.log(this.state)
        console.log("msalConfig",msalConfig)


            return ( 
                <div className="Box">
                    <h1 className="tenanttitle"> Tenant Selection</h1>

                    <div className="drop">
                        <select value = {this.state.tenantId} onChange={this.handleTenantChange}>
                        {
                            tenantoptions.map((option) => (
                            <option key = {option.tenantId} value = {option.tenantId} >{option.tenantname}</option>
                        ))}
                        </select>
                    {/* <p>You selected {this.state.tenant} </p> */}
                    </div>
                    {/* <msalConfig tenantId={this.state.tenantId} /> */}
            </div>
        );
    }
}

export default Tenantdropdown;