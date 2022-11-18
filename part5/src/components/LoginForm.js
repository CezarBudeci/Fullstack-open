import { useState } from "react";
import Notification from "./notification";

const LoginForm = ({ login, message, error }) => {
    const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });

    const handleInput = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userCredentials.username, userCredentials.password);
    }

    return (
        <div>
            
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <h2>Log in to application</h2>
                </div>
                {
                    message && <Notification type = "MESSAGE" text = {message} />
                }
                {
                    error && <Notification type = "ERROR" text = {error} />
                }
                <div>
                    username: <input type = "text" name = "username" value = {userCredentials.username} onChange = {(e) => handleInput(e)} />
                </div>
                <div>
                    password: <input type = "password" name = "password" value = {userCredentials.password} onChange = {(e) => handleInput(e)} />
                </div>
                <div>
                    <button type = "submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;