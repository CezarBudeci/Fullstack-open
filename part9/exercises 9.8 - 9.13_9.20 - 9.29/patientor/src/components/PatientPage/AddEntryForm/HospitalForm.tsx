import { FormControl, FormLabel, TextField } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { extraEntryFieldsStyle } from '../../../styles/styles';

interface Props {
    dischargeDate: Date | null;
    dischargeCriteria: string;
    setDischargeDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm: React.FC<Props> = ({
    dischargeDate,
    dischargeCriteria,
    setDischargeDate,
    setDischargeCriteria,
}) => {
    return (
        <div style={extraEntryFieldsStyle}>
            <FormLabel component="legend">Discharge</FormLabel>
            <FormControl variant="standard" style={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateField
                        label="Date"
                        variant="standard"
                        value={dischargeDate}
                        onChange={newDate => {
                            setDischargeDate(newDate);
                        }}
                        required
                    />
                </LocalizationProvider>
                <TextField
                    label="Criteria"
                    type="text"
                    variant="standard"
                    value={dischargeCriteria}
                    onChange={event => setDischargeCriteria(event.target.value)}
                    required
                />
            </FormControl>
        </div>
    );
};

export default HospitalForm;
