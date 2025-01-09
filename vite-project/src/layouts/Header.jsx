import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

function Header () {
    return <header>
        <div>
            <Link to ='/'>
                <h1>My Site</h1>
            </Link>
            <Nav />
        </div>
    </header>
}
export default Header