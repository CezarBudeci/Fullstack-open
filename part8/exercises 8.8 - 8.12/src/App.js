import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from './queries/UserQueries';
import Recommended from './components/Recommended';

const App = () => {
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const client = useApolloClient();
    const result = useQuery(ME, {
        onError: error => {
            localStorage.removeItem('userToken');
        },
    });

    const logout = () => {
        setToken('');
        localStorage.removeItem('userToken');
        window.location = '/';
        client.clearStore();
    };

    useEffect(() => {
        const existingToken = localStorage.getItem('userToken');
        if (!existingToken) {
            return;
        }

        if (result.data) {
            setToken(existingToken);
            setCurrentUser(result.data.me);
        }
    }, [result.data]);

    return (
        <Router>
            <div style={{ display: 'flex', gap: 5 }}>
                <Link to="/">authors</Link>
                <Link to="/books">books</Link>
                {token ? (
                    <>
                        <Link to="/newBook">add book</Link>
                        <Link to="/recommended">recommended</Link>
                        <button onClick={logout}>logout</button>
                    </>
                ) : (
                    <Link to="/login">login</Link>
                )}
            </div>

            <Routes>
                <Route path="/" element={<Authors token={token} />} />
                <Route path="/books" element={<Books />} />
                {token ? (
                    <>
                        <Route path="/newBook" element={<NewBook />} />
                        <Route
                            path="/recommended"
                            element={<Recommended currentUser={currentUser} />}
                        />
                    </>
                ) : (
                    <Route
                        path="/login"
                        element={<LoginForm setToken={setToken} />}
                    />
                )}
            </Routes>
        </Router>
    );
};

export default App;
