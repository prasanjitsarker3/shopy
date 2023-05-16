import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {
    const {user, logOut}=useContext(AuthContext);
    const signOut=()=>{
        logOut()
        .then(()=>{})
        .catch(console.error(error))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
                {
                    user? <><small className='userEmail'>  {user.email.slice(0,7)} <button onClick={signOut}>LogOut</button></small></>
                    :<>
                    {/* <Navigate to='/login' replace={true}></Navigate> */}
                    <p>Login</p>
                    </>
                }
            </div>
        </nav>
    );
};

export default Header;