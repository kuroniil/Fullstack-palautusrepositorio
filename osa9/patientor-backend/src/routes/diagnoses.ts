import express, { Response } from "express";
import { getAllDiagnoses } from "../services/diagnosisService";

const router =  express.Router();

router.get('/', (_req, res: Response) => {
    res.send(getAllDiagnoses());
});

export default router;