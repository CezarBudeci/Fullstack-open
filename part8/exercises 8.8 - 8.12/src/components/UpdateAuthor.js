import Select from 'react-select';
import { useQuery, useMutation } from '@apollo/client';
import {
    ALL_AUTHORS,
    ALL_AUTHORS_NAMES,
    UPDATE_AUTHOR_YEAR,
} from '../queries/AuthorsQueries';
import { useEffect, useState } from 'react';

const UpdateAuthor = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [options, setOptions] = useState([]);
    const [year, setYear] = useState('');

    const result = useQuery(ALL_AUTHORS_NAMES);
    const [updateAuthorYear] = useMutation(UPDATE_AUTHOR_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    useEffect(() => {
        if (result.data && result.data.allAuthors) {
            let newOptions = [];

            result.data.allAuthors.forEach(author => {
                const option = { label: author.name, value: author.name };
                newOptions.push(option);
            });

            if (newOptions.length !== 0) {
                setOptions(newOptions);
            }
        }
    }, [result.loading, result.data]);

    const handleSubmit = e => {
        e.preventDefault();

        updateAuthorYear({
            variables: { name: selectedValue.value, born: Number(year) },
        });

        setSelectedValue(null);
        setYear('');
    };

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                <Select
                    defaultValue={selectedValue}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    options={options}
                />
                <div>
                    born
                    <input
                        type="number"
                        value={year}
                        onChange={({ target }) => setYear(target.value)}
                    />
                    <br />
                    <button type="submit">update author</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAuthor;
