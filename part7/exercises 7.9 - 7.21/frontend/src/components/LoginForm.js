import { useDispatch } from 'react-redux';
import Notification from './Notification';
import { validateTextInput } from '../utils/inputUtil';
import { login } from '../reducers/userReducer';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

const Form = styled.form`
    background-color: white;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    border: 2px solid #0b990b;
    box-shadow: 1px 1px 2px #0b990b;
`;

const Input = styled.input`
    border-radius: 20px;
    border: 2px solid #0b990b;
    min-height: 20px;
    &:focus {
        border: 2px solid #0b990b;
        outline: none;
        box-shadow: 0px 0px 5px #0b990b;
    }
`;

const Button = styled.button`
    border-radius: 20px;
    border: 2px solid #0b990b;
    background-color: rgba(186, 255, 186, 0.5);
    padding: 0 10px;
    min-height: 26px;
    &:hover {
        border: 2px solid #0b990b;
        box-shadow: 0px 0px 5px #0b990b;
        cursor: pointer;
    }
    &:active {
        border: 2px solid #0b990b;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        background-color: white;
    }
`;

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
        <Container>
            <Form onSubmit={e => handleSubmit(e)}>
                <div>
                    <h2>Log in to application</h2>
                </div>
                <Notification />
                <div>
                    <Input type="text" name="username" placeholder="Username" />
                </div>
                <div>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <Button type="submit">Login</Button>
                </div>
            </Form>
        </Container>
    );
};

export default LoginForm;
