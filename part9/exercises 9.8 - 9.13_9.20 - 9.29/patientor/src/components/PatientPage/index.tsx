import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { useState, useEffect } from 'react';
import patientService from '../../services/patients';
import Entries from './Entries';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import { errorDiv } from '../../styles/styles';
import ErrorMessage from './ErrorMessage';

const PatientPage: React.FC<{}> = () => {
    const [patient, setPatient] = useState<Patient>();
    const [showAddEntryForm, setShowAddEntryForm] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const id: string | undefined = useParams().id;

    const genderIcon = () => {
        if (!patient) {
            return;
        }
        if (patient.gender === 'male') {
            return <MaleIcon fontSize="medium" />;
        } else if (patient.gender === 'female') {
            return <FemaleIcon fontSize="medium" />;
        }
    };

    const toggleShowAddEntryForm = () => {
        setShowAddEntryForm(!showAddEntryForm);
    };

    useEffect(() => {
        if (typeof id === 'string' && id) {
            const getPatient = async (id: string) => {
                const result = await patientService.getPatient(id);
                setPatient(result);
            };

            getPatient(id);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    }, [errorMessage]);
    return (
        <div>
            {patient ? (
                <div>
                    <div>
                        <h2>
                            {patient.name} {genderIcon()}
                        </h2>
                        <p>ssn: {patient.ssn}</p>
                        <p>occupation: {patient.occupation}</p>
                    </div>
                    {errorMessage && (
                        <ErrorMessage errorMessage={errorMessage} />
                    )}
                    <div>
                        {showAddEntryForm ? (
                            <AddEntryForm
                                toggleShowAddEntryForm={toggleShowAddEntryForm}
                                patient={patient}
                                setPatient={setPatient}
                                setErrorMessage={
                                    setErrorMessage
                                }></AddEntryForm>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={toggleShowAddEntryForm}>
                                Add entry
                            </Button>
                        )}
                    </div>
                    <div>
                        <Entries entries={patient.entries} />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default PatientPage;
