import { NonSensitivePatient, NewPatientEntry, Patient, Entry } from "../types";
import data from "../../data/patients";
import { v1 as uuid } from 'uuid';

const patients = data;

const getAllPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (pid: string): Patient => {
  const patient = patients.filter(patient => patient.id === pid)[0];
  if (patient.entries.map(entry => entry.type === "HealthCheck" 
    ||entry.type === "Hospital" 
    || entry.type === "OccupationalHealthcare").every(e => e === true)) {
      return patient;
    }
  else {
    throw new Error();
  }
};

const addEntry = (pid: string, entry: Entry) => {
  for (let i = 0; i < patients.length; i++) {
    if (patients[i].id === pid) {
      entry.id = uuid();
      patients[i].entries.push(entry);
    }
  };
  return entry;
};

const addPatient = (details: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...details
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  addPatient,
  getPatientById,
  addEntry
};
