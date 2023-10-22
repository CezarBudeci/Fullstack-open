import { useEffect, useState } from 'react';
import { Diagnose, Entry } from '../../../../types';
import DiagnosisService from '../../../../services/diagnosis';
import { assertNever } from '../../../../utils/TypeUtils';
import HealthCheckEntryDetails from './HealthCheckEntry';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntry';
import HospitalEntryDetails from './HospitalEntry';
import styled from 'styled-components';

const PatientEntryDetails = styled.div`
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
`;

interface Props {
    entry: Entry;
}

const PatientEntry: React.FC<Props> = ({ entry }) => {
    const [diagnosis, setDiagnosis] = useState<Array<Diagnose>>([]);

    useEffect(() => {
        const getDiagnosis = async (diagnosisCodes: Array<string>) => {
            const result = await DiagnosisService.getDiagnoses(diagnosisCodes);
            setDiagnosis(result);
        };

        if (!entry || !entry.diagnosisCodes) {
            return;
        }

        if (entry.diagnosisCodes.length > 0) {
            getDiagnosis(entry.diagnosisCodes);
        }
    }, []);
    switch (entry.type) {
        case 'HealthCheck':
            return (
                <PatientEntryDetails>
                    <HealthCheckEntryDetails
                        entry={entry}
                        diagnosis={diagnosis}
                    />
                </PatientEntryDetails>
            );
        case 'OccupationalHealthcare':
            return (
                <PatientEntryDetails>
                    <OccupationalHealthcareEntryDetails
                        entry={entry}
                        diagnosis={diagnosis}
                    />
                </PatientEntryDetails>
            );
        case 'Hospital':
            return (
                <PatientEntryDetails>
                    <HospitalEntryDetails entry={entry} diagnosis={diagnosis} />
                </PatientEntryDetails>
            );
        default:
            return assertNever(entry);
    }
};

export default PatientEntry;
