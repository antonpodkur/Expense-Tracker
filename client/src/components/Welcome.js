import {Link} from 'react-router-dom';

export default function Welcome() {

    function Logout(){
        localStorage.removeItem('token');
    }

    return (
        <div>
            <div className="header">
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Sign In</Link>
                <div onClick={Logout}>Logout</div>
            </div>
            <div className="main">
                <p>Welcome to Expeses Tracker!</p>
            </div>
        </div>
    );
} 