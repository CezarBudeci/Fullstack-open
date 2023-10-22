import data from '../data/diagnoses';
import { Diagnose } from '../types/Diagnose';

const getEntries = (): Array<Diagnose> => {
    return data;
};

const getEntriesByCode = (codes: Array<string>): Array<Diagnose> => {
    if (codes.length === 0) {
        return getEntries();
    }
    return getEntries().filter(diagnose => codes.includes(diagnose.code));
};

const addEntry = (entry: Diagnose) => {
    getEntries().push(entry);
    return getEntries();
};

export default {
    getEntries,
    addEntry,
    getEntriesByCode,
};
