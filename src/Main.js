import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Buttons from "./Buttons";
import { Applications } from "./components/Roles/Applications";
import RoleCreation from "./components/Roles/RoleCreation";
import { SelectSubscription } from "./components/Roles/SelectSubscription";
import { SelectApplication } from "./components/Roles/SelectApplication";
import View from "./components/View/View";

function Main() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Buttons />} />
        <Route exact path="/applications" element={<Applications />} />
        <Route exact path="/view" element={<View />} />
        <Route exact path="/roleCreation" element={<RoleCreation />} />
        <Route
          exact
          path="/selectSubscription"
          element={<SelectSubscription />}
        />
        <Route
          exact
          path="/selectApplication"
          element={<SelectApplication />}
        />
      </Routes>
    </Router>
  );
}

export default Main;
