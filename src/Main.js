import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createsubscriptions from "./components/Createsubscriptions";
import App from "./App";
import Tag from "./components/Tag"
import Tenantdropdown from "./components/Tenantdropdown";

function Main() {
  return (
      <Router forceRefresh={true}>
        <Routes>
            <Route exact path="/createsubscriptions" element={<Createsubscriptions/>} />
            <Route exact path="/" element={<App />} />
            <Route exact path="/tag" element={<Tag/>} />
            {/* <Route exact path="/tenantdropdown" element={<Tenantdropdown/>} /> */}


            </Routes>
      </Router>
  );
}

export default Main;