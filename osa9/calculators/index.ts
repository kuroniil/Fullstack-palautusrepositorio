import { bmiMain } from './bmiCalculator';
import { exerciseCalcMain, ExerciseParams } from './exerciseCalculator';
import express from "express";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmiTextual = bmiMain(height, weight);
    if (bmiTextual.startsWith("Error")) {
        res.send({"error": bmiTextual});
    }
    const bmiObject = {"weight": req.query.weight,
                       "height": req.query.height,
                       "bmi": bmiTextual};
    res.send(bmiObject);
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ExerciseParams = req.body;
    const exerciseObject = exerciseCalcMain(body);
    res.json(exerciseObject);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});