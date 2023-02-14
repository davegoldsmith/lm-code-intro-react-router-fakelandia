
import {NavLink} from "react-router-dom";
const Nav = () => <nav className='navigation'>    
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/misdemeanours">Misdemeanours</NavLink></li>
        <li><NavLink to="/confessions">Confess To Us</NavLink></li>
    </ul>
</nav>;

export default Nav;