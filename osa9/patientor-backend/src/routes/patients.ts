import express, { Response } from "express";
import { getAllPatients } from "../services/patientService";

const router =  express.Router();

router.get('/', (_req, res: Response) => {
    res.send(getAllPatients());
});

export default router;