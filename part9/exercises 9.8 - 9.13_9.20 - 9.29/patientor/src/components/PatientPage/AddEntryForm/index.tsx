import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import {
    BaseEntryWithoutId,
    Diagnose,
    EntryWithoutId,
    HealthCheckRating,
    Patient,
    ValidationError,
} from '../../../types';
import DiagnoseService from '../../../services/diagnosis';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import HealthCheckForm from './HealthCheckForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import HospitalForm from './HospitalForm';
import {
    addEntryBottomButtons,
    addEntryFormStyle,
} from '../../../styles/styles';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import PatientService from '../../../services/patients';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

const entryTypes: EntryType[] = [
    'HealthCheck',
    'OccupationalHealthcare',
    'Hospital',
];

const dateFormat: string = 'dd-MM-yyyy';

interface Props {
    toggleShowAddEntryForm: () => void;
    patient: Patient;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AddEntryForm: React.FC<Props> = ({
    toggleShowAddEntryForm,
    patient,
    setPatient,
    setErrorMessage,
}) => {
    const [diagnosis, setDiagnosis] = useState<Array<Diagnose>>([]);
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
    const [selectedDiagnoseCodes, setSelectedDiagnoseCodes] = useState<
        Array<string>
    >([]);
    const [selectedEntryType, setSelectedEntryType] =
        useState<EntryType>('HealthCheck');
    const [selectedHealthRating, setSelectedHealthRating] =
        useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [specialist, setSpecialist] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');
    const [sickleaveStartDate, setSickleaveStartDate] = useState<Date | null>(
        null
    );
    const [sickleaveEndDate, setSickleaveEndDate] = useState<Date | null>(null);
    const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEntryType || !entryTypes.includes(selectedEntryType)) {
            return;
        }

        const newBaseEntry: BaseEntryWithoutId = {
            description,
            date: date ? format(date, dateFormat) : '',
            specialist,
            diagnosisCodes: selectedDiagnoseCodes,
        };

        let newEntry: EntryWithoutId;
        switch (selectedEntryType) {
            case 'HealthCheck':
                newEntry = {
                    ...newBaseEntry,
                    type: selectedEntryType,
                    healthCheckRating:
                        selectedHealthRating as unknown as HealthCheckRating,
                };
                break;
            case 'OccupationalHealthcare':
                if (sickleaveStartDate && sickleaveEndDate) {
                    newEntry = {
                        ...newBaseEntry,
                        type: selectedEntryType,
                        employerName,
                        sickLeave: {
                            startDate: format(sickleaveStartDate, dateFormat),
                            endDate: format(sickleaveEndDate, dateFormat),
                        },
                    };
                } else {
                    newEntry = {
                        ...newBaseEntry,
                        type: selectedEntryType,
                        employerName,
                    };
                }

                break;
            case 'Hospital':
                newEntry = {
                    ...newBaseEntry,
                    type: selectedEntryType,
                    discharge: {
                        date: dischargeDate
                            ? format(dischargeDate, dateFormat)
                            : '',
                        criteria: dischargeCriteria,
                    },
                };
                break;
        }

