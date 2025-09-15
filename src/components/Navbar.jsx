import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          MemoryCare
        </Link>
        <div className="nav-links">
          <Link to="/memory-aids">Memory Aids</Link>
          <Link to="/daily-tasks">Daily Tasks</Link>
          <Link to="/cognitive-exercises">Exercises</Link>
          <Link to="/profile">Profile</Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
