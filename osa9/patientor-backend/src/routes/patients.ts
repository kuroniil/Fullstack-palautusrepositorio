import express, { Response, Request, NextFunction } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import { newHealthCheckEntrySchema, newHospitalEntrySchema, newOccupationalHealthcareEntrySchema, newPatientSchema } from "../utils";
import { NewPatientEntry, Patient, Entry } from "../types";

const router =  express.Router();

router.get('/', (_req, res: Response) => {
    res.send(patientService.getAllPatients());
});

router.get('/:id', (_req, res: Response) => {
    res.send(patientService.getPatientById(_req.params.id));
});

const newEntryParser = (req: Request<{ id: string }, unknown, Entry>, _res: Response, next: NextFunction) => {
    try {  
        switch (req.body.type) {
            case "Hospital":
                newHospitalEntrySchema.parse(req.body);
                break;
            case "OccupationalHealthcare":
                newOccupationalHealthcareEntrySchema.parse(req.body);
                break;
            case "HealthCheck":
                newHealthCheckEntrySchema.parse(req.body);
                break;
        }
        next();
    } catch (error: unknown) {
        next(error);
    };
};

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, Entry>, res: Response<Entry>) => {
    if (req.params && req.params.id) {
        const id = req.params.id;
        const addedEntry = patientService.addEntry(id, req.body);
        res.json(addedEntry);
    };
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    };
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    };
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});


router.use(errorMiddleware);

export default router;