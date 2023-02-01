import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducer';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 50px;
`;

const Table = styled.table`
    background-color: white;
    margin-top: 50px;
    padding: 20px 30px;
    border-radius: 20px;
    border: 2px solid #0b990b;
    box-shadow: 1px 1px 2px #0b990b;
`;

const TH = styled.th`
    border-bottom: 2px solid #0b990b;
`;

const TDUser = styled.td`
    border-bottom: 2px solid #0b990b;
    border-right: 2px solid #0b990b;
`;

const TDCount = styled.td`
    border-bottom: 2px solid #0b990b;
`;

const UserLink = styled(Link)`
    color: black;
    &:link,
    &:visited {
        text-decoration: none;
    }
    &:hover {
        text-decoration: underline;
    }
`;

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const blogs = useSelector(state => state.blogs);

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch, blogs.length]);
    return (
        <Container>
            <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <TH>
                            <b>Blogs created</b>
                        </TH>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map(user => (
                            <tr key={user.id}>
                                <TDUser>
                                    <UserLink to={`/users/${user.id}`}>
                                        {user.name ?? 'Anonymous user'}
                                    </UserLink>
                                </TDUser>
                                <TDCount>{user.blogs.length}</TDCount>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;
