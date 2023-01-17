import { useDispatch } from 'react-redux';
import Notification from './Notification';
import { validateTextInput } from '../utils/inputUtil';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const username = validateTextInput(dispatch, e.target.username.value);
        const password = validateTextInput(dispatch, e.target.password.value);

        if (username && password) {
            dispatch(login(username, password));
        }
    };

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <h2>Log in to application</h2>
                </div>
                <Notification />
                <div>
                    username: <input type="text" name="username" />
                </div>
                <div>
                    password: <input type="password" name="password" />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
