import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createsubscriptions from "./components/Createsubscriptions";
import App from "./App";
import Tag from "./components/Tag"
import { Applications } from "./components/Applications";
import RoleCreation from "./components/RoleCreation";
import { SelectSubscription } from "./components/SelectSubscription";
import { SelectApplication } from "./components/SelectApplication";

function Main() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/tag" element={<Tag/>} />
            <Route exact path="/applications" element={<Applications/>} />
            <Route exact path="/roleCreation" element={<RoleCreation/>} />
            <Route exact path="/selectSubscription" element={<SelectSubscription/>} />
            <Route exact path="/selectApplication" element={<SelectApplication/>} />
          </Routes>
      </Router>
  );
}

export default Main;