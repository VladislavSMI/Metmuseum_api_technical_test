import React from "react";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import NotFound from "./app/layout/NotFound";
import AllDepartments from "./features/AllDepartments";
import Department from "./features/Department";
import ScrollToTop from "./app/layout/ScrollToTop";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AllDepartments />} />
        <Route path="/department/:id" element={<Department />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
