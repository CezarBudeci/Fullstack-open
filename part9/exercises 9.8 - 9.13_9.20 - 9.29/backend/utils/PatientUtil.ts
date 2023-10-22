import { Diagnose } from '../types/Diagnose';
import {
    Discharge,
    Gender,
    HealthCheckRating,
    NewPatient,
    NonSensitivePatient,
    Patient,
    SickLeave,
} from '../types/Patient';

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

export const toNonSensitivePatient = (
    patient: Patient
): NonSensitivePatient => {
    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    };
};

export const parseString = (param: unknown): string => {
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

export const parseDiagnoseCodes: (
    value: unknown
) => Array<Diagnose['code']> = value => {
    if (!value) {
        throw new Error('Invalid diagnosis code');
    }

    return value as Array<Diagnose['code']>;
};

export const parseHealthCheckRating: (
    value: unknown
) => HealthCheckRating = value => {
    if (!value) {
        throw new Error(`Invalid HealthCheckRating: ${value}`);
    }
    try {
        const enumKey: string = parseString(value);
        return HealthCheckRating[enumKey as keyof typeof HealthCheckRating];
    } catch (error) {
        throw new Error(`Invalid HealthCheckRating: ${value}`);
    }
};

export const parseSickLeave: (
    value: any | unknown
) => SickLeave | null = value => {
    if (!value || !value.startDate || !value.endDate) {
        return null;
    }

    const startDate: string = parseString(value.startDate);
    const endDate: string = parseString(value.endDate);

    if (!startDate || !endDate) {
        return null;
    }

    const sickLeave: SickLeave = {
        startDate,
        endDate,
    };

    return sickLeave;
};

export const parseDischarge: (value: any | unknown) => Discharge = value => {
    if (!value || !value.date || !value.criteria) {
        throw new Error(`Invalid value: ${value}`);
    }

    const date: string = parseString(value.date);
    const criteria: string = parseString(value.criteria);

    if (!date || !criteria) {
        throw new Error(`Invalid value: ${value}`);
    }

    const discharge: Discharge = {
        date,
        criteria,
    };

    return discharge;
};
