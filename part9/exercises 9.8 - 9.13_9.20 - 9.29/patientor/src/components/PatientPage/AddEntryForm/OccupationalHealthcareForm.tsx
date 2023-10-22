import { FormControl, FormLabel, TextField } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    extraEntryFieldsStyle,
    sickLeaveDateFieldStyle,
} from '../../../styles/styles';

interface Props {
    employerName: string;
    sickleaveStartDate: Date | null;
    sickleaveEndDate: Date | null;
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    setSickleaveStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setSickleaveEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const OccupationalHealthcareForm: React.FC<Props> = ({
    employerName,
    sickleaveStartDate,
    sickleaveEndDate,
    setEmployerName,
    setSickleaveStartDate,
    setSickleaveEndDate,
}) => {
    return (
        <div>
            <FormControl variant="standard" style={{ width: '100%' }}>
                <TextField
                    label="Employer name"
                    type="text"
                    variant="standard"
                    value={employerName}
                    onChange={event => setEmployerName(event.target.value)}
                    required
                />
                <div style={extraEntryFieldsStyle}>
                    <FormLabel component="legend">Sick leave</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateField
                            label="Start date"
                            variant="standard"
                            style={sickLeaveDateFieldStyle}
                            value={sickleaveStartDate}
                            onChange={newDate => {
                                setSickleaveStartDate(newDate);
                            }}
                            required
                        />
                        <DateField
                            label="End date"
                            variant="standard"
                            style={sickLeaveDateFieldStyle}
                            value={sickleaveEndDate}
                            onChange={newDate => {
                                setSickleaveEndDate(newDate);
                            }}
                            required
                        />
                    </LocalizationProvider>
                </div>
            </FormControl>
        </div>
    );
};

export default OccupationalHealthcareForm;
