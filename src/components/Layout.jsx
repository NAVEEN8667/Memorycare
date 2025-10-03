import { useEffect } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.id = 'layout-internal-styles';
    styleElement.textContent = `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: #F7F7F7;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      .main-content {
        flex: 1;
        background: #F7F7F7;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      const existingStyle = document.getElementById('layout-internal-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
