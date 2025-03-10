import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
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

export const newHospitalEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string()
    })
});

export const newHealthCheckEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const newOccupationalHealthcareEntrySchema = z.object({
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
    employerName: z.string()
});


export default toNewPatientEntry;