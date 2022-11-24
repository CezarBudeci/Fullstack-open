import { useNavigate } from 'react-router-dom';
import { useField, useReset } from '../hooks';

const CreateNew = (props) => {
    const content = useField('text');
    const author = useField('author');
    const info = useField('text');

    const reset = useReset(content, author, info);

    const navigate = useNavigate();
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newAnecdote = {
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      };
      props.addNew(newAnecdote);
      props.showNotification(`A new anecdote ${newAnecdote.content} create!`);
      navigate('/');
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <input type = "button" onClick={reset.resetAll} value = "reset" />
        </form>
      </div>
    )
  
};

export default CreateNew;