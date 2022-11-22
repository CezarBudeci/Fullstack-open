import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const anecdoteContent = e.target.anecdote.value;
        if (anecdoteContent) {
            e.target.anecdote.value = '';
            props.createAnecdote(anecdoteContent);
            props.createNotification(`you added '${anecdoteContent}'`, 5);
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <input name = 'anecdote' />
                </div>
                <div>
                    <button type = 'submit'>create</button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {
    createAnecdote,
    createNotification,
};

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;