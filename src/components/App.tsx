import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { HeroProvider } from "../context/HeroContext";
import { Footer } from "./Footer";
import { ScrollToTop } from ".";

export function App() {
  return (
    <>
      <section id="page-container">
        <section id="content-wrap">
          <HeroProvider>
            <ScrollToTop />
            <Header />
            <Outlet />
          </HeroProvider>
        </section>
        <Footer />
      </section>
    </>
  );
}
