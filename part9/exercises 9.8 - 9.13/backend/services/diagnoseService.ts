import data from '../data/diagnoses';
import { Diagnose } from '../types/Diagnose';

const getEntries = (): Array<Diagnose> => {
    return data;
};

const addEntry = (entry: Diagnose) => {
    getEntries().push(entry);
    return getEntries();
};

export default {
    getEntries,
    addEntry,
};
