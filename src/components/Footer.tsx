import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <p>&copy; Dream Team Inc.</p>
      <nav className="footer-links">
        <Link to={"/"}>Home</Link>
      </nav>
    </footer>
  );
}