        if (newEntry) {
            const addEntry = async (
                newEntry: EntryWithoutId,
                patientId: string
            ) => {
                try {
                    const data: Patient = await PatientService.addEntry(
                        newEntry,
                        patientId
                    );
                    setPatient(data);
                    closeForm();
                } catch (error) {
                    if (
                        axios.isAxiosError<
                            ValidationError,
                            Record<string, unknown>
                        >(error)
                    ) {
                        setErrorMessage(error.response?.request.response);
                    }
                }
            };

            addEntry(newEntry, patient.id);
        }
    };

    const resetValues: () => void = () => {
        setSelectedDiagnoseCodes([]);
        setSelectedEntryType('HealthCheck');
        setSelectedHealthRating('');
        setDescription('');
        setDate(null);
        setSpecialist('');
        setEmployerName('');
        setSickleaveStartDate(null);
        setSickleaveEndDate(null);
        setDischargeDate(null);
        setDischargeCriteria('');
    };

    const closeForm: () => void = () => {
        resetValues();
        toggleShowAddEntryForm();
    };

    useEffect(() => {
        const getDiagnoseCodes = async () => {
            const result = await DiagnoseService.getDiagnoses();
            setDiagnosis(result);
        };
        getDiagnoseCodes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDiagnosisCodes(diagnosis.map(diagnose => diagnose.code));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diagnosis.length]);

    const extraFields = () => {
        switch (selectedEntryType) {
            case 'HealthCheck':
                return (
                    <HealthCheckForm
                        selectedHealthRating={selectedHealthRating}
                        setSelectedHealthRating={setSelectedHealthRating}
                    />
                );
            case 'OccupationalHealthcare':
                return (
                    <OccupationalHealthcareForm
                        employerName={employerName}
                        sickleaveStartDate={sickleaveStartDate}
                        sickleaveEndDate={sickleaveEndDate}
                        setEmployerName={setEmployerName}
                        setSickleaveStartDate={setSickleaveStartDate}
                        setSickleaveEndDate={setSickleaveEndDate}
                    />
                );
            case 'Hospital':
                return (
                    <HospitalForm
                        dischargeDate={dischargeDate}
                        dischargeCriteria={dischargeCriteria}
                        setDischargeDate={setDischargeDate}
                        setDischargeCriteria={setDischargeCriteria}
                    />
                );
        }
    };

    return (
        <div style={addEntryFormStyle}>
            <form onSubmit={handleSubmit}>
                <FormControl variant="standard" style={{ width: '100%' }}>
                    <TextField
                        label="Description"
                        type="text"
                        variant="standard"
                        value={description}
                        onChange={event => {
                            setDescription(event.target.value);
                        }}
                        required
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateField
                            label="Date"
                            variant="standard"
                            value={date}
                            onChange={newDate => setDate(newDate)}
                            required
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Specialist"
                        type="text"
                        variant="standard"
                        value={specialist}
                        onChange={event => {
                            setSpecialist(event.target.value);
                        }}
                        required
                    />
                    <FormControl variant="standard">
                        <InputLabel id="diagnosis-codes-label">
                            Diagnosis codes
                        </InputLabel>
                        <Select
                            labelId="diagnosis-codes-label"
                            multiple
                            value={selectedDiagnoseCodes}
                            onChange={event => {
                                setSelectedDiagnoseCodes(
                                    typeof event.target.value === 'string'
                                        ? event.target.value.split(',')
                                        : event.target.value
                                );
                            }}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}>
                            {diagnosisCodes &&
                                diagnosisCodes.map((diagnosisCode, index) => (
                                    <MenuItem
                                        key={diagnosisCode + '_' + index}
                                        value={diagnosisCode}>
                                        <Checkbox
                                            checked={
                                                selectedDiagnoseCodes.indexOf(
                                                    diagnosisCode
                                                ) > -1
                                            }
                                        />
                                        <ListItemText primary={diagnosisCode} />
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel id="entry-types">Entry types</InputLabel>
                        <Select
                            labelId="entry-types"
                            value={selectedEntryType}
                            onChange={event => {
                                setSelectedEntryType(
                                    event.target.value as EntryType
                                );
                            }}
                            MenuProps={MenuProps}>
                            {entryTypes &&
                                entryTypes.map((entryType, index) => (
                                    <MenuItem
                                        key={entryType + '_' + index}
                                        value={entryType}>
                                        <ListItemText primary={entryType} />
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    {extraFields()}
                </FormControl>
                <div style={addEntryBottomButtons}>
                    <Button
                        size="medium"
                        variant="outlined"
                        color="error"
                        onClick={closeForm}>
                        Cancel
                    </Button>
                    <Button size="medium" variant="outlined" type="submit">
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddEntryForm;
