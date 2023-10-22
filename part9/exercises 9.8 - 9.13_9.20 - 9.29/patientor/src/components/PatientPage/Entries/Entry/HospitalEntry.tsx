import { Diagnose, HospitalEntry } from '../../../../types';
import DiagnosisCodes from './DiagnosisCodes';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HospitalEntry;
    diagnosis: Array<Diagnose>;
}

const HospitalEntryDetails: React.FC<Props> = ({ entry, diagnosis }) => {
    return (
        <div>
            <p>
                {entry.date}
                <LocalHospitalIcon fontSize="medium" />
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
            {diagnosis && <DiagnosisCodes diagnosis={diagnosis} />}

            <p>
                discharge: {entry.discharge.date} - {entry.discharge.criteria}{' '}
            </p>

            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default HospitalEntryDetails;
