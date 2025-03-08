export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
};

interface SickLeave {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
  type: 'OccupationalHealthcare';
};

interface Discharge {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
  type: "Hospital";
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
};

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

export type Entry = 
| OccupationalHealthcareEntry
| HospitalEntry
| HealthCheckEntry;

export interface EntryProps {
  details: Entry;
  diagnoses: Diagnosis[];
};

export interface PatientInfoParams {
  diagnoses: Diagnosis[];
};