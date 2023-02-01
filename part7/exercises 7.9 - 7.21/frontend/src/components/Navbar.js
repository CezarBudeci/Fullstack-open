import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    border-bottom: 2px solid #0b990b;
    box-shadow: 0px 0px 5px #0b990b;
`;

const LinkContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const LINK = styled(Link)`
    color: black;
    &:link,
    &:visited {
        text-decoration: none;
    }
    &:hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    border-radius: 20px;
    border: 2px solid #0b990b;
    background-color: white;
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

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stateUser = useSelector(state => state.user);

    const logout = dispatch => {
        loginService.logout(dispatch);
        navigate('/');
    };

    return (
        <Container>
            <LinkContainer>
                <LINK to="/blogs">Blogs</LINK>
                <LINK to="/users">Users</LINK>
            </LinkContainer>
            {stateUser.name} logged in
            <Button onClick={() => logout(dispatch)}>Logout</Button>
        </Container>
    );
};

export default Navbar;
