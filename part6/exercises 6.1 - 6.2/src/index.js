import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducers/reducer';

const store = createStore(reducer);

const App = () => {
    const giveFeedback = (e) => {
        let feedbackType = e.target.name;
        store.dispatch({
            type: feedbackType.toUpperCase()
        });
    };

    return (
        <div>
            <button name = "good" onClick={e => giveFeedback(e)}>good</button>
            <button name = "ok" onClick={e => giveFeedback(e)}>ok</button>
            <button name = "bad" onClick={e => giveFeedback(e)}>bad</button>
            <button name = "zero" onClick={e => giveFeedback(e)}>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>ok {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
    root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
