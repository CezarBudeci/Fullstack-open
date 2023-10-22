import { Entry } from '../../../types';
import PatientEntry from './Entry';

interface Props {
    entries: Array<Entry>;
}

const Entries: React.FC<Props> = ({ entries }) => {
    return (
        <div>
            <h3>entries</h3>
            {entries &&
                entries.map(entry => (
                    <PatientEntry key={entry.id} entry={entry} />
                ))}
        </div>
    );
};

export default Entries;
