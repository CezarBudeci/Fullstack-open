import { Diagnose, OccupationalHealthcareEntry } from '../../../../types';
import DiagnosisCodes from './DiagnosisCodes';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnosis: Array<Diagnose>;
}

const OccupationalHealthcareEntryDetails: React.FC<Props> = ({
    entry,
    diagnosis,
}) => {
    return (
        <div>
            <p>
                {entry.date}
                <WorkIcon fontSize="medium" />
                <i>{entry.employerName}</i>
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
            {diagnosis && <DiagnosisCodes diagnosis={diagnosis} />}
            {entry.sickLeave && (
                <p>
                    sick leave: {entry.sickLeave.startDate} -{' '}
                    {entry.sickLeave.endDate}{' '}
                </p>
            )}
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default OccupationalHealthcareEntryDetails;
