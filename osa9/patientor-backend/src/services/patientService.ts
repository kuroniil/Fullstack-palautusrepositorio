import { NonSensitivePatient } from "../types";
import data from "../../data/patients";


export const getAllPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

/*
export default {
    getAllDiagnoses
};
*/