import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex-center-column">
      <h2 className="text-center">
        Page not found or we are experiencing server problems. Please return to
        main page and try again later. Thank you.
      </h2>

      <Link className="btn" to="/">
        Return to main page{" "}
      </Link>
    </div>
  );
}
