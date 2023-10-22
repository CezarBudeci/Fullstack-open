import Patients from '../data/patients';
import { Diagnose } from '../types/Diagnose';
import {
    Discharge,
    HealthCheckRating,
    NewPatient,
    NonSensitivePatient,
    Patient,
    SickLeave,
} from '../types/Patient';
import { PatientService } from '../types/PatientService';
import {
    parseDiagnoseCodes,
    parseDischarge,
    parseHealthCheckRating,
    parseSickLeave,
    parseString,
    toNonSensitivePatient,
} from '../utils/PatientUtil';

const { v1: uuid } = require('uuid');

const getPatients = (): Array<Patient> => {
    return Patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
    return Patients.map((patient: Patient) => toNonSensitivePatient(patient));
};

const getPatient = (id: string): Patient | null => {
    const result: any = Patients.find(patient => patient.id === id);

    if (typeof result === 'object' && result !== null) {
        const patient: Patient = <Patient>result;
        return patient;
    }

    return null;
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const patient: Patient = { ...entry, id, entries: [] };
    getPatients().push(patient);
    return patient;
};

const addEntry = (patient: Patient, body: any): Patient => {
    const type: string = parseString(body.type);

    const description: string = parseString(body.description);
    const date: string = parseString(body.date);
    const specialist: string = parseString(body.specialist);
    const diagnosisCodes: Array<Diagnose['code']> = parseDiagnoseCodes(
        body.diagnosisCodes
    );

    switch (type) {
        case 'HealthCheck':
            const healthCheckRating: HealthCheckRating = parseHealthCheckRating(
                body.healthCheckRating
            );
            patient.entries.push({
                id: uuid(),
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                healthCheckRating,
            });

            break;
        case 'OccupationalHealthcare':
            const employerName: string = parseString(body.employerName);
            const sickLeave: SickLeave | null = parseSickLeave(body.sickLeave);

            patient.entries.push({
                id: uuid(),
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                employerName,
                ...(sickLeave && { sickLeave }),
            });
            break;
        case 'Hospital':
            const discharge: Discharge | null = parseDischarge(body.discharge);
            patient.entries.push({
                id: uuid(),
                description,
                date,
                specialist,
                diagnosisCodes,
                type,
                ...(discharge && { discharge }),
            });
            break;
        default:
            throw new Error(`Invalid type: ${type}`);
    }

    return patient;
};

const patientService: PatientService = {
    getPatients,
    getNonSensitivePatients,
    getPatient,
    addPatient,
    addEntry,
};

export default patientService;
