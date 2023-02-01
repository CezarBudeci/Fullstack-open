import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: 50px;
`;

const UserContainer = styled.div`
    background-color: white;
    margin-top: 50px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    border: 2px solid #0b990b;
    box-shadow: 1px 1px 2px #0b990b;
`;

const Ul = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Li = styled.li`
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #0b990b;
    padding: 10px;
`;

const User = () => {
    const id = useParams().id;
    const user = useSelector(state => state.users.find(item => item.id === id));

    if (!user) {
        return null;
    }

    return (
        <Container>
            <UserContainer>
                <h2>{user.username}</h2>
                <h3>Added blogs</h3>
                <Ul>
                    {user.blogs &&
                        user.blogs.map(blog => (
                            <Li key={blog.id}>{blog.title}</Li>
                        ))}
                </Ul>
            </UserContainer>
        </Container>
    );
};

export default User;
