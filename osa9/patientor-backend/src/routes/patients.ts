import express, { Response, Request, NextFunction } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import { newPatientSchema } from "../utils";
import { NewPatientEntry, Patient } from "../types";

const router =  express.Router();

router.get('/', (_req, res: Response) => {
    res.send(patientService.getAllPatients());
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