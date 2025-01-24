interface ExerciseResults {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

const calculateExercises = (period: number[], target: number): ExerciseResults => {
    const rating = period.every(d => d >= target - 0.1*target && d < target) 
    ? 2 : period.every(d => d >= target) ? 3 : 1
    
    return {
        periodLength: period.length, 
        trainingDays: period.filter(d => d !== 0).length,
        target: target,
        average: period.reduce((a, b) => a + b, 0) / period.length,
        success: period.every(d => d >= target),
        rating: rating,
        ratingDescription: rating == 1 ? "bad" 
        : rating == 2 ? "not too bad" : "Very good"

    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))