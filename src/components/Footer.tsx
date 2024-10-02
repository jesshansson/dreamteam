import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <p>Dream Team</p>
      <nav className="footer-links">
        <Link to={"/"}>Home</Link>
      </nav>
    </footer>
  );
}
