import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { createNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const sortAnecdotes = (anecdotes) => {
        const anecdotesCopy = [...anecdotes];
        anecdotesCopy.sort((a, b) => {
            if (a.votes > b.votes) {
                return -1;
            }
            if (a.votes < b.votes) {
                return 1;
            }
            return 0;
        });
        return anecdotesCopy;
    };

    const anecdotes = useSelector(state =>  state.filter.filter === '' ? 
                                            sortAnecdotes(state.anecdotes) : 
                                            sortAnecdotes(state.anecdotes.filter(item => item.content.toLowerCase().includes(state.filter.filter.toLowerCase())))
    );
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(updateAnecdote(anecdote));
        dispatch(createNotification(`you voted '${anecdote.content}'`, 5));
    };

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
            has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;