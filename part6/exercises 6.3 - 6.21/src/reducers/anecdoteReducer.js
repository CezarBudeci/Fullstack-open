import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const payload = action.payload;
            const anecdoteToUpdate = state.find(item => item.id === payload.id);
            const updatedAnecdote = { ...anecdoteToUpdate, votes: payload.votes };
            let updatedState = state.map(item => item.id === payload.id ? updatedAnecdote : item);
            updatedState.sort((a, b) => {
                if (a.votes > b.votes) {
                    return -1;
                }
                if (a.votes < b.votes) {
                    return 1;
                }
                return 0;
            });
            return updatedState;
        },
        addAnecdote(state, action) {
            const payload = action.payload;
            state.push(payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        }
    }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
    return dispatch => {
        return anecdotesService.getAll().then(data => dispatch(setAnecdotes(data)));
    };
};

export const createAnecdote = (anecdoteContent) => {
    const anecdote = {
        content: anecdoteContent,
        votes: 0
    };

    return dispatch => {
        return anecdotesService.createAnecdote(anecdote).then(data => dispatch(addAnecdote(data)));
    };
};

export const updateAnecdote = (anecdote) => {
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    return dispatch => {
        return anecdotesService.updateAnecdote(anecdoteToUpdate).then(data => dispatch(voteAnecdote(data)));
    };
};

export default anecdotesSlice.reducer;