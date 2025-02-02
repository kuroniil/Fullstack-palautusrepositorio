import { Diagnosis } from "../types";
import data from "../../data/diagnoses";

const diagnoses: Diagnosis[] = data;

export const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

/*
export default {
    getAllDiagnoses
};
*/