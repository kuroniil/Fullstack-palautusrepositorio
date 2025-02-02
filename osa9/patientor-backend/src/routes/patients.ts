import express, { Response } from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from '../utils';

const router =  express.Router();

router.get('/', (_req, res: Response) => {
    res.send(patientService.getAllPatients());
});

router.post('/', (req, res: Response) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error) {
        console.log(error);
        res.status(400);
    };
});

export default router;