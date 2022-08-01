import React from "react";
//official documnetation and explanation for unstable_ prefix => https://reactrouter.com/docs/en/v6/routers/history-router
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import NotFound from "./app/layout/NotFound";
import AllDepartments from "./features/DepartmentsList";
import Department from "./features/ArtsList";
import NavBar from "./app/layout/NavBar";
import About from "./app/layout/About";


export const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history}>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<AllDepartments />} />
          <Route path="/department/:id" element={<Department />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
