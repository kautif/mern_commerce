import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register, signin } from '../actions/userActions';
import AlertMessage from '../components/AlertMessage';
import Loading from '../components/Loading';

export default function RegisterScreen(props) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmedPassword] = useState('');

const redirect = props.location.search 
? props.location.search.split('=')[1]
: '/';

const userRegister = useSelector((state) => state.userRegister);
const {userInfo, loading, error} = userRegister;

const dispatch = useDispatch();
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(name, email, password));
}

if (password !== confirmPassword) {
    alert("password and confirmed password don't match");
} else {
    dispatch(register(name, email, password));
}

useEffect(() => {
    if (userInfo) {
        props.history.push(redirect);
    }
}, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <Loading></Loading>}
                {error && <AlertMessage className="danger">{error}</AlertMessage>}
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Reenter password"
                        required
                        onChange={(e) => setConfirmedPassword(e.target.value)}>
                        </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Have an account? {' '} <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}