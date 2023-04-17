import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { LOGIN } from '../queries/UserQueries';

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [login, result] = useMutation(
        LOGIN
        //     , {
        //     onError: error => {
        //         props.setError(error.graphQLErrors[0].message);
        //     },
        // }
    );

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('userToken', token);
            navigate('/books');
        }
    }, [result.data]);

    const submit = async e => {
        e.preventDefault();

        if (username && password) {
            login({ variables: { username, password } });
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username{' '}
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) =>
                            setUsername(target.value.trim())
                        }
                    />
                </div>
                <div>
                    password{' '}
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) =>
                            setPassword(target.value.trim())
                        }
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
