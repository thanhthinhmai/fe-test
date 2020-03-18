import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
    const [redirect, setRedirect] = useState(false);

    const handleLogin = () => {
        const username = document.querySelectorAll('input[name=username]')[0].value;
        const password = document.querySelectorAll('input[name=password]')[0].value;
        if (username === 'demo' && password === 'demo') {
            setRedirect(true);
            localStorage.setItem('isLoggedIn', true);
            return;
        }
        alert('no');
    };

    const result = redirect ? (
        <Redirect
            to={{
                pathname: '/posts'
            }}
        />
    ) : (
        <div className="Login">
            <label>username</label>
            <input type="text" name="username" id="username" value="demo" />
            <br />
            <label>password</label>
            <input type="password" name="password" id="password" value="demo" />
            <br />
            <button type="button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
    return result;
}

export default Login;
