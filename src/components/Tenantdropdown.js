import React from 'react'
import { Component } from "react";
import "../styles/Tenantdropdown.css"

const tenantoptions = [
  {
    tenantname: "Select a tenant",
    clientId: "-",
    tenantId: "Select"
  },
  {
    tenantname: "Rubrik Inc",
    clientId: "f983327d-7de4-4108-8960-36bb7135ac85",
    tenantId: "5faae3e0-6037-4c49-90de-c247566b3a65"
  },
  {
    tenantname: "Tenant2",
    clientId: "ba0c331d-a819-4556-8290-14f24c75ffb9",
    tenantId: "b8975b80-d2c5-4e2d-a2a3-7bcb41bf140d"
  },
  {
    tenantname: "Oasis Rubrik",
    clientId: "aca0a397-70bf-425e-8d26-9c89c0e1bc3e",
    tenantId: "bc0209a8-78f4-451d-bd6d-d1aa98ccf0b6"
  }

]

class Tenantdropdown extends Component {
    state = {
      clientId : "", 
      tenantId : ""
    }    

    handleTenantChange =  event => {
      event.preventDefault();
      window.localStorage.clear();
      localStorage.setItem('tenantId',event.target.value)
      localStorage.setItem('clientId',tenantoptions.filter(option => option.tenantId === event.target.value)[0].clientId)
        this.setState({          
          tenantId: event.target.value,        
        });
    }

    render() {
      console.log("local storage",localStorage.getItem('clientId'))
        // console.log(this.state)

            return ( 
                <div className="Box">
                    <h1 className="tenanttitle"> Tenant Selection</h1>

                    <div className="drop">

                        <select value = {this.state.tenantId} onChange={this.handleTenantChange} >
                        {
                            tenantoptions.map((option) => (
                            <option key = {option.tenantId} value = {option.tenantId} >{option.tenantname}</option>
                        ))}
                        </select>

                    </div>
            </div>
        );
    }
}

export default Tenantdropdown;