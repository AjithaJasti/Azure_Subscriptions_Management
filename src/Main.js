import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createsubscriptions from "./components/Createsubscriptions";
import App from "./App";
import Tag from "./components/Tag"

function Main() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/createsubscriptions" element={<Createsubscriptions/>} />
            <Route exact path="/tag" element={<Tag/>} />
          </Routes>
      </Router>
  );
}

export default Main;