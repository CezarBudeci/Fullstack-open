import { NewPatient, NonSensitivePatient, Patient } from './Patient';

export type PatientService = {
    getPatients: getPatients;
    getNonSensitivePatients: getNonSensitivePatients;
    getPatient: getPatient;
    addPatient: addPatient;
    addEntry: addEntry;
};

export type getPatients = () => Array<Patient>;

export type getNonSensitivePatients = () => Array<NonSensitivePatient>;

export type getPatient = (id: string) => Patient | null;

export type addPatient = (entry: NewPatient) => Patient;

export type addEntry = (patient: Patient, body: any) => Patient;
