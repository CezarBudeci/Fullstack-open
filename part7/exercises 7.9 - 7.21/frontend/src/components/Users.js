import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const blogs = useSelector(state => state.blogs);

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch, blogs.length]);
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <b>blogs created</b>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name ?? 'Anonymous user'}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
