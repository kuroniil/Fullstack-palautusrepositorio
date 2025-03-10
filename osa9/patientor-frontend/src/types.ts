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

export interface HealthCheckEntryProps {
  details: HealthCheckEntry;
  diagnoses: Diagnosis[];
};

export interface HospitalEntryProps {
  details: HospitalEntry;
  diagnoses: Diagnosis[];
};

export interface OccupationalHealthcareEntryProps {
  details: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

export interface BaseEntryProps {
  pid: string;
  newEntrySubmit: (newEntry: Entry) => void;
}

export interface NewEntryProps {
  setNewEntry: React.Dispatch<React.SetStateAction<string>>;
  newEntrySubmit: (newEntry: Entry) => void;
  pid: string;
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, 'id'>;

export interface ValidationError {
  message: string;
  error: Array<Record<string, string[]>>
};