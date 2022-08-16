import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createsubscriptions from "./components/Createsubscriptions";
import App from "./App";
import Tag from "./components/Tag"
import { Applications } from "./components/Applications";

function Main() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/tag" element={<Tag/>} />
            <Route exact path="/applications" element={<Applications/>} />
          </Routes>
      </Router>
  );
}

export default Main;