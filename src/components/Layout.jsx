import { useState } from "react";
import Navbar from "./Navbar";
import CalmModeUI from "./CalmModeUI";
import "../styles/main.css";

const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const [isCalmMode, setIsCalmMode] = useState(false);

  const openCalmMode = () => setIsCalmMode(true);
  const closeCalmMode = () => setIsCalmMode(false);

  return (
    <div className="app-container">
      <Navbar
        onToggleCalm={openCalmMode}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main className="main-content">{children}</main>
      {isCalmMode && <CalmModeUI onClose={closeCalmMode} />}
    </div>
  );
};

export default Layout;
