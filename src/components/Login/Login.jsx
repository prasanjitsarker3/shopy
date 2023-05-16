import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
    const [show, setShow]=useState(false)
    const { userLogin } = useContext(AuthContext);
    const location=useLocation();
    const navigate=useNavigate()
    const from = location.state?.from?.pathname || '/';
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            alert("Ensure string has two digits !")
            return;
        }
        else if (password.length < 6) {
            alert("Please at least 6 Characters")
            return;
        }
        userLogin(email, password)
            .then(result => {
                const userLogged = result.user;
                console.log(userLogged);
                form.reset();
                navigate(from, { replace: true })
                
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin} className=''>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='Enter Email' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type={show? 'text':'password'} name="password" id="" placeholder='Enter Password' required />
                    <p onClick={()=>setShow(!show)}><small>
                         {
                            show? <span>Hide Password</span>: <span>Show Password</span>
                         }
                    </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>New User? <Link to='/register'>Register</Link></small></p>
        </div>
    );
};

export default Login;