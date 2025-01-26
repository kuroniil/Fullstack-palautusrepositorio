import { parseExerciseParams, validateExerciseParams } from "./utils";

interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

interface ErrorMessage {
    "error": string
}

export interface ExerciseParams {
    daily_exercises: number[],
    target: number
};

export const exerciseCalcMain = (args: ExerciseParams): ExerciseResults | ErrorMessage => {
    const calculateExercises = (period: number[], target: number): ExerciseResults => {
        const rating = period.every(d => d >= target - 0.1*target && d < target)
                       ? 2 : period.every(d => d >= target) ? 3 : 1;
        
        return {
            periodLength: period.length, 
            trainingDays: period.filter(d => d !== 0).length,
            target: target,
            average: period.reduce((a, b) => a + b, 0) / period.length,
            success: period.every(d => d >= target),
            rating: rating,
            ratingDescription: rating == 1 ? "bad" 
            : rating == 2 ? "not too bad" : "Very good"
        };
    };
    
    try {
        if (require.main === module) {
            const { target, period } = parseExerciseParams(process.argv);
            const { valTarget, valPeriod } = validateExerciseParams(target, period);
            console.log(calculateExercises(valPeriod, valTarget));
            return calculateExercises(valPeriod, valTarget);
        } else {
            if (Object.keys(args).length !== 2) throw new Error("parameters missing");
            const { valTarget, valPeriod } = validateExerciseParams(args.target, args.daily_exercises);
            return calculateExercises(valPeriod, valTarget);
        };
    } catch (error) {
        let errorMessage = "";
        if (error instanceof Error) {
            errorMessage += error.message;
        };
        console.log(errorMessage);
        return { "error": errorMessage };
    };        
};

exerciseCalcMain({"daily_exercises": [], "target": -1});

