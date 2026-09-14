import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
