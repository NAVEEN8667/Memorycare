import Navbar from "./Navbar";
import "../styles/main.css";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
