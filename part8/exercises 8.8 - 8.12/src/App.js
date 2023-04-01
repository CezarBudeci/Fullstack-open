import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex', gap: 5 }}>
                <Link to="/">authors</Link>
                <Link to="/books">books</Link>
                <Link to="/newBook">add book</Link>
            </div>

            <Routes>
                <Route path="/" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/newBook" element={<NewBook />} />
            </Routes>
        </Router>
    );
};

export default App;
