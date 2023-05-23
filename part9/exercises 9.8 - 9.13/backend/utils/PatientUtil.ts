import { Gender, NewPatient } from '../types/Patient';

export const toNewPatient = (obj: unknown): NewPatient => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in obj &&
        'dateOfBirth' in obj &&
        'ssn' in obj &&
        'gender' in obj &&
        'occupation' in obj
    ) {
        const newPatient: NewPatient = {
            name: parseString(obj.name),
            dateOfBirth: parseString(obj.dateOfBirth),
            ssn: parseString(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseString(obj.occupation),
        };

        return newPatient;
    }

    throw new Error('Incorrect or missing data');
};

const parseString = (param: unknown): string => {
    if (!param || !isString(param)) {
        throw new Error(`Incorrect or missing data: ${param}`);
    }

    return param;
};

const parseGender = (param: unknown): Gender => {
    if (!param || !isString(param) || !isGender(param)) {
        throw new Error(`Incorrect or missing data: ${param}`);
    }

    return param;
};

const isString = (param: unknown): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map(v => v.toString())
        .includes(param);
};
