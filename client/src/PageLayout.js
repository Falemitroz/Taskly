import { Footer, Navbar } from "./components";

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default PageLayout;
