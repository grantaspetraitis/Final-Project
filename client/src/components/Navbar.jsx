import { Link } from 'react-router-dom';
import logo from '../images/logo.PNG'

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <img style={{ width: "300px" }} src={logo}></img>
            <ul className="navbar">
                <li>
                    <Link to="/questions">Forum</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;