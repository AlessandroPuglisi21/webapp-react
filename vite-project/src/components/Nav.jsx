import { NavLink } from 'react-router-dom'

function Nav () {
    return <nav>
        <ul>
            <li> <NavLink to= '/'>Home</NavLink></li>
            <li> <NavLink to= '/about'>about</NavLink></li>
            <li> <NavLink to= '/contact'>contact</NavLink></li>
        </ul>
    </nav>
}

export default Nav