import { BackButton } from "../components/BackButton";

export function NotFound() {
  return (
    <main className="not-found">
      <h1>Error 404</h1>
      <p>Page Not Found</p>
      <BackButton />
    </main>
  );
}
