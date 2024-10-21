import { BackButton } from "../components/BackButton";
import superman from "../assets/superman.png";

export function NotFound() {
  return (
    <main className="not-found">
      <h1>Error 404</h1>
      <img src={superman} alt="superman" />
      <p>Page Not Found</p>
      <BackButton />
    </main>
  );
}
