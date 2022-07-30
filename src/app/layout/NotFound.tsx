import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>
        Page not found or we are experiencing server problems. Please return to
        main page and try again later.
      </h1>

      <Link to="/">Return to main page </Link>
    </div>
  );
}
