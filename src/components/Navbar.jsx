import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1> Quick Poll </h1>
            <div className="nav-links">
                <Link to="/"> Tous les sondages</Link> |
                <Link to="/create">  Créer un sondage</Link>
            </div>
        </nav>
    );
}
