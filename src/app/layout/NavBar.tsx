import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar bg-primary-darker">
      <h3>
        <Link to="/">
          <i className="fas fa-landmark" /> Met Museum
        </Link>
      </h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
