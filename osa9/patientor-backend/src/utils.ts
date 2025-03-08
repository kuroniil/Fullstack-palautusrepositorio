import { Gender, NewPatientEntry } from "./types";
import { z } from "zod";

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newPatientSchema.parse(object);
};

export default toNewPatientEntry;