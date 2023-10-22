import axios from 'axios';
import { EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
};

const getPatient = async (id: string) => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object
    );

    return data;
};

const addEntry = async (entry: EntryWithoutId, patientId: string) => {
    const result = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId}/diagnosis`,
        entry
    );

    return result.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    getPatient,
    create,
    addEntry,
};
