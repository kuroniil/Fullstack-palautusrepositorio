import { Gender, NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) throw new Error("Invalid name");
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) throw new Error("Invalid date of birth");
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) throw new Error("Invalid ssn");
    return ssn;
};

const isGender = (input: string): input is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(input);
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender) throw new Error("Invalid gender input");
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) throw new Error("Invalid occupation");
    return occupation;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    };
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object &&
        'gender' in object && 'occupation' in object) {
            const newEntry = {
                name: parseName(object.name),
                dateOfBirth: parseDateOfBirth(object.dateOfBirth),
                ssn: parseSsn(object.ssn),
                gender: parseGender(object.gender),
                occupation: parseOccupation(object.occupation)
            };
            return newEntry;
        }
    throw new Error('Incorrect or missing data');
};

export default toNewPatientEntry;