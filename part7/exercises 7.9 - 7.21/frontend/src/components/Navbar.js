import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stateUser = useSelector(state => state.user);

    const logout = dispatch => {
        loginService.logout(dispatch);
        navigate('/');
    };

    return (
        <div>
            <Link to="/blogs">blogs</Link>
            <Link to="/users">users</Link>
            {stateUser.name} logged in
            <button onClick={() => logout(dispatch)}>logout</button>
        </div>
    );
};

export default Navbar;
