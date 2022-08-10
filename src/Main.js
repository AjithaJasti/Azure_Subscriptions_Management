import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createsubscriptions from "./components/Createsubscriptions";
import App from "./App";
import View from "./View";

function Main() {
  return (
      <Router forceRefresh={true}>
        <Routes>
            <Route exact path="/createsubscriptions" element={<Createsubscriptions/>} />
            <Route exact path="/" element={<App />} />
            {/* <Route exact path="/view" element={<View />} /> */}

            </Routes>
      </Router>
  );
}

export default Main;