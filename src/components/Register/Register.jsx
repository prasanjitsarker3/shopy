import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const handleSignUp = (event) => {
        console.log(createUser);
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            alert("Ensure string has two digits !")
            return;
        }
        else if (password.length < 6) {
            alert("Please at least 6 Characters")
            return;
        }
        else if (password !== confirmPassword) {
            alert("Confirm Password not Correct")
        }
        createUser(email, password)
            .then(result => {
                const userLogged = result.user;
                console.log(userLogged);
                setSuccess("Success")
                form.reset();
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <div className='form-container'>
                <h2 className='form-title'>Sign Up !</h2>
                <form onSubmit={handleSignUp} className=''>
                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="" placeholder='Enter Email' required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="" placeholder='Enter Password' required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="" placeholder='Enter Password' required />
                    </div>
                    <input className='btn-submit' type="submit" value="Sign Up" />
                    <p><small>Already Have an account? <Link to='/login'>Login</Link></small></p>
                </form>
            </div>
        </div>
    );
};

export default Register;