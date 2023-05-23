import patientsData from '../data/patients';
import {
    NewPatient,
    NonSensitivePatientEntry,
    Patient,
} from '../types/Patient';
const { v1: uuid } = require('uuid');

const getEntries = (): Array<Patient> => {
    return patientsData;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return patientsData;
};

const addEntry = (entry: NewPatient): Patient => {
    const id = uuid();
    const patient: Patient = { ...entry, id };
    getEntries().push(patient);
    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
};
